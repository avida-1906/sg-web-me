import type { SocketClient } from './mqtt'
import type {
  EnumCurrencyKey,
  IBetInfoBack,
  IBetInfoDl,
  IBetInfoStatus,
  ISportEventInfo,
  ISportEventInfoMl,
  ISportEventInfoMlMs,
  ISportEventList,
  ISportOutrightsInfo,
} from '~/apis/types'
import type {
  IBetInfoChangeCallback,
  ICartInfo,
  ICartInfoData,
  IOutrightDataGroupedByLeague,
  ISportDataGroupedByLeague,
  ISportListToCartData,
} from '~/types'
import { getCurrentLanguageForBackend } from '~/modules/i18n'
import { EnumsBetSlipBetSlipTabStatus } from '~/utils/enums'

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
        return toFixed(odds, 2)
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
    const numerator = +mul(+sub(odds, 1), 100)
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
    const americanOdds = odds >= 2 ? (mul((+sub(odds, 1)), 100)) : div(100, (+sub(1, odds)))
    const _a = (+americanOdds).toFixed()
    return `${_a}`
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

/**
 * 盘口根据联赛组合方法
 * @param origin 赛事详情数据
 */
export function sportsDataGroupByLeague(origin: ISportEventInfo[]) {
  const arr: ISportDataGroupedByLeague = []
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

/**
 * 盘口根据时间组合方法
 * @param origin 赛事详情数据
 */
export function sportsDataGroupByDate(origin: ISportEventInfo[]) {
  const _origin = origin.map((a) => {
    const date = timeToDateFormat(a.ed)
    return { ...a, date }
  })

  const arr: { date: string; list: ISportEventInfo[] }[] = []
  for (let i = 0; i < _origin.length; i++) {
    if (i === 0) {
      arr.push({ date: _origin[i].date, list: [_origin[i]] })
      continue
    }
    const index = arr.findIndex(a => a.date === _origin[i].date)
    if (index > -1)
      arr[index].list.push(_origin[i])
    else
      arr.push({ date: _origin[i].date, list: [_origin[i]] })
  }
  return arr
}

/**
 * 加载更多的时候盘口根据联赛组合方法
 * @param origin 原已经根据联赛组合的数据
 * @param newData 新赛事数据
 */
export function sportsDataGroupByLeagueLoadMore(
  origin: ISportDataGroupedByLeague,
  newData: ISportEventInfo[],
) {
  const arr: ISportDataGroupedByLeague = cloneDeep(origin)
  for (let i = 0; i < newData.length; i++) {
    const index = arr.findIndex(a => a.ci === newData[i].ci)
    if (index > -1)
      arr[index].list.push(newData[i])
    else
      arr.push({ ci: newData[i].ci, cn: newData[i].cn, list: [newData[i]] })
  }

  // 去重
  return arr.map((a) => {
    return {
      ci: a.ci,
      cn: a.cn,
      list: uniqBy(a.list, 'ei'),
    }
  })
}

/**
 * 盘口根据联赛组合监听mqtt通知更新
 * @param origin
 * @param newData
 */
export function sportsDataGroupedByLeagueUpdateByMqtt(
  origin: ISportDataGroupedByLeague,
  newData: ISportEventList[],
) {
  const arr: ISportDataGroupedByLeague = cloneDeep(origin)
  for (let i = 0; i < newData.length; i++) {
    for (let ii = 0; ii < arr.length; ii++) {
      const index = arr[ii].list.findIndex(a => a.ei === newData[i].ei)
      if (index > -1) {
        if (Array.isArray(newData[i].v))
          arr[ii].list.splice(index, 1, newData[i].v[0])
        else
          arr[ii].list.splice(index, 1)
      }
    }
  }
  return arr
}

/**
 * 赛事数据监听mqtt通知更新
 * @param origin
 * @param newData
 */
export function sportsEventInfoListUpdateByMqtt(
  origin: ISportEventInfo[],
  newData: ISportEventList[],
) {
  const arr: ISportEventInfo[] = cloneDeep(origin)
  for (let i = 0; i < newData.length; i++) {
    const index = arr.findIndex(a => a.ei === newData[i].ei)
    if (index > -1) {
      if (Array.isArray(newData[i].v))
        arr.splice(index, 1, newData[i].v[0])
      else
        arr.splice(index, 1)
    }
  }
  return arr
}

/**
 * 冠军盘口根据联赛组合方法
 * @param origin 赛事详情数据
 */
export function outrightDataGroupByLeague(origin: ISportOutrightsInfo[]) {
  const arr: IOutrightDataGroupedByLeague = []
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

/**
 * 加载更多的时候盘口根据联赛组合方法
 * @param origin 原已经根据联赛组合的数据
 * @param newData 新赛事数据
 */
export function outrightDataGroupByLeagueLoadMore(
  origin: IOutrightDataGroupedByLeague,
  newData: ISportOutrightsInfo[],
) {
  const arr: IOutrightDataGroupedByLeague = cloneDeep(origin)
  for (let i = 0; i < newData.length; i++) {
    const index = arr.findIndex(a => a.ci === newData[i].ci)
    if (index > -1)
      arr[index].list.push(newData[i])
    else
      arr.push({ ci: newData[i].ci, cn: newData[i].cn, list: [newData[i]] })
  }

  // 去重
  return arr.map((a) => {
    return {
      ci: a.ci,
      cn: a.cn,
      list: uniqBy(a.list, 'ei'),
    }
  })
}

/**
 * 冠军盘口根据地区组合方法
 * @param origin 冠军盘口数据
 */
export function sportsOutrightsGroupByRegion(origin: ISportOutrightsInfo[]):
{
  pgid: string
  pgn: string
  list: {
    ci: string
    cn: string
    list: ISportOutrightsInfo[]
  }[]
}[] {
  // 组合地区
  const arr1 = []
  for (let i = 0; i < origin.length; i++) {
    if (i === 0) {
      arr1.push({ pgid: origin[i].pgid, pgn: origin[i].pgn, list: [origin[i]] })
      continue
    }

    const index = arr1.findIndex(a => a.pgid === origin[i].pgid)
    if (index > -1)
      arr1[index].list.push(origin[i])
    else
      arr1.push({ pgid: origin[i].pgid, pgn: origin[i].pgn, list: [origin[i]] })
  }

  // 组合联赛
  const arr2: {
    pgid: string
    pgn: string
    list: {
      ci: string
      cn: string
      list: ISportOutrightsInfo[]
    }[]
  }[] = []
  for (let i = 0; i < arr1.length; i++) {
    const list = cloneDeep(arr1[i].list)
    const leagueArr = []
    for (let ii = 0; ii < list.length; ii++) {
      if (ii === 0) {
        leagueArr.push({ ci: list[ii].ci, cn: list[ii].cn, list: [list[ii]] })
        continue
      }
      const index = leagueArr.findIndex(a => a.ci === list[ii].ci)
      if (index > -1)
        leagueArr[index].list.push(list[ii])
      else
        leagueArr.push({ ci: list[ii].ci, cn: list[ii].cn, list: [list[ii]] })
    }
    arr2.push({ pgid: arr1[i].pgid, pgn: arr1[i].pgn, list: leagueArr })
  }
  return arr2
}

/**
 * 收藏数据根据球种组合方法
 * @param origin 赛事详情
 */
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

/**
 * 盘口数据组合面包屑
 * @param data 赛事详情 ｜ 冠军盘口数据
 */
export function sportsDataBreadcrumbs(data: ISportEventInfo | ISportOutrightsInfo) {
  const sport = {
    label: data.sn,
    value: `${data.si}`,
    path: `/sports/${SPORTS_PLAT_ID}/${data.si}`,
  }
  const area = {
    label: data.pgn,
    value: `${data.pgid}`,
    // eslint-disable-next-line max-len
    path: `/sports/${SPORTS_PLAT_ID}/${data.si}/${data.pgid}?${application.objectToUrlParams({ sn: data.sn, pgn: data.pgn })}`,
  }
  const league = {
    label: data.cn,
    value: `${data.ci}`,
    // eslint-disable-next-line max-len
    path: `/sports/${SPORTS_PLAT_ID}/${data.si}/${data.pgid}/${data.ci}?${application.objectToUrlParams({ sn: data.sn, pgn: data.pgn, cn: data.cn })}`,
  }
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
    mlid: mlObject.mlid,
    mll: mlObject.mll,
    pid: mlObject.pid,
    bt: mlObject.bt,
    btn: mlObject.btn,
    wid: msObject.wid,
    ov: msObject.ov,
    hdp: msObject.hdp,
    sid: msObject.sid,
    sn,
    ic: infoList1.ic,
    pgid: infoList1.pgid,
    ci: infoList1.ci,
    ap: infoList1.ap,
    hp: infoList1.hp,
    ed: infoList1.ed,
    m: infoList1.m,
    ei: infoList1.ei,
    si: infoList1.si,
    homeTeamName: infoList1.htn,
    awayTeamName: infoList1.atn,
    rei: mlObject.rei ?? '',
    sp: msObject.sp ?? '',
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

  /** 是否有赔率变化 */
  ovIsChange = false

  /** 是否有更低的赔率 */
  ovIsLower = false

  /** 复式下的金额最小值 */
  multiMia = 0

  /** 复式下的金额最大值 */
  multiMaa = 0

  /** 是否支持当前货币 */
  isSupportCurrency = true

  /** 输入金额是否只支持两位小数 */
  isOnlyTwoDecimal = true

  /** 输入金额是否要10的倍数 */
  isTenMultiple = true

  /** 输入金额是否支持小数点后五位 */
  isFiveDecimal = false

  /**
   * 默认选中的选项
   * @type {EnumsBetSlipBetSlipTabStatus}
  */
  defaultBetSlipBetSlipTabStatus = EnumsBetSlipBetSlipTabStatus.single

  /** 金额是否存在超过两位小数的情况 */
  get isExistMoreThanTwoDecimal() {
    return this.dataList.some((item) => {
      const amount = String(item.amount)
      const amountArr = amount.split('.')
      if (amountArr.length > 1 && amountArr[1].length > 2)
        return true
      else
        return false
    })
  }

  /** 金额是否存在不是10的倍数 */
  get isTenMultipleBool() {
    return this.dataList.every((item) => {
      const amount = String(item.amount)

      // if (amount === '0' || amount === '')
      //   return false

      const amountArr = amount.split('.')
      // 判断小数点后面是不是0或者undefined
      if (amountArr[1] === void 0 || Number(amountArr[1]) === 0) {
        if (Number(amountArr[0]) % 10 === 0)
          return false
        else
          return true
      }
      else {
        return true
      }
    })
  }

  /** 金额是否存在小数点后五位的情况 */
  get isExistFiveDecimal() {
    return this.dataList.some((item) => {
      const amount = String(item.amount)
      const amountArr = amount.split('.')
      if (amountArr.length > 1 && amountArr[1] && `${amountArr[1]}`.length > 5)
        return true
      else
        return false
    })
  }

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

  /** 预计总支付额 */
  get totalPay() {
    return this.dataList.reduce((a, b) => {
      return Number(add(a, Number(b.amount)))
    }, 0)
  }

  /** 是否显示重新使用投注单
   *
   * 当购物车中数据的result不为undefined时，显示重新使用投注单
   */
  get isShowReuse() {
    if (this.dataList.length === 0)
      return false

    return this.dataList.every(a => a.result !== void 0)
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

  /**
   * 获取是否有关盘的盘口
   * @desc os 0:关盘 1:开盘 2:不支援串关, ov === 0 也是关盘
   * @returns {boolean}
   */
  get isExistCloseCaps() {
    return this.dataList.some(a => a.os === 0 || (+a.ov) === 0)
  }

  /**
   * 获取不支持串关的 wid 列表
   */
  get getNotSupportWidList() {
    return this.dataList.filter(a => a.os === 2).map(a => a.wid)
  }

  /**
   * os === 3 就代表赔率小于1.1了
   * 赔率小于1.10的投注项不能组合为复式投注
   */
  get getOddsLessThanOnePointOneWidList() {
    return this.dataList.filter(a => a.os === 3).map(a => a.wid)
  }

  /**
   * 获取 是否存在 ic != 1 的盘口
   * @return ic 列表
   */
  get getExistIcList() {
    return this.dataList.filter(a => a.ic !== 1).map(a => a.ic)
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
    if (this.dataList.some(a => a.result !== void 0)) {
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
      amount: '' as any,
      // 下面的值是初始化用的，会在 updateAllData 方法中更新
      os: 1,
      maa: 0,
      mia: 0,
      pt: 0,
      hp: data.hp,
      ap: data.ap,
      new_wid: data.wid,
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

  /**
   * 更新所有amount
   * @param {number} amount
   */
  updateAllAmount(amount?: number) {
    let suffixLength = 2
    if (application.isVirtualCurrency(this.currency))
      suffixLength = 8

    this.dataList.forEach((a) => {
      if (amount)
        a.amount = toFixed(amount, suffixLength) as any
      else
        a.amount = '' as any
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
    if (index > -1 && this.dataList[index].result === void 0)
      return true
    else
      return false
  }

  /**
   * 通过wid，更新ov，os
   */
  updateOvOs(_data: ISportListToCartData) {
    if (this.isShowReuse)
      return

    const { wid, ov, os } = _data
    const index = this.dataList.findIndex(a => a.wid === wid)

    if (index !== -1) {
      if (ov && this.ovIsChange === false)
        this.ovIsChange = Number(ov) !== Number(this.dataList[index].ov)

      if (ov && this.ovIsLower === false)
        this.ovIsLower = Number(ov) < Number(this.dataList[index].ov)
    }

    if (index > -1) {
      this.dataList[index].ov = ov
      this.dataList[index].os = os
    }
  }

  /**
   * 将betinfo的 dl 和 wsi 数据转换成购物车需要的数据
   */
  dlStatesToRenderData(dl: IBetInfoDl, status: IBetInfoStatus) {
    this.isSupportCurrency = status !== 3

    // dl 不需要处理为3的情况，因为不支持的币种，使用status来判断
    this.isOnlyTwoDecimal = dl === 4
    this.isTenMultiple = dl === 5
    this.isFiveDecimal = dl === 6
  }

  /** 更新所有数据的赔率，状态等...，通过betinfo接口返回的数据
   * @param {IBetInfoBack} data
   * @param {IBetInfoChangeCallback} fn 回调函数
   */
  updateAllData(data: IBetInfoBack, fn?: IBetInfoChangeCallback) {
    if (this.isShowReuse)
      return

    const { wsi, bi, dl, status } = data

    this.dlStatesToRenderData(dl, status)

    if (!bi)
      console.log('bi 不存在')

    let pt = 0

    if (bi) {
      // 复式下的最小赔率
      this.multiMia = bi[0] ? bi[0].mia : 0
      // 复式下的最大赔率
      this.multiMaa = bi[0] ? bi[0].maa : 0
      // 复式下的串关类型
      pt = bi[0] ? bi[0].pt : 0
    }

    /** os和ov有变化的数据 */
    const osOvIsChangeWidList = this.dataList.filter((item) => {
      if (wsi) {
        const _wsi = wsi.find(a => a.wid === item.wid)
        return Number(_wsi?.ov) !== Number(item.ov) || _wsi?.os !== item.os
      }
      return true
    }).map<string>((item) => {
      return item.wid
    })

    if (wsi && this.ovIsChange === false) {
      this.ovIsChange = this.dataList.some((item) => {
        const _wsi = wsi.find(a => a.wid === item.wid)
        return Number(_wsi?.ov) !== Number(item.ov)
      })
    }

    if (wsi && this.ovIsLower === false) {
      this.ovIsLower = this.dataList.some((item) => {
        const _wsi = wsi.find(a => a.wid === item.wid)
        return Number(_wsi?.ov) < Number(item.ov)
      })
    }

    this.dataList.forEach((item) => {
      if (wsi) {
        const _wsiObject = wsi.find(a => a.wid === item.wid)

        item.ov = _wsiObject?.ov ?? ''
        item.os = _wsiObject?.os ?? 0
        item.m = _wsiObject?.m ?? 0
        item.hp = _wsiObject?.hp ?? 0
        item.ap = _wsiObject?.ap ?? 0
        item.new_wid = _wsiObject?.new_wid ?? '0'

        if (item.new_wid !== item.wid)
          item.wid = item.new_wid
      }

      if (bi) {
        const _biObject = bi.find(a => a.wid === item.wid)
        item.maa = _biObject?.maa ?? 0
        item.mia = _biObject?.mia ?? 0
        item.cei = _biObject?.cei ?? ''
        // 复式下的串关类型，单式不需要管这个值
        item.pt = _biObject?.pt ?? pt
      }
    })

    /**
     * os和ov有变化的数据
     * @desc 用于通知列表更新
     */
    const osOvIsChangeList = this.dataList.filter((item) => {
      return osOvIsChangeWidList.includes(item.wid)
    }).map<ISportListToCartData>((item) => {
      return {
        wid: item.wid,
        mlid: item.mlid,
        ov: item.ov,
        os: item.os,
      }
    })

    if (fn)
      fn({ osOvIsChangeList })
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

  /**
   * 设置ovIsChange 和 ovIsLower 值
   * @param {boolean} bool
   * @returns {void}
   */
  setOvIsChangeBool(bool: boolean) {
    this.ovIsChange = bool
    this.ovIsLower = bool
  }

  /**
   * 根据wid 列表 获取购物车数据中的amount总和
   * @param {string[]} widList
   */
  getAmountByWidList(widList: string[]) {
    return this.dataList.filter(a => widList.includes(a.wid)).reduce((a, b) => {
      return Number(add(a, Number(b.amount)))
    }, 0)
  }

  /**
   * 设置 defaultBetSlipBetSlipTabStatus
   * @param {EnumsBetSlipBetSlipTabStatus} status
   */
  setDefaultBetSlipBetSlipTabStatus(status: EnumsBetSlipBetSlipTabStatus) {
    this.defaultBetSlipBetSlipTabStatus = status
  }
}

/**
 * 体育通知
 * @desc 用于通知体育页面的数据更新，使用两种方式，一种通过websocket，一种通过setInterval
 */
export class SportsNotify {
  mqtt: SocketClient

  timer: any = null

  /** 是否订阅了体育数据变化 */
  isSubscribed = false

  constructor(_mqtt: SocketClient) {
    this.mqtt = _mqtt
  }

  /**
   * 订阅体育数据变化
   *
   * dev/sport/delta/{lang}
   */
  subscribe() {
    console.error('订阅体育数据变化')
    const lang = getCurrentLanguageForBackend()
    this.mqtt.addSubscribe(`sport/delta/${lang}`, () => {
      this.isSubscribed = true
    })
  }

  /**
   * 取消订阅体育数据变化
   *
   * dev/sport/delta/{lang}
   */
  unsubscribe() {
    console.error('取消订阅体育数据变化')
    const lang = getCurrentLanguageForBackend()
    this.mqtt.removeSubscribe(`sport/delta/${lang}`, () => {
      this.isSubscribed = false
    })
  }

  countdownHandler() {}

  /**
   * 开始倒计时
   */
  startCountdown() {
    this.stopCountdown()
    this.timer = setInterval(() => {
      sportsListCountdownBus.emit(SPORTS_LIST_COUNTDOWN_BUS)
    }, 500)
  }

  /**
   * 停止倒计时
   */
  stopCountdown() {
    clearInterval(this.timer)
  }
}

/**
 * 设置赛事进行时间
 */
export function getSportsLiveTime(eventTime: Ref<string>, data: {
  rbtt: string
  ts: number
  si: number
  rbts: number
}, _dayjs: any) {
  if (!data.rbtt) {
    eventTime.value = ''
  }
  else {
    const rbttArr = data.rbtt.split(':')
    const ts = data.ts
    const baseMin = rbttArr[0]
    const baseSec = rbttArr[1]

    const diff = _dayjs().diff(ts * 1000, 'second')
    const diffMin = Math.floor(diff / 60)
    const diffSec = diff - (diffMin * 60)
    let sec = 0
    let min = 0

    // 篮球倒计时
    if (data.si === 2) {
      // 暂停倒计时
      if (data.rbts !== 2)
        return

      sec = baseSec ? (+baseSec - diffSec) : 0
      min = +baseMin - diffMin

      if (sec < 0) {
        sec = sec + 60
        min = min - 1
      }
      if (min < 0) {
        min = 0
        sec = 0
      }
    }
    // 其它
    else {
      sec = baseSec ? (+baseSec + diffSec) : 0
      min = +baseMin + diffMin

      if (sec > 59) {
        sec = sec - 60
        min = min + 1
      }
    }
    // eslint-disable-next-line max-len
    eventTime.value = `${min < 10 ? `0${min}` : min}${baseSec ? `:${sec < 10 ? `0${sec}` : sec}` : ''}`
  }
}
