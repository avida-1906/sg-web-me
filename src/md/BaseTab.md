#BaseTab
```
<BaseTab v-model="tab" :list="tabList" />
```

## Props
list
>{
    [text: string]: any
    value: string | number
    label: string
  }[] tab列表，必须包含value,label字段

modelValue
> string | number 绑定值

shape
>?: 'square' | 'round' 圆角、方角

full
>?: boolean 默认tab宽度根据内容撑开，如果需要宽度占100%，设定full属性

## Slot
tab
> tab内容 数据取item字段

## Event
change
>点击不同tab时触发
