<script lang="ts" setup>
interface ITableData {
  text?: string
  empty?: boolean
  sticky?: boolean
  child?: {
    icon?: string
    text?: string
  }[]
}
interface IMenuData {
  title: string
  label: string
  value: string
}

const {
  appContentWidth,
  widthBoundarySm,
} = storeToRefs(useWindowStore())
const router = useRouter()

const tableData: ITableData[] = [
  {
    text: 'VIP 级别对照',
    sticky: true,
  },
  {
    child: [
      {
        icon: 'chat-star-bronze',
        text: '铜',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-silver',
        text: '银',
      },
      {
        icon: 'chat-star-gold',
        text: '金',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-1',
        text: '铂金 I – III',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-4',
        text: '铂金 IV – VI',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-diamond',
        text: '钻石',
      },
    ],
  },
  {
    text: '投注金额',
    sticky: true,
  },
  {
    text: '1 万美元',
  },
  {
    text: '5 万 – 10 万美元',
  },
  {
    text: '25 万 – 100 万美元',
  },
  {
    text: '250 万 – 1,000 万美元',
  },
  {
    text: '2,500 万美元',
  },
  {
    text: '月度奖金',
    sticky: true,
  },
  {
    child: [
      {
        icon: 'chat-star-bronze',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-silver',
      },
      {
        icon: 'chat-star-gold',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-1',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-4',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-diamond',
      },
    ],
  },
  {
    text: '升级奖金',
    sticky: true,
  },
  {
    child: [
      {
        icon: 'chat-star-bronze',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-silver',
      },
      {
        icon: 'chat-star-gold',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-1',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-4',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-diamond',
      },
    ],
  },
  {
    text: '返水',
    sticky: true,
  },
  {
    child: [
      {
        icon: 'chat-star-bronze',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-silver',
      },
      {
        icon: 'chat-star-gold',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-1',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-4',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-diamond',
      },
    ],
  },
  {
    text: '周度奖金',
    sticky: true,
  },
  {
    child: [
      {
        icon: 'chat-star-bronze',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-silver',
      },
      {
        icon: 'chat-star-gold',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-1',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-4',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-diamond',
      },
    ],
  },
  {
    text: '每日奖金/充值奖金',
    sticky: true,
  },
  {
    empty: true,
  },
  {
    empty: true,
  },
  {
    child: [
      {
        icon: 'chat-star-1',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-4',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-diamond',
      },
    ],
  },
  {
    text: '奖金增长',
    sticky: true,
  },
  {
    empty: true,
  },
  {
    child: [
      {
        icon: 'chat-star-silver',
      },
      {
        icon: 'chat-star-gold',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-1',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-4',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-diamond',
      },
    ],
  },
  {
    text: '专属 VIP 服务代表',
    sticky: true,
  },
  {
    empty: true,
  },
  {
    empty: true,
  },
  {
    empty: true,
  },
  {
    child: [
      {
        icon: 'chat-star-4',
      },
    ],
  },
  {
    child: [
      {
        icon: 'chat-star-diamond',
      },
    ],
  },
  {
    text: 'Bespoke 奖金',
    sticky: true,
  },
  {
    empty: true,
  },
  {
    empty: true,
  },
  {
    empty: true,
  },
  {
    empty: true,
  },
  {
    child: [
      {
        icon: 'chat-star-diamond',
      },
    ],
  },
]
const menuValue = ref('1')
const menuData: IMenuData[] = [
  {
    title: '常规',
    label: '常规',
    value: '1',
  },
  {
    title: '福利',
    label: '福利',
    value: '2',
  },
  {
    title: 'VIP 服务代表',
    label: 'VIP 服务代表',
    value: '3',
  },
]
const award = ref<HTMLElement | null>(null)

const isSm = computed(() => appContentWidth.value < widthBoundarySm.value)

const toVip = function () {
  award.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="tg-vip-club">
    <div class="vip-banner">
      <div class="banner-wrap" :class="{ 'banner-is-sm': isSm }">
        <div class="banner-left">
          <p class="left-title">
            无与伦比的 VIP 体验
          </p>
          <p class="left-desc">
            解锁专属福利并获得无需任何附加条件即可立即提取的奖金。
          </p>
          <div class="left-btns">
            <BaseButton bg-style="secondary" size="md" @click="router.push('/casino')">
              <span>开始游戏</span>
            </BaseButton>
            <BaseButton size="md" @click.prevent="toVip">
              <a href="#">查看 VIP 级别表</a>
            </BaseButton>
          </div>
        </div>
        <div class="banner-right">
          <BaseImage v-if="!isSm" url="https://mediumrare.imgix.net//vip-club-header.png?&amp;dpr=2&amp;format=auto&amp;auto=format&amp;q=50" />
          <BaseImage v-else url="https://mediumrare.imgix.net//vip-club-header-mobile.png?&amp;dpr=2&amp;format=auto&amp;auto=format&amp;q=50" width="80px" class="base-image" />
        </div>
      </div>
    </div>
    <div class="vip-content">
      <!-- 入门 -->
      <div class="vip-tutorial">
        <p class="title">
          入门手册
        </p>
        <p class="desc">
          成为 VIP 是个既简单又富有回报的过程
        </p>
        <div class="t-steps" :class="{ 'steps-is-sm': isSm }">
          <div class="step-item">
            <div class="img-wrap">
              <BaseImage url="https://stake.com/_app/immutable/assets/Step1.387bc52a.jpg" />
            </div>
            <p>
              第一步
            </p>
            <p>
              立即注册以开始在赌场或体育盘口上进行投注。
            </p>
          </div>
          <div class="step-item">
            <div class="img-wrap">
              <BaseImage url="https://stake.com/_app/immutable/assets/Step2.846182e2.jpg" />
            </div>
            <p>
              第二步
            </p>
            <p>
              您的每笔赌注都会影响您 VIP 级别的进度。达到下个级别以解锁更多福利。
            </p>
          </div>
          <div class="step-item">
            <div class="img-wrap">
              <BaseImage url="https://stake.com/_app/immutable/assets/Step3.78df2edc.jpg" />
            </div>
            <p>
              第三步
            </p>
            <p>
              立即领取您的奖金。领取每日、周度和月度奖金的过程既简单又容易。
            </p>
          </div>
        </div>
      </div>
      <!-- 轮播图 -->
      <div class="vip-slider">
        <p class="title">
          体验
        </p>
        <p class="desc">
          Stake 通过不间断送出的奖金提供了独特且无与伦比的体验
        </p>
        <AppBannerUnlimited class="vip-slider-wrap" />
      </div>
      <!-- 奖励 -->
      <div class="vip-award">
        <p class="title">
          奖励
        </p>
        <p class="desc">
          每次升级都能获得更棒的奖励
        </p>
        <div class="scroll-x">
          <div ref="award" class="a-table">
            <div v-for="item, index in tableData" :key="index" class="table-item" :class="{ sticky: item.sticky }">
              <template v-if="item.empty">
                <div class="empty" />
              </template>
              <template v-else>
                {{ item.text }}
                <div v-for="second, i in item.child" :key="i">
                  <BaseIcon v-if="second.icon" :name="second.icon" />
                  <span v-if="second.text">{{ second.text }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <!-- 问题 -->
      <div class="vip-question">
        <p class="title">
          常见问题
        </p>
        <p class="desc">
          联系我们屡获殊荣的支持团队
        </p>
        <div class="question-wrap" :class="{ 'question-is-sm': isSm }">
          <div class="q-menu">
            <BaseMenu v-if="!isSm" v-model="menuValue" :data="menuData" />
            <BaseTab v-else v-model="menuValue" :list="menuData" />
          </div>
          <div v-if="menuValue === '1'" class="q-content">
            <BaseCollapse title="为什么 Stake 的 VIP 计划是最出色的？">
              <template #content>
                <div class="content-wrap">
                  <p>由于我们发放给玩家的奖金数额居多，Stake 的 VIP 计划一向都被评为最佳的在线赌场体验之一。</p>
                  <p>此外，我们屡获殊荣的支持团队将全天候在线回答您的任何问题。我们在众多在线赌场中拥有最高的客户满意度，也与此同时创建了由全球最热情的一些博彩爱好者所组成的社区。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="Stake 一共发放了多少奖金？">
              <template #content>
                <div class="content-wrap">
                  <p>我们至今为止已送出了超过 10 亿美元的奖金。这也是我们具有最出色的在线 VIP 计划的主要原因。</p>
                  <p>我们坚信奖励玩家的投注量和忠诚度。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="如何参加 $75,000 周度抽奖活动？">
              <template #content>
                <div class="content-wrap">
                  <p>您在 Stake 的每 $1,000 投注能换来一张抽奖券，而您只需要一张抽奖券便能参加抽奖活动。投注得越多，获得的抽奖券就越多，您的获胜机会也会因而增加。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="如何加入 Stake Telegram 频道？">
              <template #content>
                <div class="content-wrap">
                  <p>Stake Telegram 频道的账号是 (@StakeCasino)。</p>
                  <div>
                    <BaseButton type="text" class="base-btn">
                      如果您已经下载了 Telegram，请点击这里加入。
                    </BaseButton>
                  </div>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="如何加入 Stake VIP Telegram 频道？">
              <template #content>
                <div class="content-wrap">
                  <p>一旦达到铜级，您便可以请在线支持把您添加到 Stake VIP Telegram 频道。</p>
                  <p>您也可以通过加入 Stake Telegram 频道（@StakeCasino）找到更多相关的信息。</p>
                </div>
              </template>
            </BaseCollapse>
          </div>
          <div v-else-if="menuValue === '2'" class="q-content">
            <BaseCollapse title="什么是近期游戏表现奖金？">
              <template #content>
                <div class="content-wrap">
                  <p>这是由您的 VIP 服务代表主要根据您的总投注和运气酌情给予的奖金。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="什么是返水？">
              <template #content>
                <div class="content-wrap">
                  <p>返水是退还给您的玩家佣金（庄家优势）的百分比。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="充值奖金是什么？该如何领取我的充值奖金？">
              <template #content>
                <div class="content-wrap">
                  <p> 充值奖金是根据玩家近期的投注表现计算的。玩家可以选择每日、每小时或每 10 分钟的领取间隔。</p>
                  <p>点击账户右上角的主用户菜单，在下拉菜单中点击 “VIP” 。在出现的模式窗口上点击 “充值奖金” 选项卡，然后再点击 “领取充值奖金” 即可。您能否被分配一名服务代表将取决于您的总投注额。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="月度奖金将在何时发放？">
              <template #content>
                <div class="content-wrap">
                  <p>月度奖金将会每月发放一次，日期一般在 15 日左右。但在某些情况下，发放日可能会稍晚或甚至提早，而这就是为什么它是 Stake 最令人期待的奖金之一。月度奖金一旦发放后，您便将收到电邮通知。为确保您不会错过奖金，请记得也要查看您电邮中的垃圾邮件文件夹。</p>
                  <p>铜、银和金级的玩家们将通过每日充值奖金领取奖金，而铂金与钻石级的玩家将一次性地领取他们的奖金。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="如何计算达到下个级别所需要投注的金额?">
              <template #content>
                <div class="content-wrap">
                  <p>首先点击账户右上角的主用户菜单，在下拉菜单中点击 “VIP” 查看您 VIP 进度条上的百分比，然后从 100% 减去此数目以获得剩余百分比。接下来将剩余百分比乘以您达到下个级别所剩下的总投注需求即可。</p>
                  <div>
                    <BaseButton type="text" class="base-btn">
                      点击这里以了解更多
                    </BaseButton>
                  </div>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="每次升级后我会得到哪些奖励？">
              <template #content>
                <div class="content-wrap">
                  <p>升级奖金：这是每次升级都会增加的固定奖金。我们将根据您在升级前的盈亏情况以近期游戏表现奖金的形式添加额外金额。</p>
                  <p>周度与月度奖金：根据您的 VIP 级别您将得到一笔基础金额，之后您在相应的时间段内每投注的 $1,000 将得到额外的金额。</p>
                  <p>每日奖金：充值奖金在到期后将由您的 VIP 服务代表更新。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="奖金数额是如何计算的？">
              <template #content>
                <div class="content-wrap">
                  <p>您所得到的奖金数额是按照您的总投注额和利润计算的。我们坚信玩家们无论输赢都应该得到奖励。只奖励输钱的玩家并不公平，但如果您的运气真的欠佳，我们会再额外增加您的奖金数额！</p>
                </div>
              </template>
            </BaseCollapse>
          </div>
          <div v-else-if="menuValue === '3'" class="q-content">
            <BaseCollapse title="我的 VIP 服务代表能为我做什么？">
              <template #content>
                <div class="content-wrap">
                  <p>您的 VIP 服务代表将确保您的游戏表现会得到奖励。他们会帮您更新充值奖金、在您的升级过程中给予指导、审查您的体育限制、评估您是否可获得额外奖金以及处理您在网站上遇到的任何问题。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="在被分配了一名 VIP 服务代表后，所获得的充值奖金是一个持续的还是可更新的福利？">
              <template #content>
                <div class="content-wrap">
                  <p>当您达到铂金 IV 级别并被分配一名 VIP 服务代表后，您将开始获得可更新的周度充值奖金。每当您的周度充值奖金到期时，您便可联系您的 VIP 服务代表以更新您在接下来 7 天内可领取的充值奖金。</p>
                  <p>充值奖金的数额是取决于您每周在游戏中的表现，如果您那一周内在利润方面的运气不佳，您将会得到额外的奖金。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="VIP 服务代表的职责包括了什么，与常规的在线支持人员又有何不同？">
              <template #content>
                <div class="content-wrap">
                  <p>VIP 服务代表只分配给铂金 IV 级别以上的玩家。他们可以回答您有关 VIP 计划的问题并确保您领取所有应得的奖金。VIP 服务代表也能够在确保奖金符合您需求的同时更频繁地发送更大的奖金。</p>
                  <p>在线支持可以帮助您解决在平台上遇到的任何技术问题。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="我什么时候可以被分配 VIP 服务代表？">
              <template #content>
                <div class="content-wrap">
                  <p>玩家一旦达到铂金 IV 级后便会被分配一名 VIP 服务代表。这名服务代表将成为您的专属支持人员，帮助您解决所有疑问并在您的游戏过程中提供任何所需的指导。请注意，您是否符合资格还取决于您近期的活动。</p>
                </div>
              </template>
            </BaseCollapse>
            <BaseCollapse title="万一我的 VIP 服务代表休假去了该怎么办？">
              <template #content>
                <div class="content-wrap">
                  <p>请确保向您的 VIP 服务代表索取他特有 VIP 服务频道的邀请链接。如果您漏掉了这一步，您可以联系在线支持获取一个 VIP 备份链接。这将是您的服务代表回来之前的临时备份代表。</p>
                </div>
              </template>
            </BaseCollapse>
          </div>
        </div>
      </div>
      <!-- 更多 -->
      <div class="vip-more">
        <div class="more-left">
          <p>还有更多问题？</p>
          <p>使用我们的知识指南或到我们的社区论坛上提问。</p>
          <div>
            <BaseButton bg-style="primary">
              了解更多
            </BaseButton>
          </div>
        </div>
        <div class="more-mid">
          <div />
        </div>
        <div class="more-right">
          <p>24 小时在线客户支持</p>
          <p>由真人提供的有效支持。我们可以通过即时在线聊天和电邮帮助您进行设置与故障排除。</p>
          <div>
            <BaseButton>与我们聊天</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-vip-club {
  width: 100%;
  .vip-banner{
    padding: var(--tg-spacing-56) 0;
    position: relative;
    &::before{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: -1000px;
      right: -1000px;
      background-color: var(--tg-secondary-dark);
    }
    .banner-wrap{
      width: 100%;
      max-width: 1200px;
      display: grid;
      grid-template-areas: "headerText headerImage";
      grid-template-columns: 1fr 400px;
      gap: 1.5rem;
      position: relative;
      .banner-left{
        display: flex;
        flex-direction: column;
        gap: .75rem;
        grid-area: headerText;
        .left-title{
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-3xl);
          font-weight: var(--tg-font-weight-bold);
          line-height: 42px;
        }
        .left-desc{
          color: var(--tg-text-lightgrey);
          font-size: var(--tg-font-size-base);
          line-height: 24px;
        }
        .left-btns{
          margin-top: var(--tg-spacing-12);
          font-size: var(--tg-font-size-default);
          display: flex;
          gap: .5rem;
          flex-wrap: wrap;
        }
      }
      .banner-right{
        grid-area: headerImage;
        .base-image{
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      &.banner-is-sm{
        grid-template-areas:
        "headerImage"
        "headerText";
        grid-template-columns: 1fr;
      }
    }
  }
  .vip-content{
    padding: var(--tg-spacing-32) 0;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    width: 100%;
    .vip-tutorial, .vip-award, .vip-question, .vip-slider{
      .title{
        text-align: center;
        color: var(--tg-text-white);
        font-size: var(--tg-font-size-lg);
        font-weight: var(--tg-font-weight-bold);
        line-height: 24px;
        margin-top: var(--tg-spacing-16);
      }
      .desc{
        text-align: center;
        color: var(--tg-text-lightgrey);
        font-size: var(--tg-font-size-base);
        margin-top: var(--tg-spacing-8);
        line-height: 22px;
      }
      .t-steps{
        display: grid;
        grid-auto-flow: column;
        gap: 3.5rem;
        width: 100%;
        .step-item{
          p:nth-child(2){
            font-size: var(--tg-font-size-md);
            color: var(--tg-text-white);
            font-weight: var(--tg-font-weight-semibold);
            line-height: 24px;
          }
          p:nth-child(3){
            font-size: var(--tg-font-size-base);
            color: var(--tg-text-lightgrey);
            margin-top: var(--tg-spacing-8);
            line-height: 24px;
          }
          .img-wrap{
            margin: var(--tg-spacing-42) 0 var(--tg-spacing-26);
            box-shadow: var(--tg-box-shadow);
          }
        }
        &.steps-is-sm{
          grid-auto-flow: row;
          .img-wrap{
            margin: 0 0 var(--tg-spacing-26);
          }
        }
      }
    }
    .vip-award{
      .a-table{
        color: var(--tg-text-white);
        font-weight: var(--tg-font-weight-bold);
        font-size: var(--tg-font-size-base);
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        justify-content: center;
        align-items: center;
        grid-gap: .125rem;
        margin-top: var(--tg-spacing-42);
        min-width: 43rem;
        .table-item{
          width: 100%;
          height: 100%;
          min-height: 6rem;
          min-width: 7rem;
          background-color: var(--tg-secondary-dark);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: .5rem;
          padding: var(--tg-spacing-16);
          line-height: 24px;
          text-align: center;
          &:has(span){
            flex-direction: column;
            gap: 0;
          }
          svg{
            width: 24px;
            height: 24px;
          }
          > div {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: .5rem;
          }
          .empty {
            width: 20px;
            height: 4px;
            background-color: var(--tg-secondary-grey);
          }
        }
      }
    }
    .question-wrap{
      display: grid;
      grid-auto-flow: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 1.5rem;
      margin-top: var(--tg-spacing-42);
      &.question-is-sm{
        grid-auto-flow: row;
        justify-content: stretch;
        align-items: center;
        gap: .5rem;
      }
      .q-content {
        padding: var(--tg-spacing-24);
        background-color: var(--tg-secondary-dark);
        border-radius: var(--tg-radius-md);
        display: flex;
        flex-direction: column;
        gap: .5rem;
        .content-wrap{
          color: var(--tg-text-lightgrey);
          display: flex;
          flex-direction: column;
          gap: .25rem;
          font-size: var(--tg-font-size-default);
          padding: var(--tg-spacing-16) var(--tg-spacing-20);
          p{
            line-height: 21px;
          }
          .base-btn{
            color: var(--tg-text-white);
            padding: 0 !important;
          }
        }
      }
    }
    .vip-more{
      display: grid;
      grid-template-columns: 3fr 1fr 3fr;
      min-height: 50px;
      margin-bottom: var(--tg-spacing-32);
      .more-left,.more-right{
        display: flex;
        flex-direction: column;
        gap: .75rem;
        p:nth-child(1){
          color: var(--tg-text-white);
          font-size: var(--tg-font-size-lg);
          line-height: 1.32;
        }
        p:nth-child(2){
          color: var(--tg-text-lightgrey);
          line-height: 1.32;
          font-size: var(--tg-font-size-default);
        }
        div:nth-child(3){
          margin-top: var(--tg-spacing-18);
        }
      }
      .more-mid{
        display: flex;
        justify-content: center;
        align-items: center;
        div{
          width: 2px;
          height: 80%;
          background: var(--tg-secondary-grey);
        }
      }
    }
    .vip-slider{
      .vip-slider-wrap{
        margin-top: var(--tg-spacing-42);
      }
    }
  }
}
.sticky{
  position: sticky;
  left: 0;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
