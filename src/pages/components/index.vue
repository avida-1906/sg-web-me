<script lang="ts" setup>
import ids from 'virtual:svg-icons-names'

const { t } = useI18n()

function copyIcon(id: string) {
  return `<AppIcon name="${id}" />`
}
</script>

<template>
  <ul>
    <li class="box">
      <AppDemoCard :title="`${t('icon')}AppIcon`">
        <ul class="icon-wrap m0 p0">
          <li v-for="id in ids" :key="id" class="item" @click="() => copyIcon(id)">
            <AppIcon :name="id.slice(5)" />
          </li>
        </ul>
      </AppDemoCard>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.box {
  padding: 20px;
  position: relative;
  text-align: center;
}

.icon-wrap {
  display: flex;
  list-style: none;
  align-items: flex-start;
  flex-wrap: wrap;
  .item {
    cursor: pointer;
    width: 60px;
    font-size: 50px;
  }
}
</style>
