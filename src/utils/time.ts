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
const langKey: { [t: string]: string } = {
  'en': 'en',
  'zh-CN': 'zh-cn',
  'vi-VN': 'vi',
  'pt-BR': 'pt-br',
  'th-TH': 'th',
  'hi-IN': 'hi',
}

/** 检查是否闰年 */
export function timeCheckIsLeapYear(ts: number) {
  return dayjs(ts).isLeapYear()
}

/** 赛事时间转换 */
export function timeFullTimeFormat(ts: number) {
  const userLanguage = Local.get<number>(STORAGE_LANGUAGE_KEY)?.value ?? 0

  dayjs.locale(langKey[EnumLanguage[userLanguage]])
  if (EnumLanguage[userLanguage] === 'vi-VN')
    return dayjs(ts).format(format[EnumLanguage[userLanguage]]).replace('T', 'Th ').replace('tháng', 'Thg')

  return dayjs(ts).format(format[EnumLanguage[userLanguage]])
}

/** 过去时间转换 */
export function timeToFromNow(ts: number) {
  const userLanguage = Local.get<number>(STORAGE_LANGUAGE_KEY)?.value ?? 0

  dayjs.locale(langKey[EnumLanguage[userLanguage]])
  return dayjs(ts).fromNow()
}
