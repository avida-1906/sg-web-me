<script lang="ts" setup>
const { bool: isStealth } = useBoolean(false)
const { bool: hideStatistics } = useBoolean(true)
const { bool: hideContest } = useBoolean(false)
const { bool: isRed } = useBoolean(false)
const { bool: isMarketing } = useBoolean(true)
</script>

<template>
  <div class="tg-settings-preferences">
    <AppSettingsContentItem title="隐私">
      <template #top-desc>
        用户隐私是 Stake 的核心价值之一。 这些设置将允许您在其他玩家面前完全匿名。
      </template>
      <div class="switch-item">
        <BaseSwitch v-model="isStealth" class="switch" />
        <div>
          <p>启用隐身模式</p>
          <p>您的投注不会出现在公开投注动态和投注预览中</p>
        </div>
      </div>
      <div class="switch-item">
        <BaseSwitch v-model="hideStatistics" class="switch" />
        <div>
          <p>隐藏所有统计数据</p>
          <p>其他用户将无法查看您的输赢和投注的统计数据</p>
        </div>
      </div>
      <div class="switch-item">
        <BaseSwitch v-model="hideContest" class="switch" />
        <div>
          <p>隐藏所有竞赛记录</p>
          <p>其他用户将无法查看您的竞赛记录</p>
        </div>
      </div>
      <template #btm-left>
        请容许长达 30 秒的时间使更新生效。
      </template>
    </AppSettingsContentItem>
    <AppSettingsContentItem title="社区">
      <div class="switch-item">
        <BaseSwitch v-model="isRed" class="switch" />
        <div>
          <p>拒绝接收红包雨</p>
          <p>防止您在聊天室中收到红包雨</p>
        </div>
      </div>
      <template #btm-left>
        请容许长达 30 秒的时间使更新生效。
      </template>
    </AppSettingsContentItem>
    <AppSettingsContentItem title="营销" last-one>
      <div class="switch-item">
        <BaseSwitch v-model="isMarketing" class="switch" />
        <div>
          <p>接收营销电邮</p>
          <p>选择不接收营销电邮或优惠</p>
        </div>
      </div>
    </AppSettingsContentItem>
  </div>
</template>

<style lang="scss" scoped>
.tg-settings-preferences {
  font-size: var(--tg-font-size-default);
  .switch-item{
    display: flex;
    justify-content: start;
    .switch{
      margin-right: var(--tg-spacing-16);
      // #00b801
      --tg-base-switch-style-bg: var(--tg-text-green)
    }
    div{
      p:nth-child(1){
        line-height: 21px;
        color: var(--tg-text-lightgrey);
        font-weight: var(--tg-font-weight-semibold);
      }
      p:nth-child(2){
        color: var(--tg-text-grey);
        margin-top: var(--tg-spacing-4);
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  browserTitle: 首选项 – Stake.com
</route>
