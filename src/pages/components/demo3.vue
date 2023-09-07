<script setup lang="ts">
const { copy } = useClipboard()
const gameInfo = { id: 2, url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg', name: 'plynko' }

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
function getItemInfo(obj: any) {
  console.log(obj)
}
function copyUploadCode(type: number) {
  switch (type) {
    case 1:
      copy('<BaseUpload img-type="frontId" @select-file="getFile" @delete-file="handleDelFile" />')
      break
    case 2:
      copy('<BaseUpload img-type="backId" @select-file="getFile" @delete-file="handleDelFile" />')
      break
    case 3:
      copy('<BaseUpload img-type="address" @select-file="getFile" @delete-file="handleDelFile" />')
      break
    case 4:
      copy('<BaseUpload img-type="fund" @select-file="getFile" @delete-file="handleDelFile" />')
      break
  }
}
function copyNumericKeypadCode() {
  copy(`<div style="width: 371px;">
          <BaseNumericKeypad @keyNum="handleKeyNum" @keyOk="handleKeyOk" />
        </div>`)
}
function copyAspectRatioCode(type: number) {
  switch (type) {
    case 1:
      copy(`<BaseAspectRatio ratio="1/2" width="20%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(1)">
              copy 1/2
            </BaseButton>
          </BaseAspectRatio>`)
      break
    case 2:
      copy(`<BaseAspectRatio ratio="1/1" width="20%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(2)">
              copy 1/1
            </BaseButton>
          </BaseAspectRatio>`)
      break
    case 3:
      copy(`<BaseAspectRatio ratio="16/9" width="20%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(3)">
              copy 16/9
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
function copyGameItem() {
  copy('<BaseGameItem :game-info="gameInfo" @click-item="getItemInfo" />')
}
</script>

<template>
  <ul>
    <li class="box">
      <AppDemoCard title="BaseUpload">
        <div class="flex-row">
          <div class="flex-column">
            <BaseUpload img-type="frontId" @select-file="getFile" @delete-file="handleDelFile" />
            <BaseButton @click="copyUploadCode(1)">
              copy
            </BaseButton>
          </div>
          <div class="flex-column">
            <BaseUpload img-type="backId" @select-file="getFile" @delete-file="handleDelFile" />
            <BaseButton @click="copyUploadCode(2)">
              copy
            </BaseButton>
          </div>
          <div class="flex-column">
            <BaseUpload img-type="address" @select-file="getFile" @delete-file="handleDelFile" />
            <BaseButton @click="copyUploadCode(3)">
              copy
            </BaseButton>
          </div>
          <div class="flex-column">
            <BaseUpload img-type="fund" @select-file="getFile" @delete-file="handleDelFile" />
            <BaseButton @click="copyUploadCode(4)">
              copy
            </BaseButton>
          </div>
        </div>
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
        <div style="width: 371px;margin: auto;">
          <BaseNumericKeypad @key-num="handleKeyNum" @key-ok="handleKeyOk" />
        </div>
        <div class="center">
          <BaseButton @click="copyNumericKeypadCode">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseAspectRatio">
        <div class="flex-row">
          <BaseAspectRatio ratio="1/2" width="10%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(1)">
              copy 1/2
            </BaseButton>
          </BaseAspectRatio>
          <BaseAspectRatio ratio="1/1" width="20%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(2)">
              copy 1/1
            </BaseButton>
          </BaseAspectRatio>
          <BaseAspectRatio ratio="16/9" width="20%" style="background-color: #4391e7;">
            <BaseButton @click="copyAspectRatioCode(3)">
              copy 16/9
            </BaseButton>
          </BaseAspectRatio>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseGameItem">
        <div style="margin: auto;width: 118px;height: 158px;">
          <BaseGameItem :game-info="gameInfo" @click-item="getItemInfo" />
        </div>
        <div class="center">
          <BaseButton @click="copyGameItem">
            copy
          </BaseButton>
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
.flex-column{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}
.center{
  text-align: center;
  margin-top: 20px;
}
</style>
