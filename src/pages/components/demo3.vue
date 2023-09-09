<script setup lang="ts">
const { copy } = useClipboard()
const imageUrl = ref('')
const imageUrl2 = ref('http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg')
const gameInfo = { id: 2, url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg', name: 'plynko' }
const percent = ref(60)
const menuInfo = ref({
  title: '顶级体育项目',
  icon: 'chess-sponsorship',
  list: [
    { title: '足球', icon: 'chess-sponsorship', id: 1 },
    { title: '足球', icon: 'chess-sponsorship', id: 2 },
    { title: '足球', icon: 'chess-sponsorship', id: 3 },
    { title: '足球', icon: 'chess-sponsorship', id: 4 },
    { title: '足球', icon: 'chess-sponsorship', id: 5 },
    { title: '足球', icon: 'chess-sponsorship', id: 6 },
    { title: '足球', icon: 'chess-sponsorship', id: 7 },
  ],
})
function onIncrease(scale: number) {
  const res = percent.value + scale
  if (res > 100)
    percent.value = 100

  else
    percent.value = res
}
function onDecline(scale: number) {
  const res = percent.value - scale
  if (res < 0)
    percent.value = 0

  else
    percent.value = res
}
function handleKeyNum(num: string) {
  console.log(num)
}
function handleKeyOk() {
  console.log('ok')
}

function getFile(file: any) {
  // console.log(file)
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function (e) {
    imageUrl.value = e.target?.result?.toString() || ''
  }
}

function handleDelFile() {
  imageUrl.value = ''
  console.log('删除')
}
function getItemInfo(obj: any) {
  console.log(obj)
}
function copyUploadCode(type: number) {
  switch (type) {
    case 1:
      copy('<BaseUpload img-type="frontId" :image-url="imageUrl" @select-file="getFile" @delete-file="handleDelFile" />')
      break
    case 2:
      copy('<BaseUpload img-type="backId" :image-url="imageUrl" @select-file="getFile" @delete-file="handleDelFile" />')
      break
    case 3:
      copy('<BaseUpload img-type="address" disabled @select-file="getFile" @delete-file="handleDelFile" />')
      break
    case 4:
      copy('<BaseUpload img-type="fund" :image-url="imageUrl2" disabled @select-file="getFile" @delete-file="handleDelFile" />')
      break
  }
}
function copyNumericKeypadCode() {
  copy(`<BaseAspectRatio ratio="371/176" width="371px" style="margin: auto;">
          <BaseNumericKeypad @key-num="handleKeyNum" @key-ok="handleKeyOk" />
        </BaseAspectRatio>`)
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
function copyBaseLogo(num: number) {
  switch (num) {
    case 1:
      copy('<BaseLogo mode="svg" svg-name="app-logo" />')
      break
    case 2:
      copy('<BaseLogo mode="picture" url="http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg" />')
      break
  }
}
function copyProgressCode(num: number) {
  switch (num) {
    case 1:
      copy('<BaseProgress :width="400" :percent="percent" :stroke-width="10" show-info />')
      break
    case 2:
      copy('<BaseProgress width="100%" :percent="100" :stroke-width="10" show-info />')
      break
    case 3:
      copy(`<BaseProgress
              :width="400"
              :percent="percent"
              :stroke-width="10"
              :stroke-color="{
                '0%': '#108ee9',
                '100%': '#87d068',
                'direction': 'right',
              }"
              show-info
            />`)
      break
    case 4:
      copy(`<BaseProgress
                :width="120"
                :stroke-width="10"
                :percent="percent"
                type="circle"
              />`)
      break
  }
}
function copyAccordion() {
  copy('<BaseAccordion :menu-info="menuInfo" />')
}
</script>

<template>
  <ul>
    <li class="box">
      <AppDemoCard title="BaseUpload">
        <div class="flex-row">
          <div class="flex-column">
            <BaseAspectRatio ratio="149/97" width="149px">
              <BaseUpload img-type="frontId" :image-url="imageUrl" @select-file="getFile" @delete-file="handleDelFile" />
            </BaseAspectRatio>
            <BaseButton @click="copyUploadCode(1)">
              copy
            </BaseButton>
          </div>
          <div class="flex-column">
            <BaseAspectRatio ratio="149/97" width="149px">
              <BaseUpload img-type="backId" :image-url="imageUrl" @select-file="getFile" @delete-file="handleDelFile" />
            </BaseAspectRatio>
            <BaseButton @click="copyUploadCode(2)">
              copy
            </BaseButton>
          </div>
          <div class="flex-column">
            <BaseAspectRatio ratio="149/97" width="149px">
              <BaseUpload img-type="address" disabled @select-file="getFile" @delete-file="handleDelFile" />
            </BaseAspectRatio>
            <BaseButton @click="copyUploadCode(3)">
              copy
            </BaseButton>
          </div>
          <div class="flex-column">
            <BaseAspectRatio ratio="149/97" width="149px">
              <BaseUpload img-type="fund" :image-url="imageUrl2" disabled @select-file="getFile" @delete-file="handleDelFile" />
            </BaseAspectRatio>
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
        <BaseAspectRatio ratio="371/176" width="371px" style="margin: auto;">
          <BaseNumericKeypad @key-num="handleKeyNum" @key-ok="handleKeyOk" />
        </BaseAspectRatio>
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
    <li class="box">
      <AppDemoCard title="BaseLogo">
        <div class="flex-row">
          <div>
            <BaseAspectRatio ratio="2/1" width="67px">
              <BaseLogo mode="svg" svg-name="app-logo" />
            </BaseAspectRatio>
            <BaseButton @click="copyBaseLogo(1)">
              copy
            </BaseButton>
          </div>
          <div>
            <BaseAspectRatio ratio="1/1" width="120px">
              <BaseLogo mode="picture" url="http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg" />
            </BaseAspectRatio>
            <BaseButton @click="copyBaseLogo(2)">
              copy
            </BaseButton>
          </div>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseProgress">
        <div class="progress-box">
          <div>
            <h2>
              基本使用 (width: 400 & type: line)
            </h2>
            <BaseProgress :width="400" :percent="percent" :stroke-width="10" show-info />
            <BaseButton @click="copyProgressCode(1)">
              copy
            </BaseButton>
          </div>
          <div>
            <h2>
              完成进度条 (width: 100% & percent: 100)
            </h2>
            <BaseProgress width="100%" :percent="100" :stroke-width="10" show-info />
            <BaseButton @click="copyProgressCode(2)">
              copy
            </BaseButton>
          </div>
          <div>
            <h2>
              渐变进度条 (width: 400)
            </h2>
            <h3>
              strokeColor: { '0%': '#108ee9', '100%': '#87d068', direction: 'right' } 或 { from: '#108ee9', to: '#87d068', direction: 'right' }
            </h3>
            <BaseProgress
              :width="400"
              :percent="percent"
              :stroke-width="10"
              :stroke-color="{
                '0%': '#108ee9',
                '100%': '#87d068',
                'direction': 'right',
              }"
              show-info
            />
            <BaseButton @click="copyProgressCode(3)">
              copy
            </BaseButton>
          </div>
          <div>
            <h2>
              进度圈基本使用 (type: circle)
            </h2>
            <div class="flex-row">
              <BaseProgress
                :width="120"
                :stroke-width="12"
                :percent="percent"
                type="circle"
              />
              <div>
                <BaseButton @click="onDecline(5)">
                  Decline-
                </BaseButton>
                <BaseButton @click="onIncrease(5)">
                  Increase+
                </BaseButton>
              </div>
            </div>
            <div>
              <BaseButton @click="copyProgressCode(4)">
                copy
              </BaseButton>
            </div>
          </div>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseAccordion">
        <BaseAccordion :menu-info="menuInfo" />
        <div class="center">
          <BaseButton @click="copyAccordion">
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
h1,h2,h3{
  color: aliceblue;
}
.progress-box{
  width: 500px;
  margin: auto;
  >div{
    margin-bottom: 25px;
  }
}
</style>
