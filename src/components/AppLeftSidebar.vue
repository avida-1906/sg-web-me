<script setup lang='ts'>
interface Props {
  modelValue: boolean // 是否展开
  isFixedSmall: boolean
  isFixed: boolean
  isFullScreen: boolean
  isSwitching: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const isExpand = computed(() => props.modelValue)

function onClick() {
  emit('update:modelValue', !props.modelValue)
}

const router = useRouter()
const route = useRoute()
const isCasino = computed(() => route.name === 'casino')
const isSports = computed(() => route.name === 'sports')
// 搜索栏
const gameType = ref(isCasino.value ? '1' : isSports.value ? '2' : '')
function onGameTypeChange(v: string) {
  gameType.value = v
}

// casino
const casinoMenu = [
  { title: '收藏夹', path: '', icon: '', list: [], domId: '' },
  { title: '近期游戏记录', path: '', icon: '', list: [], domId: '' },
  { title: '挑战', path: '', icon: '', list: [], domId: '' },
]
const casinoGameList = [
  { title: '老虎机', path: '', icon: '', list: [], domId: '' },
  { title: '真人娱乐场', path: '', icon: '', list: [], domId: '' },
  { title: '游戏节目', path: '', icon: '', list: [], domId: '' },
  { title: '新游戏', path: '', icon: '', list: [], domId: '' },
  { title: '新游戏', path: '', icon: '', list: [], domId: '' },
  { title: '新游戏', path: '', icon: '', list: [], domId: '' },
]
const casinoGameProvider = [{ title: '游戏提供商', path: '', icon: '', list: [], domId: '' }]

// sports
const sportsMenu = [
  { title: '滚球盘', path: '', icon: '', list: [], domId: '' },
  { title: '即将开赛', path: '', icon: '', list: [], domId: '' },
  { title: '我的投注', path: '', icon: '', list: [], domId: '' },
]
const sportHotGames = [
  {
    title: '足球',
    path: '',
    icon: '',
    list: [
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-hot-game-football',
  },
  {
    title: '网球',
    path: '',
    icon: '',
    list: [
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-hot-game-tennis',
  },
  {
    title: '美式橄榄球',
    path: '',
    icon: '',
    list: [
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-hot-game-use-football',
  },
  {
    title: '棒球',
    path: '',
    icon: '',
    list: [
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-hot-game-use-baseball',
  },
  {
    title: '篮球',
    path: '',
    icon: '',
    list: [
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-hot-game-use-basketball',
  },
]
const sportEsports = [
  {
    title: '所有电子竞技',
    path: '',
    icon: '',
    list: [
      { title: '彩虹六号', path: '', icon: '' },
      { title: '传说对决', path: '', icon: '' },
      { title: '刀塔2', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
      { title: '激斗峡谷', path: '', icon: '' },
    ],
    domId: 'sports-e-sports',
  },
]
const sportGameList = [
  {
    title: '体育项目',
    path: '',
    icon: '',
    list: [
      { title: '澳洲足球', path: '', icon: '' },
      { title: '板球', path: '', icon: '' },
      { title: '棒球', path: '', icon: '' },
      { title: '足球', path: '', icon: '' },
      { title: '篮球', path: '', icon: '' },
      { title: '桌球', path: '', icon: '' },
      { title: '登山', path: '', icon: '' },
    ],
    domId: 'sports-game-list',
  },
]
const sportOddType = [
  {
    title: '赔率：',
    path: '',
    icon: '',
    list: [
      { title: '小数式', path: '', icon: '' },
      { title: '分数式', path: '', icon: '' },
      { title: '美式', path: '', icon: '' },
      { title: '印尼格式', path: '', icon: '' },
      { title: '香港格式', path: '', icon: '' },
      { title: '马来格式', path: '', icon: '' },
    ],
    domId: 'sports-odd-type',
  },
]

const staticMenu1 = [
  {
    title: '个人资料',
    path: '',
    icon: 'navbar-user',
    list: [
      { title: '钱包', path: '', icon: 'navbar-user' },
      { title: '保险库', path: '', icon: 'navbar-user' },
      { title: 'VIP', path: '', icon: 'navbar-user' },
      { title: '统计数据', path: '', icon: 'navbar-user' },
      { title: '通知', path: '', icon: 'navbar-user' },
      { title: '体育投注', path: '', icon: 'navbar-user' },
      { title: '设置', path: '', icon: 'navbar-user' },
      { title: '登出', path: '', icon: 'navbar-user' },
    ],
    domId: 'static-menu-user',
  },
  {
    title: '促销活动',
    path: '',
    icon: 'chess-gameshow',
    list: [
      { title: '推荐活动一', path: '', icon: 'navbar-user' },
      { title: '推荐活动二', path: '', icon: 'navbar-user' },
      { title: '推荐活动三', path: '', icon: 'navbar-user' },
      { title: '查看全部', path: '', icon: 'navbar-user' },
    ],
    domId: 'static-menu-promotion',
  },
  { title: '联盟计划', path: '', icon: 'spt-affiliate-pro', list: [], domId: '' },
  { title: 'VIP俱乐部', path: '', icon: 'chess-vipclub', list: [], domId: '' },
  { title: '博客', path: '', icon: 'chess-blog', list: [], domId: '' },
  { title: '论坛', path: '', icon: 'tabbar-chat', list: [], domId: '' },
]
const staticMenu2 = [
  {
    title: '赞助活动',
    path: '',
    icon: 'spt-sponsorship',
    list: [
      { title: '赞助活动一', path: '', icon: '' },
      { title: '赞助活动二', path: '', icon: '' },
      { title: '赞助活动三', path: '', icon: '' },
    ],
    domId: 'static-menu-sponsor',
  },
  { title: '负责任博彩', path: '', icon: 'spt-secure', list: [], domId: '' },
  { title: '在线支持', path: '', icon: 'spt-online-support', list: [], domId: '' },
  {
    title: '语言：',
    path: '',
    icon: 'chess-language',
    list: [
      { title: '中文', path: '', icon: '' },
      { title: '日文', path: '', icon: '' },
      { title: '英文', path: '', icon: '' },
    ],
    domId: 'static-menu-language',
  },
]
</script>

<template>
  <!-- 头部菜单或搜索栏 -->
  <div v-if="!isFullScreen" class="sidebar-top">
    <Transition name="fade">
      <div v-show="!isSwitching">
        <div class="header" :class="{ 'is-small': !isExpand }">
          <div class="button" @click="onClick">
            <BaseIcon name="uni-menu" />
          </div>
          <div class="game-type">
            <div class="casino" @click="router.push('/casino')">
              <span>娱乐城</span>
            </div>
            <div class="sports" @click="router.push('/sports')">
              <span>体育</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
  <AppGlobalSearch v-else @game-type-change="onGameTypeChange" />

  <div v-if="isFullScreen && !isCasino && !isSports" class="buttons">
    <BaseAspectRatio ratio="3.5/1">
      <div class="casino" @click="router.push('/casino')">
        <span>娱乐城</span>
      </div>
    </BaseAspectRatio>
    <BaseAspectRatio ratio="3.5/1">
      <div class="sports" @click="router.push('/sports')">
        <span>体育</span>
      </div>
    </BaseAspectRatio>
  </div>

  <div class="content scrollY">
    <Transition name="slide-fade">
      <AppSidebarBig
        v-if="isExpand || isFullScreen" :current-type="gameType" :is-full-screen="isFullScreen"
        :casino-menu="casinoMenu" :casino-game-list="casinoGameList" :casino-game-provider="casinoGameProvider"
        :static-menu1="staticMenu1" :static-menu2="staticMenu2" :sports-menu="sportsMenu" :sport-hot-games="sportHotGames"
        :sport-esports="sportEsports" :sport-game-list="sportGameList" :sport-odd-type="sportOddType" :is-switching="isSwitching"
      />
    </Transition>
    <!-- <Transition name="slide-fade">
      <div v-if="!isExpand">
        <AppSidebarSmall :menu-data="[staticMenu1, staticMenu2]" />
      </div>
    </Transition> -->
  </div>
</template>

<style lang='scss' scoped>
.sidebar-top {
  height: var(--tg-sidebar-top-height-sm);
}
.content {
  overflow: hidden;
}

.buttons {
  display: flex;
  gap: var(--tg-spacing-8);
  padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);

  .casino,
  .sports {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: var(--tg-spacing-36);
    border-radius: var(--tg-radius-default);
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-default);
    font-weight: 700;
    text-shadow: var(--tg-text-shadow);
    cursor: pointer;
    background-image: url('/img/left-side-bar/casino_bg.png');
    min-height: var(--tg-spacing-48);
    min-width: var(--tg-spacing-80);
    max-height: var(--tg-spacing-80);
    justify-content: end;
    background-position: 0 -15px;
    padding-right: var(--tg-spacing-12);

    &:hover {
      background-image: url('/img/left-side-bar/casino_bg_active.png');
    }

    &:active {
      span {
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
}

.scrollable-content {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-input-padding-vertical);
  scrollbar-gutter: stable;
  padding: 0 2px 0 var(--tg-spacing-input-padding-vertical);
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

      &:active {
        span {
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

  .button {
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
