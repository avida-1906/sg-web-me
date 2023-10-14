<script setup lang='ts'>
interface BreadcrumbItem {
  [k: string]: any
  value: string
  label: string
}
interface Props {
  list: BreadcrumbItem[]
}
defineProps<Props>()
const emit = defineEmits(['itemClick'])

function handleClick(list: BreadcrumbItem[], index: number) {
  emit('itemClick', { list, index })
}
</script>

<template>
  <div class="base-breadcrumbs">
    <div class="wrap">
      <div v-for="b, i in list" :key="i" class="bread-item">
        <span @click="handleClick(list, i)">{{ b.label }}</span>
        <BaseIcon
          v-show="i !== list.length - 1" name="uni-arrowright-line"
          style="font-size: var(--tg-font-size-base);
          margin: 0 var(--tg-spacing-4);vertical-align: -3px;"
        />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-breadcrumbs {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  overflow: hidden;

  .wrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bread-item {
    display: inline;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-lightgrey);
    font-weight: var(--tg-font-weight-semibold);
    white-space: nowrap;

    span {
      cursor: pointer;
    }

    &:hover {
      color: var(--tg-text-white);
    }
  }
}
</style>
