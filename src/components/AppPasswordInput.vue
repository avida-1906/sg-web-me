<script setup lang='ts'>
interface Props {
  modelValue?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
})

const emit = defineEmits(['update:modelValue'])
const { t } = useI18n()
const { selected: pwdType, list: pwdOptions } = useSelect([
  { label: t('menu_title_settings_update_safepwd'), value: '2' },
])
// 获取安全验证配置
const {
  data: authConfig,
  runAsync: runAsyncMemberAuthConfig,
} = useRequest(ApiMemberAuthConfig, {
  onSuccess(data) {
    if (data.is_secret === '1')
      pwdOptions.value.push({ label: t('double_check_code'), value: '1' })
  },
})

const pwdLabel = computed(() => {
  return pwdOptions.value.find(t => t.value === pwdType.value)?.label
})

const passwordRef = ref()
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
}

defineExpose({ resetPassword, validatePassword, errPassword, setTouchTrue: getTouchTrue, authType: pwdType })

// onMounted(() => {
//   defineExpose({ setTouchTrue: passwordRef.value.setTouchTrue })
// })

await application.allSettled([runAsyncMemberAuthConfig()])
</script>

<template>
  <div class="password-box">
    <BaseInput
      ref="passwordRef" v-model="password" :label="pwdLabel" :msg="errPassword" placeholder=""
      type="password" max="6" must msg-after-touched
      @blur="emit('update:modelValue', password)"
    >
      <template v-if="authConfig?.is_secret === '1'" #right-button>
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
