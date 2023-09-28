<script lang="ts" setup>
interface Props {
  gameType: string
}
const props = defineProps<Props>()
const groupFilterOuter = ref()
const { appContentWidth } = storeToRefs(useWindowStore())

const isCasinoGame = computed(() => (Object.values(EnumCasinoGameType) as Array<string>).includes(props.gameType))
</script>

<template>
  <section ref="groupFilterOuter" class="tg-app-group-filter flex-center-bet" :class="{ 'less-than-700': appContentWidth < 700 }">
    <div class="flex-center-bet left">
      <template v-if="isCasinoGame">
        <div class="flex-center-bet title">
          <BaseIcon name="uni-bars" />
          <span class="txt">{{ $t('casino_filter_label') }}</span>
        </div>
        <div>
          <BaseCheckPop>
            <BaseButton bg-style="dark" size="sm">
              <div class="btn-arrow-down">
                <span>{{ $t('casino_provider') }}</span>
                <BaseBadge :count="2" mode="active" />
                <BaseIcon name="uni-arrow-down" />
              </div>
            </BaseButton>
          </BaseCheckPop>
        </div>
      </template>
      <template v-else>
        <BaseButton bg-style="dark" size="md" round @click="$router.push('/casino/collection/provider')">
          {{ $t('casino_filter_provider_all') }}
        </BaseButton>
      </template>
    </div>
    <div class="flex-center-bet right">
      <div class="title flex-center-bet">
        <BaseIcon name="uni-bars" />
        <span class="txt">{{ $t('casino_filter_label_sort') }}</span>
      </div>
      <div>
        <BaseGameSortPop>
          <BaseButton bg-style="dark" size="sm">
            <div class="btn-arrow-down">
              <span>热门</span>
              <BaseIcon name="uni-arrow-down" />
            </div>
          </BaseButton>
        </BaseGameSortPop>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.flex-center-bet {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tg-app-group-filter {
  width: 100%;
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
  line-height: 1.5;
  color: var(--tg-text-white);
  .left, .right {
    gap: var(--tg-spacing-16);

    .title {
      gap: var(--tg-spacing-input-padding-vertical);
    }
  }
  &.less-than-700 {
    .title {
      display: none;
    }
  }
}
.btn-arrow-down {
  font-size: var(--tg-font-size-default);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--tg-spacing-8);
  .app-svg-icon {
    font-size: var(--tg-font-size-xs);
  }
}
</style>
