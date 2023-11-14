import isLeapYear from 'dayjs/plugin/isLeapYear'
import weekday from 'dayjs/plugin/weekday'

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import 'dayjs/locale/vi'

// 是否润年插件
dayjs.extend(isLeapYear)
dayjs.extend(weekday)

const format = {
  'zh-cn': 'MM月DD日 ddd HH:mm',
  'en': 'ddd, MMM D h:mm A',
  'vi': 'ddd, D MMMM h:mm A',
}

export function timeCheckIsLeapYear(ts: number) {
  return dayjs(ts).isLeapYear()
}

export function timeFullTimeFormat(ts: number) {
  dayjs.locale('vi')
  return dayjs(ts).format(format.vi)
}
