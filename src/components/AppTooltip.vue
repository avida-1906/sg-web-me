<script setup lang="ts">
interface Props {
  /** 提示文本 */
  text?: string
  /** 触发图标icon */
  iconName?: string
  /** 是否自动隐藏 */
  autoHide?: boolean
  /** 自动隐藏毫秒数 */
  hideTimeout?: number
  /** 触发文本 */
  content?: string
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
    v-model:shown="toolShown"
    placement="top"
    :triggers="['click']"
    v-bind="$attrs"
    @show="closeTool"
    @hide="clearHide"
  >
    <div class="center">
      <slot name="content">
        <BaseIcon v-if="iconName" :name="iconName ?? ''" />
        <span v-if="content">{{ content }}</span>
      </slot>
    </div>
    <template #popper>
      <div class="tiny-menu-item-title">
        <slot name="popper">
          {{ text }}
        </slot>
      </div>
    </template>
  </VTooltip>
</template>

<style lang="scss" scoped></style>
