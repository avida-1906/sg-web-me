<script setup lang='ts'>
withDefaults(defineProps<{ num: number }>(), {
  num: 1,
})
</script>

<template>
  <div class="wrapper">
    <div v-for="i, ii in num" :key="i" class="box-outer">
      <div v-if="ii > 0" class="line" />
      <div class="box">
        <div class="left">
          <BaseSkeleton animated="ani-opacity" width="50px" height="18px" />
          <BaseSkeleton animated="ani-opacity" width="100px" height="18px" />
        </div>
        <div class="right">
          <BaseSkeleton animated="ani-opacity" width="20px" height="16px" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.wrapper{
  display: flex;
    flex-direction: column;
}
.line{
  width: 100%;
  height: 1px;
  background-color: var(--tg-primary-main);
}
.box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--tg-spacing-14) var(--tg-spacing-20);
  .left {
    display: flex;
    flex-direction: column;
    gap:var(--tg-spacing-4);
  }
}
</style>
