<script setup lang='ts'>
const { t } = useI18n()
const { isLogin } = storeToRefs(useAppStore())
const { isMobile } = storeToRefs(useWindowStore())
const { bool: showMore, toggle: toggleShowMore } = useBoolean(false)

const btnText = ref(t('view_more_2'))

const onShowMore = function () {
  toggleShowMore()
  if (showMore.value)
    btnText.value = t('view_less')
  else
    btnText.value = t('view_more_2')
}
</script>

<template>
  <!-- 公司介绍 -->
  <div v-if="!isLogin" class="index-introduction" :class="{ 'max-height': showMore }">
    <div class="introduction-content" :class="[isMobile ? 'h5-mobile' : 'column-count']">
      <h2>Meibo 体育投注 - 人人喜爱的在线体育博彩公司</h2>
      <div class="p">
        Meibo.com 为现代投注者提供丰富的体育投注选择——我们的在线体育博彩公司提供各种实时体育投注，包括
        综合格斗
        、
        篮球
        、
        足球
        、
        曲棍球
        和
        棒球
        等。
      </div>
      <div class="p">
        我们的在线体育投注平台操作简单，用户可以在平台上投注自己喜欢的球队、球员和世界各地的联赛，还可以观看最大型的体育赛事直播。了解有关
        如何在 Meibo 免费在线观看
        您喜爱的体育节目直播的更多信息。
      </div>
      <div class="p">
        根据体育项目和直播体育赛事的不同，最雄心勃勃的体育投注者可以获得丰富多彩的体育选项和策略。
        Meibo 每天的体育投注量超过 100,000 次，是国内外体育投注的首选网站。获取所有
        最新体育趋势和 2023 年 8 月的数据！
      </div>
      <div class="p">
        通过我们的
        终极体育博彩指南
        ，了解更多您喜爱的体育项目、比赛和球员的博彩信息！
      </div>
      <h2>在线体育博彩赔率与投注类型</h2>
      <div class="p">
        Meibo 很自豪能为我们忠实的体育投注者提供顶级
        在线体育博彩
        体验。
      </div>
      <div class="p">
        只需前往感兴趣的体育运动、类别或体育联盟，即可查看可供投注的实时赛事和即将进行的赛事。
        除了对体育赛事的结果进行投注外，还有许多投注方式可供选择！您还可以使用我们的“投注生成器”功能，通过
        串关投注
        和
        同场比赛多重投注
        增加中奖机会。
      </div>
      <div class="p">
        最受欢迎的投注类型包括：
      </div>
      <ul>
        <li>
          数据和冠军
          ：一个赛季的大小球胜率以及冠军都属于长期投注，投注者可以通过长期投注获得价值。
        </li>
        <li>
          赔率：
          一种简单的投注方式，您投注三种结果之一：赢、输或平。
        </li>
        <li>
          让球：
          一种热门的投注类型，包括在球队或赛事的最终得分中增加或减少一个数值。类似于
          总分投注
          ，即预测总进球数或总得分是否会高于或低于某个特定数字。投注者还可以利用
          差额投注
          策略增加胜算。
        </li>
        <li>
          大小球赔率：
          比赛或球队总分的大小球。
        </li>
        <li>第一分/第一球：投注最先得分（得分、进球、达阵等）的球队或球员。</li>
        <li>体育直播的半场/中场休息调整赔率：根据实时比分调整赔率。</li>
        <li>
          球员特殊投注及更多：
          个人数据大/小球、全场最佳/MVP 以及其他庆祝运动员成就的特定投注。
        </li>
        <li>正确得分：准确预测比赛最终比分获得胜利</li>
      </ul>
      <div class="p">
        注册用户还可观看部分赛事和运动项目的现场直播——请查看赛事是否提供现场直播。了解
        如何免费观看您喜爱的体育赛事
        直播！
      </div>
      <h2>体育博彩促销活动和 Meibo 体育博彩奖金</h2>
      <div class="p">
        除了 Meibo 上精彩绝伦的体育博彩体验外，我们还为机智的投注者定期提供
        体育博彩促销活动
        。
      </div>
      <div class="p">
        除了
        每周 5 万美元的丰厚赠品
        和我们体育博彩和赌场的
        Meibo 每日竞赛
        之外，我们还定期围绕 UFC、NBA、英超联赛等赛事开展体育博彩促销活动和奖金活动。
      </div>
      <div class="p">
        很荣幸我们提供的工具和信息可以帮助
        您安全地使用 Meibo
        。通过我们的
        博彩权责指南
        了解更多在线博彩技巧。
      </div>
      <h2>可在 Meibo 在线体育博彩投注的体育项目和联赛</h2>
      <div class="p">
        浏览我们丰富的热门体育项目，满足您的体育投注和博彩需求——包括
        足球
        、
        篮球
        、
        综合格斗
        、
        电子竞技
        、
        冰球
        、
        板球
        、
        美式足球
        、
        网球
        、
        乒乓球
        、
        棒球
        、
        飞镖
        、
        一级方程式
        等，还有
        政治和娱乐
        ！
      </div>
      <div class="p">
        无论您是想投注单场比赛，还是整个赛季，我们都有全球范围内的各种体育赛事，包括全球最好的职业体育联赛，包括
        UFC
        、
        英超联赛
        、
        NBA
        、
        NFL
        、
        CFL
        、
        MLB（职业棒球大联盟）
        、
        NCAA
        、
        意甲
        、
        西甲
        和
        电竞联赛
        ，例如
        英雄联盟
        和
        Dota 2。
        我们甚至提供模拟现实联赛中的各种投注选项，包括
        SRL 足球
        和
        SRL 板球
        。通过我们的
        模拟现实联赛投注指南
        了解更多有关如何投注模拟现实联赛（SRL）的信息。
      </div>
      <div class="p">
        Meibo 是一个在线投注网站，提供直观易用的实时体育投注平台，可以对
        即将进行的体育赛事
        投注。没有什么比滚球体育投注更令人兴奋的了——投注已经开始的体育赛事，根据当前的比赛状态调整赔率，与时间赛跑。
      </div>
      <div class="p">
        滚球体育博彩
        对于那些对比赛非常敏锐的人来说绝对是心头好，他们很有信心比赛会在最后发生翻转。热门滚球体育投注包括
        滚球足球
        、
        滚球网球
        、
        滚球篮球
        、
        滚球板球
        和
        滚球电竞体育
        投注——根据时间和活动会随时提供不同类型的滚球体育项目。进一步了解
        滚球投注与赛前投注
        之间的区别，以及如何制定最佳投注策略可以在 Meibo 获胜。
      </div>
      <div class="p">
        因此，无论您是想投注美国体育联赛，还是热衷于尝试足球博彩，或者只是想了解更多有关体育博彩活动的信息，
        您都可以在 Meibo 体育博彩上找到，同时还有对即将进行的比赛给出的每周
        博彩提示和预测
        ！您还可以成为
        Meibo VIP 会员
        ，让一切更上一层楼！如需了解该计划的更多信息，请阅读我们的
        Meibo VIP 指南
        。
      </div>
    </div>
    <div class="introduction-more">
      <BaseButton size="none" @click="onShowMore">
        {{ btnText }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.index-introduction {
  margin-bottom: var(--tg-spacing-32);
  background: var(--tg-secondary-dark);
  padding: var(--tg-spacing-16);
  width: 100%;
  color: var(--tg-text-lightgrey);
  position: relative;
  max-height: 250px;
  overflow: hidden;
  border-radius: var(--tg-radius-md);

  &.max-height {
    max-height: 100%;

    .introduction-content::before {
      visibility: hidden;
    }

    .introduction-more {
      position: static;
      width: 100%;
      display: flex;
      justify-content: center;

      :deep(button.default.none) {
        padding: 13px 16px;
      }

      --tg-base-button-padding-x: 16px;
      --tg-base-button-padding-y: 13px;
    }
  }

  .introduction-content {
    column-gap: 1.5rem;

    &.column-count {
      column-count: 2;
    }

    &::before {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      content: "";
      width: 100%;
      height: 100%;
      background: linear-gradient(0deg,
          var(--tg-secondary-dark) 0%, rgba(15, 33, 46, 0) 100%);
    }
  }

  .h5-mobile {
    column-count: 1;

    h2 {
      font-size: var(--tg-font-size-lg);
    }
  }

  .introduction-more {
    position: absolute;
    z-index: 2;
    bottom: var(--tg-spacing-24);
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    margin-top: var(--tg-spacing-16);

    :deep(button.default.none) {
      padding: 13px 16px;
    }

    --tg-base-button-padding-x: 16px;
    --tg-base-button-padding-y: 13px;
  }

  h2 {
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-lg);
    margin-bottom: var(--tg-spacing-8);
    font-weight: var(--tg-font-weight-semibold);
    line-height: 1.3;
  }

  h3 {
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-base);
    font-weight: 600;
    margin-bottom: 8px;
  }

  .p {
    margin-bottom: var(--tg-spacing-20);
    line-height: 24px;
  }

  a {
    font-weight: var(--tg-font-weight-semibold);

    &:hover {
      color: var(--tg-text-white);
    }
  }

  ul {
    list-style-type: disc;
    padding-left: var(--tg-spacing-32);
    line-height: 24px;
    font-weight: 600;
    margin-bottom: 24px;

    .p {
      margin: 0;
    }

    li {
      margin: var(--tg-spacing-4) 0;
    }
  }
}
@media only screen and (min-width:1280px) {
  .index-introduction{
    h2{
      font-size: var(--tg-font-size-xl);
    }
  }
}
</style>
