<script setup lang="ts">
const { copy } = useClipboard()
function handleKeyNum(num: string) {
  console.log(num)
  // alert(num)
}
function handleKeyOk() {
  // alert('ok')
}

function getFile(file: any) {
  console.log(file)
}

function handleDelFile() {
  // alert('删除')
}

function copyUploadCode() {
  copy('<BaseUpload @selectFile="getFile" @deleteFile="handleDelFile" />')
}
function copyNumericKeypadCode() {
  copy(`<div style="width: 371px;">
          <BaseNumericKeypad @keyNum="handleKeyNum" @keyOk="handleKeyOk" />
        </div>`)
}
function copyAspectRatioCode(type: number) {
  switch (type) {
    case 1:
      copy(`<BaseAspectRatio ratio="1:2" width="20%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(1)">
              copy 1:2
            </BaseButton>
          </BaseAspectRatio>`)
      break
    case 2:
      copy(`<BaseAspectRatio ratio="1:1" width="20%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(2)">
              copy 1:1
            </BaseButton>
          </BaseAspectRatio>`)
      break
    case 3:
      copy(`<BaseAspectRatio ratio="16:9" width="20%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(3)">
              copy 16:9
            </BaseButton>
          </BaseAspectRatio>`)
      break
  }
}
function copyBadgeCode(type: number) {
  switch (type) {
    case 1:
      copy('<BaseBadge :count="5"><BaseButton @click="copyBadgeCode(1)"> copy </BaseButton></BaseBadge>')
      break
    case 2:
      copy('<BaseBadge :count="99" :max="10"><BaseButton @click="copyBadgeCode(2)"> copy </BaseButton></BaseBadge>')
      break
    case 3:
      copy('<BaseBadge :dot="true"><BaseButton @click="copyBadgeCode(3)"> copy </BaseButton></BaseBadge>')
      break
    case 4:
      copy('<BaseBadge :count="25" />')
      break
    case 5:
      copy('<BaseBadge status="success" text="copy" />')
      break
  }
}
</script>

<template>
  <ul>
    <li class="box">
      <AppDemoCard title="BaseUpload">
        <BaseUpload @select-file="getFile" @delete-file="handleDelFile" />
        <BaseButton @click="copyUploadCode">
          copy
        </BaseButton>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseBadge">
        <div class="flex-row">
          <div>
            <BaseBadge :count="5">
              <BaseButton @click="copyBadgeCode(1)">
                copy
              </BaseButton>
            </BaseBadge>
          </div>
          <div>
            <BaseBadge :count="99" :max="10">
              <BaseButton @click="copyBadgeCode(2)">
                copy
              </BaseButton>
            </BaseBadge>
          </div>
          <div>
            <BaseBadge :dot="true">
              <BaseButton @click="copyBadgeCode(3)">
                copy
              </BaseButton>
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
    <li class="box">
      <AppDemoCard title="BaseNumericKeypad">
        <div style="width: 371px;">
          <BaseNumericKeypad @key-num="handleKeyNum" @key-ok="handleKeyOk" />
        </div>
        <BaseButton @click="copyNumericKeypadCode">
          copy
        </BaseButton>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseAspectRatio">
        <div class="flex-row">
          <BaseAspectRatio ratio="1:2" width="20%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(1)">
              copy 1:2
            </BaseButton>
          </BaseAspectRatio>
          <BaseAspectRatio ratio="1:1" width="20%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(2)">
              copy 1:1
            </BaseButton>
          </BaseAspectRatio>
          <BaseAspectRatio ratio="16:9" width="20%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(3)">
              copy 16:9
            </BaseButton>
          </BaseAspectRatio>
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
