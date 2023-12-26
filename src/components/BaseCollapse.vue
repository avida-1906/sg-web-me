<script setup lang="ts">
interface Props {
  icon?: string // 标题图标
  title?: string // 标题
  autoShow?: boolean // 是否自动展开
  shown?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  title: '这是标题',
  autoShow: false,
})

const emit = defineEmits(['clickShow', 'clickClose'])

const { bool: isShow, setBool: setAutoShowBool } = useBoolean(props.autoShow)

function handleClickHeader() {
  setAutoShowBool(!isShow.value)
  if (isShow.value)
    emit('clickShow')

  else
    emit('clickClose')
}

watch(() => props.shown, (newVel) => {
  if (!newVel)
    setAutoShowBool(false)
})

onMounted(() => {
  if (isShow.value)
    emit('clickShow')
})
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
          <BaseIcon
            name="uni-arrow-down"
            :style="{
              transform: `rotate(${isShow ? 180 : 0}deg)`,
              display: 'block',
            }"
          />
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

<style>
:root {
  --tg-base-collapse-header-height: 45px;
}
</style>

<style scoped lang="scss">
.base-accordion {
    background-color: var(--tg-secondary-grey);
    border-radius: var(--tg-radius-default);
    overflow: hidden;
    .accordion-header {
        display: flex;
        height: var(--tg-base-collapse-header-height);
        min-height: 45px;
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
          margin-right: var(--tg-spacing-6);
        }
        .header-icon {
          font-size: var(--tg-font-size-default);
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
