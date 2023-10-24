<script setup lang='ts'>
defineOptions({
  name: 'KeepAliveCasino',
})

const { isMobile } = storeToRefs(useWindowStore())
const { casinoNav, casinoGameList } = storeToRefs(useCasinoStore())

const router = useRouter()

const tab = ref('all')
const showAll = computed(() => tab.value === 'all')
const currentNav = computed(() => {
  return casinoNav.value.find(a => a.value === tab.value)
  ?? { label: '', cid: '', icon: '' }
})
// 类别数据
const { data: catGameData, run: runGameCate } = useRequest(ApiMemberGameCate)
const catGameList = computed(() => {
  return catGameData.value && catGameData.value.games ? catGameData.value.games : []
})
const catGameTotal = computed(() => {
  return catGameData.value ? catGameData.value.total : 0
})

function onTabChange() {
  if (tab.value !== 'all')
    runGameCate({ cid: currentNav.value.cid })
}
function viewMoreGames() {
  router.push(`/casino/group/category?cid=${currentNav.value.cid}`)
}
</script>

<template>
  <div class="layout-spacing">
    <div class="hero-wrapper mt-24">
      <AppBanner />
    </div>
    <div v-if="!isMobile" class="mt-24">
      <AppGameSearch game-type="1" />
    </div>
    <div class="mt-24">
      <BaseTab
        v-model="tab" :list="casinoNav" :center="false" size="large"
        @change="onTabChange"
      />
    </div>
    <div class="content-wrapper">
      <Transition name="tab-fade">
        <div v-show="showAll">
          <AppSlider
            v-for="item in casinoGameList" :key="item.name"
            :icon="item.icon"
            :title="item.name"
            :data="item.games"
            :cid="item.cid"
          />
        </div>
      </Transition>
      <Transition name="tab-fade">
        <div v-show="!showAll" class="list-wrap">
          <div class="title">
            <BaseIcon
              :name="currentNav.icon"
            />
            <span>{{ currentNav.label }}</span>
          </div>
          <AppCardList :list="catGameList" />
          <div class="more">
            <BaseButton
              size="md"
              @click="viewMoreGames"
            >
              查看全部 {{ catGameTotal }} {{ currentNav?.label }}
            </BaseButton>
          </div>
        </div>
      </Transition>
      <AppProviderSlider />
    </div>
  </div>
  <div class="layout-spacing">
    <AppBetData mode="casino" />
  </div>
</template>

<style lang='scss' scoped>
.list-wrap {
  margin-top: var(--tg-spacing-24);

  .title {
    font-size: var(--tg-font-size-base);
    color: var(--tg-text-white);
    margin-bottom: var(--tg-spacing-12);

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
  browserTitle: 在线加密货币与比特币赌场 – Stake.com 赌场游戏
</route>
