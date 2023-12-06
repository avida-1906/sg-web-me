<script setup lang="ts">
interface Props {
  columns: Column[] // 表格列的配置项
  dataSource?: any[] // 表格数据数组
  loading?: boolean // 是否加载中
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  dataSource: () => [],
  loading: false,
})

const emit = defineEmits(['sort'])
const sortSource: Ref<(string | undefined)[]>
  = ref(props.columns.map(item => item.sortDirections))

// 排序变化
function handleSort(item: Column, index: number) {
  if (item.sort) {
    const str = sortSource.value[index] === 'descend' ? 'ascend' : 'descend'
    sortSource.value = []
    sortSource.value[index] = str
    emit('sort', {
      col: item,
      sortDirections: str,
    })
  }
}

watch(() => props.columns, () => {
  sortSource.value = props.columns.map(item => item.sortDirections)
})
</script>

<template>
  <div class="scrollable scroll-x m-table-wrap">
    <table class="m-table">
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
              <span>{{ item.title }}</span>
              <div v-if="item.sort" class="th-sort">
                <BaseIcon
                  name="uni-table-sort"
                  :style="`${sortSource[index]
                    === 'ascend' ? '--tg-icon-color: #fff' : ''}`"
                />
                <BaseIcon
                  name="uni-table-sort"
                  :style="`transform: rotate(180deg);
                  ${sortSource[index] === 'descend' ? '--tg-icon-color: #fff' : ''}`"
                />
              </div>
            </div>
            <slot :name="`th-${item.slot}`" />
          </th>
        </tr>
      </thead>
      <tbody class="m-body">
        <tr v-show="loading" class="m-tr-loading">
          <BaseLoading class="m-loading" />
        </tr>
        <tr v-show="(!loading) && (!dataSource?.length)" class="m-tr-empty">
          <td class="m-td-empty" :colspan="columns.length">
            <BaseEmpty>
              <template #description>
                <span>{{ $t('data_empty') }}</span>
              </template>
            </BaseEmpty>
          </td>
        </tr>
        <tr v-for="(data, index) in dataSource" :key="index" class="m-tr">
          <td
            v-for="(col, n) in columns"
            :key="n" class="m-td"
            :title="data[col.dataIndex]"
            :style="`text-align:${col.align}`"
          >
            <slot
              v-if="col.slot" v-bind="{ record: data, index }"
              :name="col.slot"
              :index="index"
            >
              {{ data[col.dataIndex] || '--' }}
            </slot>
            <span v-else>{{ data[col.dataIndex] || '--' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
:root{
  --tg-table-font-size: var(--tg-font-size-default);
  --tg-table-even-background: inherit;
  --tg-table-odd-background: var(--tg-secondary-grey);
  --tg-table-th-background: var(--tg-table-even-background);
  --tg-table-th-color: var(--tg-text-lightgrey);
  --tg-table-line-height:1.5;
  --tg-table-th-padding: var(--tg-spacing-16);
  --tg-table-td-padding: var(--tg-spacing-16);
  --tg-table-th-font-weight: var(--tg-font-weight-semibold);
}
</style>

<style lang="scss" scoped>
.m-table-wrap {
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
      padding: var(--tg-table-th-padding); // 12px 20px;
      color: var(--tg-table-th-color);
      font-weight: var(--tg-table-th-font-weight);
      text-align: left;
      border: none;
      line-height: var(--tg-table-line-height);
      white-space: nowrap;
      background: var(--tg-table-th-background);
      vertical-align: middle;
      .th-box{
        display: inline-flex;
        align-items: center;
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

      .m-tr-loading {
        height: 40px;
        .m-loading {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
      .m-tr:nth-child(odd){
        background: var(--tg-table-odd-background);
      }
      .m-tr:nth-child(even){
        background: var(--tg-table-even-background);
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
  }
}
</style>
