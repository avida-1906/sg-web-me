<script setup lang="ts">
const emit = defineEmits(['keyNum', 'keyOk'])

function keyUpNum(event: any) {
  const num = event.target?.dataset.num
  if (num)
    emit('keyNum', num)
}

function keyUpOk() {
  emit('keyOk')
}
</script>

<template>
  <div class="base-numeric-keypad" @click="keyUpNum">
    <div data-num="7">
      7
    </div>
    <div data-num="8">
      8
    </div>
    <div data-num="9">
      9
    </div>
    <div data-num="9">
      9
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
    <div class="ok-3" @click.stop="keyUpOk">
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
    height: 176px;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(4, 25%);
    grid-row-gap: var(--tg-border-width-default);
    grid-column-gap: var(--tg-border-width-default);
    font-size: var(--tg-font-size-md);
    font-weight: var(--tg-font-weight-semibold);
    color: var(--tg-text-white);
    div{
        height: 100%;
        background-color: var( --tg-secondary-grey);
        text-align: center;
        line-height: 44px;
    }
    .ok-3{
        grid-row-start: span 3;
        line-height: 132px;
    }
}
</style>
