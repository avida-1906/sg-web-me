<script lang="ts" setup>
const socialData = [
  {
    label: 'Facebook',
    img: '/png/settings/social-facebook.png',
  },
  {
    label: 'WhatsApp',
    img: '/png/settings/social-whatsapp.png',
  },
  {
    label: 'Telegram',
    img: '/png/settings/social-telegram.png',
  },
  { label: 'Line', img: '/png/settings/social-line.png' },
  { label: 'X', img: '/png/settings/social-x.png' },
  { label: 'Zalo', img: '/png/settings/social-zalo.png' },
  { label: 'Viber', img: '/png/settings/social-viber.png' },
  { label: 'WeChat', img: '/png/settings/social-wechat.png' },
]

const commission = [
  { label: '累计佣金', value: '999,999' },
  { label: '已领取佣金', value: '999,999' },
  { label: '上次佣金', value: '999,999' },
]

const performance = [
  { label: '团队总数', value: '99999人' },
  { label: '直属成员', value: '99999人' },
  { label: '其他成员', value: '99999人' },
  { label: '总业绩', value: '999,99.00$' },
  { label: '直属业绩', value: '999,99.00$' },
  { label: '其他业绩', value: '999,99.00$' },
]

const bet = [
  { label: '有效投注总额', value: '999,99.00' },
  { label: '总投注单', value: '999,99.00' },
  { label: '总赢/输', value: '999,99.00' },
]
</script>

<template>
  <div class="tg-affiliate-retention">
    <div class="retention-item">
      <div class="item-title">
        <div class="title-left">
          推广信息
        </div>
        <div class="title-btn">
          <BaseButton type="text">
            更多
          </BaseButton>
        </div>
      </div>
      <div class="item-content content-padding promotion-msg">
        <div class="promotion-left">
          <BaseQrcode url="www.baidu.com" :size="92" class="qr-code" />
          <p>点击保存二维码</p>
        </div>
        <div class="promotion-right">
          <div class="link">
            <p>我的链接</p>
            <AppCopyLine msg="stake.com/?c=r123123132132123CiS8s" />
          </div>
          <div class="social-wrap">
            <div v-for="(item, index) in socialData" :key="index" class="social">
              <BaseImage
                :url="item.img"
                width="28px"
                height="28px"
                class="promotion-base-image"
              />
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="retention-item">
      <div class="item-title">
        <div class="title-left">
          佣金
        </div>
        <div class="title-btn">
          <BaseButton type="text">
            更多
          </BaseButton>
        </div>
      </div>
      <div class="item-content grid-wrap">
        <div v-for="(item, index) in commission" :key="index">
          <span>{{ item.label }} </span>
          <span class="yellow">{{ item.value }}</span>
        </div>
      </div>
    </div>
    <div class="retention-item">
      <div class="item-title">
        <div class="title-left">
          业绩
        </div>
        <div class="title-btn">
          <BaseButton type="text">
            更多
          </BaseButton>
        </div>
      </div>
      <div class="item-content grid-wrap">
        <div v-for="(item, index) in performance" :key="index">
          <span>{{ item.label }} </span>
          <span>{{ item.value }}</span>
        </div>
      </div>
    </div>
    <div class="retention-item">
      <div class="item-title">
        <div class="title-left">
          下属的投注
        </div>
        <div class="title-btn">
          <BaseButton type="text">
            更多
          </BaseButton>
        </div>
      </div>
      <div class="item-content grid-wrap">
        <div v-for="(item, index) in bet" :key="index">
          <span>{{ item.label }} </span>
          <span :class="{ green: index === 2 }">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tg-affiliate-retention {
  font-size: var(--tg-font-size-default);
  color: var(--tg-text-white);
  .retention-item{
    margin-bottom: var(--tg-spacing-20);
    .item-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--tg-secondary-main);
      padding: 0 var(--tg-spacing-4) 0 var(--tg-spacing-16);
      border-radius: var(--tg-radius-default)  var(--tg-radius-default) 0 0;
      .title-left{
        font-weight: var(--tg-font-weight-semibold);
      }
      .title-btn{
        button{
          font-size: var(--tg-font-size-xs);
          font-weight: var(--tg-font-weight-normal);
        }
      }
    }
    .item-content{
      &.content-padding{
        padding: var(--tg-spacing-16);
      }
    }
  }
  .promotion-msg{
    display: flex;
    gap: var(--tg-spacing-50);
    background-color: var(--tg-primary-main);
    .promotion-left{
      text-align: center;
      .qr-code{
      margin-bottom: var(--tg-spacing-8);
    }
    }
    .promotion-right{
      flex: .8;
      padding-top: var(--tg-spacing-4);
      .link{
        p:nth-child(1){
          margin-bottom: var(--tg-spacing-6);
        }
      }
      .social-wrap{
        display: flex;
        gap: var(--tg-spacing-12);
        justify-content: space-between;
        margin-top: 14px;
        .social{
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--tg-spacing-8);
          font-size: var(--tg-font-size-xs);
          .promotion-base-image{
            width: 28px;
            height: 28px;
            --tg-base-img-style-radius: var(--tg-radius-default);
          }
        }
      }
    }
  }
  .grid-wrap{
    background-color: var(--tg-secondary-main) !important;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1px;
    > div{
      background-color: var(--tg-primary-main);
      padding: var(--tg-spacing-12) var(--tg-spacing-16);
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 21px;
    }
  }
  .yellow{
    color: var(--tg-text-warn);
  }
  .green{
    color: var(--tg-primary-success);
  }
}
</style>

<route lang="yaml">
meta:
  browserTitle: 联盟保留计划 – Stake.com
</route>
