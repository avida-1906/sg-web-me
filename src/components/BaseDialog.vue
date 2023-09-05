<script lang="ts" setup name="base-dialog">

</script>

<template>
  <section class="tg-base-dialog">
    <div class="overlay" />
    <div class="card">
      <div class="header">
        <h2>aa</h2>
        <div><BaseIcon name="uni-close" /></div>
      </div>
      <div class="content scrollY scroll-contain">
        <div class="modal-content">
          <div class="content">
            aa
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .tg-base-dialog {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: var(--tg-z-index-10);
    padding: var(--tg-spacing-12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--tg-font-size-default);
    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(14,18,36,.7);
      touch-action: none;
    }
  }
</style>
