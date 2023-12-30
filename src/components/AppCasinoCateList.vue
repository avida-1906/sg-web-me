<script setup lang="ts">
interface Props {
  cid: string
  name: string
  icon: string
}

const props = defineProps<Props>()

const { VITE_CASINO_HOME_PAGE_SIZE } = getEnv()
const { t } = useI18n()
const { push } = useLocalRouter()

const params = computed(() => {
  return {
    cid: props.cid,
  }
})
const isProvider = computed(() => props.cid === '5')

const {
  data,
  runAsync,
} = useRequest(ApiMemberGameCate)

const total = computed(() => {
  return data.value ? data.value.total : 0
})

const list = computed(() => {
  return data.value && data.value.games ? data.value.games : []
})

function _push() {
  push(`/casino/group/category?cid=${props.cid}&name=${props.name}`)
}
function goPage(item: any) {
  if (item.maintained === '2')
    return
  push(`/casino/group/provider?vid=${item.id}&name=${item.name}`)
}

await application.allSettled([runAsync(params.value)])
</script>

<template>
  <div class="list-wrap">
    <BaseButton
      type="text" size="none"
      @click="_push"
    >
      <div class="title">
        <AppImage
          v-if="icon" width="16px"
          height="16px"
          :url="icon"
          is-cloud loading="eager"
        />
        <span>{{ name }}</span>
      </div>
    </BaseButton>

    <AppCardList v-if="isProvider" :list="list" is-provider>
      <template #default="{ item }">
        <BaseProviderItem
          :url="item.icon"
          :maintained="item.maintained"
          @click="goPage(item)"
        />
      </template>
    </AppCardList>
    <AppCardList v-else :list="list" />
    <div v-show="total > VITE_CASINO_HOME_PAGE_SIZE" class="more">
      <BaseButton
        size="md"
        @click="_push"
      >
        {{ t('view_all') }} {{ total }} {{ name }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
