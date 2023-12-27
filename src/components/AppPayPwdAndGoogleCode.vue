<script setup lang='ts'>
interface Props {
  modelValue: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const {
  value: paypwd,
  errorMessage: paypwdMsg,
  // validate: valiPaypwd,
  // resetField: payPasswordReset,
} = useField<string>('paypwd', (value) => {
  if (!value)
    // return t('this_field_is_required')
    return t('validate_msg_input_pay_pwd')
  return ''
})

// const modeVal = ref(1)
const options = [
  { label: t('menu_title_settings_update_safepwd'), value: 1 },
  { label: t('two_step_verification'), value: 2 },
]
function selectChange(val: number) {
  // props.modelValue = val
  emit('update:modelValue', val)
}
</script>

<template>
  <div class="app-pwd-google-code">
    <!-- <BaseLabel :label="$t('menu_title_settings_update_safepwd')" must> -->
    <div class="center">
      <BaseSelect
        :model-value="modelValue"
        popper
        plain-popper-label
        :options="options"
        @select="selectChange"
      />
    </div>
    <BaseInput v-model="paypwd" :msg="paypwdMsg" type="password" max="6" />
    <!-- </BaseLabel> -->
  </div>
</template>

<style lang='scss' scoped>
.app-pwd-google-code {
  --tg-base-select-popper-style-padding-x: 0;
  --tg-base-select-popper-style-padding-y: 0;
  --tg-base-select-hover-bg-color: none;
  --tg-base-select-popper-font-weight: 500;
  --tg-base-select-popcontent-lineheight: 1.4;
  --tg-base-select-popper-label-color: var(--tg-text-lightgrey);
  .center{
    justify-content: flex-start;
    margin-bottom: 4px;
  }
}
</style>
