<script lang="ts" setup>
import Home from './home.vue'
</script>

<template>
  <Home>
    <template #default>
      <AppContent>
        <RouterView />
        <div class="layout-spacing">
          <AppBetData mode="sports" />
        </div>
      </AppContent>
    </template>
  </Home>
</template>

<style lang="scss" scoped>

</style>
