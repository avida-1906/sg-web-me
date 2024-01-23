<script setup lang='ts'>
import type { IMemberReg, IMemberThirdReg } from '~/apis/types'

interface Props {
  isAuth?: boolean
}

const props = defineProps<Props>()

const closeDialog = inject('closeDialog', () => {})

const { openNotify } = useNotify()
const { t } = useI18n()
const appStore = useAppStore()
const { bool: needBack, setFalse: setNeedBackFalse } = useBoolean(true)
const { bool: isRead, setTrue: setReadTrue } = useBoolean(false)
const { bool: checkboxValue } = useBoolean(false)
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
const { openThirdAuthFormDialog } = useDialogThirdAuthForm()

const {
  errorMessage: checkedErrorMsg,
  validate: valiChecked,
} = useField<string>('checkbox', () => {
  if (!checkboxValue.value)
    return t('agree_terms_conditions')
  return ''
})

const scrollRef = ref()
const delayId = ref()
const { bool: isCheckClicked, setTrue: setCCTrue } = useBoolean(false)

const regThirdParams = computed(() => {
  return Session.get<IMemberThirdReg>(STORAGE_THIRDREG_PARAMS_KEYWORDS)?.value
})
const regParams = computed(() => {
  return Session.get<IMemberReg>(STORAGE_REG_PARAMS_KEYWORDS)?.value
})
console.log(regParams.value)
const {
  run: runMemberReg,
  loading: isLoading,
} = useRequest(ApiMemberReg, {
  manual: true,
  onSuccess: async (res) => {
    appStore.setToken(res)
    setNeedBackFalse()
    openNotify({
      title: t('tip_pop_up_reg_success_title'),
      type: 'success',
      message: `${t('tip_pop_up_reg_success_title')},${regParams.value?.username}`,
    })
    Session.remove(STORAGE_REG_PARAMS_KEYWORDS)
    await nextTick()
    closeDialog()
  },
})

const { run: runThirdReg } = useRequest(ApiMemberThirdReg, {
  onSuccess: async (data) => {
    appStore.setToken(data)
    Session.remove(STORAGE_THIRDREG_PARAMS_KEYWORDS)
    setNeedBackFalse()
    openNotify({
      title: t('reg_success_title'),
      type: 'success',
      message: t('success_register', { username: regThirdParams.value?.username }),
    })
    await nextTick()
    closeDialog()
    setTimeout(() => {
      location.replace('/')
    }, 100)
  },
})

function handleScroll() {
  clearTimeout(delayId.value)
  delayId.value = setTimeout(() => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.value
    const _atBottom = scrollHeight - scrollTop - clientHeight < 100
    if (_atBottom)
      setReadTrue()
  }, 500)
}
async function getStartGame() {
  if (!isRead.value)
    return
  valiChecked()
  if (checkboxValue.value && !checkedErrorMsg.value && regThirdParams.value && props.isAuth)
    runThirdReg(regThirdParams.value)

  if (checkboxValue.value && !checkedErrorMsg.value && regParams.value)
    runMemberReg(regParams.value)
}
async function toLogin() {
  setNeedBackFalse()
  closeDialog()
  await nextTick()
  openLoginDialog()
}

function goPrev() {
  closeDialog()
}

function checkClick() {
  setCCTrue()
  valiChecked()
}

onMounted(() => {
  scrollRef.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  scrollRef.value.removeEventListener('scroll', handleScroll)
  if (needBack.value) {
    if (props.isAuth)
      openThirdAuthFormDialog()
    else
      openRegisterDialog() // { showClose: !(parentUid.value && parentUid.value.length), closeOnClickOverlay: !(parentUid.value && parentUid.value.length) }
  }
})
</script>

<template>
  <div class="app-register-terms-conditions" :class="{ 'is-auth': isAuth }">
    <div class="title">
      <div class="arrow" @click.stop="goPrev">
        <BaseIcon name="uni-arrowleft-line" />
      </div>
      <div class="text">
        {{ t('step_label') }} 2/2{{ t('colon') }} {{ t('read_and_accept') }}
      </div>
    </div>
    <div ref="scrollRef" class="scroll-y scroll-light terms-conditions-outer">
      <AppPoliciesTerms />
    </div>
    <div class="check-box">
      <BaseCheckBox
        v-model="checkboxValue"
        :disabled="!isRead"
        :error="isCheckClicked && !checkboxValue"
        :msg="checkedErrorMsg"
        @click.stop="checkClick"
      >
        <span class="haha">{{ t('read_terms_conditions') }}</span>
      </BaseCheckBox>
      <BaseButton
        :loading="isLoading"
        size="xl"
        bg-style="secondary" @click.stop="getStartGame"
      >
        <span class="size-base">{{ t('start_game') }}</span>
      </BaseButton>
    </div>
    <!-- <div class="app-bottom">
      <div class="app-bottom-text">
        <div>
          {{ t('have_account') }}
          <span class="text-white" @click.stop="toLogin">{{ t('login') }}</span>
        </div>

        <div class="{{ companyData?.name }}-text">
          {{ t('{{ companyData?.name }}_hCaptcha', { site: companyData?.name }) }}
          <span>{{ t('privacy_policy') }}</span> {{ t('and') }}
          <span>{{ t('terms_of_service') }}</span> {{ t('applicable') }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<style lang='scss' scoped>
.bold-txt {
  font-weight: var(--tg-font-weight-semibold);
}
.link-inline {
  font-size: var(--tg-font-size-default);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  line-height: 14px;
  gap: var(--tg-spacing-8);
}
.haha {
  display: inline-block;
  font-weight: 400;
  padding-top: 10px;
  padding-bottom: 7px;
  box-sizing: content-box;
}
.size-base {
  font-size: var(--tg-font-size-base);
}
.app-register-terms-conditions {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-16);
  padding-bottom: var(--tg-spacing-button-padding-horizontal-sm);
  &.is-auth {
    padding-left: 16px;
    padding-right: 16px;
  }
  .title {
    color: var(--tg-text-lightgrey);
    text-align: center;
    font-size: var(--tg-font-size-base);
    font-style: normal;
    font-weight: var(--tg-font-weight-semibold);
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .text {
      flex: 1;
    }
    svg, .arrow {
      cursor: pointer;
    }
    .arrow {
      display: flex;
    }
  }
  .terms-conditions-outer {
    max-height: 45vh;
    padding: var(--tg-spacing-16);
    text-align: left;
    border-radius: var(--tg-radius-default);
    background: var(--tg-secondary-grey);
    transition: all 0.5s;

    .theme {
      margin: var(--tg-spacing-12) 0;
    }
    .terms-conditions-theme{
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-base);
      font-weight: var(--tg-font-weight-semibold);
    }
    .terms-conditions-title{
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-base);
      font-weight: var(--tg-font-weight-semibold);
      margin: var(--tg-spacing-32) 0 var(--tg-spacing-8);
      line-height: 24px;
    }
    .terms-conditions-describe {
      color: var(--tg-secondary-light);
      font-size: var(--tg-font-size-default);
      font-weight: 400;
      line-height: 21px;
      > p+p {
        margin-top: var(--tg-spacing-12);
      }
    }
  }
  .check-box {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
    --tg-base-checkbox-error-color: var(--tg-text-error-sub);
    --tg-base-checkbox-error-icon-size: var(--tg-font-size-xs);
    --tg-icon-color: var(--tg-text-error-sub);
    --tg-base-checkbox-msg-margin-top: 10px;
    --tg-base-checkbox-wrap-width: fit-content;
  }
  &-btn {
    width: 100%;
  }
  .app-bottom {
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-16);
    &-text {
      text-align: center;
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-lightgrey);
      line-height: 1.5;
      display: flex;
      flex-direction: column;
      gap: var(--tg-spacing-12);
      .text-white {
        color: var(--tg-text-white) !important;
      }
      .stake-text {
        font-weight: var(--tg-font-weight-semibold);
        font-size: var(--tg-font-size-xs);
        padding-bottom: var(--tg-spacing-20);
        cursor: pointer;
        span:hover {
          color: var(--tg-text-white) !important;
        }
      }
    }
    .app-bottom-text{
      span{
        cursor: pointer;
      }
    }
  }
}
</style>
