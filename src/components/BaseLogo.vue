<script setup lang="ts">
interface Props {
  useSmall?: boolean
}
withDefaults(defineProps<Props>(), {
  useSmall: false,
})
const router = useRouter()
function pathTo() {
  router.push('/')
}
</script>

<template>
  <div class="base-logo" @click="pathTo">
    <BaseAspectRatio ratio="2/1" style="max-width: 67px; min-width: 42px">
      <BaseIcon class="icon-app-logo" :name="useSmall ? 'app-logo-small' : 'app-logo'" />
    </BaseAspectRatio>
  </div>
</template>

<style lang="scss" scoped>
.base-logo {
  // width: 100%;
  // height: 100%;
  cursor: pointer;
  .icon-app-logo {
    display: block;
    width: 100%;
    height: 100%;
    --tg-icon-color: var(--tg-text-white);
  }
}
.base-logo:active{
  transform: scale(0.96);
}
</style>
