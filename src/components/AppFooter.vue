<script lang="ts" setup>
import type { EnumLanguage } from '~/utils/enums'

const appStore = useAppStore()
const { userLanguage } = storeToRefs(appStore)

function selectChange(v: EnumLanguage) {
  appStore.changeLanguage(v)
}
</script>

<template>
  <div class="app-footer">
    <div class="footer-nav">
      <div class="layout-spacing reset">
        <div class="nav-head">
          体育
        </div>
        <div>主页</div>
        <div>滚球</div>
        <div>体育博彩规则</div>
      </div>
      <div class="layout-spacing reset">
        <div class="nav-head">
          娱乐城
        </div>
        <div>游戏</div>
        <div>VIP俱乐部</div>
        <div>促销活动</div>
      </div>
      <div class="layout-spacing reset">
        <div class="nav-head">
          支持
        </div>
        <div>公平性</div>
        <div>联盟计划</div>
        <div>负责任博彩</div>
        <div>Gameble Aware<BaseIcon name="uni-jump-page" /></div>
        <div>在线支持</div>
        <div>帮助中心<BaseIcon name="uni-jump-page" /></div>
      </div>
      <div class="layout-spacing reset">
        <div class="nav-head">
          社区
        </div>
        <div>博客</div>
        <div>论坛<BaseIcon name="uni-jump-page" /></div>
        <div>Facebook<BaseIcon name="uni-jump-page" /></div>
        <div>Twitter<BaseIcon name="uni-jump-page" /></div>
        <div>Instagram<BaseIcon name="uni-jump-page" /></div>
        <div>Youtube<BaseIcon name="uni-jump-page" /></div>
        <div>网购<BaseIcon name="uni-jump-page" /></div>
      </div>
      <div class="layout-spacing reset">
        <div class="nav-head">
          关于我们
        </div>
        <div>隐私政策</div>
        <div>许可证</div>
        <div>反洗钱规则</div>
        <div>服务条款</div>
        <div>自我排除</div>
        <div>Primedice<BaseIcon name="uni-jump-page" /></div>
      </div>
      <div class="layout-spacing reset">
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
        <div>小数式</div>
      </div>
    </div>
    <BaseDivider />
    <div class="footer-support">
      <BaseAspectRatio
        v-for="i in 10"
        :key="i"
        ratio="116/35"
        width="133.33px"
        style="margin: 0 auto;"
      >
        <BaseIcon name="litecoin" style="width: 100%; height: 100%" />
      </BaseAspectRatio>
    </div>
    <BaseDivider />
    <div class="footer-sponsor">
      <BaseAspectRatio
        v-for="i in 4"
        :key="i"
        ratio="116/35"
        width="133.33px"
        style="margin: 0 auto;"
      >
        <BaseIcon name="litecoin" style="width: 100%; height: 100%" />
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
  --tg-base-select-popper-style-padding-y: var(--tg-spacing-4);
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
  }
  .footer-support{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap:2rem;
  }
  .footer-sponsor{
    width: 100%;
    display: flex;
    gap:0.5rem;
    flex-wrap: wrap;
    justify-content: center;
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
