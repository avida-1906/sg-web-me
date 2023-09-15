<script setup lang='ts'>
interface MenuItem {
  title: string
  path: string
  icon: string
  list: {
    title: string
    path: string
    icon: string
  }[]
  domId: string
}
interface Props {
  staticMenu1: MenuItem[]
  staticMenu2: MenuItem[]
  casinoMenu: MenuItem[]
  casinoGameList: MenuItem[]
  casinoGameProvider: MenuItem[]
  sportsMenu: MenuItem[]
  sportHotGames: MenuItem[]
  sportEsports: MenuItem[]
  sportGameList: MenuItem[]
  sportOddType: MenuItem[]
  currentType: string
  isSwitching?: boolean
}
const props = defineProps<Props>()
const { isFullScreen } = storeToRefs(useWindowStore())
const route = useRoute()
const isCasino = computed(() => route.name === 'casino')
const isSports = computed(() => route.name === 'sports')
const isGameTypeCasino = computed(() => props.currentType === '1')
const isGameTypeSports = computed(() => props.currentType === '2')

const innerRef = ref()
function handleClickHead() {
  // const t = setTimeout(() => {
  //   innerRef.value.scrollTo({ top: document.getElementById('sports-hot-game-football')!.offsetTop - 60, behavior: 'smooth' })
  //   clearTimeout(t)
  // }, 500)
}
function handleClickItem() { }
</script>

<template>
  <div class="big-warp">
    <div ref="innerRef" class="scroll-y inner-content scroll-contain" :class="{ 'is-full-screen': isFullScreen }">
      <!-- Casino -->
      <template v-if="isFullScreen ? isGameTypeCasino : isCasino">
        <div class="menu-box">
          <div v-for="item, i in casinoMenu" :key="i">
            <div class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div class="menu">
            游戏
          </div>
          <div class="content-line" />
          <div v-for="item, i in casinoGameList" :key="i">
            <div class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div v-for="item, i in casinoGameProvider" :key="i">
            <div class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Sports -->
      <template v-if="isFullScreen ? isGameTypeSports : isSports">
        <div class="menu-box">
          <div v-for="item, i in sportsMenu" :key="i">
            <div class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div class="menu">
            顶级体育项目
          </div>
          <div class="content-line" />
          <div v-for="item, i in sportHotGames" :key="i">
            <BaseAccordion
              v-if="item.list.length"
              :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
              @click-item="handleClickItem"
            />
            <div v-else class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div v-for="item, i in sportEsports" :key="i">
            <BaseAccordion
              v-if="item.list.length"
              :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
              @click-item="handleClickItem"
            />
            <div v-else class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div v-for="item, i in sportGameList" :key="i">
            <BaseAccordion
              v-if="item.list.length"
              :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
              @click-item="handleClickItem"
            />
            <div v-else class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div v-for="item, i in sportOddType" :key="i">
            <BaseAccordion
              v-if="item.list.length"
              :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
              @click-item="handleClickItem"
            />
            <div v-else class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- 个人中心 -->
      <div class="menu-box">
        <div v-for="item, i in staticMenu1" :key="i">
          <BaseAccordion
            v-if="item.list.length"
            :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
            @click-item="handleClickItem"
          />
          <div v-else class="menu">
            <BaseIcon :name="item.icon" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <!-- 赞助活动 -->
      <div class="menu-box">
        <div v-for="item, i in staticMenu2" :key="i">
          <BaseAccordion
            v-if="item.list.length"
            :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
            @click-item="handleClickItem"
          />
          <div v-else class="menu">
            <BaseIcon :name="item.icon" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.big-warp {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-content: flex-start;
  padding: 0;
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  height: 100%;
}

.inner-content {
  padding: 16px;
  padding-right: 9.6px;
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-8);

  .menu-box {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    background-color: var(--tg-primary-main);
    border-radius: var(--tg-radius-default);
    overflow: hidden;

    .menu {
      display: flex;
      align-items: center;
      height: 45px;
      padding: 0 16px;
      cursor: pointer;
      .app-svg-icon {
        transition: color 0.2s;
        transform: scale(1.1);
      }

      &:hover {
        background-color: #213743;
        --tg-icon-color:var(--tg-text-white);
      }

      span {
        padding-left: 6px;
      }
    }

    .content-line {
      background: var(--tg-secondary-main);
      height: 2px;
      width: 100%;
    }
  }
}
.is-full-screen{
  padding-top: 0;
}
</style>
