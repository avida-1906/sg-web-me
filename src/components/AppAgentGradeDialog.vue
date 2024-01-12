<script lang="ts" setup>
const agentLevels = reactive([
  { level: 1, amount: '1000' },
  { level: 2, amount: '1000' },
  { level: 3, amount: '1000' },
  { level: 4, amount: '1000' },
  { level: 5, amount: '1000' },
  { level: 6, amount: '1000' },
  { level: 7, amount: '1000' },
  { level: 8, amount: '1000' },
  { level: 9, amount: '1000' },
  { level: 10, amount: '1000' },
  { level: 11, amount: '1000' },
  { level: 12, amount: '1000' },
])
</script>

<template>
  <div class="app-agent-level">
    <ul class="wrap">
      <li class="item title">
        <div>{{ $t('agent_level_label') }}</div>
        <div>{{ $t('agent_level_up_condition') }}</div>
      </li>
      <li v-for="item in agentLevels" :key="item.level" class="item">
        <div class="level">
          <BaseIcon
            style="font-size: var(--tg-font-size-base);" :name="`agent-${item.level}`"
          />
          <span>LV{{ item.level }} </span>
        </div>
        <div>{{ item.amount }}</div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.app-agent-level {
  padding: 0 var(--tg-spacing-16) var(--tg-spacing-16);
  .wrap {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--tg-spacing-12);
      font-size: var(--tg-font-size-default);
      color: var(--tg-text-white);
      line-height: var(--tg-spacing-54);
      .level {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        // font-size: 32px;
        gap: var(--tg-spacing-4);
      }
    }
    .item:nth-child(even) {
      background-color: var(--tg-secondary-grey);
    }
  }
}
</style>
