<script setup lang="ts">
import AppDemoCard from '~/components/AppDemoCard.vue'

defineOptions({
  name: 'IndexPage',
})

const appStore = useAppStore()
const { isLogin } = storeToRefs(appStore)
const { t } = useI18n()
const { run, data } = useRequest(() => ApiMemberLogin({
  username: '章三',
  password: '123456',
}), {
  manual: true,
  onSuccess: (res: any) => {
    console.log(res)
  },
})

function getData() {
  run()
}

console.log(application.timestampToTime(1628774400000))
console.log(application.timestampToTime(1628774400000, EnumLanguage['zh-CN']))
console.log(application.timestampToTime(1628774400000, EnumLanguage['pt-BR']))
console.log(application.timestampToTime(1628774400000, EnumLanguage['vi-VN']))

console.log(application.numberToCurrency(1232330.19999, EnumCurrency.CAD))

const { openDialog, closeDialog } = useDialog({
  title: '表格',
  icon: 'balls-darts-on',
  default: () => h(AppDemoCard, { title: '标题' }, {
    default: () => h('table', { style: { color: 'orange' } }, 'abcdefg'),
  }),
})
function connectMqtt() {
  socketClient.connect()
}

function disconnectMqtt() {
  socketClient.disconnect()
}
const { bool: showMore, toggle: toggleShowMore } = useBoolean(false)
const onShowMore = function () {
  toggleShowMore()
}
const {
  width,
} = storeToRefs(useWindowStore())

const isMobile = computed(() => width.value <= 888)
const isSm = computed(() => width.value <= 768)

const { openVipDialog } = useVipDialog()
</script>

<template>
  <div class="home-index" :class="{ 'is-mobile': isMobile }">
    <!-- 头部 -->
    <div class="dark-background">
      <div class="top-wrapper">
        <div v-if="!isLogin" class="unauthenticated-wrapper">
          <div class="unauthenticated-content">
            <h1>更明智地下注</h1>
            <BaseButton bg-style="primary" round size="md">
              <span class="register-text">立即注册</span>
            </BaseButton>
            <AppAuthLogin />
          </div>
        </div>
        <div v-else class="top-vip-info" :class="isMobile ? 'max-width-mobile' : 'max-width'">
          <AppVipProgress>
            <template #title>
              <h1>欢迎归来，alanhayashi</h1>
            </template>
            <p @click="openVipDialog">
              您的 VIP 进度 <BaseIcon name="uni-arrowright-line" />
            </p>
          </AppVipProgress>
        </div>
        <div class="top-banner">
          <AppBanner v-if="isMobile" />
          <BaseImage v-else fit="cover" url="https://mediumrare.imgix.net/welcome-top-zh.png?&dpr=2&format=auto&auto=format&w=540&q=50" />
        </div>
      </div>
    </div>
    <!-- 玩法类型 -->
    <div class="index-features">
      <div class="features-casino">
        <div class="features-title">
          <BaseIcon name="tabbar-game" />
          <span>娱乐城</span>
        </div>
        <div class="features-image">
          <img src="https://mediumrare.imgix.net/welcome-casino-zh.jpg?&dpr=2&format=auto&auto=format&q=50&w=586" alt="背景图片" loading="lazy">
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
      <div class="features-sports">
        <div class="features-title">
          <BaseIcon name="tabbar-sport" />
          <span>体育</span>
        </div>
        <div class="features-image">
          <img src="https://mediumrare.imgix.net/welcome-sports-zh.jpg?&dpr=2&format=auto&auto=format&q=50&w=586" alt="背景图片" loading="lazy">
        </div>
        <div class="features-content">
          <p>最棒的加密货币在线体育博彩</p>
          <p>通过我们的体育博彩平台投注于来自世界各地的体育团队、选手及联赛。在综合格斗、篮球、足球等多个体育赛事的各种博彩项目上以及滚球盘口中进行投注，享受无与伦比的体育博彩体验。</p>
        </div>
        <div class="features-button">
          <BaseButton bg-style="primary" class="w-100">
            前往娱乐城
          </BaseButton>
        </div>
      </div>
    </div>
    <!-- 了解更多 -->
    <div class="index-more" :class="[isMobile ? 'flex-wrap-reverse' : 'grid-wrap']">
      <div>
        <BaseButton size="md">
          了解更多
        </BaseButton>
      </div>
      <div>
        <BaseIcon name="app-logo-darke" />
      </div>
      <div v-if="!isMobile">
        <img src="https://mediumrare.imgix.net/drake-banner.png?&dpr=2&format=auto&auto=format&q=50" alt="">
      </div>
    </div>
    <!-- 加密货币 -->
    <div class="index-buy-cryptocurrency" :class="[isSm ? 'flex-wrap' : 'grid-wrap']">
      <div>
        没加密货币？没问题。
      </div>
      <div :class="isMobile ? 'h-22' : 'h-30'">
        <BaseIcon name="cryptocurrency-logo-1" class="w-50" />
        <BaseIcon name="cryptocurrency-logo-2" class="w-73" />
        <BaseIcon name="cryptocurrency-logo-3" class="w-77" />
        <BaseIcon name="cryptocurrency-logo-4" class="w-66" />
      </div>
      <div>
        <BaseButton size="md">
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
      <div class="introduction-content" :class="{ 'column-count': !isMobile }">
        <h1>在 Stake 享受最出色的在线赌场体验</h1>
        <p>自 2017 年以来，Stake.com 在网络上提供了最出色的在线加密货币与比特币赌场的博彩体验。易于使用、功能丰富且平台简约，玩家们都一而再再而三地重返 Stake 投注于他们最喜爱的赌场游戏。</p>
        <p>Stake 团队一直都在努力改进我们无可匹敌的服务，确保来自世界各地的用户都能享有最佳的在线赌场博彩体验。随着我们定期增加到平台上的大量新游戏以及杰出的客户支持，玩家必能轻松在闻名的 Stake 赌场上雷厉风行。</p>
        <h1>在种类繁多的赌场游戏中投注于老虎机、纸牌游戏等</h1>
        <p>浏览我们种类繁多的赌场游戏，在 Stake 享受公平有趣的博彩体验。直接通过您的浏览器在老虎机、真人娱乐场、21点、百家乐、轮盘、弹珠以及数以千计的经典游戏上进行投注。</p>
        <p>此外，我们还具有著名的 Stake 原创游戏——最初让 Stake 声名鹊起的赌场游戏。这包括了像 Dice、Plinko、Mines、Crash、Limbo、Hilo、Keno、Wheel 等热门游戏，另加我们最近刚推出的另一款 Stake 原创 Dragon Tower！</p>
        <p>无论您是热衷于像 Video Poker 这类的桌面与纸牌游戏、 Spin a Win 这类的游戏节目游戏或是新推出的赌场游戏——最终的选择权都在您的手里！</p>
        <h1>如何通过您的加密货币钱包在 Stake 存款</h1>
        <p>在我们的在线赌场上使用比特币或其他可用的加密货币进行投注其实十分容易。要把资金存入您的 Stake.com 账户，请遵循下列步骤：</p>
        <ul>
          <li>第一步：前往钱包 > 存款。</li>
          <li>第二步：选择您想使用的货币。我们支持比特币（BTC）、以太币（ETH）、狗狗币（DOGE）、莱特币（LTC）等各种货币。复制您所选货币的存款地址。</li>
          <li>第三步：在您的加密货币钱包或交易所发送货币时，将您的存款地址输入为接收地址。</li>
          <li>附加说明：如果您想使用法定货币存款，您可以前往钱包 > 购买加密货币以通过 MoonPay 使用法定货币为 Stake 账户购买加密货币。</li>
        </ul>
        <p>Stake 的支持人员将随时为您提供在线的支持与帮助，无论您是在存款时或是访问喜爱的游戏时遇到任何问题，他们都会给予您必要的帮助。</p>
      </div>
      <div class="introduction-more">
        <BaseButton @click="onShowMore">
          查看更多
        </BaseButton>
      </div>
    </div>
    <!-- <div>
      {{ t('hello') }}
    </div>
    <div>
      {{ data }}
    </div>
    <div style="color: #fff">
      是否登录: {{ isLogin }}
    </div>
    <button @click="getData">
      请求
    </button>
    <button style="color: #fff" @click="connectMqtt">
      链接mqtt {{ $t('hello') }}
    </button>
    <button @click="disconnectMqtt">
      断开mqtt
    </button> -->
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
      grid-template-columns: 40% 50%;
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
      &:hover{
        .features-image{
          img{
            transform: translateY(-0.25rem);
          }
        }
      }
      .features-title{
        display: flex;
        justify-content: left;
        align-items: center;
        > span {
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-md);
          font-weight: var(--tg-font-weight-semibold);
          margin-left: var(--tg-spacing-8);
        }
      }
      .features-image{
        img{
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
          transition: all .25s;
          border-radius: var(--tg-radius-default);
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
          width: 50px;
        }
        &.w-73 {
          width: 73px;
        }
        &.w-77 {
          width: 77px;
        }
        &.w-66 {
          width: 66px;
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
.is-mobile{
  .dark-background{
    &:before {
      display: none;
    }
    .top-wrapper{
      grid-template-columns:100%;
      background:none;
      // background-position: right 25% center;
      // background-size: cover;
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
</route>
