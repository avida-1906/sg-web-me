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

  average
  >?: boolean 平均分配tab大小

  shape
  >?: 'square' | 'round' 圆角、方角

## Slot
tab
> tab内容 数据取item字段

## Event
change
>点击不同tab时触发
