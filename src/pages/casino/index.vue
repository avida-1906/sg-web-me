<script setup lang='ts'>
/* eslint-disable max-len */
interface ComponentItem {
  cid: string
  platform_id: string
  name: string
  icon: string
  component: any
  value?: string
}

defineOptions({
  name: 'KeepAliveCasino',
})

usePageTitle({ prefix: 'btc_casino_title', suffix: 'casino_game', isT: true })

const location = useBrowserLocation()
const { isLogin, companyData } = storeToRefs(useAppStore())
const { isMobile } = storeToRefs(useWindowStore())
const casinoStore = useCasinoStore()
const { casinoNav, casinoGameList } = storeToRefs(casinoStore)
const { t } = useI18n()
const { openSwiperNoticeDialog } = useDialogSwiperNotice(430)
const { bool: showMore, toggle: toggleShowMore } = useBoolean(false)

const tab = ref('all')
const showAll = computed(() => tab.value === 'all')
const currentNav = computed(() => {
  return casinoNav.value.find(a => a.value === tab.value)
  ?? { label: '', cid: '', icon: '', ty: -1, platform_id: '', value: '' }
})
const hostSite = computed(() => (
  { host: location.value.hostname?.replace('www.', ''), site: companyData.value?.name }
))
// 公告弹框和跑马灯
const {
  runAsync: runMemberNoticeAllList,
} = useRequest(ApiMemberNoticeAllList, {
  onSuccess(data) {
    for (const item of data.notice)
      item.value = item.id
    data.notice.length > 0 && openSwiperNoticeDialog(data.notice)
  },
})

const componentList = computed(() => {
  const _c: ComponentItem[] = []
  const _list = casinoNav.value
  _list.forEach((item) => {
    if (item.ty === 1) {
      _c.push({
        cid: item.cid,
        platform_id: item.platform_id,
        name: item.label,
        icon: item.icon,
        value: item.value,
        component: defineAsyncComponent(
          () => import('~/components/AppCasinoPlatList.vue'),
        ),
      })
    }

    else if (item.ty === 2) {
      _c.push({
        cid: item.cid,
        platform_id: item.platform_id,
        name: item.label,
        icon: item.icon,
        value: item.value,
        component: defineAsyncComponent(
          () => import('~/components/AppCasinoGameList.vue'),
        ),
      })
    }
    else if (item.ty === -1) {
      _c.push({
        cid: item.cid,
        platform_id: item.platform_id,
        name: item.label,
        icon: item.icon,
        value: item.value,
        component: defineAsyncComponent(
          () => import('~/components/AppEmptyDiv.vue'),
        ),
      })
    }
  })

  return _c
})

const currentObject = computed<ComponentItem>(() => {
  const currentValue = currentNav.value.value
  const _0 = componentList.value.find((item: any) => item.value === currentValue)
  return _0 as ComponentItem
})

const btnText = ref(t('view_more_2'))
const onShowMore = function () {
  toggleShowMore()
  if (showMore.value)
    btnText.value = t('view_less')
  else
    btnText.value = t('view_more_2')
}

// 统一加载tab中的网络icon
function loadIcon() {
  return new Promise((resolve) => {
    let a = 0
    const t = setInterval(() => {
      a++
      if (casinoNav.value.length > 0) {
        clearInterval(t)
        const arr = casinoNav.value.map((a) => {
          return application.loadImage(a.icon)
        })
        Promise.allSettled(arr).then((result) => {
          resolve(result)
        })
      }
      else if (a > 300) {
        clearInterval(t)
        resolve(true)
      }
    }, 50)
  })
}

await application.allSettled([casinoStore.runAsyncGameLobby(), runMemberNoticeAllList(), loadIcon()])
</script>

<template>
  <div class="layout-spacing">
    <AppBanner type="casino" />
    <!-- <AppMarquee /> -->
    <div v-if="!isMobile" class="mt-24">
      <AppGameSearch game-type="1" />
    </div>
    <div class="mgt12">
      <BaseTab
        v-model="tab"
        :list="casinoNav"
        :center="false" size="large" use-cloud-img
      />
    </div>
    <div class="content-wrapper">
      <!-- 大厅 -->
      <Transition name="tab-fade">
        <div v-show="showAll">
          <template v-for="item in casinoGameList" :key="item.name">
            <AppSlider
              v-if="item.games"
              :icon="item.icon"
              :title="item.name"
              :data="item.games"
              :cid="item.cid"
              :ty="item.ty"
              :pid="item.platform_id"
              :path="item.path"
              use-cloud-img
              show-man-count
            />
          </template>
        </div>
      </Transition>
      <div v-show="currentObject">
        <KeepAlive>
          <Suspense timeout="0">
            <component
              :is="currentObject.component"
              :cid="currentObject.cid"
              :name="currentObject.name"
              :icon="currentObject.icon"
              :platform-id="currentObject.platform_id"
            />
            <template #fallback>
              <AppLoading full-screen />
            </template>
          </Suspense>
        </KeepAlive>
      </div>
      <AppProviderSlider />
    </div>
  </div>
  <div class="layout-spacing">
    <AppBetData mode="casino" />
  </div>
  <!-- 公司介绍 -->
  <div v-if="!isLogin" class="index-introduction" :class="{ 'max-height': showMore }">
    <div
      class="introduction-content"
      :class="[isMobile ? 'h5-mobile' : 'column-count']"
    >
      <h2>最佳在线赌场游戏 - 在 Meibo.com 玩最佳游戏</h2>
      <div class="p">
        面对如此丰富的赌场游戏，您会从哪里下手？从最出色的赌场游戏开始是一个不错的选择，此类游戏可以为您提供出色的图形设计和更加丰厚的赢利。现在就让我们为您带来
        Meibo
        赌场上最出色的赌场游戏吧。
      </div>
      <h2>什么是在线赌场游戏？</h2>
      <div class="p">
        在线赌场游戏包括经典的桌面游戏、老虎机游戏、骰子游戏和纸牌游戏。在 Meibo.com，您可以找到数百种游戏供您尝试，这些游戏画面精美，有多种不同的投注和赢钱方式。
      </div>
      <div class="p">
        无论您是二十一点游戏迷，还是喜欢累积头奖的老虎机，您都能找到适合自己喜欢的各种在线赌场游戏类型。继续阅读，探索 Meibo.com 上的最佳在线赌场游戏。
      </div>
      <h2>什么是最出色的赌场游戏？</h2>
      <div class="p">
        从桌面游戏到在线老虎机，您可以在这里找到最佳赌场游戏：桌面游戏
      </div>
      <div class="p">
        桌面游戏
        是经典的赌场游戏，在 Meibo.com 上非常热门。坐上虚拟座位，玩转传奇赌场游戏，如
        二十一点
        、
        百家乐
        和
        轮盘赌
        。如果您是第一次接触在线博彩游戏，请在投注前了解
        如何
        在 Meibo 赌场玩
        桌面游戏
        。
      </div>
      <h3>
        真人赌场游戏
      </h3>
      <div class="p">
        真人赌场游戏或真人荷官游戏是在线赌场网站上最受欢迎的游戏之一。这些游戏通过真人荷官和即时聊天功能提供沉浸式的在线赌场体验。我们的真人赌场游戏种类繁多，均设置在真实的赌场演播内，并现场直播到我们的平台上。
      </div>
      <div class="p">
        首先，赌场玩家只需进入真人赌场大厅，从一系列游戏中进行选择即可！从在线扑克到欧洲轮盘赌，我们提供各类真人发牌的赌场游戏。请访问我们的
        真人赌场指南
        了解更多信息。
      </div>
      <h3>纸牌游戏</h3>
      <div class="p">
        纸牌游戏
        是在 Meibo 赌场的另一款最佳游戏。我们有多种可供选择的
        视频扑克游戏
        和真人
        在线扑克游戏
        ，让您应接不暇！如果您是扑克迷，那您绝对不能错过
        Caribbean Stud Poker Live
        和
        Casino Hold'em Live
        。如果您正在寻找有趣的视频扑克游戏，您一定会喜欢 Meibo Original 的
        视频扑克
        和 BGaming 的
        Jacks or Better
        ！查看我们的
        扑克
        和
        视频扑克指南
        获得更有帮助的扑克技巧。
      </div>
      <div class="p">
        您还可以在 Meibo 赌场在线享受无数其他经典纸牌游戏和特别游戏。在 Meibo.com 学习
        如何玩纸牌游戏
        ，充分利用手中的牌获利。
      </div>
      <h3>骰子游戏</h3>
      <div class="p">
        掷骰子
        游戏允许您对掷骰子的结果进行投注，这款游戏在 Meibo.com 非常流行。您可以享受
        骰宝
        和
        扎金花
        等绝佳赌场游戏还有其他新款骰子游戏，例如来自
        Evolution Gaming
        的
        Football Studio Dice Live
        。在 Meibo.com 了解
        如何玩赌场掷骰子游戏
        可增加您的赢利机会。
      </div>
      <h3>老虎机游戏</h3>
      <div class="p">
        老虎机
        是 Meibo 赌场中最常见的游戏，由许多主题、卷轴、赔付线、奖金回合和博彩玩法组成。您可以在 Meibo.com 上玩的最佳老虎机游戏之一是
        Scarab Spin
        ，这是一款埃及主题的 Meibo Original 游戏，提供诱人的 97.84% 玩家回报率。
      </div>
      <div class="p">
        从经典老虎机到现代在线老虎机游戏，Meibo.com 上的各种老虎机都能提供独特的游戏体验，让每个人都乐在其中。最受欢迎的老虎机主题包括水果、动物、宝石、古代、拉斯维加斯、复古、太空、海洋等。
      </div>
      <div class="p">
        我们提供试玩模式，您可以在下注前玩玩我们的老虎机游戏！了解
        如何在线玩老虎机
        ，方便您在 Meibo 赌场玩最受欢迎的游戏时制定策略。
      </div>
      <h2>什么是最值得玩的赌场游戏？</h2>
      <div class="p">
        Meibo Original
        游戏拥有出色的画面和超级简单的玩法，是所有在线赌场爱好者的理想选择。您现在可以在 Meibo.com 上玩到的最佳游戏如下：
      </div>
      <ul>
        <li>
          Plinko
          ：Plinko 的灵感来自日本的机械游戏 Pachinko，是一款金字塔型的游戏，您可以将球投到游戏网格上，获得胜利和倍数。RTP 99%。
        </li>
        <li>
          骰子
          ：掷骰子是一款非常简单的游戏，您可以对有 100 面的骰子掷出的结果进行投注。RTP 99%。了解 Meibo 赌场的其他
          骰子游戏
          。
        </li>
        <li>
          Limbo
          ：另一款 Meibo Originals 游戏 Limbo 是一款以掷骰子为基础的游戏，最高奖金可达投注额的 1,000,000 倍！RTP 99%。
        </li>
        <li>
          Mine
          s：受到经典扫雷游戏的启发，Mines 是一款加密博彩游戏，您必须在游戏中寻找宝石并避开炸弹！RTP 99%。了解 Meibo 赌场的其他
          Mines 游戏
          。
        </li>
        <li>
          Crash
          ：作为 Meibo.com 上最简单的游戏之一，Crash 需要您预测在崩溃（Crash）之前倍数会上升到多高！RTP 99%。如果想体验与众不同的游戏，请访问Evolution Gaming 的
          Cash or Crash Live
          。
        </li>
        <li>
          二十一点
          ：Meibo Original 二十一点是一款只需简单介绍的游戏，它能让您以超低的庄家优势战胜庄家。RTP 99.53%。Meibo 赌场还会带来许多
          二十一点变体
          游戏。
        </li>
        <li>
          Hilo
          ：Hilo 是一款比特币赌场游戏。游戏中您需要预测下一张牌与当前显示的牌值相比的大小。RTP 99%。
        </li>
        <li>
          基诺
          ：基诺是一种宾果式游戏，基于中式彩票游戏打造，您可以在等待开奖之前选择一系列数字，看看自己是否中奖。RTP 99%。
        </li>
        <li>
          转盘
          ：在这款独特的转盘游戏中，您可以从 15 种可定制的游戏模式中进行选择，调整投注金额、承担的风险和显示的倍数。RTP 99%。查看
          Money Wheel
          （来自 Play'n GO 的转盘游戏），体验转盘游戏的乐趣！
        </li>
        <li>
          轮盘赌
          ：Meibo Original 轮盘赌是 Meibo.com 最受欢迎的游戏之一，游戏包含大量的内围和外围投注供您下注。RTP 97.30%。查看
          轮盘大厅
          ，了解 Meibo.com 提供的其他轮盘游戏。
        </li>
        <li>
          Diamond
          s：在 Meibo 的专属游戏中放手一搏吧，这款游戏正在加密赌场行业掀起一场风暴！RTP 98.29%。
        </li>
      </ul>
      <h2>如何玩在线赌场游戏并获胜 - 基本策略和技巧</h2>
      <div class="p">
        准备好尝试一些最出色的在线赌场游戏了吗？以下是一些有用的提示，供您在开始选择游戏时参考：
      </div>
      <ul>
        <li>大多数在线赌场游戏都采用随机数字生成器（RNG），这意味着您可以在每一轮投注中获胜或失败。在选择玩哪些游戏时，请牢记这一点。</li>
        <li>在玩游戏之前，您应该始终查看游戏的庄家优势或 RTP，这样您就能知道该游戏在一段时间内的典型赔率。此外，请务必查看最低存款额和最大赢钱潜力。</li>
        <li>
          不要局限于一种游戏。例如，在 Meibo.com 上查找
          最新发布的
          游戏，玩转
          累积奖金的老虎机
          游戏的同时享受真人娱乐场游戏，您有机会获得巨额奖金和更高的赔率。
        </li>
        <li>请量力而行，注意博彩权责。</li>
      </ul>
      <h2>赌场游戏赔率、边际优势和 RTP</h2>
      <div class="p">
        在选择赌场游戏之前，您应该仔细阅读游戏说明，了解有关游戏的关键信息，特别是与庄家优势和玩家回报率（RTP）相关的信息。正如您从我们的最佳游戏列表中看到的，您可以玩的许多 Meibo Original 游戏的庄家优势仅为 1%，这是非常超值的游戏选择。通过我们便捷的
        赌场
        优势
        指南
        ，了解更多关于赌场优势以及为什么需要优势的信息。
      </div>
      <h2>赌场奖金和 VIP 计划</h2>
      <div class="p">
        如果您想要在 Meibo.com 获得最大赢利，您可以查看
        最新促销活动和优惠
        。您还可以了解有关
        Meibo VIP 俱乐部
        的更多信息，发现与加入俱乐部相关的各种
        福利
        ，包括每月独家优惠和丰厚奖金。
      </div>
      <h2>其他热门在线赌场游戏</h2>
      <div class="p">
        如果您想要在 Meibo.com 尝试更多精彩游戏，请查看赌场游戏行业中领先供应商提供的以下热门游戏：
      </div>
      <ul>
        <li>
          Meibo Original 的
          百家乐
        </li>
        <li>
          Play’n GO 的
          Contact
        </li>
        <li>
          Play’n GO 的
          Cash Pump
        </li>
        <li>
          Play’n GO
          的
          Agent Destiny
        </li>
        <li>
          Pragmatic Play
          的
          Sugar Twist
        </li>
        <li>
          Pragmatic Play 的
          Zeus vs Hades Gods of War
        </li>
        <li>
          Hacksaw Gaming 的
          Mayan Stackways
        </li>
      </ul>
    </div>
    <div class="introduction-more">
      <BaseButton size="none" @click="onShowMore">
        {{ btnText }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.mt-24 {
  margin-top: 24px;
}
.list-wrap {
  margin-top: var(--tg-spacing-24);

  .title {
    font-size: var(--tg-font-size-base);
    color: var(--tg-text-white);
    margin-bottom: var(--tg-spacing-12);
    display: flex;
    align-items: center;

    &:hover {
      --tg-icon-color: var(--tg-text-white);
    }

    span {
      font-size: var(--tg-font-size-md);
      font-weight: var(--tg-font-weight-semibold);
      margin-left: var(--tg-spacing-8);
      line-height: 1.5;
    }
  }

  .more {
    margin-top: var(--tg-spacing-24);
    display: flex;
    justify-content: center;
  }
}

.index-introduction{
    margin-bottom: var(--tg-spacing-32);
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
        :deep(button.default.none) {
          padding: 13px 16px;
        }
        --tg-base-button-padding-x: 16px;
        --tg-base-button-padding-y: 13px;
      }
    }
    .introduction-content{
      column-gap: 1.5rem;
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
        background: linear-gradient(
          0deg,
          var(--tg-secondary-dark) 0%,rgba(15,33,46,0) 100%
        );
      }
    }
    .h5-mobile{
      column-count:1;
      h2{
        font-size: var(--tg-font-size-lg);
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
        :deep(button.default.none) {
          padding: 13px 16px;
        }
        --tg-base-button-padding-x: 16px;
        --tg-base-button-padding-y: 13px;
    }
    h2{
      color: var(--tg-text-white);
      font-size: 20px;
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
    .p{
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
      line-height: 24px;
      font-weight: 600;
      margin-bottom: 24px;
      .p {
        margin: 0;
      }
      li{
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

<route lang="yaml">
name: casino-home
meta:
  layout: home
</route>
