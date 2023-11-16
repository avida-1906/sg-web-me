<script lang="ts" setup>
import type { ISportOutrightsInfo } from '~/apis/types'

interface Props {
  autoShow: boolean
  data: ISportOutrightsInfo
}
const props = defineProps<Props>()

const router = useRouter()
const { width } = storeToRefs(useWindowStore())

const isH5Layout = computed(() => width.value < 575)
const breadcrumbs = computed(() => sportsDataBreadcrumbs(props.data))

// 联赛跳转
function onBreadcrumbsClick({ list, index }: { list: ISelectOption[]; index: number }) {
  let path = ''
  if (isH5Layout.value)
    path = `/sports/${getSportsPlatId()}/${list.map(a => a.value).join('/')}`

  else
    // eslint-disable-next-line max-len
    path = `/sports/${getSportsPlatId()}/${list.slice(0, index + 1).map(a => a.value).join('/')}`
  router.push(path)
}
</script>

<template>
  <BaseSecondaryAccordion :title="data.cn" level="2" :init="autoShow">
    <template #side="{ isOpen }">
      <div v-show="!isOpen" class="accordion-badge-wrap">
        <BaseBadge :count="1" />
      </div>
    </template>
    <div class="fixture-wrapper">
      <div
        class="outright-preview"
      >
        <span class="name">
          <a class="link">
            {{ data.oen }}
          </a>
        </span>
        <div class="breadcrumb">
          <BaseBreadcrumbs
            :list="breadcrumbs" :only-last="isH5Layout"
            @item-click="onBreadcrumbsClick"
          />
        </div>
        <span class="market-count">
          <BaseButton type="text" size="none">
            +{{ data.ml[0].ms.length }}
          </BaseButton>
        </span>
      </div>
    </div>
  </BaseSecondaryAccordion>
</template>

<style lang="scss" scoped>
.outright-preview {
  display: grid;
  grid-column-gap: var(--tg-spacing-8);
  padding: var(--tg-spacing-8) var(--tg-spacing-20);
  grid-template-areas:
      "name marketCount"
      "breadcrumb breadcrumb";
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-semibold);
  line-height: 1.3;
}
.group-time {
  display: flex;
  align-items: center;
  padding: calc(var(--tg-spacing-8) - 2px) var(--tg-spacing-16) var(--tg-spacing-8);
  position: sticky;
  top: -1px;
  z-index: 3;
  width: 100%;
  background: var(--tg-secondary-main);
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-xs);
}
.name {
  grid-area: name;
  color: #fff;
}
.breadcrumb {
  grid-area: breadcrumb;
}
.market-count {
  grid-area: marketCount;
  margin: auto 0 auto auto;
  color: var(--tg-secondary-light);
}
</style>
