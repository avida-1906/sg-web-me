<script setup lang='ts'>
interface Props {
  isSwitching?: boolean
  switchTo?: 'big' | 'small' | ''
}
defineProps<Props>()
const { t } = useI18n()
const { isMobile, isLessThanLg } = storeToRefs(useWindowStore())
const { triggerLeftSidebar, closeLeftSidebar, navButtons } = useLeftSidebar()
const menuStore = useMenuStore()
const router = useLocalRouter()
const route = useRoute()

const isCasino = computed(() => route.name?.toString().includes('casino'))
const isSports = computed(() => route.name?.toString().includes('sports'))

// 搜索栏
const gameType = ref(isCasino.value ? '1' : isSports.value ? '2' : '')

function onGameTypeChange(v: string) {
  gameType.value = v
}
function push(title: string) {
  Local.remove(STORAGE_MENU_EXPAND_DOMID)
  menuStore.setSideBigActiveMenu('')
  const path = title === 'casino' ? '/casino' : `/sports/${getSportsPlatId()}`
  router.push(path)
  isLessThanLg.value && closeLeftSidebar()
}
</script>

<template>
  <!-- 头部菜单或搜索栏 -->
  <div v-if="!isMobile" class="sidebar-top">
    <Transition name="menu-fade">
      <template v-if="!isSwitching">
        <div class="header">
          <div class="center button">
            <BaseButton
              style="--tg-base-button-font-size:16px;"
              type="text" @click.stop="triggerLeftSidebar"
            >
              <BaseIcon name="uni-menu" />
            </BaseButton>
          </div>
          <div class="game-type">
            <div
              v-for="n in navButtons" :key="n.title"
              :class="[n.title, { active: route.name?.toString().includes(n.title) }]"
              @click.stop="push(n.title)"
            >
              <span class="text-center">{{ t(n.title) }}</span>
            </div>
          </div>
        </div>
      </template>
    </Transition>
  </div>
  <AppGlobalSearch
    v-else @game-type-change="onGameTypeChange"
    @close="closeLeftSidebar"
  />

  <!-- <div v-if="isMobile && !isCasino && !isSports" class="buttons">
    <BaseAspectRatio v-for="n in navButtons" :key="n.title" ratio="3.5/1">
      <div
        :class="[n.title, { active: route.name?.toString().includes(n.title) }]"
        @click="push(n.title)"
      >
        <span>{{ t(n.title) }}</span>
      </div>
    </BaseAspectRatio>
  </div> -->

  <div class="content scrollY">
    <Transition name="slide-fade">
      <AppSidebarBig
        v-if="switchTo !== 'big'"
        :current-type="gameType"
        :is-switching="isSwitching"
      />
    </Transition>
  </div>
</template>

<style lang='scss' scoped>
.sidebar-top {
  height: var(--tg-sidebar-top-height-sm);
  cursor: pointer;
  box-shadow: var(--tg-header-shadow);
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
    min-height: var(--tg-spacing-48);
    min-width: var(--tg-spacing-80);
    max-height: var(--tg-spacing-80);
    justify-content: flex-end;
    background-position: 0 -15px;
    padding-right: var(--tg-spacing-12);
    @include getBackgroundImage('/left-side-bar/casino_bg');

    &:hover, &.active {
      @include getBackgroundImage('/left-side-bar/casino_bg_active')
    }

    &:active {
      span {
        transform: scale(0.96);
      }
    }
  }

  .sports {
    @include getBackgroundImage('/left-side-bar/sports_bg');

    &:hover, &.active {
      @include getBackgroundImage('/left-side-bar/sports_bg_active');
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

  .button {
    font-size: var(--tg-font-size-base);
    min-width: 60px;
    height: 60px;
  }

  .game-type {
    display: flex;
    align-items: center;
    gap: var(--tg-spacing-8);
    width: 100%;
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-semibold);
    text-shadow: 0 1px 2px rgba(0,0,0,.12), 0 1px 3px rgba(0,0,0,.2);

    .casino,
    .sports {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      background-size: cover;
      background-repeat: no-repeat;
      min-height: var(--tg-spacing-36);
      cursor: pointer;
      border-radius: var(--tg-radius-default);
      @include getBackgroundImage('/left-side-bar/casino_bg');

      &:hover {
        @include getBackgroundImage('/left-side-bar/casino_bg_active')
      }

      &:active {
        span {
          transform: scale(0.96);
        }
      }
    }

    .sports {
      @include getBackgroundImage('/left-side-bar/sports_bg');

      &:hover {
        @include getBackgroundImage('/left-side-bar/sports_bg_active');
      }
    }

    .casino.active {
      @include getBackgroundImage('/left-side-bar/casino_bg_active');
    }

    .sports.active {
      @include getBackgroundImage('/left-side-bar/sports_bg_active');
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
