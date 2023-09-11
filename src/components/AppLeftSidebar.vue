<script setup lang='ts'>
interface Props {
  modelValue: boolean // 是否展开
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

function onClick() {
  emit('update:modelValue', !props.modelValue)
}

// 宽度边界 1200
const widthBoundaryXl = ref(1200)
// 宽度边界 768
const widthBoundaryMd = ref(768)
const { width } = useWindowSize()
// 左侧侧边栏宽度
const leftSidebarWidth = computed(() => {
  return `${props.modelValue ? 240 : 60}px`
})

const gameType = ref('1')
const gameTypeList = [
  { name: '娱乐城', id: '1' },
  { name: '体育', id: '2' },
]

// casino
const casinoMenu = [
  { title: '收藏夹', path: '', icon: '', children: [] },
  { title: '近期游戏记录', path: '', icon: '', children: [] },
  { title: '挑战', path: '', icon: '', children: [] },
]
const casinoGameList = [
  { title: '老虎机', path: '', icon: '', children: [] },
  { title: '真人娱乐场', path: '', icon: '', children: [] },
  { title: '游戏节目', path: '', icon: '', children: [] },
  { title: '新游戏', path: '', icon: '', children: [] },
  { title: '新游戏', path: '', icon: '', children: [] },
  { title: '新游戏', path: '', icon: '', children: [] },
]
const casinoGameProvider = [{ title: '游戏提供商', path: '', icon: '', children: [] }]

// sports
const sportsMenu = [
  { title: '滚球盘', path: '', icon: '', children: [] },
  { title: '即将开赛', path: '', icon: '', children: [] },
  { title: '我的投注', path: '', icon: '', children: [] },
]
const sportHotGames = [
  { title: '足球', path: '', icon: '', children: [] },
  { title: '网球', path: '', icon: '', children: [] },
  { title: '美式橄榄球', path: '', icon: '', children: [] },
  { title: '棒球', path: '', icon: '', children: [] },
  { title: '篮球', path: '', icon: '', children: [] },
]
const sportEsports = [
  {
    title: '所有电子竞技',
    path: '',
    icon: '',
    children: [
      { title: '彩虹六号', path: '', icon: '' },
      { title: '传说对决', path: '', icon: '' },
      { title: '刀塔2', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
  },
]
const sportGameList = [
  {
    title: '体育项目',
    path: '',
    icon: '',
    children: [
      { title: '澳洲足球', path: '', icon: '' },
      { title: '板球', path: '', icon: '' },
      { title: '棒球', path: '', icon: '' },
      { title: '足球', path: '', icon: '' },
      { title: '篮球', path: '', icon: '' },
      { title: '桌球', path: '', icon: '' },
      { title: '登山', path: '', icon: '' },
    ],
  },
]
const sportOddType = [
  {
    title: '赔率：',
    path: '',
    icon: '',
    children: [
      { title: '小数式', path: '', icon: '' },
      { title: '分数式', path: '', icon: '' },
      { title: '美式', path: '', icon: '' },
      { title: '印尼格式', path: '', icon: '' },
      { title: '香港格式', path: '', icon: '' },
      { title: '马来格式', path: '', icon: '' },
    ],
  },
]

const staticMenu1 = [
  {
    title: '个人资料',
    path: '',
    icon: 'navbar-user',
    children: [
      { title: '钱包', path: '', icon: '' },
      { title: '保险库', path: '', icon: '' },
      { title: 'VIP', path: '', icon: '' },
      { title: '统计数据', path: '', icon: '' },
      { title: '通知', path: '', icon: '' },
      { title: '体育投注', path: '', icon: '' },
      { title: '设置', path: '', icon: '' },
      { title: '登出', path: '', icon: '' },
    ],
  },
  {
    title: '促销活动',
    path: '',
    icon: 'navbar-user',
    children: [
      { title: '推荐活动一', path: '', icon: '' },
      { title: '推荐活动二', path: '', icon: '' },
      { title: '推荐活动三', path: '', icon: '' },
      { title: '查看全部', path: '', icon: '' },
    ],
  },
  { title: '联盟计划', path: '', icon: '', children: [] },
  { title: 'VIP俱乐部', path: '', icon: '', children: [] },
  { title: '博客', path: '', icon: '', children: [] },
  { title: '论坛', path: '', icon: '', children: [] },
]
const staticMenu2 = [
  {
    title: '赞助活动',
    path: '',
    icon: 'navbar-user',
    children: [
      { title: '赞助活动一', path: '', icon: '' },
      { title: '赞助活动二', path: '', icon: '' },
      { title: '赞助活动三', path: '', icon: '' },
    ],
  },
  { title: '负责任博彩', path: '', icon: '', children: [] },
  { title: '在线支持', path: '', icon: '', children: [] },
  {
    title: '语言：',
    path: '',
    icon: '',
    children: [
      { title: '中文', path: '', icon: '' },
      { title: '日文', path: '', icon: '' },
      { title: '英文', path: '', icon: '' },
    ],
  },
]
</script>

<template>
  <div
    class="left-sidebar" :style="{
      '--width': leftSidebarWidth,
    }" :class="{
      'fixed-small': width > widthBoundaryMd,
      'fixed': width < widthBoundaryXl,
      'full-screen': width <= widthBoundaryMd,
    }"
  >
    <div class="header" :class="{ 'is-small': !modelValue }">
      <div class="button" @click="onClick">
        <BaseIcon name="uni-bars" />
      </div>
      <div class="game-type">
        <div class="casino">
          <span>娱乐城</span>
        </div>
        <div class="sports">
          <span>体育</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.left-sidebar {
  width: var(--width);
  background-color: var(--tg-secondary-dark);
  transition: width 0.3s ease-in-out, top .2s ease-in-out;
  z-index: var(--tg-z-index-20);

  &.fixed {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
  }

  &.full-screen {
    // H5模式
    width: 100%;
    top: var(--tg-header-height);
    padding-bottom: var(--tg-footer-height);
  }

  &.fixed-small {
    width: var(--width);
  }
}

.header {
  display: flex;
  padding: 0 var(--tg-spacing-16) 0 0;
  touch-action: none;
  box-shadow: var(--tg-box-shadow-lg);

  .button {
    font-size: var(--tg-font-size-base);
    min-width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .game-type {
    display: flex;
    align-items: center;
    gap: var(--tg-spacing-8);
    width: 100%;
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-default);

    .casino,
    .sports {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      background-size: cover;
      background-repeat: no-repeat;
      min-height: var(--tg-spacing-36);
      background-image: url('/img/left-side-bar/casino_bg.png');
      cursor: pointer;
      border-radius: var(--tg-radius-default);

      &:hover {
        background-image: url('/img/left-side-bar/casino_bg_active.png');
      }
      &:active{
      span{
        transform: scale(0.95);
      }
    }
    }

    .sports {
      background-image: url('/img/left-side-bar/sports_bg.png');

      &:hover {
        background-image: url('/img/left-side-bar/sports_bg_active.png');
      }
    }

    .casino.active {
      background-image: url('/img/left-side-bar/casino_bg_active.png');
    }

    .sports.active {
      background-image: url('/img/left-side-bar/sports_bg_active.png');
    }
  }
}

.is-small {
  flex-direction: column;
  padding: 0 0 var(--tg-spacing-8);
  box-shadow: none;
  .button{
    box-shadow: var(--tg-box-shadow-lg);
  }

  .game-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--tg-spacing-8);
    width: 100%;
    padding: var(--tg-spacing-16) 0 0;

    span {
      display: none;
    }

    .casino,
    .sports {
      width: 44px;
      height: 44px;
      flex: unset;
    }
  }
}
</style>
