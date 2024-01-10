<script setup lang='ts' name="app-left-sidebar-tiny">
// 有右侧聊天投注的中间区域：672 1124
// 正常时候的中间区域：638 1160
// 右侧：992 （320/370）
// 左侧：消失 / 768 - 1200 fixed（占位 60）/ 正常占位
interface Props {
  isSwitching?: boolean
  switchTo?: 'big' | 'small' | ''
}

defineProps<Props>()

const { t } = useI18n()
const { triggerLeftSidebar, navButtons } = useLeftSidebar()
const menuStore = useMenuStore()
const router = useLocalRouter()
const route = useRoute()
function push(title: string) {
  Local.remove(STORAGE_MENU_EXPAND_DOMID)
  menuStore.setSideBigActiveMenu('')
  const path = title === 'casino' ? '/casino' : `/sports/${getSportsPlatId()}`
  router.push(path)
}
</script>

<template>
  <!-- 头部菜单或搜索栏 -->
  <div class="tg-app-left-sidebar-tiny">
    <div class="sidebar-tiny-top">
      <div class="header is-small">
        <Transition name="menu-fade">
          <template v-if="!isSwitching">
            <div class="button center">
              <BaseButton
                style="--tg-base-button-font-size:16px;"
                type="text" @click="triggerLeftSidebar"
              >
                <BaseIcon name="uni-menu" />
              </BaseButton>
            </div>
          </template>
        </Transition>
        <div v-if="!isSwitching" class="game-type">
          <div
            v-for="n in navButtons" :key="n.title"
            :class="[n.title, { active: route.name?.toString().includes(n.title) }]"
            @click="push(n.title)"
          >
            <span>{{ t(n.title) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content" :class="{ 'scroll-y': !isSwitching }">
      <Transition name="slide-fade">
        <template v-if="!isSwitching">
          <AppSidebarSmall :is-switching="isSwitching" />
        </template>
      </Transition>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.tg-app-left-sidebar-tiny {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
}
.sidebar-tiny-top {
  height: var(--tg-sidebar-top-height-lg);
}
.content {
  flex: 1;
}

.search {
  margin: var(--tg-spacing-16);
  width: auto;
  font-size: var(--tg-font-size-default);
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
      @include getBackgroundImage('/left-side-bar/casino_bg_active');
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

.tips {
  display: flex;
  align-items: center;

  span {
    margin-right: var(--tg-spacing-8);
  }

  &:active {
    transform: scale(0.96);
  }
}

.popper-option {
  cursor: pointer;
  padding: var(--tg-spacing-button-padding-vertical-xs) var(--tg-spacing-button-padding-horizontal-xs);

  &:hover {
    // background-color: var(--tg-text-lightgrey);
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
  // box-shadow: var(--tg-box-shadow-lg);
  box-shadow: var(--tg-header-shadow);

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
      background-position: -4px 0;
      @include getBackgroundImage('/left-side-bar/casino_bg');

      &:hover {
        @include getBackgroundImage('/left-side-bar/casino_bg_active');
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
    // box-shadow: var(--tg-box-shadow-lg);
    box-shadow: var(--tg-header-shadow);
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
