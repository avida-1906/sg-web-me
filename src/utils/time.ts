import isLeapYear from 'dayjs/plugin/isLeapYear'
import weekday from 'dayjs/plugin/weekday'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getCurrentLanguageForFrontend } from '~/modules/i18n'

import 'dayjs/locale/en'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/vi'
import 'dayjs/locale/pt-br'
import 'dayjs/locale/th'
import 'dayjs/locale/hi'

dayjs.extend(isLeapYear)
dayjs.extend(weekday)
dayjs.extend(relativeTime)

const format: { [t: string]: string } = {
  'en-US': 'ddd, MMM D h:mm A',
  'zh-CN': 'MM月DD日 ddd HH:mm',
  'vi-VN': 'ddd, D MMMM h:mm',
  'pt-BR': 'dddd, D [De] MMM HH:mm',
  'th-TH': 'DD/MM ddd HH:mm',
  'hi-IN': 'dddd, D MMMM h:mm A',
}
const dateFormat: { [t: string]: string } = {
  'en-US': 'MMMM DD,YYYY',
  'zh-CN': 'YYYY年MM月DD日',
  'vi-VN': 'DD [tháng] MM,YYYY',
  'pt-BR': 'DD [de] MMMM [de] YYYY',
  'th-TH': 'DD/MM/YYYY',
  'hi-IN': 'DD/MM/YYYY',
}
const langKey: { [t: string]: string } = {
  'en-US': 'en',
  'zh-CN': 'zh-cn',
  'vi-VN': 'vi',
  'pt-BR': 'pt-br',
  'th-TH': 'th',
  'hi-IN': 'hi',
}

export function checkTs(ts: number) {
  return `${ts}`.length < 13 ? ts * 1000 : ts
}

/** 检查是否闰年 */
export function timeCheckIsLeapYear(ts: number): boolean {
  return dayjs(checkTs(ts)).isLeapYear()
}

/** 赛事开赛时间转换 */
export function timeToSportsTimeFormat(ts: number): string {
  dayjs.locale(langKey[getCurrentLanguageForFrontend()])
  if (getCurrentLanguageForFrontend() === 'vi-VN')
    return dayjs(checkTs(ts)).format(format[getCurrentLanguageForFrontend()]).replace('T', 'Th ').replace('tháng', 'Thg')

  return dayjs(checkTs(ts)).format(format[getCurrentLanguageForFrontend()])
}

/** 赛事开赛日期转换 */
export function timeToSportsDateFormat(ts: number): string {
  // 调试用
  // dayjs.locale(langKey['th-TH'])
  // return dayjs(checkTs(ts)).format(dateFormat['th-TH'])

  dayjs.locale(langKey[getCurrentLanguageForFrontend()])
  return dayjs(checkTs(ts)).format(dateFormat[getCurrentLanguageForFrontend()])
}

/** 过去时间转换 */
export function timeToFromNow(ts: number): string {
  dayjs.locale(langKey[getCurrentLanguageForFrontend()])
  return dayjs(checkTs(ts)).fromNow()
}

/** 时间转换 */
export function timeToFormat(ts: number, format = 'HH:mm YYYY/MM/DD'): string {
  return dayjs(checkTs(ts)).format(format)
}

/**
 * 根据输入的日期参数，和往前推的天数，返回一个日期数组
 * @param {number | string} date 日期参数
 * @param {number} days 往前推的天数
 * @returns {Object} 日期对象
 *
 * @example getDayList(2023-12-31, 10) => {start: 2023-12-31, end: 2023-12-22}
 */
export function getDaIntervalMap(date: number | string, days: number):
{ startTime: string; endTime: string } {
  const result = {
    startTime: '',
    endTime: '',
  }

  // 如果是string类型，转换成number类型
  if (typeof date === 'string')
    date = +new Date(date)

  const timestamp = checkTs(date)

  // 开始日期就是date，结束日期就是date减去days天
  result.endTime = `${dayjs(timestamp).format('YYYY-MM-DD')} 00:00:00`
  result.startTime
  = `${dayjs(timestamp).subtract(days, 'day').format('YYYY-MM-DD')} 23:59:59`

  return result
}
