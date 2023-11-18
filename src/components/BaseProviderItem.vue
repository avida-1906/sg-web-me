<script lang="ts" setup>
interface Props {
  url: string
  active?: boolean
  showBg?: boolean
  maintained?: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="base-provider-item"
    :class="{ active, bg: showBg, maintain: maintained === '2' }"
  >
    <div class="img-wrap">
      <BaseImage :url="url" is-cloud />
    </div>
    <div v-if="maintained === '2'" class="center maintained-wrap">
      <BaseEmpty>
        <template #icon>
          <BaseIcon style="--tg-base-button-font-size:20px" name="uni-maintain" />
        </template>
        <template #description>
          <span style="font-size: var(--tg-font-size-xs);">
            {{ $t('plat_maintain') }}
          </span>
        </template>
      </BaseEmpty>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-provider-item {
  position: relative;
  will-change: transform;
  transition: all 0.3s ease 0s;
  border-radius: var(--tg-radius-md);
  display: block;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(27, 23, 23, .2), 0 2px 4px -1px rgba(0, 0, 0, .12);
  &::before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 40%;
  }
  &:hover {
    transform: translateY(-4%);
    box-shadow: 0 4px 6px 2px rgba(27, 23, 23, .2), 0 2px 4px 2px rgba(0, 0, 0, .12);
  }
  &.maintain{
    cursor: not-allowed;
  }
  .img-wrap {
    position: absolute;
    inset: 0 0 0 0;
  }
  .maintained-wrap{
    position: absolute;
    inset: 0 0 0 0;
    --tg-empty-text-padding:0;
    background: #{rgba($color: var(--tg-color-blue-rgb), $alpha: 0.8)};
  }
  &.bg{
    background-color: var(--tg-secondary-main);
  }

  &.active{
    background-color: var(--tg-text-blue);
  }
}
</style>
