<script setup lang='ts'>
import type { ISportsBreadcrumbs } from '~/types'

const props = defineProps<{
  data?: {
    list: {
      si: number
      sn: string
      c: number
      list: {
        pgid: string
        pgn: string
        ci: string
        cn: string
        ei: string
        ed: number
        htn: string
        atn: string
      }[]
    }[]
  }
}>()

const router = useLocalRouter()
const { width } = storeToRefs(useWindowStore())
const closeSearch = inject('closeSearch', () => {})
const closeSearchH5 = inject('closeSearch', () => {})

const currentTab = ref(props.data?.list[0].si ?? 0)
const isH5Layout = computed(() => width.value < 575)
const tabList = computed(() => {
  if (props.data) {
    return props.data.list.map((a) => {
      return {
        label: a.sn,
        value: a.si,
        num: a.c,
      }
    })
  }

  return []
})
const list = computed(() => {
  if (props.data) {
    const dataFindBySi = props.data.list.find(a => a.si === currentTab.value)

    if (dataFindBySi) {
      return dataFindBySi.list.map((b) => {
        const sport = {
          label: dataFindBySi.sn,
          value: `${dataFindBySi.si}`,
          path: `/sports/${SPORTS_PLAT_ID}/${dataFindBySi.si}`,
        }
        const area = {
          label: b.pgn,
          value: `${b.pgid}`,
          // eslint-disable-next-line max-len
          path: `/sports/${SPORTS_PLAT_ID}/${dataFindBySi.si}/${b.pgid}?${application.objectToUrlParams({ sn: dataFindBySi.sn, pgn: b.pgn })}`,
        }
        const league = {
          label: b.cn,
          value: `${b.ci}`,
          // eslint-disable-next-line max-len
          path: `/sports/${SPORTS_PLAT_ID}/${dataFindBySi.si}/${b.pgid}/${b.ci}?${application.objectToUrlParams({ sn: dataFindBySi.sn, pgn: b.pgn, cn: b.cn })}`,
        }
        return {
          ...b,
          breadcrumb: [sport, area, league],
          time: timeToDateWithDayFormat(b.ed),
          path: `/sports/${SPORTS_PLAT_ID}/${dataFindBySi.si}/${b.pgid}/${b.ci}/${b.ei}`,
        }
      })
    }
    return []
  }
  return []
})
// 联赛跳转
function onBreadcrumbsClick({ list, index }: {
  list: ISportsBreadcrumbs[]
  index: number },
) {
  if (isH5Layout.value) {
    router.push(replaceSportsPlatId(list[2].path))
    closeSearchH5()
  }
  else {
    router.push(replaceSportsPlatId(list[index].path))
    closeSearch()
  }
}
function goEventDetail(path: string) {
  if (isH5Layout.value) {
    router.push(replaceSportsPlatId(path))
    closeSearchH5()
  }
  else {
    router.push(replaceSportsPlatId(path))
    closeSearch()
  }
}
</script>

<template>
  <div class="app-sports-search-result">
    <BaseTab v-model="currentTab" :list="tabList" :center="false">
      <template #tab="{ item }">
        <div class="tab">
          <label>{{ item.label }}</label>
          <span>{{ item.num }}</span>
        </div>
      </template>
    </BaseTab>

    <div class="result-list">
      <div v-for="item, in list" :key="item.ci" class="result-item">
        <div class="game-name">
          <BaseButton
            type="text" size="none"
            @click="goEventDetail(item.path)"
          >
            <span>{{ item.htn }}</span>
          </BaseButton> -
          <BaseButton
            type="text" size="none"
            @click="goEventDetail(item.path)"
          >
            <span>{{ item.atn }}</span>
          </BaseButton>
        </div>
        <div class="status">
          {{ item.time }}
        </div>
        <BaseBreadcrumbs :list="item.breadcrumb" @item-click="onBreadcrumbsClick" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-sports-search-result {
  --tg-tab-style-wrap-bg-color: var(--tg-primary-main);
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-8);
}

.tab {
  display: flex;
  line-height: 1.5;
  white-space: nowrap;

  label {
    margin-right: var(--tg-spacing-8);
  }

  span {
    padding: 0 var(--tg-spacing-7);
    border-radius: 50px;
    background-color: var(--tg-secondary-main);
  }
}

.result-list {

  .result-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--tg-spacing-8);
    padding: var(--tg-spacing-8) var(--tg-spacing-16);
    border-bottom: var(--tg-secondary-main) solid 2px;
    font-size: var(--tg-font-size-default);

    &:last-of-type {
      border: none;
    }

    .game-name {
      span {
        color: var(--tg-text-white);
        cursor: pointer;
      }
    }

    .status {
      // background-color: var(--tg-secondary-deepdark);
      border-radius: var(--tg-radius-sm);
      padding: 0 var(--tg-spacing-4);
      line-height: 1.5;
      font-size: var(--tg-font-size-xs);
    }
  }
}
</style>
