/** 用户名(3-14字符,数字和字母) */
export const usernameReg = /^[a-z0-9]{3,30}$/
/** 必须含有大写和小写字母 */
export const upperLowerReg = /^(?=.*[a-z])(?=.*[A-Z]).+$/
/** 至少一位数字 */
export const lastOneNumberReg = /.*[0-9].*/
/** 邮箱 */
export const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
/** 支付密码(6位数字) */
export const payPasswordReg = /^\d{6}$/
/** 虚拟币地址 */
export const virtualCoinAddressReg = /^[a-zA-Z0-9]{5,100}$/
/** 仅数字 */
export const numberReg = /^[0-9]+$/
