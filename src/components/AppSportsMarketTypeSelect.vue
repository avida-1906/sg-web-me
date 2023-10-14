<script setup lang='ts'>
interface Props {
  modelValue: boolean // 是否标准盘
  disabled?: boolean
  baseType: string
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'baseTypeChange'])

const marketTypeText = computed(() => props.modelValue ? '三项投注' : '标准')
// 标准盘选项
const baseType = ref(props.baseType)
const baseOptions = [
  { label: '获胜盘', value: 'winner' },
  { label: '让分盘', value: 'handicap' },
  { label: '总分盘', value: 'total' },
]
// 三项投注选项
const threeType = ref('home')
const threeOptions = [
  { label: '主页', value: 'home' },
]

function toggleBase() {
  emit('update:modelValue', !props.modelValue)
}
function onBaseTypeChange(v: string) {
  emit('baseTypeChange', v)
}
</script>

<template>
  <div class="sports-market-type-select">
    <VMenu placement="top">
      <BaseButton :disabled="disabled" size="sm" type="text" @click="toggleBase">
        <BaseIcon v-if="modelValue" name="uni-three-top" />
        <BaseIcon v-else name="uni-standard" />
      </BaseButton>
      <template #popper>
        <div class="tiny-menu-item-title">
          {{ marketTypeText }}
        </div>
      </template>
    </VMenu>
    <BaseSelect
      v-if="modelValue"
      v-model="baseType"
      :options="baseOptions"
      popper
      @select="onBaseTypeChange"
    />
    <BaseSelect
      v-else
      v-model="threeType"
      :options="threeOptions"
      popper
      disabled
    />
  </div>
</template>

<style lang='scss' scoped>
.sports-market-type-select{
  display: flex;
}
</style>
