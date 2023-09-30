<script lang="ts" setup>
import { EnumCasinoGameType, EnumCasinoSortType } from '~/utils/enums'

interface Props {
  gameType: string
  sortType?: string
}
const props = defineProps<Props>()

const emit = defineEmits(['sortTypeChange'])

const { t } = useI18n()
const { appContentWidth } = storeToRefs(useWindowStore())

const groupFilterOuter = ref()
const selectValue = ref(props.sortType)
const selectOptions = [
  { icon: 'spt-sort-az', label: 'A-Z', value: EnumCasinoSortType.nameA },
  { icon: 'spt-sort-az', label: 'Z-A', value: EnumCasinoSortType.nameZ },
  { icon: 'chess-bonus-rounds', label: t('casino_sort_popular'), value: EnumCasinoSortType.hot },
  { icon: 'chess-slot-machine', label: t('casino_sort_featured'), value: EnumCasinoSortType.recommend },
]

const isCasinoGame = computed(() => (Object.values(EnumCasinoGameType) as Array<string>).includes(props.gameType))

function onSortSelect(v: string) {
  emit('sortTypeChange', v)
}
</script>

<template>
  <section
    ref="groupFilterOuter" class="tg-app-group-filter flex-center-bet"
    :class="{ 'less-than-700': appContentWidth < 700 }"
  >
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
      <BaseSelect v-model="selectValue" :options="selectOptions" popper @select="onSortSelect">
        <template #option="{ data: { item, active } }">
          <div class="flex-center-bet sort" :class="{ active }">
            <BaseIcon :name="item.icon" />
            <div class="label">
              {{ item.label }}
            </div>
          </div>
        </template>
      </BaseSelect>
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

  .left,
  .right {
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

.sort {
  gap: var(--tg-spacing-input-padding-vertical);
  --tg-icon-color: var(--tg-secondary-main);

  .label {
    text-align: left;
    flex: 1;
  }

  &.active {
    color: var(--tg-text-blue);
    --tg-icon-color: var(--tg-text-blue);
  }
}
</style>
