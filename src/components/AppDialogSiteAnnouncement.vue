<script setup lang='ts'>
const tab = ref('1')
const tabList = [
  { label: '活动一', value: '1' },
  { label: '活动一', value: '2' },
  { label: '活动一', value: '3' },
  { label: '活动一', value: '4' },
]
</script>

<template>
  <div class="flex flex-col px-12 pb-18">
    <BaseTab v-model="tab" :list="tabList" />
    <div class="bg-tg-secondary-dark relative mt-15 w-full rounded-[4px] pt-[78.125%]">
      <div class="scroll-y absolute left-0 top-0 h-full w-full">
        <!-- 文字 -->
        <div class="text-tg-secondary-light p-[10px] leading-[1.5]">
          由于我们发放给玩家的奖金数额居多，Meibo 的 VIP
          计划一向都被评为最佳的在线赌场体验之一。此外，我们屡获殊荣的支持团队将全天候在线回答您的任何问题。我们在众多在线赌场中拥有最高的客户满意度，也与此同时创建了由全球最热情的一些博彩爱好者所组成的社区。
        </div>
        <!-- 图片 -->
        <!-- <BaseImage class="h-full w-full" url="/png/avatar.png" /> -->
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
