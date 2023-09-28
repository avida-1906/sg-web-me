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
      <BaseInput v-model="email" label="用户名" placeholder="请绑定邮箱" must />
      <template #btm-right>
        <BaseButton type="text">
          重新发送电邮
        </BaseButton>
      </template>
    </AppSettingsContentItem>
    <AppSettingsContentItem title="手机号码" last-one @submit="numberSubmit">
      <BaseSelect v-model="selectValue" label="选择区号" :options="selectOptions" must />
      <BaseInput v-model="email" label="手机号码" placeholder="请绑定手机号码" must />
    </AppSettingsContentItem>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-general {
}
</style>
