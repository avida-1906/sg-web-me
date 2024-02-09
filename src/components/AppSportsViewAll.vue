<script setup lang='ts'>
const route = useRoute()
const { push } = useLocalRouter()
const { sidebarData } = storeToRefs(useSportsStore())

const sport = computed(() => route.params.sport ? +route.params.sport : 0)
// 球种名称
const sportName = computed(() => {
  if (sidebarData.value)
    return sidebarData.value.all.find(a => a.si === sport.value)?.sn ?? '-'
  return '-'
})

const params = ref({ si: sport.value, kind: 'normal' })
const { data, runAsync } = useRequest(ApiSportCompetitionList)
const allList = computed(() => {
  if (data.value && data.value.list)
    return data.value.list

  return []
})

function goLeagueDetail(pgid: string, pgn: string, ci: string, cn: string) {
  push(`/sports/${getSportsPlatId()}/${sport.value}/${pgid}/${ci}?${application.objectToUrlParams({ sn: sportName.value, pgn, cn })}`)
}

await application.allSettled([runAsync(params.value)])
</script>

<template>
  <div class="view-all">
    <BaseSecondaryAccordion
      v-for="region in allList"
      :key="region.pgid"
      :title="region.pgn"
      level="1"
      :init="true"
      :icon="region.ppic"
      is-cloud-icon
      style="--tg-secondaryAccordion-header-background:var(--tg-secondary-dark);
      --tg-secondaryAccordion-content-border-color:var(--tg-secondary-main);
      "
    >
      <template #side="{ isOpen }">
        <div v-show="!isOpen" class="accordion-badge-wrap">
          <BaseBadge :count="region.c" :max="99999" />
        </div>
      </template>
      <template #default>
        <div>
          <div class="wrapper">
            <div v-for="league in region.cl" :key="league.ci" class="btn">
              <BaseButton
                type="text" size="none"
                style="--tg-base-button-text-default-color:var(--tg-text-white);"
                @click="goLeagueDetail(region.pgid, region.pgn, league.ci, league.cn)"
              >
                <div class="league">
                  <span>{{ league.cn }} ({{ league.c }})</span>
                </div>
              </BaseButton>
            </div>
          </div>
        </div>
      </template>
    </BaseSecondaryAccordion>
  </div>
</template>

<style lang='scss' scoped>
.view-all{
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-12);
}
.wrapper{
  display: grid;
    grid-gap: var(--tg-spacing-8);
    grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
    padding: var(--tg-spacing-16);
    background-color: var(--tg-secondary-dark);
}
.btn{
  width: 100%;
  padding: var(--tg-spacing-12);
  border-radius: var(--tg-radius-default);
  background-color: var(--tg-base-button-style-bg);

  &:hover:not(:disabled) {
    background-color: var(--tg-text-grey);
  }
  .league{
    overflow: hidden;
    // text-overflow: ellipsis;
    span{
      white-space: nowrap;
    }
  }
}
</style>
