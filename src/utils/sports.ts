import type {
  EnumCurrencyKey,
  IBetInfoBack,
  ISportEventInfo,
  ISportEventInfoMl,
  ISportEventInfoMlMs,
  ISportOutrightsInfo,
} from '~/apis/types'
import type { IBetInfoChangeCallback, ICartInfo, ICartInfoData } from '~/types'

/**
 * 体育ID
 *
 * 用来替换掉字符串中的体育ID
 */
export const SPORTS_PLAT_ID = 'SPORTS_PLAT_ID'

/**
 * 获取当前体育平台ID
 * @returns {string}
 */
export function getSportsPlatId() {
  return Local.get<string>(STORAGE_SPORTS_CURRENT_PROVIDER)?.value ?? ''
}

/**
 * 替换字符串中的体育ID
 * @param {string} str
 * @returns {string}
 */
export function replaceSportsPlatId(str: string) {
  return str.replace(SPORTS_PLAT_ID, getSportsPlatId())
}

/**
 * 体育赔率类
 */
export class SportsOdds {
  /**
   * 换算体育赔率
   * @param {number} odds
   * @returns {number}
   */
  static convert(odds: number, type = EnumSportsOddsType.DECIMAL) {
    switch (type) {
      case EnumSportsOddsType.DECIMAL:
        return odds
      case EnumSportsOddsType.FRACTION:
        return this.convertToFractionOdds(odds)
      case EnumSportsOddsType.AMERICAN:
        return this.convertToAmericanOdds(odds)
      case EnumSportsOddsType.INDONESIA:
        return this.convertToIndonesiaOdds(odds)
      case EnumSportsOddsType.MALAYSIA:
        return this.convertToMalaysiaOdds(odds)
      case EnumSportsOddsType.HONGKONG:
        return this.convertToHongKongOdds(odds)
    }
  }

  /**
   * 求最大公约数
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  static findGCD(a: number, b: number): number {
    if (b === 0)
      return a

    else
      return this.findGCD(b, a % b)
  }

  /**
   * 分数式
   * @param {number} odds
   * @returns {string}
   */
  static convertToFractionOdds(odds: number) {
    const numerator = ((odds - 1) * 100)
    const denominator = 100

    const gcd = this.findGCD(numerator, denominator)
    const simplifiedNumerator = numerator / gcd
    const simplifiedDenominator = denominator / gcd

    return `${simplifiedNumerator}/${simplifiedDenominator}`
  }

  /**
   * 美式
   * @param {number} odds
   * @returns {string}
   */
  static convertToAmericanOdds(odds: number) {
    // 当小数式赔率大于等于2时，计算美式正赔
    // 当小数式赔率小于2时，计算美式负赔
    const americanOdds = odds >= 2 ? ((odds - 1) * 100) : -100 / (odds - 1)
    return `${americanOdds}`
  }

  /**
   * 印尼格式(相当于美式赔率除以100)
   * @param {number} odds
   * @returns {string}
   */
  static convertToIndonesiaOdds(odds: number) {
    if (odds >= 2) {
      const americanOdds = odds - 1
      return `+${toFixed(americanOdds, 2)}`
    }
    else {
      const americanOdds = -1 / (odds - 1)
      return `${toFixed(americanOdds, 2)}`
    }
  }

  /**
   * 马来格式
   *
   * 若欧洲赔率<2：马来赔率=欧洲赔率-1
   *
   * 若欧洲赔率≥2：马来赔率= 1 /（1-欧洲赔率）
   */
  static convertToMalaysiaOdds(odds: number) {
    if (odds < 2) {
      // 计算正马来赔率
      const malayOdds = odds - 1
      return `+${toFixed(malayOdds, 2)}`
    }
    else {
      // 计算负马来赔率
      const malayOdds = 1 / (1 - odds)
      return `${toFixed(malayOdds, 2)}`
    }
  }

  /** 香港格式（欧洲赔率-1） */
  static convertToHongKongOdds(odds: number) {
    // 计算香港式赔率
    const hongKongOdds = odds - 1
    return `${toFixed(hongKongOdds, 2)}`
  }
}

/** 盘口根据联赛组合方法 */
export function sportsDataGroupByLeague(origin: ISportEventInfo[]) {
  const arr = []
  for (let i = 0; i < origin.length; i++) {
    if (i === 0) {
      arr.push({ ci: origin[i].ci, cn: origin[i].cn, list: [origin[i]] })
      continue
    }

    const index = arr.findIndex(a => a.ci === origin[i].ci)
    if (index > -1)
      arr[index].list.push(origin[i])
    else
      arr.push({ ci: origin[i].ci, cn: origin[i].cn, list: [origin[i]] })
  }
  return arr
}

/** 冠军盘口根据地区组合方法 */
export function sportsOutrightsGroupByRegion(origin: ISportOutrightsInfo[]) {
  const arr = []
  for (let i = 0; i < origin.length; i++) {
    if (i === 0) {
      arr.push({ pgid: origin[i].pgid, pgn: origin[i].pgn, list: [origin[i]] })
      continue
    }

    const index = arr.findIndex(a => a.pgid === origin[i].pgid)
    if (index > -1)
      arr[index].list.push(origin[i])
    else
      arr.push({ pgid: origin[i].pgid, pgn: origin[i].pgn, list: [origin[i]] })
  }
  return arr
}

/** 收藏数据根据球种组合方法 */
export function sportsDataGroupBySport(origin: ISportEventInfo[]) {
  const arr = []
  for (let i = 0; i < origin.length; i++) {
    if (i === 0) {
      arr.push({ si: origin[i].si, sn: origin[i].sn, list: [origin[i]] })
      continue
    }

    const index = arr.findIndex(a => a.si === origin[i].si)
    if (index > -1)
      arr[index].list.push(origin[i])
    else
      arr.push({ si: origin[i].si, sn: origin[i].sn, list: [origin[i]] })
  }
  return arr
}

/** 盘口数据组合面包屑 */
export function sportsDataBreadcrumbs(data: ISportEventInfo | ISportOutrightsInfo) {
  const sport = { label: data.sn, value: `${data.si}` }
  const area = { label: data.pgn, value: `${data.pgid}` }
  const league = { label: data.cn, value: `${data.ci}` }
  return [sport, area, league]
}

/**
   * 获取购物车需要的对象
   * @param infoList1 info 接口 list[0] 对象
   * @param mlObject infoList1.ml 对象
   * @param msObject infoList1.ml.ms 对象
   */
export function getCartObject(
  mlObject: ISportEventInfoMl,
  msObject: ISportEventInfoMlMs,
  infoList1: ISportEventInfo,
): ICartInfo {
  let sn = ''
  // 让分盘
  if (mlObject.bt === 1)
    sn = `${msObject.sn} (${msObject.hdp})`
  // 总分
  else if (mlObject.bt === 2)
    sn = `${msObject.sn} ${msObject.hdp}`
  // 获胜以及其它
  else
    sn = msObject.sn

  return {
    wid: msObject.wid,
    mlid: mlObject.mlid,
    mll: mlObject.mll,
    pid: mlObject.pid,
    bt: mlObject.bt,
    ov: msObject.ov,
    m: infoList1.m,
    ei: infoList1.ei,
    si: infoList1.si,
    hdp: msObject.hdp,
    sid: msObject.sid,
    homeTeamName: infoList1.htn,
    awayTeamName: infoList1.atn,
    btn: mlObject.btn,
    sn,
  }
}

/**
 * 体育购物车类
 */
export class SportsCart {
  /** 购物车数据 */
  dataList: ICartInfoData[] = []

  /** 货币类型 */
  currency: EnumCurrencyKey = EnumCurrency[0] as EnumCurrencyKey

  /** 购物车数量 */
  get count() {
    return this.dataList.length
  }

  /** 总投注额 */
  get totalAmount() {
    return this.dataList.reduce((a, b) => {
      return a + Number(b.amount)
    }, 0)
  }

  /** 预计总盈利 */
  get totalProfit() {
    return this.dataList.reduce((a, b) => {
      return Number(add(a, Number(mul(b.amount, Number(b.ov)))))
    }, 0)
  }

  /** 是否显示重新使用投注单
   *
   * 当购物车中数据的result不为undefined时，显示重新使用投注单
   */
  get isShowReuse() {
    if (this.dataList.length === 0)
      return false

    return this.dataList.every(a => a.result !== undefined)
  }

  /**
   * 判断当前是否存在两项有同样的赛事ID（ei）,如果有，返回相同的ei数组
   * @desc 用于串关投注时，判断是否可以投注
   */
  get getExistSameEventIdList(): string[] {
    const seen: Set<string> = new Set()
    const duplicates: Set<string> = new Set()

    for (const item of this.dataList.map(a => a.ei)) {
      if (seen.has(item))
        duplicates.add(item)

      else
        seen.add(item)
    }

    return Array.from(duplicates)
  }

  constructor(currency: EnumCurrencyKey) {
    this.currency = currency
  }

  /** 添加数据到购物车
   * @param {ICartInfo} data
   */
  async add(data: ICartInfo) {
    // 如果dataList中的object的result有一个不是undefined，就清空购物车
    // 因为不是undefined的话，说明已经投注过了
    if (this.dataList.some(a => a.result !== undefined)) {
      this.removeAll()
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 30)
      })
    }

    let suffixLength = 2
    if (application.isVirtualCurrency(this.currency))
      suffixLength = 8

    this.dataList.push({
      ...data,
      amount: Number(toFixed(0, suffixLength)),
      os: 1,
      maa: 0,
      mia: 0,
    })
  }

  /** 从购物车删除数据
   * @param {number} index
   */
  remove(wid: string) {
    const index = this.dataList.findIndex(a => a.wid === wid)
    if (index > -1)
      this.dataList.splice(index, 1)
    else
      console.error('购物车中没有该数据')
  }

  /** 从购物车删除所有数据 */
  removeAll() {
    this.dataList = []
  }

  /** 更新所有amount */
  updateAllAmount() {
    let suffixLength = 2
    if (application.isVirtualCurrency(this.currency))
      suffixLength = 8

    this.dataList.forEach((a) => {
      a.amount = Number(toFixed(0, suffixLength))
    })
  }

  /** 更新货币 */
  updateCurrency(currency: EnumCurrencyKey) {
    this.currency = currency
    this.updateAllAmount()
  }

  /**
   * 检查wid 是否在购物车中，并且result为undefined
   * @param {string} wid
   */
  checkWid(wid: string) {
    const index = this.dataList.findIndex(a => a.wid === wid)
    if (index > -1 && this.dataList[index].result === undefined)
      return true
    else
      return false
  }

  /** 更新amout
   * @param {string} wid 列表唯一值
   * @param {number} amount
   */
  updateItemAmount(wid: string, amount: number) {
    const index = this.dataList.findIndex(a => a.wid === wid)
    if (index > -1)
      this.dataList[index].amount = amount
  }

  /** 更新所有数据的赔率，状态等...
   * @param {IBetInfoBack} data
   * @param {IBetInfoChangeCallback} fn 回调函数
   */
  updateAllData(data: IBetInfoBack, fn?: IBetInfoChangeCallback) {
    const { wsi, bi } = data
    const duplexOv = bi[0].ov
    this.dataList.forEach((item) => {
      item.ov = wsi.find(a => a.wid === item.wid)?.ov ?? ''
      item.os = wsi.find(a => a.wid === item.wid)?.os ?? 0
      item.maa = bi.find(a => a.wid === item.wid)?.maa ?? 0
      item.mia = bi.find(a => a.wid === item.wid)?.mia ?? 0
    })
    const ovIsChange = this.dataList.some((item) => {
      const wsi = data.wsi.find(a => a.wid === item.wid)
      return Number(wsi?.ov) !== Number(item.ov)
    })

    if (fn)
      fn(ovIsChange, duplexOv)
  }

  /**
   * 更新列表的 Result 状态
   * @param {string} wid 唯一值
   * @param {'fulfilled' | 'rejected'} result
   */
  updateListResult(wid: string, result: 'fulfilled' | 'rejected') {
    const index = this.dataList.findIndex(a => a.wid === wid)
    if (index > -1)
      this.dataList[index].result = result
  }

  /**
   * 重新使用投注单
   */
  reuse() {
    this.dataList.forEach((item) => {
      item.result = undefined
    })

    this.updateAllAmount()
  }
}
