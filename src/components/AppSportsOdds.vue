<script setup lang='ts'>
interface Props {
  odds: string
  arrow?: 'left' | 'right'
}
const props = withDefaults(defineProps<Props>(), {
  arrow: 'right',
})

const saveNum = ref(props.odds)
const upDown = ref('')
let timer: any
function resetUpDown() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    upDown.value = ''
    clearTimeout(timer)
  }, 3200)
}
watch(props, () => {
  if (+saveNum.value !== +props.odds) {
    upDown.value = +props.odds > +saveNum.value ? 'up' : 'down'
    resetUpDown()
    saveNum.value = props.odds
  }
})
</script>

<template>
  <div class="app-sports-odds" :class="[arrow]">
    <span class="odds">{{ odds }}</span>
    <div class="icon arrow-odds" :class="`odds-${upDown}`">
      <BaseIcon :name="`uni-tri-${upDown}`" />
    </div>
  </div>
</template>

<style>
:root {
  --tg-sports-odds-color: var(--tg-text-lightblue);
  --tg-sports-odds-text-align: start;
}
</style>

<style lang='scss' scoped>
.app-sports-odds {
  display: inline-grid;
  gap: var(--tg-spacing-4);

  .odds {
    grid-area: odds;
    font-weight: var(--tg-font-weight-bold);
    font-size: var(--tg-font-size-default);
    color: var(--tg-sports-odds-color);
    text-align: var(--tg-sports-odds-text-align);
  }

  .icon {
    grid-area: arrow;
    font-size: var(--tg-spacing-9);
    display: flex;
    align-items: center;
  }

  &.left {
    grid-template-areas: 'arrow odds';
  }

  &.right {
    grid-template-areas: 'odds arrow';
  }
}
</style>
