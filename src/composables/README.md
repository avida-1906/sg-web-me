## useApi 开头的hook

像一些接口会在很多地方使用的，可以抽离出来，放在这里   

```js
/**
 * 发送验证码
 * 1，手机，2，邮箱
 */
const { run, sid, ts } = useApiSendMsg(1)
```