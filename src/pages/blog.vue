<script lang="ts" setup>
const list = ref([1, 2, 3])
const finished = ref(false)
const loading = ref(false)
function loadMore() {
  loading.value = true
  const t = setTimeout(() => {
    list.value.push(Math.ceil(Math.random() * 10))
    list.value.push(Math.ceil(Math.random() * 10))
    list.value.push(Math.ceil(Math.random() * 10))
    console.log('list.value===>', list.value.length)
    loading.value = false
    if (list.value.length >= 15)
      finished.value = true

    clearTimeout(t)
  }, 1500)
}
</script>

<template>
  <div class="tg-blog">
    <div class="box">
      <BaseList :loading="loading" :finished="finished" @load="loadMore">
        <div v-for="i in list" :key="i" class="item">
          {{ i }}
        </div>
      </BaseList>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-blog {

}
.box{
  width: 500px;
  height: 600px;
  .item{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #72ACED;
    border-bottom: 2px solid red;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
