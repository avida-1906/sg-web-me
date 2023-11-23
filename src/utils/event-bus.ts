/**
 * @file 事件总线
 * @module utils/event-bus
 */

/** 聊天室消息 通知 */
export const CHAT_MESSAGE_BUS = 'CHAT_MESSAGE_BUS'
/** MQTT 连接成功 通知 */
export const MQTT_CONNECT_SUCCESS_BUS = 'MQTT_CONNECT_SUCCESS_BUS'
/** MQTT 断开连接 通知 */
export const MQTT_DISCONNECT_BUS = 'MQTT_DISCONNECT_BUS'
/** 刷新余额通知 */
export const REFRESH_BALANCE_BUS = 'REFRESH_BALANCE_BUS'
/** 反馈对话消息通知 */
export const FEEDBACK_CHAT_MESSAGE_BUS = 'FEEDBACK_CHAT_MESSAGE_BUS'
/** 刷新用户信息通知 */
export const REFRESH_MEMBER_BUS = 'REFRESH_MEMBER_BUS'
/** 第三方登录状态通知 */
export const REFRESH_AUTH_BUS = 'REFRESH_AUTH_BUS'
