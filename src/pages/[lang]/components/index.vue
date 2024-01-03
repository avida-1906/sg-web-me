<script lang="ts" setup>
import ids from 'virtual:svg-icons-names'
import AppDemoCard from '~/components/AppDemoCard.vue'

const { copy } = useClipboard()

function copyIcon(id: string) {
  copy(`<BaseIcon name="${id}" />`)
  toast('Copied')
}

const { openNotify } = useNotify({ onNotifyClick: () => toast('点击领取金奖') })

function showNotify() {
  openNotify({
    type: 'error',
    message: '欢迎马尼拉湾的<br />吴彦祖',
  })
  copyCode('BaseNotify')
}
function copyCode(type: string) {
  switch (type) {
    // 按钮
    case 'btn':
      copy('<BaseButton>Click</BaseButton>')
      break
    case 'btn1':
      copy('<BaseButton bg-style="primary">Click</BaseButton>')
      break
    case 'btn2':
      copy('<BaseButton bg-style="secondary">Click</BaseButton>')
      break
    case 'btn3':
      copy('<BaseButton type="text">Click</BaseButton>')
      break
    case 'btn4':
      copy('<BaseButton  type="line">Click</BaseButton>')
      break
    case 'btn5':
      copy('<BaseButton type="round-line-left">Click</BaseButton>')
      break
    case 'btn6':
      copy('<BaseButton type="round-line-right">Click</BaseButton>')
      break
    case 'btn7':
      copy('<BaseButton round>Click</BaseButton>')
      break
    case 'switch':
      copy('<BaseSwitch v-model="isSwitch" @change="onSwitch" />')
      break
    case 'radio-group':
      copy(`
        <BaseRadioGroup v-model="radioValue">
          <BaseRadio v-for="item in radioList" :key="item.value" :value="item.value">
            {{ item.label }}
          </BaseRadio>
        </BaseRadioGroup>
        `)
      break
    case 'checkbox':
      copy(`
        <BaseCheckBox v-model="checkboxValue">
          展示弹窗提示信息
        </BaseCheckBox>
        `)
      break
    case 'tab':
      copy('<BaseTab v-model="tab" :list="tabList" />')
      break
    case 'search':
      copy('<BaseSearch v-model="searchValue" clearable />')
      break
    case 'input':
      copy('<BaseInput v-model="username" label="用户名" :msg="usernameErrorMsg" placeholder="请输入用户名" must />')
      break
    case 'input-pwd':
      copy('<BaseInput v-model="password" label="密码" :msg="pwdErrorMsg" placeholder="请输入用户名" type="password" must />')
      break
    case 'select':
      copy('<BaseSelect v-model="selectValue" label="选择区号" :options="selectOptions" must />')
      break
    case 'skeleton':
      copy('<BaseSkeleton />')
      break
    case 'birthday':
      copy('<BaseInputBirthday v-model="birthday" must />')
      break

    case 'BaseLoading':
      copy('<BaseLoading />')
      break
    case 'useDialog':
      copy(`
        const { openDialog, closeDialog } = useDialog({
          title: '表格',
          icon: 'balls-darts-on',
          default: () => h(AppDemoCard, { title: '标题' }, {
            default: () => h('table', { style: { color: 'orange' } }, 'abcdefg'),
          }),
          onCancel: () => { console.log('dialog canceled') },
          onConfirm: () => { console.log('dialog confirm') },
        })
      `)
      break
    case 'BaseDialog':
      copy(`
        <BaseDialog v-model:show="showDialogOne" icon="uni-trend" title="提款">
          <div class="data-table">
            一个外部弹窗
          </div>
        </BaseDialog>
      `)
      break
    case 'BaseNotify':
      copy(`
        openNotify({
          title: () => h('p', { style: { color: 'orange' } }, 'makati 靓仔'),
          message: '欢迎马尼拉湾的<br />吴彦祖',
          // default: () => h('h1', '啊不错滴'),
        })
      `)
      break
    case 'BaseDragDialog':
      copy(`
          // 打开实时数据或直播
          function openDragDialog(type: 'trend' | 'live') {
            useDragDialog({ type, url: '' })
          }
      `)
      break
    case 'VDropdown':
      copy(`
        <VDropdown
            :distance="6"
          >
            <button class="tips" @click="copyCode('VDropdown')">
              VDropdown
            </button>
            <template #popper>
              <input v-model="msg" class="tooltip-content" placeholder="Tooltip content">
              <p>
                {{ msg }}
              </p>
            </template>
          </VDropdown>
        `)
      break
    case 'VMenu':
      copy(`
        <VMenu>
            <button class="tips" @click="copyCode('VMenu')">
              VMenu
            </button>
            <template #popper>
              <button>Guide</button>
              <button>API Reference</button>
            </template>
          </VMenu>
      `)
      break
    case 'VTooltip':
      copy(`
        <VTooltip>
            <a class="tips" @click="copyCode('VTooltip')">VTooltip</a>
            <template #popper>
              Help me fund my Open Source work!
            </template>
          </VTooltip>
      `)
      break
    case 'BaseDialog2':
      copy(`
        <BaseDialog v-model:show="showDialogTwo">
          <div class="data-table">
            一个外部弹窗 只有内容
          </div>
        </BaseDialog>
      `)
      break
    case 'BaseMenu':
      copy(`
        <BaseMenu :data="
        [{ title: '存款', path: '/components' }, { title: '提款', path: '/' }]"
        />
      `)
      break
    case 'BaseLabel':
      copy(`
        <BaseLabel label="select标题:"
          label-content="温馨提示自定义" content-color="--tg-text-error" content-size="14">
          <BaseSelect v-model="selectValue" :options="selectOptions" must />
        </BaseLabel>
      `)
      break
    case 'BaseInputPassword':
      copy(`
      <BaseInputPassword v-model="selectValue" :width-auto="false" />
      `)
      break
    case 'BaseSecondaryAccordion':
      copy(`
      <BaseSecondaryAccordion title="ATP / ATP上海站，中国，男单" show-more loading>
          <template #side="{ isOpen }">
            <div v-show="!isOpen" style="--tg-badge-font-size: 12px;margin-right: 16px;">
              <BaseBadge :count="9" />
            </div>
          </template>
          <template #default>
            <div>盘口</div>
          </template>
        </BaseSecondaryAccordion>
      `)
      break
    case 'BaseSwiper':
      copy(`
      <BaseSwiper
          :data="[
            { value: '50.5', label: '50.5' },
            { value: '60.5', label: '60.5' },
          ]"
        />
      `)
      break
    case 'BaseDatePicker':
      copy(`
        const datepicker = ref([])
        <BaseDatePicker v-model="datepicker" />
      `)
      break
    case 'BasePagination':
      copy(`
        const currentPage = ref(1)
        <BasePagination v-model:current-page="currentPage" :total="1007" />
      `)
      break
    default:
      break
  }
  toast('Copied')
}
const { bool: isSwitch } = useBoolean(false)

function onSwitch(v: boolean) {
  console.log('🚀 ~ file: demo.vue:10 ~ onSwitch ~ v:', v)
}
const radioList = [
  { value: 'usd', label: 'usd' },
  { value: 'eur', label: 'EUR' },
  { value: 'jpy', label: 'JPY' },
  { value: 'inr', label: 'INR' },
  { value: 'brl', label: 'BRL' },
  { value: 'cad', label: 'CAD', disabled: true },
  { value: 'cny', label: 'CNY' },
  { value: 'idr', label: 'IDR' },
  { value: 'krw', label: 'KRW' },
  { value: 'mxn', label: 'MXN' },
  { value: 'php', label: 'PHP', disabled: true },
  { value: 'rub', label: 'RUB' },
]
const radioValue = ref('php')
const { bool: checkboxValue } = useBoolean(false)

const tab = ref('1')
const tabList = [
  { value: '1', label: 'Tab 11111111' },
  { value: '2', label: 'Tab 2' },
  { value: '3', label: 'Tab 3333' },
  { value: '3', label: 'Tab 3333' },
  { value: '3', label: 'Tab 3333' },
]
const searchValue = ref('')
const {
  value: username,
  errorMessage: usernameErrorMsg,
} = useField<string>('username', (value) => {
  if (!value)
    return '错误文字'

  return ''
})
const {
  value: password,
  errorMessage: pwdErrorMsg,
} = useField<string>('password', (value) => {
  if (!value)
    return '错误文字'

  return ''
})

const selectValue = ref('')
const selectOptions = [
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' },
  { value: '4', label: '选项4' },
  { value: '5', label: '选项5' },
]
const birthday = ref('')

const { bool: showDialogOne, setTrue: setShowDialogOneTrue } = useBoolean(false)
const { bool: showDialogTwo, setTrue: setShowDialogTwoTrue } = useBoolean(false)

const { openDialog, closeDialog } = useDialog({
  title: '表格',
  icon: 'balls-darts-on',
  maxWidth: 400,
  showButtons: true,
  default: ({ currency }) => h(AppDemoCard, { title: `标题+${currency}` }, {
    default: () => h('table', { style: { color: 'orange' } }, 'abcdefg'),
  }),
  onCancel: () => { console.log('dialog canceled') },
  onConfirm: () => { console.log('dialog confirm') },
})
const timerD = ref()
function showDialog() {
  copyCode('useDialog')
  clearTimeout(timerD.value)
  openDialog({ currency: 'usdt' })
  timerD.value = setTimeout(() => {
    closeDialog()
  }, 3000)
}
function showTemDialog() {
  setShowDialogOneTrue()
  copyCode('BaseDialog')
}
function showTemDialog2() {
  setShowDialogTwoTrue()
  copyCode('BaseDialog2')
}
// 打开实时数据或直播
function openDragDialog(type: 'trend' | 'live') {
  useDragDialog({ type, url: '', dialogId: '123' })
  copyCode('BaseDragDialog')
}

const msg = ref('哈哈哈哈哈哈哈哈哈哈哈哈哈哈')

const list = [
  { id: 1, key: 'left', name: '偏左' },
  { id: 2, key: 'center', name: '居中' },
  { id: 3, key: 'right', name: '偏右' },
  { id: 4, key: 'right', name: '偏移量20%', offset: '20%' },
]
function copyDividerCode(type: number) {
  switch (type) {
    // 按钮
    case 1:
      copy('<BaseDivider titlePlacement="left">偏左</BaseDivider>')
      break
    case 2:
      copy('<BaseDivider titlePlacement="center">居中</BaseDivider>')
      break
    case 3:
      copy('<BaseDivider titlePlacement="right">偏右</BaseDivider>')
      break
    case 4:
      copy('<BaseDivider titlePlacement="right" offset="20%">偏移量20%</BaseDivider>')
      break
    default:
      break
  }
}

function copyEmptyCode(type: number) {
  switch (type) {
    // 按钮
    case 1:
      copy('<BaseEmpty description="自定义数据" icon="navbar-user-bet"></BaseEmpty>')
      break
    case 2:
      copy('<BaseEmpty></BaseEmpty>')
      break
    case 3:
      copy(`<BaseEmpty>
              <template #icon>
                <BaseIcon font-size="58" name="navbar-user-bet" />
              </template>
              <template #description>
                <span>自定义插槽</span>
              </template>
              <BaseButton @click="copyEmptyCode(3)">
                copy
              </BaseButton>
            </BaseEmpty>`)
      break
    default:
      break
  }
}

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
      copy('<BaseBadge mode="blacks" :count="25" />')
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
  copy('<BaseAccordion :menu-info="menuInfo" auto-show @click-head="handleClickHead" @click-item="handleClickItem" />')
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
function handleClickHead(menu: object) {
  console.log(menu)
}
function handleClickItem(item: object) {
  console.log(item)
}
function copyIconName(name: string) {
  copy(name)
  toast('Copied')
}
function copyCollapseCode() {
  copy('<BaseCollapse title="这是标题" icon="chat-star-gold" @click-show="funtion()" @click-close="funtion()" />')
  toast('Copied')
}
function copyAppPercentageCode() {
  copy('<AppPercentage :total="45" :percentage="39" />')
  toast('Copied')
}
function copyAppAuthLogin() {
  copy('<AppAuthLogin />')
  toast('Copied')
}
const breadcrumbs = ['one', 'two', 'three', 'four']

const datepicker = ref([])
const currentPage = ref(1)
const { openMessageDialog } = useDialogMessage()
const { openNoticeDialog } = useDialogNotice()
const { openDepositDetailDialog } = useDialogDepositDetail()
const { openBetSlipDialog } = useDialogBetSlip()

const baseListList = ref([1, 2, 3])
const baseListFinished = ref(false)
const baseListLoading = ref(false)
function loadMore() {
  baseListLoading.value = true
  const t = setTimeout(() => {
    baseListList.value.push(Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10))
    console.log('list.value===>', baseListList.value.length)
    baseListLoading.value = false
    if (baseListList.value.length >= 15)
      baseListFinished.value = true

    clearTimeout(t)
  }, 1500)
}
</script>

<template>
  <ul class="demo-page">
    <li class="box">
      <AppDemoCard title="BaseNoticeBar">
        <BaseNoticeBar>
          <template #prefix>
            <div style="padding: 0 20px;">
              <BaseIcon name="uni-speaker" />
            </div>
          </template>
          BaseNoticeBar,
          BaseNoticeBar,
          BaseNoticeBar,
          BaseNoticeBar,
        </BaseNoticeBar>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseList">
        <div class="base-list-box">
          <BaseList
            :loading="baseListLoading"
            :finished="baseListFinished" @load="loadMore"
          >
            <div v-for="i in baseListList" :key="i" class="item">
              {{ i }}
            </div>
          </BaseList>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="站内信、公告、存款详情、注单弹窗">
        <BaseButton @click="openMessageDialog">
          站内信
        </BaseButton>
        <BaseButton @click="openNoticeDialog">
          公告
        </BaseButton>
        <BaseButton @click="openDepositDetailDialog">
          存款详情
        </BaseButton>
        <BaseButton @click="openBetSlipDialog({ type: 'casino', data: {} })">
          娱乐城投注详情
        </BaseButton>
        <BaseButton
          @click="openBetSlipDialog({ type: 'sports', data: { betType: 'single' } })"
        >
          体育投注详情-单式
        </BaseButton>
        <BaseButton
          @click="openBetSlipDialog({ type: 'sports', data: { betType: 'multi' } })"
        >
          体育投注详情-复式
        </BaseButton>
      </AppDemoCard>
    </li>

    <li class="box">
      <AppDemoCard title="BaseBreadcrumbs">
        <BaseBreadcrumbs :list="breadcrumbs" />
      </AppDemoCard>
    </li>
    <!-- <li class="box">
      <AppDemoCard title="AppRegisterTermsConditions">
        <AppRegisterTermsConditions />
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="AppLoginDialog">
        <AppLoginDialog />
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="AppRegisterDialog">
        <AppRegisterDialog />
      </AppDemoCard>
    </li> -->
    <li class="box">
      <AppDemoCard title="BaseIcon">
        <ul class="icon-wrap m0 p0">
          <li v-for="id in ids" :key="id" class="item">
            <div alt="复制组件" title="复制组件" @click="() => copyIcon(id.slice(5))">
              <BaseIcon :name="id.slice(5)" />
            </div>
            <div
              alt="复制名称" title="复制名称" class="copy-name"
              @click="() => copyIconName(id.slice(5))"
            >
              <!-- {{ id.slice(5) }} -->
              123
            </div>
          </li>
        </ul>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="skeleton">
        <BaseSkeleton @click="copyCode('skeleton')" />
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseDatePicker">
        {{ datepicker }}
        <div class="center">
          <BaseDatePicker v-model="datepicker" />
        </div>
        <div style="margin-top: 30px;">
          <BaseButton @click="copyCode('BaseDatePicker')">
            Click
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BasePagination">
        {{ currentPage }}
        <div class="center">
          <BasePagination v-model:current-page="currentPage" :total="1007" />
        </div>
        <div style="margin-top: 30px;">
          <BaseButton @click="copyCode('BasePagination')">
            Click
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseButton">
        <div style="margin-bottom: 10px;">
          <BaseButton @click="copyCode('btn')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton bg-style="primary" @click="copyCode('btn1')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton bg-style="secondary" @click="copyCode('btn2')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton type="text" @click="copyCode('btn3')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton type="line" @click="copyCode('btn4')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton type="round-line-left" @click="copyCode('btn5')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton type="round-line-right" @click="copyCode('btn6')">
            Click
          </BaseButton>
        </div>
        <div style="margin-bottom: 10px;">
          <BaseButton round @click="copyCode('btn7')">
            Click
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseSwitch">
        <BaseSwitch v-model="isSwitch" @change="onSwitch" @click="copyCode('switch')" />
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseRadioGroup">
        <BaseButton round @click="copyCode('radio-group')">
          copy
        </BaseButton>
        <BaseRadioGroup v-model="radioValue">
          <BaseRadio v-for="item in radioList" :key="item.value" :value="item.value">
            {{ item.label }}
          </BaseRadio>
        </BaseRadioGroup>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseLoading">
        <BaseButton round @click="copyCode('BaseLoading')">
          copy
        </BaseButton>
        <div class="box">
          <BaseLoading />
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseNotify">
        <div class="box">
          <BaseButton @click="showNotify">
            展示弹窗提示信息 const { openNotify } = useNotify() 函数
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseCheckBox">
        <BaseCheckBox v-model="checkboxValue" @click="copyCode('checkbox')">
          一个复选框
        </BaseCheckBox>
        <BaseCheckBox
          v-model="checkboxValue" shape="circle"
          @click="copyCode('checkbox')"
        />
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseTab">
        <BaseButton round @click="copyCode('tab')">
          copy
        </BaseButton>
        <BaseTab v-model="tab" :list="tabList" />
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseSearch">
        <BaseButton round @click="copyCode('search')">
          copy
        </BaseButton>
        <BaseSearch v-model="searchValue" white-style clearable shape="square">
          <template #left>
            123
          </template>
        </BaseSearch>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseDialog">
        <div class="box">
          <BaseButton @click="showDialog">
            展示弹窗 useDialog
          </BaseButton>
          <div style="height: 20px;" />
          <BaseButton @click="showTemDialog">
            展示弹窗 template
          </BaseButton>
          <div style="height: 20px;" />
          <BaseButton @click="showTemDialog2">
            展示弹窗没有 header template
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseInput">
        <BaseButton round @click="copyCode('input')">
          copy username
        </BaseButton>
        <BaseInput
          v-model="username" label="用户名" :msg="usernameErrorMsg"
          placeholder="请输入用户名" must
        />
        <BaseButton round @click="copyCode('input-pwd')">
          copy password
        </BaseButton>
        <BaseInput
          v-model="password" label="密码" :msg="pwdErrorMsg"
          placeholder="请输入用户名" type="password" must
        />
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseSelect">
        <BaseButton round @click="copyCode('select')">
          copy
        </BaseButton>
        <BaseSelect v-model="selectValue" label="选择区号" :options="selectOptions" must />
        <BaseSelect v-model="selectValue" :options="selectOptions" />
        <BaseSelect v-model="selectValue" popper :options="selectOptions" />
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseInputBirthday">
        <BaseButton round @click="copyCode('birthday')">
          copy
        </BaseButton>
        <BaseInputBirthday v-model="birthday" must />
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseDragDialog">
        <BaseButton round @click="openDragDialog('live')">
          展示可拖拽弹窗
        </BaseButton>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseDivider">
        <div v-for="item in list" :key="item.id" class="center">
          <BaseDivider :title-placement="item.key" :offset="item.offset">
            {{ item.name }}
          </BaseDivider>
          <BaseButton @click="copyDividerCode(item.id)">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseEmpty">
        <div class="center">
          <BaseEmpty description="自定义数据" icon="navbar-user-bet">
            <BaseButton @click="copyEmptyCode(1)">
              copy
            </BaseButton>
          </BaseEmpty>
          <BaseEmpty>
            <BaseButton @click="copyEmptyCode(2)">
              copy
            </BaseButton>
          </BaseEmpty>
          <BaseEmpty>
            <template #icon>
              <BaseIcon font-size="58" name="navbar-user-bet" />
            </template>
            <template #description>
              <span>自定义插槽</span>
            </template>
            <BaseButton @click="copyEmptyCode(3)">
              copy
            </BaseButton>
          </BaseEmpty>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseUpload">
        <div class="flex-row">
          <div class="flex-column">
            <BaseAspectRatio ratio="149/97" width="149px">
              <BaseUpload
                img-type="frontId" :image-url="imageUrl" @select-file="getFile"
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
                img-type="backId" :image-url="imageUrl" @select-file="getFile"
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
                img-type="address" disabled @select-file="getFile"
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
                img-type="fund" :image-url="imageUrl2" disabled @select-file="getFile"
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
              strokeColor: { '0%': '#108ee9', '100%': '#87d068', direction: 'right' } 或
              { from: '#108ee9', to: '#87d068', direction: 'right' }
            </h3>
            <BaseProgress
              :width="400" :percent="percent" :stroke-width="10" :stroke-color="{
                '0%': '#108ee9',
                '100%': '#87d068',
                'direction': 'right',
              }" show-info
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
                :width="120" :stroke-width="12" :percent="percent"
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
        <BaseAccordion
          :menu-info="menuInfo" auto-show @click-head="handleClickHead"
          @click-item="handleClickItem"
        />
        <div class="center">
          <BaseButton @click="copyAccordionCode">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseSecondaryAccordion">
        <BaseSecondaryAccordion
          title="ATP / ATP上海站，中国，男单" loading show-more
          icon="spt-game-intl"
        >
          <template #side="{ isOpen }">
            <div v-show="!isOpen" style="--tg-badge-font-size: 12px;margin-right: 16px;">
              <BaseBadge :count="9" />
            </div>
          </template>
          <template #default>
            <div>盘口</div>
          </template>
        </BaseSecondaryAccordion>
        <div class="center">
          <BaseButton @click="copyCode('BaseSecondaryAccordion')">
            copy
          </BaseButton>
        </div>
        <BaseSecondaryAccordion title="亚洲让分盘" level="3">
          <template #sideThird>
            <div class="odds-buttons" @click.stop="console.log('ooooooo')">
              <span>赔率表</span>
              <span>全部</span>
            </div>
          </template>
          <template #default>
            <div>盘口</div>
          </template>
        </BaseSecondaryAccordion>
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
        <BaseTable :columns="columns" :data-source="tableData" :loading="loading">
          <template #name="{ record }">
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
      <AppDemoCard title="VDropdown VMenu VTooltip">
        <VDropdown :distance="6">
          <button class="tips" @click="copyCode('VDropdown')">
            VDropdown
          </button>
          <template #popper>
            <input v-model="msg" class="tooltip-content" placeholder="Tooltip content">
            <p>
              {{ msg }}
            </p>
          </template>
        </VDropdown>
        <div />
        <VMenu>
          <button class="tips" @click="copyCode('VMenu')">
            VMenu
          </button>
          <template #popper>
            <button>Guide</button>
            <button>API Reference</button>
          </template>
        </VMenu>
        <VTooltip>
          <a class="tips" @click="copyCode('VTooltip')">VTooltip</a>
          <template #popper>
            Help me fund my Open Source work!
          </template>
        </VTooltip>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseCollapse" style="text-align:left">
        <BaseCollapse title="这是标题" icon="chat-star-gold" />
        <div class="center">
          <BaseButton @click="copyCollapseCode">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="AppPercentage" style="text-align:left">
        <AppPercentage :total="45" :percentage="39" />
        <AppPercentage :total="80" :percentage="40" />
        <AppPercentage :total="100" :percentage="25" />
        <div class="center">
          <BaseButton @click="copyAppPercentageCode">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseAuthLogin" style="text-align:left">
        <AppAuthLogin />
        <div class="center">
          <BaseButton @click="copyAppAuthLogin">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseMenu" style="text-align:left">
        <BaseMenu
          :data="[{ title: '存款', path: '/components' },
                  { title: '提款', path: '/' }]"
        />
        <div class="center">
          <BaseButton @click="copyCode('BaseMenu')">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseLabel" style="text-align:left">
        <BaseLabel label="input标题:" label-content="温馨提示自定义">
          <BaseInput
            v-model="username" :msg="usernameErrorMsg"
            placeholder="请输入用户名" must
          />
        </BaseLabel>
        <BaseLabel
          label="select标题:" label-content="温馨提示自定义"
          content-color="--tg-text-error"
          content-size="14"
        >
          <BaseSelect v-model="selectValue" :options="selectOptions" must />
        </BaseLabel>
        <div class="center">
          <BaseButton @click="copyCode('BaseLabel')">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseInputPassword" style="text-align:center">
        <BaseInputPassword v-model="selectValue" :width-auto="false" />
        <div class="center">
          <BaseButton @click="copyCode('BaseInputPassword')">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseSwiper">
        <div class="center" style="width: 280px;margin:0 auto;">
          <BaseSwiper
            :data="[
              { value: '50.5', label: '50.5' },
              { value: '60.5', label: '60.5' },
            ]"
          />
        </div>
        <div class="center">
          <BaseButton @click="copyCode('BaseSwiper')">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
  </ul>
  <BaseDialog v-model:show="showDialogOne" icon="uni-trend" title="提款">
    <div class="data-table">
      一个外部弹窗
    </div>
  </BaseDialog>
  <BaseDialog v-model:show="showDialogTwo">
    <div class="data-table">
      一个外部弹窗 只有内容
    </div>
  </BaseDialog>
</template>

<style lang="scss" scoped>
.base-list-box{
  width: 500px;
  height: 600px;
  border: 1px solid white;
  .item{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #72ACED;
    border-bottom: 2px solid red;
  }
}
.tips {
  color: #fff;
  font-weight: bold;
}

.demo-page {
  padding-bottom: 50px;
  height:100%;
  overflow:auto;
}

.box {
  padding: 5px;
  position: relative;
  text-align: center;
  color: white;
}

.icon-wrap {
  display: flex;
  list-style: none;
  align-items: flex-start;
  flex-wrap: wrap;

  .item {
    cursor: pointer;
    width: 60px;
    font-size: 50px;

    .copy-name {
      color: #666;
      font-size: 10px;
      line-height: 28px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      max-width: 55px;
      text-align: center;
      margin: 4px auto;

    }
  }
}

.data-table {
  padding: var(--tg-spacing-12);
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.flex-column {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}

.center {
  text-align: center;
  margin-top: 20px;
}

h1,
h2,
h3 {
  color: aliceblue;
}

.progress-box {
  width: 500px;
  margin: auto;

  >div {
    margin-bottom: 25px;
  }
}
</style>
