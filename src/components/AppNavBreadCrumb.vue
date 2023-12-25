<script lang="ts" setup>
import type { IBreadCrumbItem } from '~/types'

interface Props {
  breadcrumb: Array<IBreadCrumbItem>
}

const props = defineProps<Props>()

const router = useLocalRouter()

const _data = ref([...props.breadcrumb])

function goPath(
  { d, disabled }: { d?: IBreadCrumbItem; disabled?: boolean } = {},
) {
  if (disabled)
    return
  // _data.value.pop()
  const p = _data.value[_data.value.length - 1]
  const _d = d ?? p
  if (_d && _d.path)
    router.push(replaceSportsPlatId(_d.path))
}

// function goBack() {
//   if (_data.value.length > 1)
//     goPath()
//   else
//     router.push(`/sports/${getSportsPlatId()}`)
// }

watch(() => props.breadcrumb, (val) => {
  _data.value = val
})
</script>

<template>
  <div class="scroll-x app-nav-bread-crumb">
    <!-- <div class="back">
      <BaseButton size="md" @click="goBack">
        <BaseIcon
          style="font-size: var(--tg-font-size-default);transform: scale(1.25);"
          name="uni-arrow-left" class="arrow-left"
        />
      </BaseButton>
    </div> -->
    <div class="scroll-x breadcrumb-wrapper remove-end-border">
      <template v-for="d, idx in _data" :key="d.path">
        <a
          class="link"
          :class="{
            disabled: idx === _data.length - 1,
            active: idx === _data.length - 1,
          }"
          @click="goPath({ d, disabled: idx === _data.length - 1 })"
        >
          <span>{{ d.title }}</span>
        </a>
        <div v-if="idx !== _data.length - 1" class="slash-wrap">
          <span class="slash" />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-nav-bread-crumb {
  --tg-icon-color: var(--tg-text-white);
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  // width: 100%;
  height: 100%;
  .back {
    --tg-base-button-style-bg: var(--tg-secondary-dark);
    --tg-base-button-style-bg-hover: var(--tg-secondary-deepdark);
    margin-right: var(--tg-spacing-12);
    svg {
      font-size: var(--tg-font-size-xs);
    }
  }
  .breadcrumb-wrapper {
    padding: var(--tg-spacing-16) var(--tg-spacing-20);
    display: flex;
    // justify-content: center;
    align-items: center;
    max-height: 44px;
    background: var(--tg-secondary-dark);
    border-radius: var(--tg-radius-default);
    .link {
      position: relative;
      display: inline-flex;
      touch-action: manipulation;
      padding: 0;
      height: auto;
      font-size: var(--tg-font-size-default);
      justify-content: flex-start;
      outline: none;
      box-shadow: none;
      color: var(--tg-text-white);
      background: 0;
      margin: 0 var(--tg-spacing-8);
      font-weight: var(--tg-font-weight-semibold);
      border: none;
      align-items: center;
      -webkit-tap-highlight-color: transparent;
      transition: background-color 0.2s,color 0.2s;
      flex-shrink: 0;
      &.disabled {
        cursor: not-allowed;
        opacity: .5;
      }
      &.active {
        color: var(--tg-text-white);
        background: 0;
      }
      &:active{
        transform: scale(0.96);
      }
    }
    .slash-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 100%;
    }
    .slash {
      display: flex;
      width: 2px;
      height: 3.2em;
      margin: -12px 16px;
      background: var(--tg-primary-main);
      transform: skew(-20deg);
    }
  }
  .breadcrumb-wrapper.remove-end-border {
    border-top-right-radius: var(--tg-radius-default);
    border-bottom-right-radius: var(--tg-radius-default);
  }
}
</style>
