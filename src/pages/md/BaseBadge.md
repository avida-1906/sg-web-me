# Badge 徽章
```
<BaseBadge :count="5" :count="99"> </BaseBadge>
<BaseBadge :dot="true"></BaseBadge>
<BaseBadge :count="25" />
<BaseBadge status="success" text="copy" />

```
## Props
count
>? :number // 展示的数字，大于 max 时显示为 max+，为 0 时隐藏

max
>? :number // 展示封顶的数字值

showZero
>? :boolean // 当数值为 0 时，是否展示 Badge

dot
>? :boolean // 不展示数字，只有一个小点

status
>? :string 'success' | 'default' | 'fail' | ''   默认为'',设置 Badge 为状态点

color
>? :string 状态点时，自定义小圆点的颜色

text
>? :CSSProperties 设置状态点的样式

title
>? :string 设置鼠标放在状态点上时显示的文字

## Slot
默认内容

## Event
无