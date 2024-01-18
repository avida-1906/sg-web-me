<script setup lang='ts'>
interface Props {
  modelValue: string
  modelType?: string
  errPayPwd?: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  errPayPwd: '',
})

const emit = defineEmits(['update:modelValue', 'update:modelType'])
const { t } = useI18n()
const {
  isSetAuth, isOpenVerify, isOpenPayPwd, isSetPayPwd, brandBaseDetail,
} = useBrandBaseDetail()

const pwdOptions = computed(() => {
  const check = brandBaseDetail?.value.check
  const code = { label: t('double_check_code'), value: '1' }
  const pwd = { label: t('menu_title_settings_update_safepwd'), value: '2' }
  const teg = []
  if (check === 3) {
    isSetPayPwd.value && teg.push(pwd)
    isSetAuth.value && teg.push(code)
  }
  else if (isOpenVerify.value) {
    teg.push(code)
  }
  else if (isOpenPayPwd.value) {
    teg.push(pwd)
  }
  return teg
})

const passwordRef = ref()
const pwdType = ref(pwdOptions.value[0]?.value ?? '')

const pwdLabel = computed(() => {
  return pwdOptions.value.find(t => t.value === pwdType.value)?.label
})

const {
  value: password,
  resetField: resetPassword,
  validate: validatePassword,
  errorMessage: errPassword,
} = useField<string>('password', (value) => {
  if (!value)
    return t('min_len_6')
  else if (!payPasswordReg.test(value))
    return `${pwdLabel.value}${t('wrong_format')}`
  return ''
})

const getTouchTrue = computed(() => {
  return passwordRef.value.setTouchTrue
})

// 密码类型切换
function selectTypeChange(item: string) {
  pwdType.value = item
  resetPassword()
  emit('update:modelValue', item)
}

defineExpose({ resetPassword, validatePassword, errPassword, setTouchTrue: getTouchTrue, authType: pwdType })

emit('update:modelType', pwdType.value)
</script>

<template>
  <div class="password-box">
    <BaseInput
      ref="passwordRef" v-model="password" :label="pwdLabel" :msg="errPassword || errPayPwd" :placeholder="placeholder"
      type="password" max="6" must msg-after-touched
      @blur="emit('update:modelValue', password)"
    >
      <template #right-button>
        <BaseSelect
          :model-value="pwdType" popper plain-popper-label :options="pwdOptions"
          @select="selectTypeChange"
        >
          <template #option="{ data: { item } }">
            <div class="center">
              {{ item.label }}
            </div>
          </template>
        </BaseSelect>
      </template>
    </BaseInput>
  </div>
</template>

<style lang='scss' scoped>
.password-box {
  --tg-app-select-currency-bg: none;
  --tg-base-input-right-button-padding: 0 0;
  --tg-base-select-hover-bg-color: none;
  --tg-base-select-popper-style-padding-y: 11px;
}
</style>
