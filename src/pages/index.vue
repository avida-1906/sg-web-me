<script setup lang="ts">
interface IVipProgressData {
  percent: number
  currentLevel: number
}

const { t } = useI18n()
const router = useRouter()
const { bool: showMore, toggle: toggleShowMore } = useBoolean(false)
const {
  appContentWidth,
  widthBoundarySm,
  widthBoundaryXs,
} = storeToRefs(useWindowStore())
const { isLogin } = storeToRefs(useAppStore())
const { openVipDialog } = useVipDialog()
const { openWalletDialog } = useWalletDialog()

const btnText = ref('查看更多')
const vipProgressData = ref<IVipProgressData>({
  percent: 30,
  currentLevel: 2,
})
const { list: liveList, runAsync: runLive } = useList(ApiMemberGameList)
const { list: slotList, runAsync: runSlot } = useList(ApiMemberGameList)
const { openRegisterDialog } = useRegisterDialog()

const isSm = computed(() => appContentWidth.value <= widthBoundarySm.value)
const isXs = computed(() => appContentWidth.value <= widthBoundaryXs.value)

const onShowMore = function () {
  toggleShowMore()
  if (showMore)
    btnText.value = '显示较少'
  else
    btnText.value = '查看更多'
}

await application.allSettled([runLive({ game_type: 1 }), runSlot({ game_type: 3 })])
</script>

<template>
  <div class="home-index" :class="{ 'is-mobile': isSm }">
    <!-- 头部 -->
    <div class="dark-background">
      <div class="top-wrapper">
        <div v-if="!isLogin" class="unauthenticated-wrapper">
          <div class="unauthenticated-content">
            <h1>更明智地下注</h1>
            <BaseButton bg-style="primary" round size="md" @click="openRegisterDialog">
              <span class="register-text">立即注册</span>
            </BaseButton>
            <AppAuthLogin />
          </div>
        </div>
        <div v-else class="top-vip-info" :class="isSm ? 'max-width-mobile' : 'max-width'">
          <AppVipProgress :vip-progress-data="vipProgressData">
            <template #title>
              <h1>欢迎归来，alanhayashi</h1>
            </template>
            <p @click="openVipDialog">
              您的 VIP 进度 <BaseIcon name="uni-arrowright-line" />
            </p>
          </AppVipProgress>
        </div>
        <div class="top-banner">
          <AppBanner :mode="isSm ? 'default' : 'home'" />
        </div>
      </div>
    </div>
    <!-- 玩法类型 -->
    <div class="index-features">
      <div class="features-casino" @click="router.push('/casino')">
        <div class="features-title">
          <BaseIcon name="tabbar-game" />
          <span>娱乐城</span>
        </div>
        <div class="features-image">
          <BaseImage url="/img/home/casino.png" class="base-img" />
        </div>
        <div class="features-content">
          <p>最领先的在线加密货币赌场</p>
          <p>浏览我们种类繁多的赌场游戏，让 Stake 为您提供既公平又有趣的在线博彩体验。直接通过您的浏览器在老虎机、真人娱乐场、21点、百家乐、轮盘以及数以千计的经典赌场游戏包括您最喜爱的 Stake 原创游戏上进行投注。</p>
        </div>
        <div class="features-button">
          <BaseButton bg-style="primary" class="w-100">
            前往娱乐城
          </BaseButton>
        </div>
      </div>
      <div class="features-sports" @click="router.push('/sports')">
        <div class="features-title">
          <BaseIcon name="spt-basketball" />
          <span>体育</span>
        </div>
        <div class="features-image">
          <BaseImage url="/img/home/sports.png" class="base-img" />
        </div>
        <div class="features-content">
          <p>最棒的加密货币在线体育博彩</p>
          <p>通过我们的体育博彩平台投注于来自世界各地的体育团队、选手及联赛。在综合格斗、篮球、足球等多个体育赛事的各种博彩项目上以及滚球盘口中进行投注，享受无与伦比的体育博彩体验。</p>
        </div>
        <div class="features-button">
          <BaseButton bg-style="primary" class="w-100">
            前往体育博彩
          </BaseButton>
        </div>
      </div>
    </div>
    <!-- 老虎机  -->
    <div class="pt-6">
      <AppSlider
        :game-type="EnumCasinoGameType.SLOT" icon="chess-slot-machine"
        :title="t('game_type_slot_short_name')" :data="slotList"
      />
    </div>
    <!-- 真人娱乐 -->
    <div class="pt-6">
      <AppSlider
        :game-type="EnumCasinoGameType.LIVE" icon="chess-live-casino" :title="t('game_type_live')"
        :data="liveList"
      />
    </div>
    <!-- 加密货币 -->
    <div class="index-buy-cryptocurrency" :class="[isXs ? 'flex-wrap' : 'grid-wrap']">
      <div>
        没加密货币？没问题。
      </div>
      <div :class="isSm ? 'h-22' : 'h-30'">
        <BaseIcon name="cryptocurrency-logo-1" class="w-48" />
        <BaseIcon name="cryptocurrency-logo-2" class="w-70" />
        <BaseIcon name="cryptocurrency-logo-3" class="w-75" />
        <BaseIcon name="cryptocurrency-logo-4" class="w-65" />
      </div>
      <div>
        <BaseButton size="md" @click="openWalletDialog">
          购买加密货币
        </BaseButton>
      </div>
    </div>
    <!-- 投注 -->
    <div class="index-bet">
      <AppBetData mode="home" />
    </div>
    <!-- 公司介绍 -->
    <div class="index-introduction" :class="{ 'max-height': showMore }">
      <div class="introduction-content" :class="{ 'column-count': !isSm }">
        <p>Stake.com 是加密货币博彩领域的全球领导者，拥有以比特币和其他加密货币进行投注的最佳赌场与体育博彩平台之一。 成立于 2017 年的 Stake.com 现已发展成为在线博彩行业中最值得信赖的品牌之一，并在全球许多市场上提供了种类繁多的赌场游戏。玩家可以在 Stake 这单一的平台上同时享受安全、可靠及有趣的在线博彩体验！ 除了赌场外，Stake.com 也提供了能在世界上最大型的体育项目、联赛与比赛上进行投注的动态体育博彩平台。具有最新更新的赔率和各种各样的投注选项，不难理解为什么 Stake 即是使用加密货币进行体育投注最实用的方式。</p>
        <p>Stake.com 是业内最负盛名的加密货币赌场与体育博彩平台之一。作为UFC 在拉丁美洲和亚洲的官方博彩合作伙伴以及沃特福德足球俱乐部的主要赞助商， Stake 是例如 Drake、伊斯利 · 阿迪萨亚、何塞 · 奥尔多等许多业内重头人物与超级巨星所信任的优质博彩合作伙伴。</p>
        <p>Stake.com 在库拉索获得许可，提供安全、可靠及公平的平台。Stake.com 由 Medium Rare N.V. 根据颁发给由库拉索政府授权和监管的 Antillephone 的游戏许可证 8048/JAZ 运营。 凭借良好的声誉、安全可靠的平台以及赌场与体育博彩上的各种投注选项，Stake 是个在世界各地都具有活跃社区的在线博彩平台。</p>
        <h1>Stake 加密货币赌场体验</h1>
        <p>Stake 加密货币赌场具有来自许多游戏提供商的数千多款赌场游戏，带给玩家无与伦比的体验。Stake 的赌场游戏在类型与玩法上各不相同，而这也包括了老虎机、21点、轮盘、百家乐和其他桌面游戏等经典游戏。</p>
        <p>为了让玩家获得身临其境的博彩体验，Stake 提供的真人娱乐场游戏具有真人荷官，通过现场直播视频让玩家在各种各样的真人娱乐场游戏中获得正宗的赌场游戏体验。</p>
        <p>Stake 除了提供来自许多游戏提供商不同类型的赌场游戏外，我们还拥有自己的 Stake 原创游戏，而这些游戏还是 Stake.com 最受欢迎的游戏之一，例如 Dice、Plinko、Mines、Crash、Limbo、Hilo等经典游戏。</p>
        <p>由我们才华横溢的团队制作以提供业内最优质、最公平的赌场游戏体验，Stake 原创游戏都是可证明公平的游戏且具有业内最低的庄家优势，并也同时确保玩家能获得值得信赖的博彩体验以及居高的玩家回报率（RTP）</p>
        <p>除了种类繁多的游戏、原创游戏的精美设计和各式各样的投注选项，Stake 也为使用比特币（BTC）、以太币（ETH）、狗狗币（DOGE）、比特币现金（BCH）、瑞波币（XRP）、波场币（TRX）以及柚子币（EOS）进行投注的玩家带来了最具吸引力和娱乐性的在线赌场体验之一。</p>

        <h1>Stake.com 加密货币体育博彩</h1>
        <p>Stake.com 的在线体育博彩让玩家能轻松投注于全球最大型的体育赛事。体育博彩玩家可以在我们的平台上投注于他们最喜爱的体育项目，例如足球、篮球、综合格斗、电子竞技、冰上曲棍球、板球、美式足球、网球、乒乓球、棒球、飞镖、一级方程式等，这甚至还包括了政治与娱乐！</p>
        <p>Stake.com 为玩家提供了在 UFC、英超联赛、NBA、NFL、CFL、MLB、意甲联赛、西甲联赛，还有甚至像《英雄联盟》和 Dota 2的电子竞技联赛这类各种大型的联赛和锦标赛上进行投注的机会。无论是哪个体育联赛，您都能在 Stake 找到它的投注盘口！</p>
        <p>Stake 为想在实时赛事上投注的玩家提供了实时体育博彩，以多种实时投注选项满足最活跃的体育博彩玩家。</p>
        <h1>Stake 的促销活动、奖金以及 VIP 计划</h1>
        <p>Stake 具有简单易用的用户界面以及高质量的用户体验，为 Stake 社区活跃的成员带来不同的促销活动与奖金。</p>
        <p>Stake 为玩家们准备的促销活动包括了定期的体育博彩促销活动和赌场促销活动。</p>
        <p>除了为赌场与体育博彩玩家们举办惊人的 $50,000 周度送奖活动和 Stake 每日竞赛外，Stake 也时常以 UFC、NBA、英超联赛等大型赛事或新推出的游戏进行特别的促销活动与奖金发放。</p>
        <p>注册了 Stake.com 账户之后，您接下来便可以根据您在 Stake 平台上的总投注额成为 VIP 并提高您 VIP 俱乐部的会员级别。VIP 会员将能享受特殊福利，例如重装奖金、返水、升级奖金、周度助推奖金以及通过电邮发送的月度奖金。</p>
        <p>符合条件的伯金 IV VIP 会员也将被分配一名专属的 VIP 服务代表。除此之外，Stake 所提供的全面 VIP 计划还会根据不同类型的玩家的累积使用量来满足他们的需求。有关 VIP 计划的更多信息，请参阅我们的 VIP 计划概述。</p>
        <h1>Stake 加密货币博彩的即时存款与提款的功能</h1>
        <p>在 Stake 的在线赌场与体育博彩上使用比特币或其他可用的加密货币进行投注与管理资金其实十分容易。要把资金存入您的 Stake.com 账户以使用您选择的加密货币进行体育投注，请遵循下列简单的步骤：</p>
        <ul>
          <li>第一步：前往钱包 > 存款。</li>
          <li>第二步：选择您想使用的货币。我们支持比特币（BTC）、以太币（ETH）、狗狗币（DOGE）、莱特币（LTC）等各种货币。复制您所选货币的存款地址。</li>
          <li>第三步：在您的加密货币钱包或交易所发送货币时，将您的存款地址输入为接收地址。</li>
          <li>附加说明：如果您想使用法定货币存款，您可以前往钱包 > 购买加密货币以通过 MoonPay 使用法定货币为 Stake 账户购买加密货币。</li>
        </ul>
        <p>您在 Stake 的存款与提款都是即时的，并且可任您选择任何可用的加密货币。无论您是想在我们的赌场游戏或体育赛事上进行投注，Stake 都提供了简单明了的过程。</p>
        <p>MoonPay 具有许多受支持的支付方式，您可以使用 Visa、MasterCard、Apple Pay、Google Pay 等购买加密货币来存款以进行投注。有关您所在辖区支持的支付方式完整列表，请参阅 MoonPay 文档。</p>
        <p>具有蓬勃发展的社区、活跃的聊天室以及一个专门为客户解决游戏或账户方面任何问题的支持团队，Stake.com 因此成功展示了它能成为最领先的加密货币赌场及体育博彩平台的原因。</p>
      </div>
      <div class="introduction-more">
        <BaseButton @click="onShowMore">
          {{ btnText }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-index{
  padding: 0 0 32px;
  .dark-background{
    position: relative;
    &:before {
      content: "";
      position: absolute;
      left: -2000px;
      right: -2000px;
      top: 0;
      bottom: 0;
      background: var(--tg-secondary-dark);
    }
    .top-wrapper{
      display: grid;
      position: relative;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 2rem;
      justify-content: space-between;
      background-position: left 25% center;
      background-size: auto 120%;
      background-repeat: no-repeat;
      background-image: url(https://stake.com/_app/immutable/assets/abstract-bg.71bdcaae.svg);
      .unauthenticated-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        align-self: center;
        padding: var(--tg-spacing-32) 0;
        .unauthenticated-content{
          display: grid;
          grid-auto-flow: row;
          gap: 1rem;
          h1{
            color: var(--tg-text-white);
            font-size: var(--tg-font-size-lg);
            font-weight: var(--tg-font-weight-bold);
            text-align: center;
            line-height: 1.5;
          }
          .register-text{
            width: 264px;

          }
        }
      }
      .top-vip-info{
        display: flex;
        justify-content: center;
        flex-direction: column;
        &.max-width{
          max-width: 350px;
        }
        &.max-width-mobile{
          width: calc(100% - 2em);
          margin: 0 auto;
        }
        padding-top: var(--tg-spacing-32);
        padding-bottom: var(--tg-spacing-64);
        h1{
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-lg);
          font-weight: var(--tg-font-weight-semibold);
          margin-bottom: var(--tg-spacing-16);
          line-height: 1.5;
        }
        p{
          font-size: var(--tg-font-size-default);
          display: flex;
          justify-content: start;
          align-items: center;
          transition: all .25s;
          cursor: pointer;
          > svg {
            margin-left: var(--tg-spacing-8);
          }
          &:hover{
            transform: translateX(8px);
          }
        }
      }
      .top-banner{
        position: relative;
        padding: var(--tg-spacing-24) 0;
      }
    }
  }
  .index-features{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin-top: var(--tg-spacing-24);
    grid-gap: 2rem;
    .features-casino,.features-sports{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      cursor: pointer;
      position: relative;
      &:hover{
        .features-image{
          .base-img{
            transform: translateY(-0.25rem);
          }
        }
      }
      .features-title{
        display: flex;
        justify-content: left;
        align-items: center;
        position: absolute;
        z-index: 1;
        > span {
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-md);
          font-weight: var(--tg-font-weight-semibold);
          margin-left: var(--tg-spacing-8);
        }
      }
      .features-image{
        .base-img{
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
          transition: all .25s;
          // border-radius: var(--tg-radius-default);
          --tg-base-img-style-radius: var(--tg-radius-default);
        }
      }
      .features-content{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        p:nth-child(1){
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-base);
          font-weight: var(--tg-font-weight-bold);
        }
        p:nth-child(2){
          color: var(--tg-text-lightgrey);
          margin-top: var(--tg-spacing-8);
          line-height: 21px;
          font-size: var(--tg-font-size-default);
        }
      }
      .features-button {
        .w-100{
          width: 100%;
        }
      }
    }
  }
  .grid-wrap{ // pc 布局
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: repeat(3,1fr);
    &.index-more{
      div:nth-child(2){
        justify-content: center;
        width: auto;
        > svg {
          width: 100%;
        }
      }
    }
  }
  .index-more{
    border-radius: var(--tg-radius-default);
    background: var(--tg-secondary-dark);
    margin-top: var(--tg-spacing-24);
    padding: 0 var(--tg-spacing-24);
    div:nth-child(1){
      display: flex;
      justify-content: start;
    }
    div:nth-child(2){
      display: flex;
      align-items: center;
      height: 80px;
      > svg {
        height: 60%;
      }
    }
    div:nth-child(3){
      display: flex;
      justify-content: end;
      img{
        height: 80px;
        width: auto;
      }
    }
  }
  .index-buy-cryptocurrency{
    border-radius: var(--tg-radius-default);
    background: var(--tg-secondary-dark);
    margin-top: var(--tg-spacing-24);
    padding: var(--tg-spacing-24);
    div:nth-child(1){
      font-size: var(--tg-font-size-base);
      color: var(--tg-text-white);
      font-weight: var(--tg-font-weight-semibold);
    }
    div:nth-child(2){
      display: flex;
      align-items: center;
      justify-content: center;
      > svg {
        &.w-50 {
          width: 48px;
        }
        &.w-70 {
          width: 70px;
        }
        &.w-75 {
          width: 75px;
        }
        &.w-65 {
          width: 65px;
        }
      }
      &.h-30{
        gap: var(--tg-spacing-16);
        > svg {
          height: 30px;
        }
      }
    }
    div:nth-child(3){
      display: flex;
      align-items: center;
      justify-content: end;
    }
  }
  .index-bet{
    margin-top: var(--tg-spacing-24);
  }
  .index-introduction{
    margin-top: var(--tg-spacing-24);
    background: var(--tg-secondary-dark);
    padding: var(--tg-spacing-16);
    width: 100%;
    color: var(--tg-text-lightgrey);
    position: relative;
    max-height: 250px;
    overflow: hidden;
    border-radius: 8px;
    &.max-height{
      max-height: 100%;
      .introduction-content::before{
        visibility: hidden;
      }
      .introduction-more{
        position: static;
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
    .introduction-content{
      &.column-count{
        column-count: 2;
        column-gap: 1.5rem;
      }
      &::before{
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg,var(--tg-secondary-dark) 0%,rgba(15,33,46,0) 100%);
      }
    }
    .introduction-more{
      position: absolute;
      z-index: 2;
      bottom: var(--tg-spacing-24);
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
      margin-top: var(--tg-spacing-16);
    }
    h1{
      color: var(--tg-text-white);
      font-size: var(--tg-font-size-xl);
      margin-bottom: var(--tg-spacing-8);
      font-weight: var(--tg-font-weight-semibold);
    }
    p{
      margin-bottom: var(--tg-spacing-20);
      line-height: 24px;
    }
    a{
      font-weight: var(--tg-font-weight-semibold);
      &:hover{
        color: var(--tg-text-white);
      }
    }
    ul{
      list-style-type:disc;
      padding-left: var(--tg-spacing-32);
      p {
        margin: 0;
      }
      li{
        margin: var(--tg-spacing-4) 0;
      }
    }
  }
}
.pt-6{
  padding-top: var(--tg-spacing-6);
}
.is-mobile{
  .dark-background{
    &:before {
      display: none;
    }
    .top-wrapper{
      grid-template-columns:100%;
      background:none;
      grid-gap: 0;
      .top-banner{
        padding: 0;
      }
    }
  }
  .index-features{
    grid-template-columns: none;
  }
}
// <888
.flex-wrap-reverse{
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    div:nth-child(2){
      justify-content: start;
      width: 50%;
      > svg{
        width: 60%;
      }
    }
    div:nth-child(1){
      margin: auto 0;
    }
  }
.h-22{
  gap: var(--tg-spacing-4);
  > svg{
    height: 22px;
  }
}
// <768
.flex-wrap{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  div:nth-child(1) {
    text-align: center;
  }
  div:nth-child(2) {
    justify-content: center;
    > svg{
      height: 22px;
    }
  }
  div:nth-child(3) {
    margin: 0 auto;
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
  browserTitle: Stake.com – 最领先的加密货币赌场及体育博彩平台
</route>
