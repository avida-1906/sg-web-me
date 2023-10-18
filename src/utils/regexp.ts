/** 用户名(3-14字符,数字和字母) */
export const usernameReg = /^[a-zA-Z0-9]{3,14}$/
/** 必须含有大写和小写字母 */
export const upperLowerReg = /^(?=.*[a-z])(?=.*[A-Z]).+$/
/** 至少一位数字 */
export const lastOneNumberReg = /.*[0-9].*/
/** 邮箱 */
export const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
/** 支付密码(6位数字) */
export const payPasswordReg = /^\d{6}$/
/** 虚拟币地址 */
export const virtualCoinAddressReg = /^[a-zA-Z0-9]{26,35}$/
/** 手机号（中国） */
export const chinaPhoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
/** 手机号（巴西） */
export const brazilPhoneReg = /^(?:(?:\+|00)55)?\d{2}9\d{8}$/
/** 手机号（越南） */
export const vietnamPhoneReg = /^(?:(?:\+|00)84)?0\d{9,10}$/
/** 手机号（印度） */
export const indiaPhoneReg = /^(?:(?:\+|00)91)?[789]\d{9}$/
/** 手机号（泰国） */
export const thailandPhoneReg = /^(?:(?:\+|00)66)?[689]\d{8}$/
