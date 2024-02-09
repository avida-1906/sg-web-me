#BaseRadioGroup
```
<BaseRadioGroup v-model="radioValue">
  <BaseRadio v-for="item in radioList" :key="item.value" :value="item.value">
    {{ item.label }}
  </BaseRadio>
</BaseRadioGroup>
```

## Props
columns
>?: number 自选项列数

  modelValue
  >: string 绑定值

  shape
  >?: 'square' | 'circle' 选框样式，方、圆

  disabled
  >?: boolean 是否禁用（全部）

## Slot
默认 需配合<BaseRadio />组件同时使用

## Event
change
> 选中不同选项时触发


# BaseRadio
##Props
value
> string 选项值，必须
