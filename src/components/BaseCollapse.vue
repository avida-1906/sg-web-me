<script setup lang="ts">
interface Props {
  icon?: string // 标题图标
  title?: string // 标题
  autoShow?: boolean // 是否自动展开
}
const props = withDefaults(defineProps<Props>(), {
  icon: '',
  title: '这是标题',
  autoShow: false,
})
const emit = defineEmits(['clickHead'])

const { bool: isShow, setBool } = useBoolean(props.autoShow)

function handleClickHeader() {
  setBool(!isShow.value)
  emit('clickHead')
}
</script>

<template>
  <div class="base-accordion">
    <div class="accordion-header" @click="handleClickHeader">
      <div class="center">
        <BaseIcon v-if="icon" class="title-icon" :name="icon" />
        <slot name="title">
          <span class="header-title">{{ title }}</span>
        </slot>
      </div>
      <div class="center">
        <slot name="top-right" />
        <div class="header-icon">
          <BaseIcon :name="`uni-arrow-${isShow ? 'down' : 'left'}`" />
        </div>
      </div>
    </div>
    <div class="accordion-content" :style="`height:${isShow ? 'auto' : 0};`">
      <BaseDivider />
      <div class="content-slot">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-accordion {
    background-color: var(--tg-secondary-grey);
    border-radius: var(--tg-radius-default);
    overflow: hidden;
    .accordion-header {
        display: flex;
        height: 45px;
        padding: 0 16px;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .header-title {
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-default);
          font-weight: var(--tg-font-weight-semibold);
        }
        .title-icon{
          font-size: var(--tg-font-size-default);
          margin-right: 6px;
        }
        .header-icon {
          margin-left: 20px;
          font-size: var(--tg-font-size-xs);
        }
    }
    .accordion-content {
        background-color: var(--tg-secondary-grey);
        .content-slot{
          color: var(--tg-secondary-light);
        }
    }
}
</style>
