<script lang="ts" setup>
const email = ref('')
const selectValue = ref('')
const selectOptions = [
  { label: '+86 China', value: '86' },
  { label: '+86 China', value: '86' },
  { label: '+86 China', value: '86' },
  { label: '+86 China', value: '86' },
  { label: '+86 China', value: '86' },
]
const emailSubmit = function () {
  console.log('email submit')
}
const numberSubmit = function () {
  console.log('number submit')
}
</script>

<template>
  <div class="tg-settings-general">
    <AppSettingsContentItem title="电邮地址" badge="已验证" @submit="emailSubmit">
      <BaseLabel label="用户名" must-small>
        <BaseInput v-model="email" placeholder="请绑定邮箱" />
      </BaseLabel>
      <template #btm-right>
        <BaseButton type="text">
          重新发送电邮
        </BaseButton>
      </template>
    </AppSettingsContentItem>
    <AppSettingsContentItem title="手机号码" last-one @submit="numberSubmit">
      <template #top-desc>
        我们只服务国际电话区号列表中所列有的区域。
      </template>
      <BaseLabel label="国际电话区号" must-small>
        <BaseSelect v-model="selectValue" :options="selectOptions" class="general-base-select" />
      </BaseLabel>
      <BaseLabel label="手机号码" must-small>
        <BaseInput v-model="email" placeholder="请绑定手机号码" />
      </BaseLabel>
    </AppSettingsContentItem>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-general {
  .general-base-select{
    --tg-base-select-style-padding-x: var(--tg-spacing-6);
    --tg-base-select-style-padding-y: var(--tg-spacing-7);
  }
}
</style>
