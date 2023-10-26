import { type MqttClient as TMqttClient } from 'precompiled-mqtt'

/**
 * ws://34.92.35.218:8088
 * user = "rmqtt", password = "www.123.com",
 */

type TMqttServer = Array<{
  host: string
  port: number
  protocol?: 'wss' | 'ws' | 'mqtt' | 'mqtts' | 'tcp' | 'ssl' | 'wx' | 'wxs'
}>

const chatMessageBus = useEventBus(CHAT_MESSAGE_BUS)

class SocketClient {
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
    list.forEach((item) => {
      const [protocol, host, port] = item.split('|')
      result.push({
        host,
        port: Number(port),
        protocol: protocol as any,
      })
    })
    this.#MQTT_SERVER = result
    console.log('this.#MQTT_SERVER', this.#MQTT_SERVER)
  }

  /** 断开重新连接 */
  public endOrConnect() {
    if (this.client != null) {
      this.#log('已经连接, 断开连接中...')
      const opts: any = null
      this.client.end(true, opts, () => {
        this.connect()
      })
    }
  }

  public async connect() {
    if (this.#MQTT_SERVER) {
      const { userInfo, isLogin } = storeToRefs(useAppStore())

      if (this.lastLoginStatus === null)
        this.lastLoginStatus = isLogin.value

      if (this.lastLoginStatus === isLogin.value) {
        if (this.client != null) {
          this.#log('已经连接')
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
      const clientId = isLogin.value ? userInfo.value?.uid : `web-random-${r}`
      this.#log('clientId', clientId)

      import('precompiled-mqtt').then((mqtt) => {
        // const { VITE_SOCKET_USERNAME, VITE_SOCKET_PASSWORD } = getEnv()
        this.client = mqtt.connect({
          // username: VITE_SOCKET_USERNAME,
          // password: VITE_SOCKET_PASSWORD,
          keepalive: 60,
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

  public addSubscribe(subscribeEvent: string) {
    if (this.client != null && subscribeEvent) {
      this.client.subscribe(subscribeEvent, (error, granted) => {
        if (error) {
          this.#log('订阅失败', error)
        }
        else {
          this.#log('订阅成功', granted)
          this.subscribeList.push(subscribeEvent)
        }
      })
    }
  }

  public removeSubscribe(subscribeEvent: string) {
    if (this.client != null && subscribeEvent) {
      this.client.unsubscribe(subscribeEvent, (error: any) => {
        if (error) {
          this.#log('取消订阅失败', error)
        }
        else {
          this.#log('取消订阅成功')
          const index = this.subscribeList.indexOf(subscribeEvent)
          if (index > -1)
            this.subscribeList.splice(index, 1)
        }
      })
    }
  }

  public eventHandler() {
    if (this.client != null) {
      this.client.on('connect', (arg) => {
        this.#log('连接成功', 'Info: ', arg)
        useEventBus(MQTT_CONNECT_SUCCESS_BUS).emit(MQTT_CONNECT_SUCCESS_BUS)
      })

      this.client.on('message', (topic, message, packet) => {
        this.#log(`收到消息：${message.toString()}`, topic, packet)
        try {
          const data = JSON.parse(message.toString())
          if (data)
            chatMessageBus.emit(data)
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
