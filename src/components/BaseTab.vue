<script setup lang='ts'>
interface Props {
  list: {
    [text: string]: any
    value: string | number
    label: string
  }[]
  modelValue: string | number
  average?: boolean
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
  <div class="base-tab" :class="[shape]">
    <div
      v-for="t, i in list" :key="i" class="tab" :class="{ active: t.value === modelValue, average }"
      @click="onClick(t.value)"
    >
      <div class="content">
        <slot name="tab" :item="t">
          {{ t.label }}
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-tab {
  width: 100%;
  background-color: var(--tg-secondary-dark);
  padding: 5px 6px;
  display: flex;
  align-items: center;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  /* IE 10+ */
  scrollbar-width: none;
  /* Firefox */

  .tab {
    flex-shrink: 0;
    font-size: var(--tg-font-size-default);
    color: var(--tg-text-white);
    padding: 11px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .content {
      width: 100%;
      height: 100%;
    }

    &:active {
      .content {
        transform: scale(0.9);
      }
    }
  }

  .average{
    flex: 1;
  }

  .active {
    background-color: var(--tg-secondary-main);
  }
}
.square{
  border-radius: var(--tg-radius-default);
  .tab{
    border-radius: var(--tg-radius-default);
  }
}
.round{
  border-radius: 100px;
  .tab{
    border-radius: 100px;
  }
}
</style>
