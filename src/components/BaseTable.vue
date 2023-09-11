<script setup lang="ts">
interface Column {
  title?: string // 列头显示文字
  width: number | string // 列宽度
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
            <slot v-if="col.slot" v-bind="data" :name="col.slot" :index="index">
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
    // border-radius: 4px 4px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    margin: 0;

    .m-th {
      padding: 16px;
      color: var(--tg-text-lightgrey);
      font-weight: 500;
      text-align: left;
      background: var(--tg-primary-main);
      border: none;
      transition: background .3s ease;
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

      .m-tr-empty {

        .m-td-empty {

        }
      }
    }

    .m-tr {
      border: none;
      background-color: var(--tg-primary-main);
      transition: background-color .3s;
      .m-td {
        padding: 16px;
        border: none;
        // border-bottom: 1px solid #f0f0f0;
        transition: background .3s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .m-tr:nth-child(odd){
      background: var(--tg-secondary-grey);
    }
  }
}
</style>
