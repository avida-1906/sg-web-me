<script setup lang='ts'>
usePageTitle({ prefix: 'champion_bet', isT: true })
const route = useRoute()
const si = route.query.si ? +route.query.si : 0
const ci = route.query.ci ? route.query.ci.toString() : ''
const ei = route.query.ei ? route.query.ei.toString() : ''
// 冠军数据
const params = computed(() => ({ si, page: 1, page_size: 100 }))
const { data, run, runAsync } = useRequest(ApiSportOutrightList)
/** 定时更新数据 */
const { startTimer, stopTimer } = useSportsDataUpdate(() => run(params.value))

const outrightsData = computed(() => {
  if (data.value && data.value.d) {
    const marketInfo = data.value.d.find(a => a.ei === ei)
    if (marketInfo) {
      marketInfo.ml = marketInfo.ml.map((a) => {
        return {
          ...a,
          ms: a.ms.map((b) => {
            return {
              ...b,
              cartInfo: {
                wid: b.wid,
                mlid: a.mlid,
                mll: a.mll,
                pid: a.pid,
                bt: a.bt,
                ov: b.ov,
                m: 100,
                ei: marketInfo.ei,
                si: marketInfo.si,
                hdp: b.hdp,
                sid: b.sid,
                homeTeamName: marketInfo.oen,
                awayTeamName: '',
                btn: a.btn,
                sn: b.sn,
              },
            }
          }),
        }
      })
    }
    return marketInfo
  }
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
    // eslint-disable-next-line max-len
    path: `/sports/${SPORTS_PLAT_ID}/${si}/${regionId.value}?${application.objectToUrlParams({ sn: sportName.value, pgn: regionName.value })}`,
    title: regionName.value,
  },
  {
    // eslint-disable-next-line max-len
    path: `/sports/${SPORTS_PLAT_ID}/${si}/${regionId.value}/${ci}?${application.objectToUrlParams({ sn: sportName.value, pgn: regionName.value, cn: leagueName.value })}`,
    title: leagueName.value,
  },
  {
    path: '',
    title: eventName.value,
  },
])

onBeforeMount(() => {
  startTimer()
})
onBeforeUnmount(() => {
  stopTimer()
})

await application.allSettled([runAsync(params.value)])
</script>

<template>
  <div class="outrights">
    <AppNavBreadCrumb :breadcrumb="breadcrumb" />
    <div class="wrapper">
      <template v-if="outrightsData">
        <BaseSecondaryAccordion
          :title="outrightsData.oen" level="2"
        >
          <div>
            <div class="btn-box">
              <AppSportsBetButton
                v-for="item in outrightsData.ml[0].ms" :key="item.wid"
                :cart-info="item.cartInfo"
                :title="item.sn" :odds="item.ov" layout="horizontal"
              />
            </div>
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
  </route>
