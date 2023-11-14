import isLeapYear from 'dayjs/plugin/isLeapYear'
import weekday from 'dayjs/plugin/weekday'

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import 'dayjs/locale/vi'

dayjs.extend(isLeapYear)
dayjs.extend(weekday)

const format = {
  'zh-cn': 'MM月DD日 ddd HH:mm',
  'en': 'ddd, MMM D h:mm A',
  'vi': 'ddd, D MMMM h:mm',
}

/** 检查是否闰年 */
export function timeCheckIsLeapYear(ts: number) {
  return dayjs(ts).isLeapYear()
}

/** 赛事时间转换 */
export function timeFullTimeFormat(ts: number) {
  dayjs.locale('vi')
  return dayjs(ts).format(format.vi).replace('T', 'Th ').replace('tháng', 'Thg')
}
