/** 用户名(3-14字符,数字和字母) */
export const usernameReg = /^[a-zA-Z0-9]{3,14}$/
/** 必须含有大写和小写字母 */
export const upperLowerReg = /^(?=.*[a-z])(?=.*[A-Z]).+$/
/** 至少一位数字 */
export const lastOneNumberReg = /.*[0-9].*/
// 邮箱
export const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
