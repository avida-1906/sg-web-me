<script setup lang='ts'>
interface ComponentItem {
  cid: string
  platform_id: string
  name: string
  icon: string
  component: any
  value?: string
}

defineOptions({
  name: 'KeepAliveCasino',
})

usePageTitle({ prefix: 'btc_casino_title', suffix: 'casino_game', isT: true })

const location = useBrowserLocation()
const { isLogin, companyData } = storeToRefs(useAppStore())
const { isMobile } = storeToRefs(useWindowStore())
const casinoStore = useCasinoStore()
const { casinoNav, casinoGameList } = storeToRefs(casinoStore)
const { t } = useI18n()
const { openSwiperNoticeDialog } = useDialogSwiperNotice(430)
const { bool: showMore, toggle: toggleShowMore } = useBoolean(false)

const tab = ref('all')
const showAll = computed(() => tab.value === 'all')
const currentNav = computed(() => {
  return casinoNav.value.find(a => a.value === tab.value)
  ?? { label: '', cid: '', icon: '', ty: -1, platform_id: '', value: '' }
})
const hostSite = computed(() => (
  { host: location.value.hostname, site: companyData.value?.name }
))
// 公告弹框和跑马灯
const {
  runAsync: runMemberNoticeAllList,
} = useRequest(ApiMemberNoticeAllList, {
  onSuccess(data) {
    for (const item of data.notice)
      item.value = item.id
    data.notice.length > 0 && openSwiperNoticeDialog(data.notice)
  },
})

const componentList = computed(() => {
  const _c: ComponentItem[] = []
  const _list = casinoNav.value.filter(item => item.ty !== -1)
  _list.forEach((item) => {
    if (item.ty === 1) {
      _c.push({
        cid: item.cid,
        platform_id: item.platform_id,
        name: item.label,
        icon: item.icon,
        value: item.value,
        component: defineAsyncComponent(
          () => import('~/components/AppCasinoPlatList.vue'),
        ),
      })
    }

    else if (item.ty === 2) {
      _c.push({
        cid: item.cid,
        platform_id: item.platform_id,
        name: item.label,
        icon: item.icon,
        value: item.value,
        component: defineAsyncComponent(
          () => import('~/components/AppCasinoGameList.vue'),
        ),
      })
    }
  })

  return _c
})

const currentObject = computed(() => {
  const currentValue = currentNav.value.value
  const _0 = componentList.value.find((item: any) => item.value === currentValue)
  return _0 ?? null
})

const btnText = ref(t('view_more_2'))
const onShowMore = function () {
  toggleShowMore()
  if (showMore.value)
    btnText.value = t('view_less')
  else
    btnText.value = t('view_more_2')
}

await application.allSettled([casinoStore.runAsyncGameLobby(), runMemberNoticeAllList()])
</script>

<template>
  <div class="layout-spacing">
    <AppBanner type="casino" />
    <!-- <AppMarquee /> -->
    <div v-if="!isMobile" class="mt-24">
      <AppGameSearch game-type="1" />
    </div>
    <div class="mt-30">
      <BaseTab
        v-model="tab"
        :list="casinoNav"
        :center="false" size="large" use-cloud-img
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
      <template v-if="currentObject">
        <KeepAlive>
          <Suspense timeout="0">
            <component
              :is="currentObject.component"
              :cid="currentObject.cid"
              :name="currentObject.name"
              :icon="currentObject.icon"
              :platform-id="currentObject.platform_id"
            />
            <template #fallback>
              <AppLoading />
            </template>
          </Suspense>
        </KeepAlive>
      </template>
      <AppProviderSlider />
    </div>
  </div>
  <div class="layout-spacing">
    <AppBetData mode="casino" />
  </div>
  <!-- 公司介绍 -->
  <div v-if="!isLogin" class="index-introduction" :class="{ 'max-height': showMore }">
    <div class="introduction-content" :style="{ 'column-count': isMobile ? 1 : 2 }">
      <h1>{{ t('casino_intro_1', hostSite) }}</h1>
      <p>
        {{ t('casino_intro_2', hostSite) }}
      </p>
      <p>{{ t('casino_intro_10', hostSite) }}</p>
      <h1>{{ t('casino_intro_3') }}</h1>
      <p>{{ t('casino_intro_4', hostSite) }}</p>
      <p>{{ t('casino_intro_5', hostSite) }}</p>
      <p>{{ t('casino_intro_6') }}</p>
      <h1>{{ t('casino_intro_7', hostSite) }}</h1>
      <p>{{ t('casino_intro_8', hostSite) }}</p>
      <ul>
        <li>{{ t('company_intro_tip_step_1') }}</li>
        <li>
          {{ t('company_intro_tip_step_2') }}
        </li>
        <li>{{ t('company_intro_tip_step_3') }}</li>
        <li>
          {{ t('company_intro_tip_step_4', hostSite) }}
        </li>
      </ul>
      <p>{{ t('casino_intro_9', hostSite) }}</p>
      <p>
        {{ t('company_intro_tip_19') }}
      </p>
      <h1>{{ t('casino_intro_11', hostSite) }}</h1>
      <p>{{ t('casino_intro_12', hostSite) }}</p>
      <p>{{ t('casino_intro_13', hostSite) }}</p>
      <p>{{ t('casino_intro_14') }}</p>
      <p>{{ t('casino_intro_15', hostSite) }}</p>
      <h1>{{ t('casino_intro_16', hostSite) }}</h1>
      <p>{{ t('casino_intro_17', hostSite) }}</p>
      <p>{{ t('casino_intro_18', hostSite) }}</p>
      <p>{{ t('casino_intro_19', hostSite) }}</p>
    </div>
    <div class="introduction-more">
      <BaseButton @click="onShowMore">
        {{ btnText }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.mt-30 {
  margin-top: 30px;
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

.index-introduction{
    margin-bottom: var(--tg-spacing-32);
    background: var(--tg-secondary-dark);
    padding: var(--tg-spacing-16);
    width: 100%;
    color: var(--tg-text-lightgrey);
    position: relative;
    max-height: 250px;
    overflow: hidden;
    border-radius: 8px;
    &.max-height{
      max-height: 100%;
      .introduction-content::before{
        visibility: hidden;
      }
      .introduction-more{
        position: static;
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
    .introduction-content{
      column-gap: 1.5rem;
      &.column-count{
        column-count: 2;
      }
      &::before{
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        background: linear-gradient(
          0deg,
          var(--tg-secondary-dark) 0%,rgba(15,33,46,0) 100%
        );
      }
    }
    .introduction-more{
      position: absolute;
      z-index: 2;
      bottom: var(--tg-spacing-24);
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
      margin-top: var(--tg-spacing-16);
    }
    h1{
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-xl);
      margin-bottom: var(--tg-spacing-8);
      font-weight: var(--tg-font-weight-semibold);
    }
    p{
      margin-bottom: var(--tg-spacing-20);
      line-height: 24px;
    }
    a{
      font-weight: var(--tg-font-weight-semibold);
      &:hover{
        color: var(--tg-text-white);
      }
    }
    ul{
      list-style-type:disc;
      padding-left: var(--tg-spacing-32);
      p {
        margin: 0;
      }
      li{
        margin: var(--tg-spacing-4) 0;
      }
    }
  }
</style>

<route lang="yaml">
name: casino-home
meta:
  layout: home
</route>
