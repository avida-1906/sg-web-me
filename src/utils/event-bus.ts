/**
 * @file 事件总线
 * @module utils/event-bus
 */

import type { ISportListToCartData } from '~/types'

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
/** 体育数据变化通知 */
export const SPORTS_DATA_CHANGE_BUS = 'SPORTS_DATA_CHANGE_BUS'
/** 体育列表向购物车通知 */
export const SPORTS_LIST_TO_CART_BUS = 'LIST_TO_CART_BUS'
/** 体育购物车向列表通知 */
export const SPORTS_CART_TO_LIST_BUS = 'CART_TO_LIST_BUS'
/** 体育列表倒计时，用来刷新页面上的时间 */
export const SPORTS_LIST_COUNTDOWN_BUS = 'SPORTS_LIST_COUNTDOWN_BUS'
/** 路由回到体育首页时通知tab返回到大厅 */
export const SPORTS_LOBBY_RESET = 'SPORTS_LOBBY_RESET'
/** 路由回到娱乐城首页时通知tab返回到大厅 */
export const CASINO_LOBBY_RESET = 'CASINO_LOBBY_RESET'
/** 右侧体育投注单向投注页面通知 */
export const SPORTS_BETTING_TO_BETSLIP_BUS = 'SPORTS_BETTING_TO_BETSLIP_BUS'
/** 体育列表，详情等 向 购物车发送通知 */
export const SPORTS_TO_CART_BUS = 'SPORTS_TO_CART_BUS'
/** 体育购物车向列表，详情等发送通知 */
export const CART_TO_SPORTS_BUS = 'CART_TO_SPORTS_BUS'

/** 体育列表向购物车通知 */
export const sportsListToCartBus = useEventBus<
    ISportListToCartData
>(SPORTS_LIST_TO_CART_BUS)

/** 体育购物车向列表通知 */
export const sportsCartToListBus = useEventBus<
ISportListToCartData
>(SPORTS_CART_TO_LIST_BUS)

/** 体育列表倒计时，用来刷新页面上的时间 */
export const sportsListCountdownBus = useEventBus<string>(SPORTS_LIST_COUNTDOWN_BUS)

/** 体育首页tab返回到大厅 */
export const sportsLobbyBus = useEventBus<boolean>(SPORTS_LOBBY_RESET)

/** 娱乐城首页tab返回到大厅 */
export const casinoLobbyBus = useEventBus<boolean>(CASINO_LOBBY_RESET)

/** 右侧体育投注单向投注页面通知 */
export const sportsBettingToBetslipBus = useEventBus<number | undefined>(
  SPORTS_BETTING_TO_BETSLIP_BUS,
)

/** 体育列表，详情等 向 购物车发送通知 */
export const sportsToCartBus = useEventBus<ISportListToCartData>(
  SPORTS_TO_CART_BUS,
)

/** 体育购物车向列表，详情等发送通知 */
export const cartToSportsBus = useEventBus<ISportListToCartData>(
  CART_TO_SPORTS_BUS,
)
