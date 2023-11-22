<script setup lang='ts'>
import LeaderLine from 'vue3-leaderline'

const { isMobile } = storeToRefs(useWindowStore())
const { bool: isPageReady } = useBoolean(false)
const bossRef = ref()
const box1Ref = ref()
const box2Ref = ref()
const box3Ref = ref()
const box4Ref = ref()
const box5Ref = ref()
const box6Ref = ref()
const box7Ref = ref()
const box8Ref = ref()
const box9Ref = ref()
const box10Ref = ref()
const box11Ref = ref()
const box12Ref = ref()
const box4LevelRef = ref()
const box5LevelRef = ref()
const box6LevelRef = ref()
const box10LevelRef = ref()
const box11LevelRef = ref()
const box12LevelRef = ref()

let mainScroll: any
const lineGroup: LeaderLine[] = []
let line1: LeaderLine,
  line2: LeaderLine,
  line3: LeaderLine,
  line4: LeaderLine,
  line5: LeaderLine,
  line6: LeaderLine,
  line7: LeaderLine,
  line8: LeaderLine,
  line9: LeaderLine,
  line10: LeaderLine,
  line11: LeaderLine,
  line12: LeaderLine

const eventCallback: any = AnimEvent.add(() => {
  lineGroup.forEach((line) => {
    line.position()
  })
})
function addEvent() {
  window.addEventListener('resize', eventCallback)
  mainScroll?.addEventListener('scroll', eventCallback, false)
}
function removeEvent() {
  lineGroup.forEach((line) => {
    line.remove()
  })
  AnimEvent.remove(eventCallback)
  window.removeEventListener('resize', eventCallback)
  mainScroll?.removeEventListener('scroll', eventCallback, false)
}

onMounted(() => {
  mainScroll = document.getElementById('main-content-scrollable')
  const t = setTimeout(() => {
    line1 = new LeaderLine(
      LeaderLine.pointAnchor({
        element: box1Ref.value,
        x: isMobile.value
          ? box1Ref.value.clientWidth * 0.35
          : box1Ref.value.clientWidth * 0.5,
        y: 0,
      }),
      bossRef.value,
      {
        path: 'grid',
        color: '#FF9D00',
        size: 2,
        startSocket: 'top',
      })
    line2 = new LeaderLine(box2Ref.value, bossRef.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
    })
    line3 = new LeaderLine(
      LeaderLine.pointAnchor({
        element: box3Ref.value,
        x: isMobile.value
          ? box3Ref.value.clientWidth * 0.65
          : box3Ref.value.clientWidth * 0.5,
        y: 0,
      }),
      bossRef.value,
      {
        path: 'grid',
        color: '#FF9D00',
        size: 2,
        startSocket: 'top',
      })
    line4 = new LeaderLine(box4LevelRef.value, box1Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
      endPlug: 'behind',
    })
    line5 = new LeaderLine(box5LevelRef.value, box2Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
      endPlug: 'behind',
    })
    line6 = new LeaderLine(box6LevelRef.value, box3Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
      endPlug: 'behind',
    })
    line7 = new LeaderLine(box7Ref.value, box4Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
    })
    line8 = new LeaderLine(box8Ref.value, box4Ref.value, {
      path: 'grid',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
      endPlug: 'behind',
      endSocket: 'bottom',
      startSocketGravity: 20,
    })
    line9 = new LeaderLine(box9Ref.value, box6Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
    })
    line10 = new LeaderLine(box10LevelRef.value, box7Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
      endPlug: 'behind',
    })
    line11 = new LeaderLine(box11LevelRef.value, box8Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
      endPlug: 'behind',
    })
    line12 = new LeaderLine(box12LevelRef.value, box9Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
      endPlug: 'behind',
    })
    lineGroup.push(line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11, line12)
    addEvent()
    isPageReady.value = true
    clearTimeout(t)
  }, 400)
})
onBeforeUnmount(() => {
  removeEvent()
})
</script>

<template>
  <div :style="{ opacity: isPageReady ? 1 : 0 }" class="promotion_tutorial">
    <div class="relation-chart" :class="{ 'is-mobile': isMobile }">
      <!-- 第一级 -->
      <div ref="bossRef" class="boss box border">
        <div class="level">
          <AppAgentLevel level="A" color="green" />
        </div>
        <span>
          {{ $t('total_performance') }}
          <span class="yellow">101{{ $t('ten_thousand') }}</span>，
          {{ $t('total_agency_bonus') }}<span class="yellow">1880</span>
        </span>
        <span>
          {{ $t('direct_performance') }}
          <span class="yellow">16{{ $t('ten_thousand') }}</span>，
          {{ $t('contribute') }}<span class="yellow">1600</span>
        </span>
        <span>
          {{ $t('other_performance') }}
          <span class="yellow">85{{ $t('ten_thousand') }}</span>，
          {{ $t('contribute') }}<span class="yellow">280</span>
        </span>
      </div>
      <div class="grid-box">
        <!-- 第一级 -->
        <div ref="box1Ref" class="box b1 border">
          <span>
            {{ $t('direct') }}<span class="blue">B1</span>
            {{ $t('contribute_to') }}
            <span class="green">A</span>：<span class="yellow">800</span>
          </span>
          <span>
            {{ $t('surveys_multiselect_other_option_value') }}
            <span class="pink">C1</span>和<span class="pink">C2</span>
            {{ $t('contribute_to') }}
            <span class="green">A</span>：<span class="yellow">280</span>
          </span>
        </div>
        <div ref="box2Ref" class="box b2 border">
          <span>
            {{ $t('direct') }}<span class="blue">B2</span>
            {{ $t('contribute_to') }}
            <span class="green">A</span>：<span class="yellow">500</span>
          </span>
        </div>
        <div ref="box3Ref" class="box b3 border">
          <span>
            {{ $t('direct') }}<span class="blue">B3</span>
            {{ $t('contribute_to') }}
            <span class="green">A</span>：<span class="yellow">300</span>
          </span>
          <span>
            {{ $t('surveys_multiselect_other_option_value') }}<span class="pink">C1</span>
            {{ $t('contribute_to') }}
            <span class="green">A</span>：<span class="yellow">0</span>
          </span>
        </div>
        <div ref="box4Ref" class="box b4">
          <div ref="box4LevelRef" class="level">
            <AppAgentLevel level="B1" color="blue" />
          </div>
          <span>
            {{ $t('sub_total_performance') }}
            <span class="yellow">14{{ $t('ten_thousand') }}</span>
            {{ $t('enjoy') }}<span class="yellow">80/{{ $t('ten_thousand') }}</span>
          </span>
          <span class="grey">B1{{ $t('user_effect_bet', { num: 8 }) }}</span>
        </div>
        <div ref="box5Ref" class="box b5">
          <div ref="box5LevelRef" class="level">
            <AppAgentLevel level="B2" color="blue" />
          </div>
          <span>B2{{ $t('sub_self_no_profit') }}</span>
          <span class="grey">B2{{ $t('user_effect_bet', { num: 5 }) }}</span>
        </div>
        <div ref="box6Ref" class="box b6">
          <div ref="box6LevelRef" class="level">
            <AppAgentLevel level="B3" color="blue" />
          </div>
          <span>
            {{ $t('sub_total_performance') }}
            <span class="yellow">71{{ $t('ten_thousand') }}</span>
            {{ $t('enjoy') }}<span class="yellow">100/{{ $t('ten_thousand') }}</span>
          </span>
          <span class="grey">B3{{ $t('user_effect_bet', { num: 3 }) }}</span>
        </div>
        <!-- 第三级 -->
        <div ref="box7Ref" class="box b7 border">
          <span>
            {{ $t('contribute_to') }}
            <span class="green">A</span>：<span class="yellow">200</span>
          </span>
          <span>
            {{ $t('contribute_to') }}
            <span class="blue">B1</span>：<span class="yellow">800</span>
          </span>
        </div>
        <div ref="box8Ref" class="box b8 border">
          <span>
            {{ $t('contribute_to') }}
            <span class="green">A</span>：<span class="yellow">800</span>
          </span>
          <span>
            {{ $t('contribute_to') }}
            <span class="blue">B1</span>：<span class="yellow">320</span>
          </span>
        </div>
        <div ref="box9Ref" class="box b9 border">
          <span>
            {{ $t('contribute_to') }}
            <span class="green">A</span>：<span class="yellow">0</span>
          </span>
          <span>
            {{ $t('contribute_to') }}
            <span class="blue">B3</span>：<span class="yellow">7100</span>
          </span>
        </div>
        <div ref="box10Ref" class="box b10">
          <div ref="box10LevelRef" class="level">
            <AppAgentLevel level="C1" color="pink" />
          </div>
          <span>C1{{ $t('sub_self_no_profit') }}</span>
          <span class="grey">C1{{ $t('user_effect_bet', { num: 10 }) }}</span>
        </div>
        <div ref="box11Ref" class="box b11">
          <div ref="box11LevelRef" class="level">
            <AppAgentLevel level="C2" color="pink" />
          </div>
          <span>C2{{ $t('sub_self_no_profit') }}</span>
          <span class="grey">C2{{ $t('user_effect_bet', { num: 4 }) }}</span>
        </div>
        <div ref="box12Ref" class="box b12">
          <div ref="box12LevelRef" class="level">
            <AppAgentLevel level="C3" color="pink" />
          </div>
          <span>C3{{ $t('sub_self_no_profit') }}</span>
          <span class="grey">C3{{ $t('user_effect_bet', { num: 71 }) }}</span>
        </div>
      </div>
    </div>

    <div class="des">
      <p>
        <span class="title">{{ $t('for_example') }}:</span>
        <span>{{ $t('promotion_tutorial_example_desc') }}:</span>
      </p>
      <p>
        <span class="label">1、{{ $t('direct_team') }}: </span>
        <span>{{ $t('promotion_tutorial_direct_team_1') }}</span>
        <span>{{ $t('promotion_tutorial_direct_team_2') }}</span>
        <span>{{ $t('promotion_tutorial_direct_team_3') }}</span>
      </p>
      <p>
        <span class="label">2、{{ $t('other_team') }}: </span>
        <span>{{ $t('promotion_tutorial_other_team_1') }}</span>
        <span>{{ $t('promotion_tutorial_other_team_2') }}</span>
        <span>{{ $t('promotion_tutorial_other_team_3') }}</span>
      </p>
      <p>
        <span class="label">3、{{ $t('summary') }}:</span>
        <span>{{ $t('promotion_tutorial_summary_1') }}</span>
        <span>{{ $t('promotion_tutorial_summary_2') }}</span>
        <span>{{ $t('promotion_tutorial_summary_3') }}</span>
        <span>{{ $t('promotion_tutorial_summary_4') }}</span>
      </p>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.promotion_tutorial {
  position: relative;
  font-size: var(--tg-font-size-xs);
  font-weight: var(--tg-font-weight-semibold);
  color: var(--tg-text-white);
  line-height: 1.5;
  padding-top: var(--tg-spacing-20);
}

.relation-chart {
  .grid-box {
    display: grid;
    grid-template-areas:
      'b1 b2 b3'
      'b4 b5 b6'
      'b7 b8 b9'
      'b10 b11 b12'
    ;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: repeat(5, auto);
    gap: var(--tg-spacing-50) var(--tg-spacing-10);
  }

  .b1 {
    grid-area: b1;
  }

  .b2 {
    grid-area: b2;
  }

  .b3 {
    grid-area: b3;
  }

  .b4 {
    grid-area: b4;
  }

  .b5 {
    grid-area: b5;
  }

  .b6 {
    grid-area: b6;
  }

  .b7 {
    grid-area: b7;
  }

  .b8 {
    grid-area: b8;
  }

  .b9 {
    grid-area: b9;
  }

  .b10 {
    grid-area: b10;
  }

  .b11 {
    grid-area: b11;
  }

  .b12 {
    grid-area: b12;
  }

  .yellow {
    color: var(--tg-text-warn);
  }

  .blue {
    color: var(--tg-text-blue);
  }

  .green {
    color: var(--tg-text-green-light);
  }

  .pink {
    color: var(--tg-text-pink);
  }

  .grey {
    color: var(--tg-text-lightgrey);
  }

  .box {
    padding: var(--tg-spacing-23) var(--tg-spacing-28);
    border-radius: var(--tg-radius-default);
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--tg-secondary-grey);
    font-weight: var(--tg-font-weight-normal);
    min-width: 200px;
    max-width: 33.33%;
    justify-self: center;
    align-self: center;

    .level {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -60%);
      z-index: 1;
    }

    span {
      white-space: nowrap;
      text-align: center;
    }
  }

  .border {
    border: 2px solid var(--tg-text-warn);
  }

  .boss {
    padding: var(--tg-spacing-23) var(--tg-spacing-68);
    margin: 0 auto 50px;
    display: flex;
    min-width: 300px;
  }
}

.is-mobile {
  .box {
    padding: var(--tg-spacing-6) var(--tg-spacing-10);
    min-width: 100px;

    .level {
      transform: translate(-50%, -85%);
    }

    span {
      white-space: normal;
    }
  }

  .boss {
    min-width: 189px;

    span {
      white-space: nowrap;
    }
  }
}

.des {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-18);
  font-weight: var(--tg-font-weight-normal);
  color: var(--tg-text-grey-lighter);
  margin-top: -15px;

  .title {
    font-weight: var(--tg-font-weight-semibold);
    color: var(--tg-text-white);
    font-size: var(--tg-font-size-default);
  }

  .label {
    color: var(--tg-text-white);
  }

  p {
    span {
      display: block;
    }
  }
}
</style>
