<script setup lang="ts">
interface Props {
  text?: string // 提示文本
  iconName?: string // 图标icon
  autoHide?: boolean // 是否自动隐藏
  hideTimeout?: number // 自动隐藏毫秒数
}

const props = withDefaults(defineProps<Props>(), {
  autoHide: true,
  hideTimeout: 2000,
})

const { bool: toolShown, setFalse: setToolFalse } = useBoolean(false)

let timer: NodeJS.Timeout | null = null

function closeTool() {
  if (props.autoHide) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      setToolFalse()
    }, props.hideTimeout)
  }
}

function clearHide() {
  timer && clearTimeout(timer)
  timer = null
}
</script>

<template>
  <VTooltip
    v-bind="$attrs"
    v-model:shown="toolShown"
    placement="top"
    :triggers="['click']"
    @show="closeTool"
    @hide="clearHide"
  >
    <div class="center stealth-box">
      <slot name="content">
        <BaseIcon :name="iconName ?? ''" />
      </slot>
    </div>
    <template #popper>
      <slot name="popper">
        <div class="tiny-menu-item-title">
          {{ text }}
        </div>
      </slot>
    </template>
  </VTooltip>
</template>

<style lang="scss" scoped></style>
