<script setup lang='ts'>
interface Props {
  type: 'casino' | 'sports'
  data: {
    [t: string]: any
  }
}
const props = defineProps<Props>()
const { t } = useI18n()

const isCasino = computed(() => props.type === 'casino')
</script>

<template>
  <div class="dialog-bet-slip">
    <div class="top">
      <div class="game-type">
        {{ t(type) }}
      </div>
      <div class="order-id">
        <span>ID 93,425,567</span>
        <BaseButton type="text" padding0>
          <BaseIcon name="uni-doc" />
        </BaseButton>
        <BaseButton type="text" padding0>
          <BaseIcon name="uni-link" />
        </BaseButton>
      </div>
      <div class="des">
        <span>投资者：Tese0000001</span><br>
        <span class="time">于2023/07/07 17:42</span>
      </div>
    </div>
    <div v-if="isCasino" class="casino-bottom">
      <div class="item">
        <label>投注:</label>
        <span>
          4.00000000
          <AppCurrencyIcon currency-type="BRL" />
        </span>
      </div>
      <div class="item">
        <label>乘数:</label>
        <span>1.00x</span>
      </div>
      <div class="item">
        <label>投注:</label>
        <span>
          4.00000000
          <AppCurrencyIcon currency-type="BRL" />
        </span>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.dialog-bet-slip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: var(--tg-spacing-16);
  line-height: 1.5;

  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: var(--tg-spacing-16);

    .game-type,
    .order-id {
      font-size: var(--tg-font-size-base);
      color: var(--tg-text-white);
      font-weight: var(--tg-font-weight-semibold);
    }

    .order-id {
      display: flex;
      align-items: center;
      gap: var(--tg-spacing-8);
      margin-bottom: var(--tg-spacing-20);
    }

    .des {
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-lightgrey);
      text-align: center;
      font-weight: var(--tg-font-weight-semibold);
      .time{
        font-weight: var(--tg-font-weight-normal);
      }
    }
  }

  .casino-bottom {
    width: 100%;
    background-color: var(--tg-secondary-dark);
    padding: var(--tg-spacing-12)var(--tg-spacing-16);
    display: flex;
    flex-direction: column;
    gap: var(--tg-spacing-8);

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-lightgrey);
      font-weight: var(--tg-font-weight-semibold);

      span {
        color: var(--tg-text-white);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--tg-spacing-4);
      }
    }
  }
}
</style>
