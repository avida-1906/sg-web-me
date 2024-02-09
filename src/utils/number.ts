/**
 * @file number.ts
 * @description: 科学技术法转换为数字字符串
 * @example console.log(scientificToString(1.2345e+20)) // 123450000000000000000
 * @example console.log(scientificToString('3e-8')) // 0.00000003
 * @return {string} 转换后的数字字符串
 */
export function scientificToString(inputNumber: number | string): string {
  if (Number.isNaN(inputNumber))
    return '0'

  inputNumber = `${inputNumber}`
  inputNumber = Number.parseFloat(inputNumber)
  const format = inputNumber.toExponential() // 转换为标准的科学计数法形式（字符串）
  const tmpArray: any = format.match(/\d(?:\.(\d*))?e([+-]\d+)/) // 分离出小数值和指数值
  const val = inputNumber.toFixed(Math.max(0, (tmpArray![1] || '').length - tmpArray[2]))
  return val
}

/**
 * @description: 加法函数，用来得到精确的加法结果
 * @param {number} arg1
 * @param {number} arg2
 * @example console.log(add(0.1, 0.2)) // 0.3
 * @example console.log(add(0.00000001, 0.00000002)) // 0.00000003
 * @return {string} arg1加上arg2的精确结果
 */
export function add(arg1: number, arg2: number): string {
  return scientificToString(Big(arg1).plus(Big(arg2)).toPrecision())
}

/**
 * @description: 减法函数，用来得到精确的减法结果
 * @param {number} arg1
 * @param {number} arg2
 * @example console.log(sub(0.3, 0.1)) // 0.2
 * @example console.log(sub(0.00000003, 0.00000002)) // 0.00000001
 * @return {string} arg1减去arg2的精确结果
 */
export function sub(arg1: number, arg2: number): string {
  return scientificToString(Big(arg1).minus(Big(arg2)).toPrecision())
}

/**
 * @description: 乘法函数，用来得到精确的乘法结果
 * @param {number} arg1
 * @param {number} arg2
 * @example console.log(mul(0.3, 0.1)) // 0.03
 * @example console.log(mul(0.00000003, 0.00000002)) // 0.0000000000000006
 * @return {string} arg1乘以arg2的精确结果
 */
export function mul(arg1: number, arg2: number): string {
  if (!arg1 || !arg2)
    return '0'

  return scientificToString(Big(arg1).times(Big(arg2)).toPrecision())
}

/**
 * @description: 除法函数，用来得到精确的除法结果
 * @param {number} arg1
 * @param {number} arg2
 * @example console.log(div(0.3, 0.1)) // 3
 * @example console.log(div(0.00000003, 0.00000002)) // 1.5
 * @return {string} arg1除以arg2的精确结果
 */
export function div(arg1: number, arg2: number): string {
  return scientificToString(Big(arg1).div(Big(arg2)).toPrecision())
}

/**
 * @description: 保留小数位数，非四舍五入
 * @param {number} num
 * @param {number} decimal
 * @example console.log(toFixed(0.123456789, 2)) // 0.12
 * @example console.log(toFixed(0.128456789, 2)) // 0.12
 * @return {string} 保留小数位数后的结果
 */
export function toFixed(_num: number, _decimal?: number): string {
  const num = scientificToString(_num)
  const decimal = _decimal || 2
  const [integer, decimalPart] = `${num}`.split('.')

  if (decimal) {
    if (decimalPart) {
      if (decimalPart.length > decimal)
        return `${integer}.${decimalPart.slice(0, decimal)}`

      else
        return `${integer}.${decimalPart}${'0'.repeat(decimal - decimalPart.length)}`
    }
    else {
      return `${integer}.${'0'.repeat(decimal)}`
    }
  }
  else {
    return integer
  }
}

/**
 * @description: 数字显示千分位
 * @param {string ｜ number} num
 * @return {string} 数字千分位
 */
export function formatWithSubstring(num: string | number) {
  // 数字转为字符串，并按照 .分割
  const arr = (`${num}`).split('.')
  const int = `${arr[0]}`
  const fraction = arr[1] || ''
  // 多余的位数
  const f = int.length % 3
  // 获取多余的位数，f可能是0， 即r可能是空字符串
  let r = int.substring(0, f)
  // 每三位添加','金额对应的字符
  for (let i = 0; i < Math.floor(int.length / 3); i++)
    r += `,${int.substring(f + i * 3, f + (i + 1) * 3)}`

  // 多余的位数，上面
  if (f === 0)
    r = r.substring(1)

  // 调整部分和小数部分拼接
  return r + (fraction ? `.${fraction}` : '')
}
