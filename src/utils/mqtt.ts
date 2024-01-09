import { type MqttClient as TMqttClient } from 'precompiled-mqtt'
import type { ISportEventList } from '~/apis/types'

/**
 * ws://34.92.35.218:8088
 * user = "rmqtt", password = "www.123.com",
 */

type TMqttProtocol = 'wss' | 'ws' | 'mqtt' | 'mqtts' | 'tcp' | 'ssl' | 'wx' | 'wxs'
type TMqttServer = Array<{
  host: string
  port: number
  protocol?: TMqttProtocol
}>

const chatMessageBus = useEventBus(CHAT_MESSAGE_BUS)
const refreshBalanceBus = useEventBus(REFRESH_BALANCE_BUS)
const mqttDisconnectBus = useEventBus(MQTT_DISCONNECT_BUS)
const mqttConnectSuccessBus = useEventBus(MQTT_CONNECT_SUCCESS_BUS)
const refreshMemberBus = useEventBus(REFRESH_MEMBER_BUS)
const refreshAuthBus = useEventBus(REFRESH_AUTH_BUS)
export const sportDeltaBus = useEventBus<ISportEventList[]>(SPORTS_DATA_CHANGE_BUS)

const sportDeltaDataList: ISportEventList[] = []

/**
 * 刷新余额
 * @description 5秒内只能触发一次
 */
const refreshBalanceThrottle = throttle(() => {
  refreshBalanceBus.emit(REFRESH_BALANCE_BUS)
}, 5 * 1000)

/**
 * 刷新用户信息
 * @description 5秒内只能触发一次
 */
const refreshMemberThrottle = throttle(() => {
  refreshMemberBus.emit(REFRESH_MEMBER_BUS)
}, 5 * 1000)

let sportTimer: any = null
/**
 * 通知体育数据刷新
 * @description 3秒内的数都会被合并
 */
export function sportDataChange(obj: ISportEventList) {
  sportDeltaDataList.push(obj)

  if (sportTimer)
    clearTimeout(sportTimer)

  sportTimer = setTimeout(() => {
    sportDeltaBus.emit(cloneDeep(sportDeltaDataList))
    sportDeltaDataList.length = 0
  }, 4 * 1000)
}

export class SocketClient {
  client: TMqttClient | null = null

  subscribeList: string[] = []

  /** 上一次连接登录状态 */
  lastLoginStatus: boolean | null = null

  #MQTT_SERVER: TMqttServer | null = null

  #log = (message: string, ...rest: any) => {
    console.log(`%c Mqtt ${message}`, 'color: #e10d8a', ...rest)
  }

  constructor() {
    this.#log('实例化')
    this.generateMQTT_SERVER()
  }

  /** 生成 #MQTT_SERVER */
  public generateMQTT_SERVER() {
    const { VITE_SOCKET_URL_LIST_STRING } = getEnv()

    if (!VITE_SOCKET_URL_LIST_STRING) {
      this.#MQTT_SERVER = null
      return
    }

    const list = VITE_SOCKET_URL_LIST_STRING.split(',')
    const result: TMqttServer = []

    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      const [protocol, host, port] = item.split('|')

      if (!host || !port) {
        this.#log('请在 env文件中 配置连接地址')
        return
      }

      result.push({
        host,
        port: Number(port),
        protocol: protocol as TMqttProtocol,
      })
    }

    console.error('result', result)

    this.#MQTT_SERVER = result
  }

  /** 断开重新连接 */
  public endOrConnect() {
    if (this.client != null) {
      this.#log('已经连接, 断开连接中...')
      mqttDisconnectBus.emit(MQTT_DISCONNECT_BUS)
      const opts: any = null
      this.client.end(true, opts, () => {
        this.connect('断开 重新连接')
      })
    }
  }

  public async connect(msg: string) {
    this.#log('MQTT CONNECT', msg)
    if (this.#MQTT_SERVER) {
      const { userInfo, isLogin } = storeToRefs(useAppStore())

      if (this.lastLoginStatus === null)
        this.lastLoginStatus = isLogin.value

      if (this.lastLoginStatus === isLogin.value) {
        if (this.client != null) {
          this.#log('登录状态相同，且已经连接过，不执行连接', msg)
          return
        }
      }
      else {
        this.lastLoginStatus = isLogin.value
        this.endOrConnect()
        return
      }

      this.#log('连接中...')

      // 随机生成10位的 客户端ID
      const r = Math.random().toString(36).slice(-10)
      const clientId = (isLogin.value && userInfo.value?.uid)
        ? `${userInfo.value?.uid}-${Math.floor(Math.random() * 100)}`
        : `web-random-${r}`
      this.#log('clientId', clientId)

      import('precompiled-mqtt').then((mqtt) => {
        // const { VITE_SOCKET_USERNAME, VITE_SOCKET_PASSWORD } = getEnv()
        this.client = mqtt.connect({
          // username: VITE_SOCKET_USERNAME,
          // password: VITE_SOCKET_PASSWORD,
          keepalive: 20,
          clientId,
          servers: this.#MQTT_SERVER!,
        })
        this.eventHandler()
      })
    }
    else {
      this.#log('请在 env文件中 配置连接地址')
    }
  }

  public addSubscribe(subscribeEvent: string, successFn?: () => void) {
    this.#log('开始订阅', subscribeEvent)
    if (this.client != null && subscribeEvent) {
      this.client.subscribe(subscribeEvent, (error, granted) => {
        if (error) {
          this.#log(`订阅失败${subscribeEvent}`, error)
        }
        else {
          this.#log('订阅成功', granted)
          if (successFn)
            successFn()
          this.subscribeList.push(subscribeEvent)
        }
      })
    }
  }

  public removeSubscribe(subscribeEvent: string, successFn?: () => void) {
    if (this.client != null && subscribeEvent) {
      this.client.unsubscribe(subscribeEvent, (error: any) => {
        if (error) {
          this.#log('取消订阅失败', error)
        }
        else {
          this.#log(`取消订阅成功 ${subscribeEvent}`)
          const index = this.subscribeList.indexOf(subscribeEvent)
          if (index > -1)
            this.subscribeList.splice(index, 1)

          if (successFn)
            successFn()
        }
      })
    }
  }

  public eventHandler() {
    if (this.client != null) {
      this.client.on('connect', (arg) => {
        this.#log('连接成功', 'Info: ', arg)
        mqttConnectSuccessBus.emit(MQTT_CONNECT_SUCCESS_BUS)
      })

      this.client.on('message', (topic, message, packet) => {
        if (!topic.includes('sport/delta'))
          this.#log(`收到消息：${message.toString()}`, topic, packet)

        try {
          if (topic.includes('chat')) {
            const data = JSON.parse(message.toString())
            if (data)
              chatMessageBus.emit(data)
          }
          else if (topic.includes('balance')) {
            // 刷新用户余额
            refreshBalanceThrottle()
          }
          else if (topic.includes('member')) {
            // 刷新用户信息
            refreshMemberThrottle()
          }
          else if (topic.includes('auth')) {
            const data = JSON.parse(message.toString())
            // 第三方登录状态推送
            refreshAuthBus.emit(data)
          }
          else if (topic.includes('sport/delta')) {
            const data = JSON.parse(message.toString())
            if (data.v)
              data.v = JSON.parse(data.v)

            sportDataChange(data)
          }
        }
        catch (error) {
          this.#log('收到消息解析失败', error)
        }
      })

      this.client.on('error', (error) => {
        this.#log(`发生错误：${error}`)
      })

      this.client.on('offline', () => {
        this.#log('离线')
      })

      this.client.on('disconnect', (disconnectInfo) => {
        this.#log('断开连接', disconnectInfo)
        this.client = null
      })

      this.client.on('reconnect', () => {
        this.#log('重新连接')
      })

      this.client.on('end', () => {
        this.#log('连接结束')
        this.client = null
      })

      this.client.on('close', () => {
        this.#log('连接关闭')
        this.client = null
      })

      this.client.on('outgoingEmpty', () => {
        this.#log('发送队列为空')
      })

      this.client.on('packetreceive', (packetreceiveInfo) => {
        this.#log('收到数据包 《《《《《《《《《《《', packetreceiveInfo)
      })

      this.client.on('packetsend', (packetsendInfo) => {
        this.#log('发送数据包 》》》》》》》》》》》', packetsendInfo)
      })
    }
  }

  /** 关闭mqtt连接 */
  close() {
    if (this.client != null) {
      const opts: any = null
      this.client.end(true, opts)
    }
  }
}

export const socketClient = new SocketClient()
