<template>
  <div class="persuade-container">
    <img
      src="/png/mini/plinko/plinko.svg"
      alt="Image"
      width="150"
      height="200"
    >
    <div class="span-container">
      <div class="span" :style="{ width: '85px' }">
        <span>庄家优势:</span>
        <span
          :style="{
            color: '#ffffff',
          }"
        >1.00%</span>
      </div>
      <div :style="{ display: 'flex', flexDirection: 'row' }">
        <div class="span">
          <span>Pachinko</span>
        </div>
        <div class="span">
          <span>Stake 原创游戏</span>
        </div>
        <div class="span">
          <span>切换波动性</span>
        </div>
      </div>
      <span class="persuade">
        受日本著名的机械弹珠机 Pachinko 的启发，Plinko
        让玩家从三角形的钉板金字塔顶端落下弹珠，掉入相应奖金乘数的洞
        口寻找胜利之路。具有自定制游戏风险与乘数的能力，这款 Plinko
        版本绝对会适合所有玩家！
      </span>
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/css/persuade.css";
</style>
