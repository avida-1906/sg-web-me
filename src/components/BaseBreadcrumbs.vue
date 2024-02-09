<script setup lang='ts'>
interface BreadcrumbItem {
  [k: string]: any
  value: string
  label: string
}
interface Props {
  list: BreadcrumbItem[]
  onlyLast?: boolean // 只显示最后一个
}
const props = defineProps<Props>()
const emit = defineEmits(['itemClick'])
const route = useRoute()
const lastIndex = computed(() => props.list.length - 1)
const lastItem = computed(() => props.list[lastIndex.value])

function handleClick(item: BreadcrumbItem, index: number) {
  emit('itemClick', { list: props.list, item, index })
}
function checkRoute(v: string) {
  return route.path.split('/').includes(v)
}
</script>

<template>
  <div class="base-breadcrumbs">
    <div class="wrap">
      <div v-if="onlyLast" class="bread-item" @click="handleClick(lastItem, lastIndex)">
        <span>{{ lastItem.label }}</span>
      </div>
      <template v-else>
        <div
          v-for="b, i in list" :key="i" class="bread-item"
          :class="{ active: checkRoute(b.value) }"
        >
          <span @click="handleClick(b, i)">{{ b.label }}</span>
          <BaseIcon
            v-show="i !== list.length - 1" name="uni-arrowright-line"
            style="font-size: 11.2px;margin: 0 var(--tg-spacing-4);"
          />
        </div>
      </template>
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
    &.active{
      color: var(--tg-text-white);
    }
  }
}
</style>
