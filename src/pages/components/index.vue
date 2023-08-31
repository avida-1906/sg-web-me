<script lang="ts" setup>
import ids from 'virtual:svg-icons-names'

function copyIcon(id: string) {
  return `<AppIcon :name="${id}" style="font-size: 50px;" />`
}
</script>

<template>
  <section class="box">
    <h3>AppIcon</h3>
    <ul class="icon-wrap">
      <li v-for="id in ids" :key="id" class="item" @click="() => copyIcon(id)">
        <AppIcon :name="id.slice(5)" style="font-size: 50px;" />
      </li>
    </ul>
  </section>
  <section class="box" />
</template>

<style lang="scss" scoped>
.box {
    padding: 20px;
    border: 4px solid red;
}

.icon-wrap {
  display: flex;
  list-style: none;
  align-items: flex-start;
  flex-wrap: wrap;
  .item {
    cursor: pointer;
    width: 60px;
    // height: 120px;
  }
}
</style>
