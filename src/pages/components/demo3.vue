<script setup lang="ts">


const { copy } = useClipboard()
function copyUploadCode() {
  copy('<BaseUpload />')
}

function copyBadgeCode(type: number) {
  switch (type) {
    // 按钮
    case 1:
      copy(`<BaseBadge :count="5">
							<BaseButton @click="copyBadgeCode(1)"> copy </BaseButton>
						</BaseBadge>`)
      break
    case 2:
      copy(`<BaseBadge :count="99" :max="10">
							<BaseButton @click="copyBadgeCode(2)"> copy </BaseButton>
						</BaseBadge>`)
      break
    case 3:
      copy(`<BaseBadge :dot="true">
							<BaseButton @click="copyBadgeCode(3)"> copy </BaseButton>
						</BaseBadge>`)
      break
    case 4:
      copy(`<BaseBadge :count="25" />`)
      break
    case 5:
      copy(`<BaseBadge status="success" text="copy" />`)
      break
  }
}
</script>

<template>
  <ul>
    <li class="box">
      <AppDemoCard title="BaseUpload">
        <BaseUpload />
        <BaseButton @click="copyUploadCode()"> copy </BaseButton>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseBadge">
        <div class="flex-row">
          <div>
            <BaseBadge :count="5">
              <BaseButton @click="copyBadgeCode(1)"> copy </BaseButton>
            </BaseBadge>
          </div>
          <div>
            <BaseBadge :count="99" :max="10">
              <BaseButton @click="copyBadgeCode(2)"> copy </BaseButton>
            </BaseBadge>
          </div>
          <div>
            <BaseBadge :dot="true">
              <BaseButton @click="copyBadgeCode(3)"> copy </BaseButton>
            </BaseBadge>
          </div>
          <div>
            <BaseButton @click="copyBadgeCode(4)">
              <BaseBadge :count="25" />
            </BaseButton>
          </div>
          <div>
            <BaseButton @click="copyBadgeCode(5)">
              <BaseBadge status="success" text="copy" />
            </BaseButton>
          </div>
        </div>
      </AppDemoCard>
    </li>
  </ul>
</template>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>
