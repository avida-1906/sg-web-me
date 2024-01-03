<script setup lang="ts">
usePageTitle({ prefix: 'download', isT: true })
</script>

<template>
  <div class="center download">
    <a href="/app.apk" download>
      <BaseButton>
        {{ $t('download') }}Android Apk
      </BaseButton>
    </a>
  </div>
</template>

<style scoped>
.download {
  width: 100vw;
  height: 100vh;
}
</style>
