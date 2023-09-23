<script setup lang='ts'>
import { type MenuItem } from '~/composables/useApiMenuData'

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

const router = useRouter()

const { t } = useI18n()
const { isMobile } = storeToRefs(useWindowStore())
const route = useRoute()
const isCasino = computed(() => route.name?.toString().includes('casino'))
const isSports = computed(() => route.name?.toString().includes('sports'))
const isGameTypeCasino = computed(() => props.currentType === '1')
const isGameTypeSports = computed(() => props.currentType === '2')

const innerRef = ref()
function handleClickHead() {
  // const t = setTimeout(() => {
  //   innerRef.value.scrollTo({ top: document.getElementById('sports-hot-game-football')!.offsetTop - 60, behavior: 'smooth' })
  //   clearTimeout(t)
  // }, 500)
}

const { leftIsExpand } = useLeftSidebar()

function handleClickItem(item: any) {
  if (item.path && item.path.length) {
    leftIsExpand.value = false
    router.push(item.path)
  }
}
</script>

<template>
  <div class="big-warp">
    <div ref="innerRef" class="scroll-y inner-content scroll-contain" :class="{ 'is-full-screen': isMobile }">
      <!-- Casino -->
      <template v-if="isMobile ? isGameTypeCasino : isCasino">
        <div class="menu-box">
          <div v-for="item, i in casinoMenu" :key="i" @click="() => handleClickItem(item)">
            <div class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div class="menu">
            {{ t('game') }}
          </div>
          <div class="content-line" />
          <div v-for="item, i in casinoGameList" :key="i" @click="() => handleClickItem(item)">
            <div class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div v-for="item, i in casinoGameProvider" :key="i" @click="() => handleClickItem(item)">
            <div class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Sports -->
      <template v-if="isMobile ? isGameTypeSports : isSports">
        <div class="menu-box">
          <div v-for="item, i in sportsMenu" :key="i" @click="() => handleClickItem(item)">
            <div class="menu">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div class="menu">
            {{ t('top_sports_events') }}
          </div>
          <div class="content-line" />
          <div v-for="item, i in sportHotGames" :key="i">
            <BaseAccordion
              v-if="item.list && item.list.length" :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
              @click-item="handleClickItem"
            />
            <div v-else class="menu" @click="() => handleClickItem(item)">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div v-for="item, i in sportEsports" :key="i">
            <BaseAccordion
              v-if="item.list && item.list.length" :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
              @click-item="handleClickItem"
            />
            <div v-else class="menu" @click="() => handleClickItem(item)">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div v-for="item, i in sportGameList" :key="i">
            <BaseAccordion
              v-if="item.list && item.list.length" :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
              @click-item="handleClickItem"
            />
            <div v-else class="menu" @click="() => handleClickItem(item)">
              <BaseIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="menu-box">
          <div v-for="item, i in sportOddType" :key="i">
            <BaseAccordion
              v-if="item.list && item.list.length" :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
              @click-item="handleClickItem"
            />
            <div v-else class="menu" @click="() => handleClickItem(item)">
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
            v-if="item.list && item.list.length" :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
            @click-item="handleClickItem"
          />
          <div v-else class="menu" @click="() => handleClickItem(item)">
            <BaseIcon :name="item.icon" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <!-- 赞助活动 -->
      <div class="menu-box">
        <div v-for="item, i in staticMenu2" :key="i">
          <BaseAccordion
            v-if="item.list && item.list.length" :dom-id="item.domId" :menu-info="item" @click-head="handleClickHead"
            @click-item="handleClickItem"
          />
          <div v-else class="menu" @click="() => handleClickItem(item)">
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
        --tg-icon-color: var(--tg-text-white);
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

.is-full-screen {
  padding-top: 0;
}
</style>
