# BaseSelect
```
<BaseSelect v-model="selectValue" label="选择区号" :options="selectOptions" must />
```

## Props
modelValue
> any 绑定值

  options
  > {
    [text: string]: any
    label: string
    value: any
  }[] 选项列表，必须包含label、value字段

label
>: string label文字

layout
>?: 'horizontal' | 'vertical' 布局

must
>?: boolean 是否必填

small
>?: boolean 排行榜专用小型样式

## Slot
无

## Event
select
> 选择不同值时触发
