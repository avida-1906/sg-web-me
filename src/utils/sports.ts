export class Sports {

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
