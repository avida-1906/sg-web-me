import { type MqttClient as TMqttClient } from 'precompiled-mqtt'

class SocketClient {
  URL = '127.0.0.1'
  /** 重试次数 */
  RETRY_COUNT = 3

  client: TMqttClient | null = null

  subscribeList: string[] = ['test']

  #log = (message: string, ...rest: any) => {
    console.log(`Mqtt ${message}`, ...rest)
  }

  constructor() {
    this.#log('实例化')
  }

  public connect() {
    this.#log('连接')
    import('precompiled-mqtt').then((mqtt) => {
      this.client = mqtt.connect({
        keepalive: 0,
        servers: [
          {
            host: this.URL,
            port: 1883,
            protocol: 'mqtt',
          },
        ],
      })
      this.eventHandler()
      this.subscribeHandler()
    })
  }

  public subscribeHandler() {
    if (this.client != null) {
      this.client.subscribe(this.subscribeList, (error, granted) => {
        if (error)
          this.#log('订阅失败', error)
        else
          this.#log('订阅成功', granted)
      })
    }
  }

  public eventHandler() {
    if (this.client != null) {
      this.client.on('connect', (arg) => {
        this.#log('连接成功', `Info: ${arg}`)
      })

      this.client.on('message', (topic, message, packet) => {
        this.#log(`收到消息：${message.toString()}`, topic, packet)
      })

      this.client.on('error', (error) => {
        this.#log(`发生错误：${error}`)
      })

      this.client.on('offline', () => {
        this.#log('离线')
      })

      this.client.on('disconnect', (disconnectInfo) => {
        this.#log('断开连接', disconnectInfo)
      })

      this.client.on('reconnect', () => {
        this.#log('重新连接')
      })

      this.client.on('end', () => {
        this.#log('连接结束')
      })

      this.client.on('close', () => {
        this.#log('连接关闭')
      })

      this.client.on('outgoingEmpty', () => {
        this.#log('发送队列为空')
      })

      this.client.on('packetreceive', (packetreceiveInfo) => {
        this.#log('收到数据包', packetreceiveInfo)
      })

      this.client.on('packetsend', (packetsendInfo) => {
        this.#log('发送数据包', packetsendInfo)
      })
    }
  }

  public disconnect() {
    this.#log('断开连接')
  }
}

export const socketClient = new SocketClient()
