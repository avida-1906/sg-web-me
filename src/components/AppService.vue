<script setup lang="ts">
interface Props {
  modelValue: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emit = defineEmits(['update:modelValue'])

const { isMobile } = storeToRefs(useWindowStore())
const { data: brandPcDetail } = useRequest(ApiMemberBrandDetail, {
  manual: false,
  defaultParams: [
    {
      tag: 'customer',
    },
  ],
})

const customStyle = computed(() => {
  if (isMobile.value) {
    return {
      'width': '100%',
      'height': '100%',
      'right': '0',
      'bottom': '0',
      'max-height': 'none',
      'border-radius': '0',
    }
  }
  else {
    return {
      'width': '400px',
      'height': 'min(704px, 100% - 40px)',
      'right': '20px',
      'bottom': '20px',
      'max-height': '704px',
      'border-radius': '16px',
    }
  }
})

const serviceUrl = computed(() => {
  const detail = brandPcDetail.value.find((item: any) => item.state === true)
  return detail.url || ''
})

function closeService() {
  emit('update:modelValue', false)
}
</script>

<template>
  <div
    class="app-service" :class="{
      none: !modelValue,
    }"
    :style="customStyle"
  >
    <span class="close center" @click="closeService()">
      <BaseIcon name="uni-close-white" />
    </span>
    <iframe
      :src="serviceUrl"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </div>
</template>

<style lang="scss" scoped>
.app-service {
  position: fixed;
  z-index: 2147483000;
  bottom: 20px;
  right: 20px;
  transform-origin: right bottom;
  height: min(704px, 100% - 40px);
  min-height: 80px;
  width: 400px;
  max-height: 704px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;
  border-radius: 16px;
  overflow: hidden;
  opacity: 1;
  transition: width 200ms ease 0s, height 200ms ease 0s, max-height 200ms ease 0s, transform 300ms cubic-bezier(0, 1.2, 1, 1) 0s, opacity 83ms ease-out 0s;
  pointer-events: all;
  background-color: var(--tg-text-white);
  &.none {
    width: 0;
    height: 0;
    opacity: 0;
    transform: scale(0);
  }
}

.close {
  position: absolute;
  top: 28px;
  right: 8px;
  font-size: 20px;
  color: var(--tg-text-white);
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: var(--tg-radius-lg);
  transition: background-color 100ms ease 0s;
  &:hover {
    background-color: var(--tg-secondary-deepdark);
  }
}
</style>
