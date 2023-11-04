<script setup lang='ts'>
defineProps<{ level: string; color: string }>()
</script>

<template>
  <div class="app-agent-level" :class="[color]">
    <span class="level">{{ level }}</span>
    <div class="img">
      <BaseImage url="/png/affiliate/boss_bg.png" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-agent-level {
  position: relative;
  width: 40px;
  height: 40px;
  background-color: var(--tg-secondary-main);
  font-size: var(--tg-font-size-md);
  font-weight: var(--tg-font-weight-bold);
  text-align: center;
  border-radius: 50%;
  .level{
    display: block;
    transform: translateY(-2px);
  }
  .img{
    position: absolute;
    bottom: -9px;
    width: 119%;
    left: -4px;
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
