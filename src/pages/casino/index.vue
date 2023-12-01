<script setup lang='ts'>
defineOptions({
  name: 'KeepAliveCasino',
})

usePageTitle({ prefix: 'btc_casino_title', suffix: 'casino_game', isT: true })
const { isMobile } = storeToRefs(useWindowStore())
const casinoStore = useCasinoStore()
const { casinoNav, casinoGameList } = storeToRefs(casinoStore)
const router = useRouter()
const { t } = useI18n()
const { VITE_CASINO_HOME_PAGE_SIZE } = getEnv()

const tab = ref('all')
const showAll = computed(() => tab.value === 'all')
const currentNav = computed(() => {
  return casinoNav.value.find(a => a.value === tab.value)
  ?? { label: '', cid: '', icon: '', ty: -1, platform_id: '' }
})
const isCat = computed(() => currentNav.value.ty === 1) // 类别
const isPlat = computed(() => currentNav.value.ty === 2) // 场馆
// 类别数据
const {
  data: catGameData,
  run: runGameCate,
  loading: loadingCate,
} = useRequest(ApiMemberGameCate)
// 场馆数据
const platParams = computed(() => ({
  page: 1,
  page_size: 21,
  platform_id: currentNav.value.platform_id,
}))
const {
  list: platGameList,
  total: platTotal,
  run: runPlatData,
  loading: loadingPlat,
} = useList(ApiMemberGameList)
const catGameList = computed(() => {
  if (isCat.value)
    return catGameData.value && catGameData.value.games ? catGameData.value.games : []

  if (isPlat.value)
    return platGameList.value

  return []
})
const catGameTotal = computed(() => {
  if (isCat.value)
    return catGameData.value ? catGameData.value.total : 0

  if (isPlat.value)
    return platTotal.value

  return 0
})

function onTabChange() {
  if (isCat.value)
    runGameCate({ cid: currentNav.value.cid })

  else if (isPlat.value)
    runPlatData(platParams.value)
}
function viewMoreGames() {
  if (currentNav.value.ty === 1)
    router.push(`/casino/group/category?cid=${currentNav.value.cid}&name=${currentNav.value.label}`)
  else if (currentNav.value.ty === 2)
    router.push(`/casino/group/provider?pid=${currentNav.value.platform_id}&name=${currentNav.value.label}`)
}

await application.allSettled([casinoStore.runAsyncGameLobby()])
</script>

<template>
  <div class="layout-spacing">
    <div class="hero-wrapper mt-24">
      <AppBanner type="casino" />
    </div>
    <div v-if="!isMobile" class="mt-24">
      <AppGameSearch game-type="1" />
    </div>
    <div class="mt-24">
      <BaseTab
        v-model="tab" :list="casinoNav" :center="false" size="large" use-cloud-img
        @change="onTabChange"
      />
    </div>
    <div class="content-wrapper">
      <!-- 大厅 -->
      <Transition name="tab-fade">
        <div v-show="showAll">
          <template v-for="item in casinoGameList" :key="item.name">
            <AppSlider
              v-if="item.games"
              :icon="item.icon"
              :title="item.name"
              :data="item.games"
              :cid="item.cid"
              :ty="item.ty"
              :pid="item.platform_id"
              :path="item.path"
              use-cloud-img
            />
          </template>
        </div>
      </Transition>
      <!-- 其他 -->
      <div v-if="loadingCate || loadingPlat " class="loading">
        <BaseLoading />
      </div>
      <template v-else>
        <div v-show="!showAll" class="list-wrap">
          <div class="title">
            <BaseIcon
              v-if="currentNav.icon"
              :name="currentNav.icon"
              use-cloud-img
            />
            <span>{{ currentNav.label }}</span>
          </div>
          <AppCardList :list="catGameList" />
          <div v-show="catGameTotal > VITE_CASINO_HOME_PAGE_SIZE" class="more">
            <BaseButton
              size="md"
              @click="viewMoreGames"
            >
              {{ t('view_all') }} {{ catGameTotal }} {{ currentNav?.label }}
            </BaseButton>
          </div>
        </div>
      </template>

      <AppProviderSlider />
    </div>
  </div>
  <div class="layout-spacing">
    <AppBetData mode="casino" />
  </div>
</template>

<style lang='scss' scoped>
.loading{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}
.list-wrap {
  margin-top: var(--tg-spacing-24);

  .title {
    font-size: var(--tg-font-size-base);
    color: var(--tg-text-white);
    margin-bottom: var(--tg-spacing-12);
    display: flex;
    align-items: center;

    &:hover {
      --tg-icon-color: var(--tg-text-white);
    }

    span {
      font-size: var(--tg-font-size-md);
      font-weight: var(--tg-font-weight-semibold);
      margin-left: var(--tg-spacing-8);
      line-height: 1.5;
    }
  }

  .more {
    margin-top: var(--tg-spacing-24);
    display: flex;
    justify-content: center;
  }
}
</style>

<route lang="yaml">
name: casino-home
meta:
  layout: home
</route>
