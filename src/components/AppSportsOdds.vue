<script setup lang='ts'>
interface Props {
  odds: string
  arrow?: 'left' | 'right'
  keep?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  arrow: 'right',
})

const saveNum = ref(props.odds)
const upDown = ref('')
const icon = ref('')
let timer: any

const sportsStore = useSportsStore()

function resetUpDown() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    upDown.value = ''
    clearTimeout(timer)
  }, 3200)
}
watch(() => props.odds, (newOdds) => {
  if (+saveNum.value !== +newOdds) {
    upDown.value = +newOdds > +saveNum.value ? 'up' : 'down'
    icon.value = +newOdds > +saveNum.value ? 'up' : 'down'
    resetUpDown()
    saveNum.value = newOdds
  }
})
</script>

<template>
  <div class="app-sports-odds" :class="[arrow]">
    <span class="odds" v-html="sportsStore.renderOdds(+odds).value" />
    <div class="icon arrow-odds" :class="[`odds-${upDown}`, { keep }]">
      <BaseIcon :name="`uni-tri-${icon}`" />
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
    font-size: var(--tg-font-size-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;

    &.keep{
      opacity: 1;
    }
  }

  &.left {
    grid-template-areas: 'arrow odds';
    justify-content: flex-end;
  }

  &.right {
    grid-template-areas: 'odds arrow';
    justify-content: flex-start;
  }
}
</style>
