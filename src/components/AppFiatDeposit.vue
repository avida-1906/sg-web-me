<script setup lang='ts'>
interface IAisleData {
  label: string
  value: string
}

const emit = defineEmits(['show'])

const currentType = ref<'1' | '2'>('1')
const bankStep = ref<'1' | '2'>('1')
const payeeInformation = ref({
  name: '张三',
  bankNumber: '6228480445839939573',
  bankName: '中国农业银行',
  accountOpeningBank: '开户网点：天津农商银行',
  amount: '200,000.00',
})
const currentAisle = ref('2')
const aisleData = ref<IAisleData[]>([
  { label: 'XGS/支付宝-小额', value: '1' },
  { label: 'XGS/支付宝-小额', value: '2' },
  { label: 'XGS/支付宝-小额', value: '3' },
])
const username = ref('')
const amount = ref('')

const nextStep = function () {
  emit('show', false)
  bankStep.value = '2'
}
const previous = function () {
  emit('show', true)
  bankStep.value = '1'
}
const toCopy = function (item: string) {
  application.copy(item)
}
const changeAisle = function (value: string) {
  currentAisle.value = value
}
</script>

<template>
  <div class="app-fiat-currency-deposit">
    <div class="deposit-wrap">
      <AppWithdrawalDepositType
        v-model="currentType"
      />
      <div v-if="currentType === '1'" class="type-online-bank">
        <div v-if="bankStep === '1'" class="bank-first">
          <BaseLabel label="存款人姓名:" label-content="为及时到账，请务必输入正确的存款人姓名">
            <BaseInput v-model="username" />
          </BaseLabel>
          <BaseInput v-model="amount" label="充值金额" />
          <BaseMoneyKeyboard />
          <BaseButton bg-style="primary" size="md" @click="nextStep">
            确认支付
          </BaseButton>
        </div>
        <div v-else class="bank-second">
          <p class="second-title">
            收款人信息
          </p>
          <p
            v-for="item, index in payeeInformation"
            :key="index"
            class="copy-row"
            @click="toCopy(item)"
          >
            {{ item }}
            <BaseIcon name="uni-doc" />
          </p>
          <p class="second-tips">
            转账金额务必与订单金额一致
          </p>
          <div class="second-btns">
            <BaseButton type="line" size="md" @click="previous">
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
          <BaseLabel label="通道选择">
            <div class="other-aisles">
              <div
                v-for="item in aisleData" :key="item.value" class="aisle"
                :class="currentAisle === item.value ? 'active' : ''"
                @click="changeAisle(item.value)"
              >
                <span>{{ item.label }}</span>
              </div>
            </div>
          </BaseLabel>
          <BaseInput v-model="username" label="充值金额:￥" />
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
    display: flex;
      flex-direction: column;
      gap: .75rem;
    .type-online-bank{
      .bank-first,.bank-second{
        display: flex;
        flex-direction: column;
        gap: .75rem;
      }
      .bank-second{
        .second-title{
          color: var(--tg-text-lightgrey);
        }
        .copy-row{
          max-width: 100%;
          border-radius: var(--tg-radius-default);
          border: 1px solid var(--tg-secondary-main);
          padding: var(--tg-spacing-15) var(--tg-spacing-12);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--tg-text-white);
          cursor: pointer;
          background-color: var(--tg-secondary-dark);
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
            display: inline-flex;
            justify-content: center;
            align-items: center;
            gap: .75rem;
            &:hover{
              opacity: .9;
            }
            &.active{
              background: var(--tg-text-blue);
              color: var(--tg-text-white);
            }
            &:active{
                span{
                  transform: scale(.96);
                }
            }
          }
        }
      }
    }
  }
}
</style>
