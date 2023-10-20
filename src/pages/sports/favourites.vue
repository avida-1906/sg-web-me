<script lang="ts" setup>
defineProps<{ onPage?: boolean }>()

const { t } = useI18n()

const currentGame = ref('2')
const gameList = [
  { name: '网球', id: '2', num: 22 },
  { name: '足球', id: '3', num: 30 },
  { name: '美式橄榄球', id: '4', num: 5 },
]
const isStandard = ref(true)
const baseType = ref('winner')
function onBaseTypeChange(v: string) {
  baseType.value = v
}
const typeCheckedList = ref(['1', '2', '4'])
const typeAllList = ref([
  { label: '足球', value: '1', count: 3, isChecked: true },
  { label: '篮球', value: '2', count: 12, isChecked: true },
  { label: '羽毛球', value: '3', count: 7, isChecked: false },
  { label: '橄榄球', value: '4', count: 3, isChecked: true },
  { label: '网球', value: '5', count: 3, isChecked: false },
  { label: '桌球', value: '6', count: 3, isChecked: false },
  { label: '盖尔式板棍球', value: '7', count: 3, isChecked: false },
])
const typeCheckedCount = computed(() => typeAllList.value.filter(a => a.isChecked).length)

function onCheckedPlatform(v: string[]) {
  console.log('onCheckedPlatform===>', v)
}
function resetPlatformChecked() {
  if (!typeCheckedList.value.length)
    return
  typeCheckedList.value = []
  typeAllList.value.forEach(a => a.isChecked = false)
}
</script>

<template>
  <div class="tg-sports-favourites" :class="{ 'on-page': onPage }">
    <div class="dropdown">
      <VDropdown placement="bottom">
        <BaseButton bg-style="dark" size="sm">
          <div class="btn-arrow-down">
            <span>{{ $t('sports') }} :</span>
            <BaseBadge :count="typeCheckedCount" mode="active" />
            <div class="icon">
              <BaseIcon name="uni-arrow-down" />
            </div>
          </div>
        </BaseButton>
        <template #popper>
          <div>
            <section class="base-check-pop-inner scroll-y">
              <BaseCheckboxGroup
                v-model="typeCheckedList" :list="typeAllList" size="mid"
                @check="onCheckedPlatform"
              >
                <template #default="{ item }">
                  <div class="check-item-label" :class="{ active: item.isChecked }">
                    <div>{{ item.label }}</div>
                  </div>
                </template>
              </BaseCheckboxGroup>
            </section>
            <div class="clear-all" @click="resetPlatformChecked">
              {{ $t('clear_all') }}
            </div>
          </div>
        </template>
      </VDropdown>
    </div>

    <!-- 热门滚球盘 -->
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-ball-plate" />
        <h6>{{ t('sports_live_favourites') }}</h6>
      </div>
      <AppSportsMarketTypeSelect
        v-model="isStandard" :base-type="baseType"
        @base-type-change="onBaseTypeChange"
      />
    </div>
    <AppSportsTab v-model="currentGame" :list="gameList" />
    <div class="market-wrapper">
      <AppSportsMarket
        :is-standard="isStandard"
        :tournament="{ name: '澳大利亚 / 女子联赛', id: '123' }"
      />
      <AppSportsMarket
        :is-standard="isStandard"
        :tournament="{ name: '澳大利亚 / 女子联赛', id: '123' }"
      />
    </div>

    <!-- 即将开始的热门赛事 -->
    <div class="sports-page-title">
      <div class="left">
        <BaseIcon name="spt-timing" />
        <h6>{{ t('sports_upcoming_favourites') }}</h6>
      </div>
      <AppSportsMarketTypeSelect
        v-model="isStandard" :base-type="baseType"
        @base-type-change="onBaseTypeChange"
      />
    </div>
    <AppSportsTab v-model="currentGame" :list="gameList" />
    <div class="market-wrapper">
      <AppSportsMarket
        :is-standard="isStandard" show-breadcrumb
        :tournament="{ name: '网球', id: '123' }"
      />
    </div>

    <div v-if="!onPage" class="layout-spacing">
      <AppBetData mode="sports" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-sports-favourites {
  &.on-page {
    margin-top: 0;
  }
}

.dropdown {
  margin-bottom: var(--tg-spacing-24);
  display: inline-block;
}

.btn-arrow-down {
  font-size: var(--tg-font-size-default);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--tg-spacing-8);
  line-height: 1.3;

  .icon {
    width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    .app-svg-icon {
      font-size: var(--tg-font-size-xs);
    }
  }

}

.clear-all {
  border-top: 1px solid var(--tg-border-color-grey);
  width: 100%;
  padding:
    var(--tg-spacing-button-padding-horizontal-xs) var(--tg-spacing-button-padding-vertical-xs);
  font-weight: var(--tg-font-weight-semibold);
  text-align: center;
  font-size: var(--tg-font-size-default);
  color: var(--tg-secondary-main);
  cursor: pointer;
}

.base-check-pop-inner {
  padding: var(--tg-spacing-button-padding-horizontal-xs);
  display: flex;
  flex-direction: column;
  max-height: 340px;
  &::-webkit-scrollbar-thumb {
      background: var(--tg-secondary-light);
    }
}

.check-item-label {
  display: inline-flex;
  align-items: center;
  font-weight: var(--tg-font-weight-semibold);
  font-size: var(--tg-font-size-default);
  color: var(--tg-secondary-grey);
  transition: all 0.2s;
  letter-spacing: 0;
  padding-top: 6px;
  padding-bottom: 4px;
  justify-content: space-between;
  gap: 8px;
}

.market-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-24);
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
