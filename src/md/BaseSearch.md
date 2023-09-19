#BaseSearch
```
<BaseSearch v-model="searchValue" clearable />
```

## Props
placeHolder
>?: string 占位文字

  shape
  >?: 'square' | 'round' 输入框圆角、方角

  modelValue
  >: string 绑定值

  clearable
  >?: boolean 是否显示清空按钮

  whiteStyle
  >?: boolean 白色UI风格

## Slot
left
> 搜索栏左侧

## Event
input
>输入时触发

search
>按下回车键时触发

focus
>获取焦点

blur
>失去焦点

clear
>清空
