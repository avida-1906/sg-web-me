<script setup lang='ts'>
// interface Props {
// }
// const props = withDefaults(defineProps<Props>(), {
// })
// const emit = defineEmits(['update:modelValue'])
//  存款类型
const currentType = ref('2')
const depositType = ref([
  { label: '银行转账', icon: 'fiat-bank', value: '1' },
  { label: '支付宝', icon: 'fiat-alipay', value: '2' },
  { label: '微信', icon: 'fiat-wechat', value: '3' },
])
const changeType = function (type: string) {
  currentType.value = type
}

const bankStep = ref<'1' | '2'>('1')
const payeeInformation = ref({
  name: '张三',
  bankNumber: '6228480445839939573',
  bankName: '中国农业银行',
  accountOpeningBank: '开户网点：天津农商银行',
  amount: '200,000.00',
})
const toCopy = function (item: string) {
  application.copy(item)
}
const currentAisle = ref('2')
const aisleData = ref([
  { label: 'XGS/支付宝-小额', value: '1' },
  { label: 'XGS/支付宝-小额', value: '2' },
  { label: 'XGS/支付宝-小额', value: '3' },
])
const changeAisle = function (value: string) {
  currentAisle.value = value
}
</script>

<template>
  <div class="app-fiat-currency-deposit">
    <div class="deposit-wrap">
      <div class="scroll-x deposit-type-btns">
        <div
          v-for="item in depositType" :key="item.value" class="type-btn"
          :class="item.value === currentType ? 'active' : '' "
          @click="changeType(item.value)"
        >
          <BaseIcon :name="item.icon" />
          {{ item.label }}
        </div>
      </div>
      <div v-if="currentType === '1'" class="type-online-bank">
        <div v-if="bankStep === '1'" class="bank-first">
          <BaseInput v-model="username" label="收款人姓名" :msg="usernameErrorMsg" />
          <BaseInput v-model="username" label="充值金额" :msg="usernameErrorMsg" />
          <BaseMoneyKeyboard />
          <BaseButton bg-style="primary" size="md" @click="bankStep = '2'">
            确认支付
          </BaseButton>
        </div>
        <div v-else class="bank-second">
          <p class="second-title">
            收款人信息
          </p>
          <p v-for="item, index in payeeInformation" :key="index" class="copy-row" @click="toCopy(item)">
            {{ item }}
            <BaseIcon name="uni-doc" />
          </p>
          <p class="second-tips">
            转账金额务必与订单金额一致
          </p>
          <div class="second-btns">
            <BaseButton type="line" size="md">
              取消存款申请
            </BaseButton>
            <BaseButton bg-style="primary" size="md">
              我已存款
            </BaseButton>
          </div>
          <div class="second-tips2">
            <BaseIcon name="uni-error" />
            请转账成功后务必及时确认！否则可能造成延迟上分！
          </div>
        </div>
      </div>
      <div v-else class="type-other">
        <div class="other-first">
          <div class="other-title">
            通道选择
          </div>
          <div class="other-aisles">
            <div
              v-for="item in aisleData" :key="item.value" class="aisle"
              :class="currentAisle === item.value ? 'active' : ''"
              @click="changeAisle(item.value)"
            >
              {{ item.label }}
            </div>
          </div>
          <BaseInput v-model="username" label="充值金额:￥" :msg="usernameErrorMsg" />
          <BaseMoneyKeyboard />
          <BaseButton bg-style="primary" size="md">
            确认支付
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-fiat-currency-deposit{
  .deposit-wrap{
    .deposit-type-btns{
      display: flex;
      gap: .75rem;
      margin-bottom: var(--tg-spacing-12);
      .type-btn{
        background: var(--tg-secondary-main);
        min-width: 102px;
        padding: 0 var(--tg-spacing-12);
        text-align: center;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        // box-shadow: var(--tg-box-shadow);
        box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.30);;
        border-radius: var(--tg-radius-default);
        color: var(--tg-text-white);
        cursor: pointer;
        &:active{
          transform: scale(.96);
        }
        &:hover{
          opacity: .9;
        }
        &.active{
          background-color: var(--tg-text-blue);
        }
      }
    }
    .type-online-bank{
      .bank-first,.bank-second{
        display: flex;
        flex-direction: column;
        gap: .5rem;
      }
      .bank-second{
        .second-title{
          color: var(--tg-text-lightgrey);
        }
        .copy-row{
          max-width: 100%;
          border-radius: var(--tg-radius-default);
          border: 1px solid var(--tg-secondary-main);
          padding: var(--tg-spacing-9) var(--tg-spacing-12);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--tg-text-white);
          cursor: pointer;
        }
        .second-tips{
          color:var(--tg-text-error);
          font-size: var(--tg-font-size-xs);
          margin-top: -4px;
        }
        .second-btns{
          display: flex;
          align-items: center;
          gap: 1rem;
          button{
            width: 100%;
          }
        }
        .second-tips2{
          display: flex;
          justify-content: center;
          align-items: center;
          // margin-top: var(--tg-spacing-10);
          color:var(--tg-text-error);
          font-size: var(--tg-font-size-xs);
          gap: .25rem;
        }
      }
    }
    .type-other{
      .other-first{
        display: flex;
        flex-direction: column;
        gap: .75rem;
        .other-title{
          color: var(--tg-text-lightgrey);
          margin-bottom: -5px;
        }
        .other-aisles{
          display: flex;
          justify-content: left;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;

          .aisle{
            padding: var(--tg-spacing-11) var(--tg-spacing-8);
            background-color: var(--tg-secondary-dark);
            border-radius: var(--tg-radius-default);
            box-shadow: var(--tg-box-shadow);
            cursor: pointer;
            font-size: var(--tg-font-size-xs);
            &:active{
                transform: scale(.96);
            }
            &:hover{
              opacity: .9;
            }
            &.active{
              background: var(--tg-text-blue);
              color: var(--tg-text-white);
            }
          }
        }
      }
    }
  }
}
</style>
