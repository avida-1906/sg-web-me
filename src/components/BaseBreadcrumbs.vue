<script setup lang='ts'>
interface Props {
  list: string[]
}
defineProps<Props>()
defineEmits(['click'])
</script>

<template>
  <div class="base-breadcrumbs">
    <div v-for="b, i in list" :key="i" class="bread-item">
      <span @click="$emit('click', b)">{{ b }}</span>
      <div v-show="i !== list.length - 1" class="icon">
        <BaseIcon name="uni-arrowright-line" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-breadcrumbs {
  display: flex;
  align-items: center;

  .bread-item {
    display: flex;
    align-items: center;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    font-weight: var(--tg-font-weight-semibold);

    span {
      cursor: pointer;
    }

    .icon {
      font-size: var(--tg-font-size-base);
      display: flex;
      align-items: center;
      margin: 0 var(--tg-spacing-4);
    }

    &:hover {
      color: var(--tg-text-white);
    }
  }
}
</style>
