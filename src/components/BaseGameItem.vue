<script setup lang="ts">
interface Props {
  gameInfo: {
    img?: string
    name?: string
  }
}
withDefaults(defineProps<Props>(), {
  gameInfo: () => { return {} },
})
const emit = defineEmits(['clickItem'])
function handleClick(item: any) {
  emit('clickItem', item)
}
</script>

<template>
  <div class="base-game-item" @click="handleClick(gameInfo)">
    <BaseImage :url="gameInfo.img" :name="gameInfo.name" />
    <div class="active-game-item">
      <div class="game-title">
        {{ gameInfo.name }}
      </div>
      <BaseIcon class="game-uni-play" name="uni-play" />
      <div class="game-tip">
        Abcd 原创游戏
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
        --tg-icon-color: var(--tg-text-white);
      }
    }
  }
  .base-game-item:hover{
    top: -7px;
  }
  .base-game-item:hover .active-game-item{
    opacity: 0.8;
  }
</style>
