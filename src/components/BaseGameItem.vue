<script setup lang="ts">
interface Props {
  gameList: Array<any>
}
const props = withDefaults(defineProps<Props>(), {
  gameList: () => [],
})
const emit = defineEmits(['itemInfo'])
function handleClick(event: any) {
  const index = event.target?.dataset?.index
  if (index)
    emit('itemInfo', props.gameList[index])
}
</script>

<template>
  <div class="base-game-item" @click="handleClick">
    <div v-for="(item, index) of gameList" :key="item.id">
      <img :src="item.url" :data-index="index" alt="">
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-game-item {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 112px);
  grid-row-gap: var(--tg-spacing-20);
  grid-column-gap: var(--tg-spacing-8);
  justify-content: space-between;
  div {
    // width: 112px;
    height: 158px;
    border-radius: var(--tg-radius-md);
    overflow: hidden;
    cursor: pointer;
  }
}
</style>
