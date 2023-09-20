<script lang="ts" setup>
const data = ref([])

const checkedValues = ref()
</script>

<template>
  <VMenu>
    <slot>
      <button class="tips">
        VMenu
      </button>
    </slot>
    <template #popper>
      <section>
        <ul>
          <li>
            <BaseCheckBox v-model="checkedValues" />
          </li>
        </ul>
        <div>全部清除</div>
      </section>
    </template>
  </VMenu>
</template>

<style lang="scss" scoped>

</style>
