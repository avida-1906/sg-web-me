<script setup lang="ts">
interface Props {
  columns: Column[] // 表格列的配置项
  dataSource?: any[] // 表格数据数组
  loading?: boolean // 是否显示骨架屏
  lastFirstPadding?: boolean // 是否设置每行第一个和最后一个左padding，右padding
  showEmpty?: boolean // 数据为空是否显示空状态
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  dataSource: () => [],
  loading: false,
  showEmpty: true,
})

const emit = defineEmits(['sort'])
const { t } = useI18n()
const sortSource: Ref<(string | undefined)[]>
  = ref(props.columns.map(item => item.sortDirections))

const getSource = computed(() => {
  return props.loading ? Array.from({ length: 10 }).fill({}) : props.dataSource
})

// 排序变化
function handleSort(item: Column, index: number) {
  if (item.sort) {
    const str = sortSource.value[index] === 'desc' ? 'asc' : 'desc'
    sortSource.value = []
    sortSource.value[index] = str
    emit('sort', {
      col: item,
      sortDirections: str,
    })
  }
}
function getWidth() {
  return `${Math.floor(Math.random() * 50) + 30}px`
}

watch(() => props.columns, () => {
  sortSource.value = props.columns.map(item => item.sortDirections)
})
</script>

<template>
  <div
    class="scroll-x scrollable m-table-wrap"
  >
    <table class="m-table" :class="[lastFirstPadding ? 'last-first-padding' : '']">
      <thead>
        <tr class="m-tr">
          <th
            v-for="(item, index) in columns" :key="index"
            class="m-th"
            :style="`width: ${typeof item.width === 'number'
              ? `${item.width}px` : item.width};text-align:${item.align}`"
          >
            <div
              class="th-box"
              :class="item.sort ? 'cursor-pointer' : ''"
              @click="handleSort(item, index)"
            >
              <VTooltip v-if="item.isTips" placement="top" :triggers="['click', 'hover']">
                <div class="center stealth-box">
                  <BaseIcon
                    name="uni-tips"
                    style="--tg-icon-color:var(--tg-text-grey);
                    margin-right: var(--tg-spacing-3);"
                  />
                </div>
                <template #popper>
                  <div class="tiny-menu-item-title">
                    您下注使用的所有货币会标准化为竞赛货币
                  </div>
                </template>
              </VTooltip>
              <span>{{ item.title }}</span>
              <div v-if="item.sort" class="th-sort">
                <BaseIcon
                  name="uni-table-sort"
                  :style="`${sortSource[index]
                    === 'asc' ? '--tg-icon-color: #fff' : ''}`"
                />
                <BaseIcon
                  name="uni-table-sort"
                  :style="`transform: rotate(180deg);
                  ${sortSource[index] === 'desc' ? '--tg-icon-color: #fff' : ''}`"
                />
              </div>
            </div>
            <slot :name="`th-${item.slot}`" />
          </th>
        </tr>
      </thead>
      <tbody class="m-body">
        <!-- <tr v-show="loading" class="m-tr-loading">
          <BaseLoading class="m-loading" />
        </tr> -->
        <tr
          v-if="showEmpty"
          v-show="(!loading) && (!dataSource?.length)"
          class="m-tr-empty"
        >
          <td class="m-td-empty" :colspan="columns.length">
            <div style="margin-top: var(--tg-table-margin-top-empty);">
              <BaseEmpty :description="t('data_empty')" icon="uni-empty-betslip" />
            </div>
          </td>
        </tr>
        <tr v-for="(data, index) in getSource" :key="index" class="m-tr">
          <td
            v-for="(col, n) in columns"
            :key="n" class="m-td"
            :title="data[col.dataIndex]"
            :style="`text-align:${col.align}`"
          >
            <template v-if="loading">
              <div>
                <BaseSkeleton
                  v-if="col.isRound === 'left'"
                  height="14px"
                  width="14px"
                  style="--tg-skeleton-border-radius:50%;
                  margin-right: var(--tg-spacing-8);"
                  animated="ani-opacity"
                />
                <BaseSkeleton
                  height="14px"
                  style="--tg-skeleton-border-radius: 3px"
                  :width="col.skeWidth ?? getWidth()"
                  animated="ani-opacity"
                />
                <BaseSkeleton
                  v-if="col.isRound === 'right'"
                  height="14px"
                  width="14px"
                  style="--tg-skeleton-border-radius:50%;
                  margin-left: var(--tg-spacing-8);"
                  animated="ani-opacity"
                />
              </div>
            </template>
            <template v-else>
              <slot
                v-if="col.slot" v-bind="{ record: data, index }"
                :name="col.slot"
                :index="index"
              >
                {{ data[col.dataIndex] || '-' }}
              </slot>
              <span v-else>{{ data[col.dataIndex] || '-' }}</span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
:root{
  --tg-table-font-size: var(--tg-font-size-default);
  --tg-table-even-background: initial;
  --tg-table-odd-background: var(--tg-secondary-grey);
  --tg-table-th-background: var(--tg-table-even-background);
  --tg-table-th-color: var(--tg-text-lightgrey);
  --tg-table-line-height:1.5;
  --tg-table-th-padding: var(--tg-spacing-16);
  --tg-table-td-padding: var(--tg-spacing-16);
  --tg-table-th-font-weight: var(--tg-font-weight-semibold);
  --tg-table-margin-top-empty: 24px;
  --tg-table-tr-last-first-padding: var(--tg-spacing-16);
  --tg-table-thtd-radius: var(--tg-radius-default);
}
</style>

<style lang="scss" scoped>
.m-table-wrap {
  --tg-skeleton-background-color: var(--tg-skeleton-color2);
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-table-font-size);
  .m-table {
    display: table;
    table-layout: auto;
    width: 100%;
    text-align: left;
    border-collapse: separate;
    border-spacing: 0;
    margin: 0;
    .m-th {
      padding: var(--tg-table-th-padding);
      color: var(--tg-table-th-color);
      font-weight: var(--tg-table-th-font-weight);
      text-align: left;
      border: none;
      line-height: var(--tg-table-line-height);
      white-space: nowrap;
      background: var(--tg-table-th-background);
      vertical-align: middle;
      .stealth-box{
        cursor: help;
      }
      .th-box{
        display: inline-flex;
        align-items: center;
        vertical-align: bottom;
        gap: var(--tg-spacing-4);
        .th-sort{
          display: flex;
          flex-direction: column;
          font-size: 6px;
        }
      }
    }

    .m-body {
      position: relative;

      // .m-tr-loading {
      //   height: 40px;
      //   .m-loading {
      //     position: absolute;
      //     width: 100%;
      //     height: 100%;
      //   }
      // }
      // .m-td-empty{
      //   margin-top: 24px;
      // }
      .mt-mobile{
        margin-top: 24.6vh;
      }
      .m-tr:nth-child(odd){
        background: var(--tg-table-even-background);
      }
      .m-tr:nth-child(even){
        background: var(--tg-table-odd-background);
      }
    }

    .m-tr {
      border: none;
      .m-td {
        padding: var(--tg-table-td-padding); // 12px 20px;
        line-height: var(--tg-table-line-height);
        border: none;
        overflow: hidden;
        white-space: nowrap;
        // text-overflow: ellipsis;
        vertical-align: middle;
      }

    }
    th:last-child,td:last-child{
      border-top-right-radius: var(--tg-table-thtd-radius);
      border-bottom-right-radius: var(--tg-table-thtd-radius);
    }
    th:first-child,td:first-child{
      border-top-left-radius: var(--tg-table-thtd-radius);
      border-bottom-left-radius: var(--tg-table-thtd-radius);
    }
  }
  .last-first-padding{
    .m-tr {
      th:last-child,td:last-child{
        padding-right: var(--tg-table-tr-last-first-padding);
      }
      th:first-child,td:first-child{
        padding-left: var(--tg-table-tr-last-first-padding);
      }
    }
  }
}
</style>
