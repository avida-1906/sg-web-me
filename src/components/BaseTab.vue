<script setup lang='ts'>
interface Props {
  list: {
    [text: string]: any
    value: string | number
    label: string
  }[]
  modelValue: string | number
  shape?: 'square' | 'round'
}
const props = withDefaults(defineProps<Props>(), {
  shape: 'round',
})
const emit = defineEmits(['update:modelValue', 'change'])

function onClick(v: string | number) {
  if (v === props.modelValue)
    return

  emit('update:modelValue', v)
  emit('change', v)
}
</script>

<template>
  <div class="scroll-x base-tab">
    <div class="tab-wrap" :class="[shape]">
      <div
        v-for="t, i in list" :key="i" class="tab" :class="{ active: t.value === modelValue }"
        @click="onClick(t.value)"
      >
        <div class="content">
          <slot name="tab" :item="t">
            {{ t.label }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-tab {
  display: flex;

  .tab-wrap {
    padding: var(--tg-spacing-5) var(--tg-spacing-6);
    background-color: var(--tg-secondary-dark);
    flex: 1;
    display: flex;
  }

  .square {
    border-radius: var(--tg-radius-default);

    .tab {
      border-radius: var(--tg-radius-default);
    }
  }

  .round {
    border-radius: 100px;

    .tab {
      border-radius: 100px;
    }
  }

  .tab {
    flex: 1;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-white);
    padding: var(--tg-spacing-11) var(--tg-spacing-20);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all ease .25s;
    margin-right: var(--tg-spacing-5);
    font-weight: var(--tg-font-weight-semibold);

    &:last-of-type {
      margin-right: 0;
    }

    .content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 0;
      white-space: nowrap;
    }

    &:active {
      .content {
        transform: scale(0.96);
      }
    }

    &:hover {
      background-color: var(--tg-secondary-main);
    }
  }

  .active {
    background-color: var(--tg-secondary-main);
  }
}
</style>
