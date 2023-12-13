import isLeapYear from 'dayjs/plugin/isLeapYear'
import weekday from 'dayjs/plugin/weekday'
import relativeTime from 'dayjs/plugin/relativeTime'

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
  'en': 'ddd, MMM D h:mm A',
  'zh-CN': 'MM月DD日 ddd HH:mm',
  'vi-VN': 'ddd, D MMMM h:mm',
  'pt-BR': 'dddd, D [De] MMM HH:mm',
  'th-TH': 'DD/MM ddd HH:mm',
  'hi-IN': 'dddd, D MMMM h:mm A',
}
const dateFormat: { [t: string]: string } = {
  'en': 'MMMM DD,YYYY',
  'zh-CN': 'YYYY年MM月DD日',
  'vi-VN': 'DD [tháng] MM,YYYY',
  'pt-BR': 'DD [de] MMMM [de] YYYY',
  'th-TH': 'DD/MM/YYYY',
  'hi-IN': 'DD/MM/YYYY',
}
const langKey: { [t: string]: string } = {
  'en': 'en',
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
  const userLanguage = Local.get<number>(STORAGE_LANGUAGE_KEY)?.value ?? 0

  dayjs.locale(langKey[EnumLanguage[userLanguage]])
  if (EnumLanguage[userLanguage] === 'vi-VN')
    return dayjs(checkTs(ts)).format(format[EnumLanguage[userLanguage]]).replace('T', 'Th ').replace('tháng', 'Thg')

  return dayjs(checkTs(ts)).format(format[EnumLanguage[userLanguage]])
}

/** 赛事开赛日期转换 */
export function timeToSportsDateFormat(ts: number): string {
  const userLanguage = Local.get<number>(STORAGE_LANGUAGE_KEY)?.value ?? 0
  // 调试用
  // dayjs.locale(langKey['th-TH'])
  // return dayjs(checkTs(ts)).format(dateFormat['th-TH'])

  dayjs.locale(langKey[EnumLanguage[userLanguage]])
  return dayjs(checkTs(ts)).format(dateFormat[EnumLanguage[userLanguage]])
}

/** 过去时间转换 */
export function timeToFromNow(ts: number): string {
  const userLanguage = Local.get<number>(STORAGE_LANGUAGE_KEY)?.value ?? 0

  dayjs.locale(langKey[EnumLanguage[userLanguage]])
  return dayjs(checkTs(ts)).fromNow()
}

/** 时间转换 */
export function timeToFormat(ts: number, format = 'HH:mm YYYY/MM/DD'): string {
  return dayjs(checkTs(ts)).format(format)
}
