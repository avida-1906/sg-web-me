# 输入框
```
<BaseInput v-model="username" label="用户名" :msg="usernameErrorMsg" placeholder="请输入用户名" must />
```
## Props
  modelValue
  > ?: string绑定值

  label
  >: stringlabel文字

  layout
  >?: 'horizontal' | 'vertical'布局

  type
  > ?: 'text' | 'password' | 'number'  输入类型

  placeholder
  >?: string占位文字

  msg
  >?: string校验错误时显示的错误文字

  must
  >?: boolean是否必填，控制label中的*星号

## Slot
无

## Event
input
>输入

focus
>获取焦点

blur
>失去焦点
