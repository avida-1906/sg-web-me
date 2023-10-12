<script lang="ts" setup>
type SportType =
  | 'tennis' // 网球
  | 'soccer' // 足球
  | 'american-football' // 美式橄榄球
  | 'basketball' // 篮球
  | 'ice-hockey' // 冰上曲棍球
  | 'baseball' // 棒球
  | 'cricket' // 板球
  | 'league-of-legends' // 英雄联盟
  | 'counter-strike' // CS:GO/CS2
  | 'mma' // 综合格斗
  | 'rugby' // 英式橄榄球
  | 'arena-of-valor' // 传说对决
  | 'aussie-rules' // 澳洲足球
  | 'badminton' // 羽毛球
  | 'boxing' // 拳击
  | 'darts' // 飞镖
  | 'dota-2' // 刀塔2
  | 'fifa' // FIFA
  | 'floorball' // 地板球
  | 'futsal' // 五人制足球
  | 'halo' // 光环
  | 'handball' // 手球
  | 'kings-of-glory' // 王者荣耀
  | 'mobile-legends' // 无尽对决
  | 'nba2k' // NBA2K
  | 'rainbow-six' // 彩虹六号
  | 'snooker' // 桌球
  | 'starcraft-2' // 星际争霸2
  | 'starcraft-1' // 星际争霸 I
  | 'valorant' // 无畏契约
  | 'volleyball' // 排球

interface Props {
  type?: SportType
  icon?: string
}

const props = defineProps<Props>()

const typeIconMap: { [k in SportType]?: string } = {
  'tennis': 'spt-hero',
  'soccer': 'spt-football',
  'american-football': 'spt-america',
}

const _icon = computed(() => {
  if (props.icon !== undefined && props.icon.length)
    return props.icon

  else if (props.type !== undefined && typeIconMap[props.type] !== undefined)
    return typeIconMap[props.type]

  else
    return 'app-logo'
})
</script>

<template>
  <div class="loader-wrapper">
    <div class="loader">
      <div class="wobble">
        <BaseIcon :name="_icon ?? 'app-logo'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wobble {
  animation-name: wobble;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(.87,-.41,.19,1.44);
}
.loader-wrapper {
  width: 100%;
  padding-top: 56.25%;
  position: relative;
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
</style>
