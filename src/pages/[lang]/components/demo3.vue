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
    { title: '篮球', icon: 'chess-sponsorship', id: 2 },
    { title: '网球', icon: 'chess-sponsorship', id: 3 },
    { title: '棒球', icon: 'chess-sponsorship', id: 4 },
    { title: '篮球', icon: 'chess-sponsorship', id: 5 },
    { title: '橄榄球', icon: 'chess-sponsorship', id: 6 },
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
function clickImg() {
  console.log('点我')
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
      copy('<BaseBadge mode="active" :count="5"><BaseButton @click="copyBadgeCode(1)"> copy </BaseButton></BaseBadge>')
      break
    case 2:
      copy('<BaseBadge :count="99" :max="10"><BaseButton @click="copyBadgeCode(2)"> copy </BaseButton></BaseBadge>')
      break
    case 3:
      copy('<BaseBadge :dot="true"><BaseButton @click="copyBadgeCode(3)"> copy </BaseButton></BaseBadge>')
      break
    case 4:
      copy('<BaseBadge mode="black" :count="25" />')
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
function copyAccordionCode() {
  copy('<BaseAccordion :menu-info="menuInfo" />')
}
function copyImageCode() {
  copy('<BaseImage url="http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg" @click-img="clickImg" />')
}
function copyTableCode() {
  copy(`<BaseTable
          :columns="columns"
          :data-source="tableData"
          :loading="loading"
        >
          <template #name="record">
            hello {{ record.name }}
          </template>
          <template #job="{ job }">
            hi {{ job }}
          </template>
        </BaseTable>`)
}
const { bool: loading, setFalse } = useBoolean(true)
const columns: any = ref([
  {
    title: '赛事',
    width: 100,
    dataIndex: 'name',
    slot: 'name',
    align: 'left',
  },
  {
    title: '玩家',
    width: 100,
    dataIndex: 'age',
    align: 'center',
  },
  {
    title: '时间',
    width: 100,
    dataIndex: 'job',
    slot: 'job',
    align: 'center',
  },
  {
    title: '赔率',
    width: 100,
    dataIndex: 'sex',
    align: 'center',
  },
  {
    title: '地址',
    width: 100,
    dataIndex: 'address',
    align: 'right',
  },
])
const tableData: any = ref([])
onMounted(() => {
  setTimeout(() => {
    tableData.value = [
      {
        name: 'Stephen',
        age: 30,
        job: 'player',
        sex: '男',
        address: 'CaliforniaCaliforniaCaliforniaCaliforniaCaliforniaCalifornia',
      },
      {
        name: 'Leo',
        age: 36,
        job: 'actor',
        sex: '男',
        address: 'LA',
      },
      {
        name: 'Mr.Dear',
        age: 23,
        job: 'boy',
        sex: '男',
        address: 'Beijing',
      },
      {
        name: 'superman',
        age: 32,
        job: 'boy',
        sex: '男',
        address: 'US',
      },
    ]
    setFalse()
  }, 3000)
})
</script>

<template>
  <ul>
    <li class="box">
      <AppDemoCard title="BaseUpload">
        <div class="flex-row">
          <div class="flex-column">
            <BaseAspectRatio ratio="149/97" width="149px">
              <BaseUpload
                img-type="frontId"
                :image-url="imageUrl"
                @select-file="getFile"
                @delete-file="handleDelFile"
              />
            </BaseAspectRatio>
            <BaseButton @click="copyUploadCode(1)">
              copy
            </BaseButton>
          </div>
          <div class="flex-column">
            <BaseAspectRatio ratio="149/97" width="149px">
              <BaseUpload
                img-type="backId"
                :image-url="imageUrl"
                @select-file="getFile"
                @delete-file="handleDelFile"
              />
            </BaseAspectRatio>
            <BaseButton @click="copyUploadCode(2)">
              copy
            </BaseButton>
          </div>
          <div class="flex-column">
            <BaseAspectRatio ratio="149/97" width="149px">
              <BaseUpload
                img-type="address"
                disabled
                @select-file="getFile"
                @delete-file="handleDelFile"
              />
            </BaseAspectRatio>
            <BaseButton @click="copyUploadCode(3)">
              copy
            </BaseButton>
          </div>
          <div class="flex-column">
            <BaseAspectRatio ratio="149/97" width="149px">
              <BaseUpload
                img-type="fund"
                :image-url="imageUrl2"
                disabled
                @select-file="getFile"
                @delete-file="handleDelFile"
              />
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
            <BaseBadge mode="active" :count="5">
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
              <BaseBadge mode="black" :count="25" />
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
            <h3 />
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
        <BaseAccordion :menu-info="menuInfo" auto-show />
        <div class="center">
          <BaseButton @click="copyAccordionCode">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseImage">
        <div style="width:300px;height: 300px;margin: auto;">
          <BaseImage :url="imageUrl2" @click-img="clickImg" />
        </div>
        <div class="center">
          <BaseButton @click="copyImageCode">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseTable">
        <BaseTable
          :columns="columns"
          :data-source="tableData"
          :loading="loading"
        >
          <template #name=" { record }">
            hello {{ record.name }}
          </template>
          <template #job="{ record }">
            hi {{ record.job }}
          </template>
        </BaseTable>
        <div class="center">
          <BaseButton @click="copyTableCode">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseCollapse">
        <BaseCollapse />
        <div class="center">
          <BaseButton @click="copyTableCode">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.flex-row {
  // --tg-badge-color: red;
  // --tg-badge-background-color: white;
  // --tg-badge-font-size: 18px;
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
