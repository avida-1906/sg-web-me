<script setup lang="ts">
const { copy } = useClipboard()
const gameList = [
  { id: 1, url: 'http://b.hiphotos.baidu.com/image/pic/item/279759ee3d6d55fbb3586c0168224f4a20a4dd7e.jpg', name: 'plynko' },
  { id: 2, url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg', name: 'plynko' },
  { id: 3, url: 'http://h.hiphotos.baidu.com/image/pic/item/7c1ed21b0ef41bd5f2c2a9e953da81cb39db3d1d.jpg', name: 'plynko' },
  { id: 4, url: 'http://g.hiphotos.baidu.com/image/pic/item/55e736d12f2eb938d5277fd5d0628535e5dd6f4a.jpg', name: 'plynko' },
  { id: 5, url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg', name: 'plynko' },
  { id: 6, url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg', name: 'plynko' },
  { id: 7, url: 'http://e.hiphotos.baidu.com/image/pic/item/4bed2e738bd4b31c1badd5a685d6277f9e2ff81e.jpg', name: 'plynko' },
  { id: 8, url: 'http://g.hiphotos.baidu.com/image/pic/item/0d338744ebf81a4c87a3add4d52a6059252da61e.jpg', name: 'plynko' },
  { id: 9, url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg', name: 'plynko' },
  { id: 10, url: 'http://f.hiphotos.baidu.com/image/pic/item/4034970a304e251f503521f5a586c9177e3e53f9.jpg', name: 'plynko' },
  { id: 11, url: 'http://b.hiphotos.baidu.com/image/pic/item/279759ee3d6d55fbb3586c0168224f4a20a4dd7e.jpg', name: 'plynko' },
  { id: 12, url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg', name: 'plynko' },
  { id: 13, url: 'http://h.hiphotos.baidu.com/image/pic/item/7c1ed21b0ef41bd5f2c2a9e953da81cb39db3d1d.jpg', name: 'plynko' },
  { id: 14, url: 'http://g.hiphotos.baidu.com/image/pic/item/55e736d12f2eb938d5277fd5d0628535e5dd6f4a.jpg', name: 'plynko' },
  { id: 15, url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg', name: 'plynko' },
  { id: 16, url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg', name: 'plynko' },
  { id: 17, url: 'http://e.hiphotos.baidu.com/image/pic/item/4bed2e738bd4b31c1badd5a685d6277f9e2ff81e.jpg', name: 'plynko' },
  { id: 18, url: 'http://g.hiphotos.baidu.com/image/pic/item/0d338744ebf81a4c87a3add4d52a6059252da61e.jpg', name: 'plynko' },
  { id: 19, url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg', name: 'plynko' },
  { id: 20, url: 'http://f.hiphotos.baidu.com/image/pic/item/4034970a304e251f503521f5a586c9177e3e53f9.jpg', name: 'plynko' },
]
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
  copy('<BaseGameItem :game-list="gameList" @item-info="getItemInfo" />')
}
</script>

<template>
  <ul>
    <li class="box">
      <AppDemoCard title="BaseUpload">
        <BaseUpload style="margin: auto;" @select-file="getFile" @delete-file="handleDelFile" />
        <div class="center">
          <BaseButton @click="copyUploadCode">
            copy
          </BaseButton>
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
          <BaseAspectRatio ratio="1/2" width="20%" style="background-color: #4391e7;">
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
        <div style="margin: auto;">
          <BaseGameItem :game-list="gameList" @item-info="getItemInfo" />
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
.center{
  text-align: center;
  margin-top: 20px;
}
</style>
