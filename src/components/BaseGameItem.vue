<script setup lang="ts">
interface Props {
  gameList: Array<any>
}
withDefaults(defineProps<Props>(), {
  gameList: () => [],
})
const emit = defineEmits(['itemInfo'])
const gameBoxRef: any = ref(null)
const gridWidth = ref(0)
function handleClick(item: any) {
  // const index = event.target?.dataset?.index
  // if (index)
  emit('itemInfo', item)
}
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    gridWidth.value = entries[0].contentRect.width
  })
  resizeObserver.observe(gameBoxRef.value)
})
const getGridColumns = computed(() => {
  return {
    gridTemplateColumns: gridWidth.value > 400 ? `repeat(${Math.round(gridWidth.value / 150)}, 1fr)` : `repeat(${Math.round(gridWidth.value / 120)}, 1fr)`,
  }
})
</script>

<template>
  <div ref="gameBoxRef" class="base-game-box" :style="getGridColumns">
    <BaseAspectRatio v-for="item of gameList" :key="item.id" ratio="112/158">
      <div class="base-game-item" @click="handleClick(item)">
        <img :src="item.url" alt="">
        <div class="active-game-item">
          <div class="game-title">
            {{ item.name }}
          </div>
          <BaseIcon class="game-uni-play" name="uni-play" />
          <div class="game-tip">
            Abcd 原创游戏
          </div>
        </div>
      </div>
    </BaseAspectRatio>
  </div>
</template>

<style scoped lang="scss">
.base-game-box {
  width: 100%;
  height: 100%;
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(128px, 170px));
  grid-row-gap: var(--tg-spacing-20);
  grid-column-gap: var(--tg-spacing-10);
  justify-content: space-between;
  .base-game-item {
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    will-change: transform;
    transition: 0.3s;
    border-radius: var(--tg-radius-md);
    overflow: hidden;
    cursor: pointer;
    .active-game-item{
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-around;
      font-size: var(--tg-font-size-base);
      opacity: 0;
      color: var(--tg-text-white);
      background-color: var(--tg-sub-blue);
      will-change: transform;
      transition: all 0.3s ease 0.3s;
      .game-uni-play{
        width: 32px;
        height: 32px;
      }
    }
  }
  .base-game-item:hover{
    top: -10px;
  }
  .base-game-item:hover .active-game-item{
    opacity: 0.8;
  }
}
</style>
