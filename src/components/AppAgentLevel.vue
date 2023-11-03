<script setup lang='ts'>
defineProps<{ level: string; color: string }>()
</script>

<template>
  <div class="app-agent-level" :class="[color]">
    {{ level }}
    <div class="img">
      <BaseImage url="/png/affiliate/boss_bg.png" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-agent-level {
  position: relative;
  width: 48px;
  height: 48px;
  background-color: var(--tg-secondary-main);
  font-size: var(--tg-font-size-md);
  font-weight: var(--tg-font-weight-bold);
  text-align: center;
  border-radius: 50%;
  .img{
    position: absolute;
    bottom: -9px;
    width: 119%;
    left: -5px;
  }
}

.blue {
  color: var(--tg-text-blue);
}

.green {
  color: var(--tg-text-green-light);
}

.pink {
  color: var(--tg-text-pink);
}
</style>
