<script setup lang="ts">
const emit = defineEmits(['keyNum', 'keyOk', 'keyDelete'])

function keyUpNum(event: any) {
  const num = event.target?.dataset.num
  if (num)
    emit('keyNum', num)
}
</script>

<template>
  <div class="base-numeric-keypad" @click.stop="keyUpNum">
    <div data-num="7">
      7
    </div>
    <div data-num="8">
      8
    </div>
    <div data-num="9">
      9
    </div>
    <div
      style="--tg-icon-color: var(--tg-text-white)"
      @click.stop="emit('keyDelete')"
    >
      <BaseIcon name="keyboard-delete" />
    </div>
    <div data-num="4">
      4
    </div>
    <div data-num="5">
      5
    </div>
    <div data-num="6">
      6
    </div>
    <div class="ok-3" @click.stop="emit('keyOk')">
      ok
    </div>
    <div data-num="1">
      1
    </div>
    <div data-num="2">
      2
    </div>
    <div data-num="3">
      3
    </div>
    <div data-num="00">
      00
    </div>
    <div data-num="0">
      0
    </div>
    <div data-num=".">
      .
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-numeric-keypad{
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(4, 25%);
    grid-row-gap: var(--tg-border-width-default);
    grid-column-gap: var(--tg-border-width-default);
    font-size: var(--tg-font-size-md);
    font-weight: var(--tg-font-weight-normal);
    color: var(--tg-text-white);
    > div{
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var( --tg-secondary-grey);
      text-align: center;
      cursor: pointer;
      &:hover{
        background-color: var(--tg-secondary-main);
      }
    }
    .ok-3{
      grid-row-start: span 3;
    }
}
</style>
