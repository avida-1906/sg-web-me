// 用户名(3-14位，必须字母开头)
export const usernameReg = /^[a-zA-Z][a-zA-Z0-9]{2,13}$/
// 密码(6-16位，必须包含字母和数字)
export const passwordReg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/
// 邮箱
export const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
// export const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
