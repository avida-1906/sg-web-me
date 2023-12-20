<script setup lang="ts">
interface Props {
  platformId: string
  name: string
  icon: string
}

const props = defineProps<Props>()

// 游戏列表
const { VITE_CASINO_HOME_PAGE_SIZE } = getEnv()
const { t } = useI18n()
const { push } = useLocalRouter()

const params = computed(() => {
  return {
    platform_id: props.platformId,
  }
})

const {
  list,
  total,
  runAsync,
} = useList(ApiMemberGameList)

function _push() {
  push(`/casino/group/provider?pid=${props.platformId}&name=${props.name}`)
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

    <AppCardList :list="list" />
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
