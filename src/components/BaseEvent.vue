<script setup lang="ts">
/**
 * @param {string} sport-list 体育列表
 * @param {string} cart 购物车
 */
type EventName = 'sport-list' | 'cart'
interface Props {
  /** 发送事件名称 */
  sendName: EventName
  /** 接收事件名称 */
  receiveName: EventName
}

const props = defineProps<Props>()
const emits = defineEmits(['receive'])
const labelDomRef = ref<HTMLElement | null>(null)

function receive() {
  console.log('接收消息', props.receiveName)
  emits('receive')
}

function send() {
  console.log('发送消息', props.sendName)
  labelDomRef.value?.click()
}

defineExpose({ send })
</script>

<template>
  <div class="h-0 overflow-hidden text-white">
    <!-- <label ref="labelDomRef" :for="`labelId-${sendName}`">
      发送 {{ sendName }}
    </label>
    <button :id="`labelId-${receiveName}`" @click="receive">
      接收 {{ receiveName }}
    </button> -->
  </div>
</template>

<style>
.a {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
