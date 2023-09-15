<script setup lang='ts'>
interface Props {
  modelValue: boolean // 是否展开
  isSwitching?: boolean
  switchTo?: 'big' | 'small' | ''
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
// const isExpand = computed(() => props.modelValue)
const { isFullScreen } = storeToRefs(useWindowStore())

const {
  casinoMenu,
  casinoGameList,
  casinoGameProvider,
  sportsMenu,
  sportHotGames,
  sportEsports,
  sportGameList,
  sportOddType,
  staticMenu1,
  staticMenu2,
} = useMenuData()

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
</script>

<template>
  <!-- 头部菜单或搜索栏 -->
  <div v-if="!isFullScreen" class="sidebar-top">
    <Transition name="menu-fade">
      <template v-if="!isSwitching">
        <div class="header">
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
      </template>
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
        v-if="switchTo !== 'big'"
        :current-type="gameType"
        :casino-menu="casinoMenu" :casino-game-list="casinoGameList" :casino-game-provider="casinoGameProvider"
        :static-menu1="staticMenu1" :static-menu2="staticMenu2" :sports-menu="sportsMenu" :sport-hot-games="sportHotGames"
        :sport-esports="sportEsports" :sport-game-list="sportGameList" :sport-odd-type="sportOddType" :is-switching="isSwitching"
      />
    </Transition>
  </div>
</template>

<style lang='scss' scoped>
.sidebar-top {
  height: var(--tg-sidebar-top-height-sm);
  cursor: pointer;
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
