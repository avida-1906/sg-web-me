<script setup lang="ts">
interface Column {
  title?: string // 列头显示文字
  width?: number | string // 列宽度
  dataIndex: string // 列数据字符索引
  slot?: string // 列插槽名称索引
  align?: 'left' | 'center' | 'right' // 列对其方式
}
interface Props {
  columns: Column[] // 表格列的配置项
  dataSource?: any[] // 表格数据数组
  loading?: boolean // 是否加载中
}
withDefaults(defineProps<Props>(), {
  columns: () => [],
  dataSource: () => [],
  loading: false,
})
</script>

<template>
  <div class="m-table-wrap">
    <table class="m-table">
      <thead>
        <tr class="m-tr">
          <th
            v-for="(item, index) in columns" :key="index"
            class="m-th" :style="`width: ${typeof item.width === 'number' ? `${item.width}px` : item.width};text-align:${item.align}`"
          >
            {{ item.title }}
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
                <span>暂无数据</span>
              </template>
            </BaseEmpty>
          </td>
        </tr>
        <tr v-for="(data, index) in dataSource" :key="index" class="m-tr">
          <td v-for="(col, n) in columns" :key="n" class="m-td" :title="data[col.dataIndex as any]" :style="`text-align:${col.align}`">
            <slot v-if="col.slot" v-bind="{ record: data, index }" :name="col.slot" :index="index">
              {{ data[col.dataIndex as any] || '--' }}
            </slot>
            <span v-else>{{ data[col.dataIndex as any] || '--' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.m-table-wrap {
  color: var(--tg-text-lightgrey);
  font-size: var(--tg-font-size-default);
  .m-table {
    display: table;
    table-layout: fixed;
    width: 100%;
    text-align: left;
    border-collapse: separate;
    border-spacing: 0;
    margin: 0;
    .m-th {
      padding: 12px 20px;
      color: var(--tg-text-lightgrey);
      font-weight: var(--tg-font-weight-semibold);
      text-align: left;
      border: none;
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
      // .m-tr-empty {

      //   .m-td-empty {

      //   }
      // }
      .m-tr:nth-child(odd){
        background: var(--tg-secondary-grey);
      }
    }

    .m-tr {
      border: none;
      .m-td {
        padding: 12px 20px;
        border: none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
    }
  }
}
</style>
