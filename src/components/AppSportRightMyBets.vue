<script lang="ts" setup>
import type { EnumsBetSlipHeadStatus } from '~/utils/enums'

const emit = defineEmits<{
  changeHeadSelectValue: [value: EnumsBetSlipHeadStatus]
  getBetList: []
}>()

const { t } = useI18n()
const router = useLocalRouter()
const { isMobile } = storeToRefs(useWindowStore())
const { closeRightSidebar } = useRightSidebar()

const {
  settle,
  settleList,
} = useSportSelectSettle()

const {
  sportBetList,
  loading,
} = useApiSportBetList(settle)

function toMyBets() {
  if (isMobile.value)
    closeRightSidebar()

  router.push(`/sports/${getSportsPlatId()}/my-bets?type=sports`)
}

function noDataGoToBet() {
  if (isMobile.value)
    closeRightSidebar()

  router.push(`/sports/${getSportsPlatId()}`)
  setTimeout(() => {
    sportsLobbyBus.emit(true)
  }, 50)
}

function settleChange() {
  sportsBettingToBetslipBus.emit(settle.value)
}
</script>

<template>
  <div class="app-sport-right-my-bets">
    <div class="tabs">
      <BaseTab v-model="settle" :list="settleList" @change="settleChange" />
    </div>
    <div class="my-bet-center">
      <div class="scroll-y scrollable center-content">
        <template v-if="loading">
          <div v-for="i in 5" :key="i" class="center" style="height: 100%">
            <AppSportsMyBetSlipSkeleton :settle="settle" />
          </div>
        </template>

        <div v-else class="h-min-100">
          <div v-if="sportBetList.length">
            <AppSportsMyBetSlip
              v-for="item in sportBetList"
              :key="item.ono"
              :data="item"
              disable-result
            />
          </div>
          <div v-else class="center h-min-100">
            <BaseEmpty>
              <template #icon>
                <BaseIcon
                  style="
                  font-size: var(--tg-empty-icon-size);
                  margin-bottom: var(--tg-spacing-24);
                "
                  name="uni-empty-betslip"
                />
              </template>
              <template #description>
                <span>{{ t('sports_bet_slip_empty') }}</span>
              </template>
              <template #default>
                <BaseButton
                  type="text"
                  size="none"
                  style=" --tg-base-button-text-default-color:var(--tg-text-white)"
                  @click="noDataGoToBet"
                >
                  {{ t('sports_betting_now') }}
                </BaseButton>
              </template>
            </BaseEmpty>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <!-- 我的投注 -->
      <BaseButton
        size="md"
        @click="toMyBets"
      >
        {{ t('view_all') }}
      </BaseButton>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.list-enter-active{
  transition: all 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8);
}

.list-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.app-sport-right-my-bets {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tabs {
  display: grid;
  grid-auto-flow: column;
  place-items: flex-start;
  border-bottom: 2px solid var(--tg-secondary-grey);
  padding: var(--tg-spacing-8);
  gap: var(--tg-spacing-8);
  --tg-tab-style-wrap-bg-color: var(--tg-primary-main);
  --tg-tab-style-inner-padding-y: var(--tg-spacing-13);
  --tg-tab-style-inner-padding-x: var(--tg-spacing-16);
}
.footer {
  display: grid;
  padding: var(--tg-spacing-16);
  row-gap: var(--tg-spacing-12);
  background: var(--tg-secondary-grey);
  grid-template-rows: auto;
  grid-auto-flow: row;
}
.my-bet-center {
  flex-grow: 1;
  height: 0;
  .center-content {
    padding: var(--tg-spacing-8) var(--tg-spacing-16) var(--tg-spacing-16);
  }
}
</style>
