<script lang="ts" setup>
interface Props {
  gameType: string
  sortType: string
  platformOptions: {
    label: string
    value: string
    count: number
    isChecked: boolean
  }[]
}
const props = defineProps<Props>()

const emit = defineEmits(['sortTypeChange', 'platTypeChecked'])

const { t } = useI18n()
const { appContentWidth } = storeToRefs(useWindowStore())
const { push } = useLocalRouter()
const {
  bool: isPopperOpen,
  setTrue: setPopperOpen,
  setFalse: setPopperClose,
} = useBoolean(false)

const groupFilterOuter = ref()
const selectValue = ref(props.sortType)
const selectOptions = [
  { icon: '', label: 'A-Z', value: EnumCasinoSortType.nameA },
  { icon: '', label: 'Z-A', value: EnumCasinoSortType.nameZ },
  {
    icon: 'chess-bonus-rounds',
    label: t('casino_sort_popular'),
    value: EnumCasinoSortType.hot,
  },
  {
    icon: 'chess-slot-machine',
    label: t('casino_sort_featured'),
    value: EnumCasinoSortType.recommend,
  },
]
const platformCheckedValues = ref([])

const isProvider = computed(() => props.gameType === 'provider') // 供应商

function onSortSelect(v: string) {
  emit('sortTypeChange', v)
}
function onCheckedPlatform(v: string[]) {
  emit('platTypeChecked', v.join(','))
}
function resetPlatformChecked() {
  if (!platformCheckedValues.value.length)
    return
  platformCheckedValues.value = []
  emit('platTypeChecked', '')
}
</script>

<template>
  <section
    ref="groupFilterOuter" class="tg-app-group-filter flex-center-bet"
    :class="{ 'less-than-700': appContentWidth < 700 }"
  >
    <div class="flex-center-bet left">
      <template v-if="!isProvider">
        <div class="flex-center-bet title">
          <BaseIcon name="uni-bars" />
          <span class="txt">{{ $t('casino_filter_label') }}</span>
        </div>
        <div>
          <VDropdown
            placement="bottom" @hide="setPopperClose"
            @show="setPopperOpen"
          >
            <BaseButton bg-style="dark" size="sm">
              <div class="btn-arrow-down">
                <span>{{ $t('casino_provider') }}</span>
                <!-- <BaseBadge
                  :count="platformOptions.length"
                  mode="active" :max="99999"
                /> -->
                <div class="icon" :class="{ up: isPopperOpen }">
                  <BaseIcon name="uni-arrow-down" />
                </div>
              </div>
            </BaseButton>
            <template #popper="{ hide }">
              <div>
                <section class="base-check-pop-inner">
                  <BaseCheckboxGroup
                    v-model="platformCheckedValues"
                    :list="platformOptions"
                    size="mid"
                    @check="onCheckedPlatform"
                  >
                    <template #default="{ item }">
                      <div
                        class="check-item-label"
                        :class="{ active: item.isChecked }"
                      >
                        <div>{{ item.label }}</div>
                        <div class="">
                          <BaseBadge
                            :count="item.count"
                            :mode="platformCheckedValues.length
                              ? (item.isChecked ? 'active' : 'black')
                              : 'active'"
                          />
                        </div>
                      </div>
                    </template>
                  </BaseCheckboxGroup>
                </section>
                <div class="clear-all" @click="resetPlatformChecked();hide()">
                  {{ $t('clear_all') }}
                </div>
              </div>
            </template>
          </VDropdown>
        </div>
      </template>
      <template v-else>
        <BaseButton
          bg-style="dark"
          size="md"
          round
          @click="push('/casino/collection/provider')"
        >
          {{ $t('casino_filter_provider_all') }}
        </BaseButton>
      </template>
    </div>
    <div class="flex-center-bet right">
      <div class="title flex-center-bet">
        <BaseIcon name="uni-bars" />
        <span class="txt">{{ $t('casino_filter_label_sort') }}</span>
      </div>
      <BaseSelect
        v-model="selectValue"
        :options="selectOptions"
        popper
        @select="onSortSelect"
      >
        <template #option="{ data: { item, active } }">
          <div class="flex-center-bet sort" :class="{ active }">
            <BaseIcon v-if="item.icon" :class="{ active }" :name="item.icon" />
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
// 游戏提供商
.clear-all {
  width: 100%;
  padding:
  var(--tg-spacing-button-padding-horizontal-xs)
  var(--tg-spacing-button-padding-vertical-xs);
  font-weight: var(--tg-font-weight-semibold);
  text-align: center;
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-secondary-main);
  cursor: pointer;
  background-color: var(--tg-text-white);
  border-top: 1px solid var(--tg-text-grey-light);
}

.base-check-pop-inner {
  padding: var(--tg-spacing-button-padding-horizontal-xs);
  display: flex;
  flex-direction: column;
}

.check-item-label {
  height: 32.4px;
  display: inline-flex;
  align-items: center;
  font-weight: var(--tg-font-weight-semibold);
  font-size: var(--tg-font-size-default);
  color: var(--tg-popper-color-default);
  transition: all 0.2s;
  letter-spacing: 0;
  padding-top: 6px;
  padding-bottom: 4px;
  justify-content: space-between;
  gap: 8px;
}

// 排序
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
  line-height: 1.3;

  .icon{
    display: flex;
    align-items: center;
    justify-content: center;
    // transition: var(--tg-transition);
    font-size: var(--tg-font-size-default);
    &.up{
      transform: rotate(180deg);
    }
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
