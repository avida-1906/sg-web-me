<script lang="ts" setup>
import type { EnumSportsOddsType } from '~/stores/sports'
import type { EnumLanguage } from '~/utils/enums'

const router = useRouter()
const languageStore = useLanguageStore()
const { userLanguage, AllLanguages } = storeToRefs(languageStore)
const sportStore = useSportsStore()
const { sportsOddsType } = storeToRefs(sportStore)

const menuData = [
  {
    title: '体育',
    children: [
      { title: '主页', path: '/sports' },
      { title: '滚球', path: '/sports/live' },
      { title: '体育博彩规则', icon: false },
    ],
  },
  {
    title: '娱乐城',
    children: [
      { title: '游戏', path: '/casino' },
      { title: 'VIP俱乐部', path: '/vip-club' },
      { title: '促销活动', path: '/promotions' },
    ],
  },
  {
    title: '支持',
    children: [
      { title: '公平性' },
      { title: '联盟计划' },
      { title: '负责人博彩' },
      { title: 'Gameble Aware', icon: true },
      { title: '在线支持' },
      { title: '帮助中心', icon: true },
    ],
  },
  {
    title: '社区',
    children: [
      { title: '博客' },
      { title: '论坛', icon: true },
      { title: 'Facebook', icon: true },
      { title: 'Twitter', icon: true },
      { title: 'Instagram', icon: true },
      { title: 'Youtube', icon: true },
      { title: '网购', icon: true },
    ],
  },
  {
    title: '关于我们',
    children: [
      { title: '隐私政策' },
      { title: '许可证' },
      { title: '反洗钱规则' },
      { title: '服务条款' },
      { title: '自我排除' },
      { title: 'Primedice', icon: true },
    ],
  },
]
const supportCurrency = [
  '/png/footer/ltc.png',
  '/png/footer/bitcoin.png',
  '/png/footer/ethereum.png',
  '/png/footer/tron.png',
  '/png/footer/ripple.png',
  '/png/footer/dogecoin.png',
  '/png/footer/bitcoin_cash.png',
  '/png/footer/tether.png',
  '/png/footer/safe_gamble.png',
  '/png/footer/18plus.png',
]
const partner = [
  { url: '/png/footer/verified.png', ratio: '120/59.63', with: '120px' },
  { url: '/png/footer/official.png', ratio: '146.44/60', with: '146.44px' },
  { url: '/png/footer/main.png', ratio: '82.81/60', with: '82.81px' },
  { url: '/png/footer/ufc.png', ratio: '151/60', with: '151px' },
]
function selectChange(v: EnumLanguage) {
  languageStore.changeLanguage(v)
}
function selectOddsChange(v: EnumSportsOddsType) {
  sportStore.setSportsOddsType(v)
}
function pathTo(tmp: { path?: string; title: string; icon?: boolean }) {
  if (tmp.path)
    router.push(tmp.path)
}
</script>

<template>
  <div class="app-footer">
    <div class="footer-nav">
      <div v-for="item, index of menuData" :key="index" class="layout-spacing reset">
        <div class="nav-head">
          {{ item.title }}
        </div>
        <div v-for="tmp of item.children" :key="tmp.title" @click="pathTo(tmp)">
          {{ tmp.title }}<BaseIcon v-if="tmp.icon" name="uni-jump-page" />
        </div>
      </div>
      <div class="layout-spacing reset last-nav">
        <div class="nav-head">
          语言
        </div>
        <div class="select-wrap">
          <BaseSelect
            :model-value="userLanguage"
            popper
            plain-popper-label
            :options="AllLanguages.map(a => ({ ...a, label: a.title }))"
            @select="selectChange"
          />
        </div>
        <div>赔率</div>
        <div class="select-wrap">
          <BaseSelect
            :model-value="sportsOddsType"
            popper
            plain-popper-label
            :options="AllOddsTypes.map(a => ({ ...a, label: a.title }))"
            @select="selectOddsChange"
          />
        </div>
      </div>
    </div>
    <BaseDivider />
    <div class="footer-support">
      <BaseAspectRatio
        v-for="url, index of supportCurrency"
        :key="index"
        ratio="116/35"
        width="133.33px"
      >
        <BaseImage :url="url" />
      </BaseAspectRatio>
    </div>
    <BaseDivider />
    <div class="footer-sponsor">
      <BaseAspectRatio
        v-for="item, index of partner"
        :key="index"
        :ratio="item.ratio"
        :width="item.with"
      >
        <BaseImage :url="item.url" />
      </BaseAspectRatio>
    </div>
    <BaseDivider />
    <div class="footer-copyright">
      <BaseLogo />
      <div class="copy-right">
        © 2023 Stake.com | 版权所有
      </div>
      <div>1 USDT = US$1.00</div>
    </div>
    <div class="footer-description">
      Stake 由 Medium Rare N.V. 所属和经营，注册编号： 145353，注册地址：
      Korporaalweg 10, Willemstad, Curaçao。请通过 support@stake.com
      与我们联系。 支付代理公司是 Medium Rare Limited，地址于 7-9 Riga
      Feraiou, LIZANTIA COURT, Office 310, Agioi Omologites,
      1087 Nicosia, Cyprus 以及注册号：HE 410775 Stake
      由库拉索政府授权和监管，并根据颁发给 Antillephone 的 8048/JAZ
      号许可证运营。 Stake 已通过所有合规性审查，并获得合法授权，
      可进行所有机会与投注游戏的游戏操作。
    </div>
    <div class="footer-description">
      支持
      <span>support@stake.com</span> | 合作伙伴 <span>partners@stake.com</span> | 新闻媒体
      <span>press@stake.com</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-wrap {
  --tg-base-select-popper-style-padding-x: 0;
  --tg-base-select-popper-style-padding-y: 0;
}
.app-footer {
  /* background-color: #0F212E; */
  width: 100%;
  display: grid;
  grid-gap: 2rem;
  padding: 32px 0;
  .footer-nav{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(14ch,1fr));
    grid-gap: var(--tg-spacing-16);
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-normal);
    .layout-spacing{
      align-items: flex-start;
      gap: var(--tg-spacing-8);
    }
    .nav-head{
      font-size: var(--tg-font-size-base);
      font-weight: 500;
      color: var(--tg-text-white);
      margin-bottom: var(--tg-spacing-6);
    }
    .nav-head~div{
      cursor: pointer;
      font-weight: var(--tg-font-weight-semibold);
      white-space: nowrap;
      display: flex;
      align-items: center;
      font-size: var(--tg-font-size-default);
      .app-svg-icon {
        font-size: var(--tg-font-size-xs);
        margin-left: var(--tg-spacing-8);
        font-weight: var(--tg-font-weight-normal);
      }
      &:hover{
        --tg-icon-color: var(--tg-text-white);
        color: var(--tg-text-white);
      }
    }
    .last-nav{
      color:var(--tg-text-white);
      gap: var(--tg-spacing-14);
      .nav-head{
         margin-bottom: var(--tg-spacing-0);
      }
    }
  }
  .footer-support{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    gap:2rem;
  }
  .footer-sponsor{
    width: 100%;
    display: flex;
    gap:0.5rem;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    gap:2rem;
  }
  .footer-copyright{
    width: 100%;
    display: grid;
    justify-content: center;
    justify-items: center;
    align-items: center;
    color: var(--tg-text-lightgrey);
    gap:0.5rem;
    font-size: var(--tg-font-size-default);
    line-height: 1.5;
  }
  .footer-description{
    width: 100%;
    line-height: 1.5;
    text-align: center;
    color: var(--tg-text-lightgrey);
    font-size: var(--tg-font-size-xs);
    span {
      color: var(--tg-text-white);
    }
  }
}
</style>
