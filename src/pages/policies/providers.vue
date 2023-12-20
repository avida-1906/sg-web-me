<script lang="ts" setup>
/* eslint-disable max-len */
usePageTitle({ prefix: 'Providers' })
const { isLogin } = storeToRefs(useAppStore())
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
</script>

<template>
  <div class="content-block pd-24">
    <h1>Provider Availability Policy</h1>
    <h2>1. Absolute Restriction</h2>
    <div class="p">
      NetEnt will not permit NetEnt Casino Games to be supplied to any entity that operates in any of the below jurisdictions (irrespective of whether or not NetEnt Casino Games are being supplied by the entity in that jurisdiction) without the appropriate licenses. Belgium, Bulgaria, Colombia, Croatia, Czech Republic, Denmark, Estonia, France, Italy, Latvia, Lithuania, Mexico, Portugal, Romania, Spain, Sweden, Switzerland, United Kingdom, United States of America.
    </div>
    <div v-if="!isLogin" class="p buttons">
      <BaseButton type="text" size="none" @click="openLoginDialog()">
        登录
      </BaseButton>
      <span>或</span>
      <BaseButton type="text" size="none" @click="openRegisterDialog()">
        注册
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buttons {
  text-align: center;
  --tg-base-button-text-default-color: var(--tg-text-white);
  --tg-base-button-font-size: 16px;
  margin-top: 20px !important;
  :deep(button) {
    padding: 0 8px;
  }
}
.bold-txt {
  font-weight: 600;
}
.pd-24 {
  padding: 24px;
}
.p {
  line-height: 24px;
  font-size: 16px;
  color: var(--tg-secondary-light);
}
.content-block {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.content-block>.p+.p {
  margin-top: 12px;
}
h1 {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}
.content-block>h1:first-of-type {
  margin-top: 0;
}
h2 {
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  margin-top: 16px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}
h3 {
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}
h4 {
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}
ul {
  list-style-type: disc;
  padding-left: 32px;
  margin-bottom: 16px;
  li {
    margin: 4px 0;
  }
}
</style>
