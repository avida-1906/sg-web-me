<script setup lang='ts'>
const route = useRoute()
const si = route.query.si ? +route.query.si : 0
const ci = route.query.ci ? route.query.ci.toString() : ''
// 冠军数据
const { data } = useRequest(() =>
  ApiSportOutrightList({ si, page: 1, page_size: 100 }), {
  manual: false,
})

const outrightsData = computed(() => {
  if (data.value)
    return data.value.list.find(a => a.ci === ci)
})
const sportName = computed(() => outrightsData.value ? outrightsData.value.sn : '')
const regionName = computed(() => outrightsData.value ? outrightsData.value.pgn : '')
const regionId = computed(() => outrightsData.value ? outrightsData.value.pgid : '')
const leagueName = computed(() => outrightsData.value ? outrightsData.value.cn : '')
const eventName = computed(() => outrightsData.value ? outrightsData.value.oen : '')
const breadcrumb = computed(() => [
  {
    path: `/sports/${SPORTS_PLAT_ID}/${si}`,
    title: sportName.value,
  },
  {
    path: `/sports/${SPORTS_PLAT_ID}/${si}/${regionId.value}`,
    title: regionName.value,
  },
  {
    path: `/sports/${SPORTS_PLAT_ID}/${si}/${regionId.value}/${ci}`,
    title: leagueName.value,
  },
  {
    path: '',
    title: eventName.value,
  },
])
</script>

<template>
  <div class="outrights">
    <AppNavBreadCrumb :breadcrumb="breadcrumb" />
    <div class="wrapper">
      <template v-if="outrightsData">
        <BaseSecondaryAccordion
          v-for="market, i in outrightsData.ml" :key="market.mlid"
          :title="market.btn" level="2"
          :init="i === 0"
        >
          <div class="btn-box">
            <AppSportsBetButton
              v-for="item in market.ms" :key="item.wid"
              :title="item.sn" :odds="item.ov" layout="horizontal"
            />
          </div>
        </BaseSecondaryAccordion>
      </template>
    </div>
    <AppBetData mode="sports" />
  </div>
</template>

<style lang='scss' scoped>
.outrights {
  margin-top: var(--tg-spacing-32);
  padding-bottom: var(--tg-spacing-32);
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--tg-spacing-24);
}

.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--tg-spacing-12);
}

.btn-box {
  display: grid;
  color: var(--tg-text-white);
  grid-gap: var(--tg-spacing-8);
  width: 100%;
  padding: var(--tg-spacing-12) var(--tg-spacing-16);
  grid-template-columns: repeat(auto-fit, minmax(calc(33% - var(--tg-spacing-8)/2), 1fr));
}
</style>

<route lang="yaml">
meta:
  layout: home
  browserTitle: 加密货币与比特币在线体育博彩 – Stake.com 体育博彩
  </route>
