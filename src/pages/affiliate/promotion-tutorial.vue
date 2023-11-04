<script setup lang='ts'>
import LeaderLine from 'vue3-leaderline'

const { bool: isPageReady } = useBoolean(true)
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

function addEvent() {
  window.addEventListener('resize', eventCallback)
  mainScroll?.addEventListener('scroll', eventCallback, false)
}
function removeEvent() {
  window.removeEventListener('resize', eventCallback)
  mainScroll?.removeEventListener('scroll', eventCallback, false)
  line1.remove()
  line2.remove()
  line3.remove()
}
function eventCallback() {
  line1.position()
  line2.position()
  line3.position()
}
onMounted(() => {
  mainScroll = document.getElementById('main-content-scrollable')
  const t = setTimeout(() => {
    line1 = new LeaderLine(box1Ref.value, bossRef.value, {
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
    line3 = new LeaderLine(box3Ref.value, bossRef.value, {
      path: 'grid',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
    })
    line4 = new LeaderLine(box4Ref.value, box1Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
      endPlug: 'behind',
    })
    line5 = new LeaderLine(box5Ref.value, box2Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
      endPlug: 'behind',
    })
    line6 = new LeaderLine(box6Ref.value, box3Ref.value, {
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
      endPlug: 'behind',
    })
    line8 = new LeaderLine(box8Ref.value, box4Ref.value, {
      path: 'grid',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
      endPlug: 'behind',
      endSocket: 'bottom',
    })
    line9 = new LeaderLine(box9Ref.value, box6Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
      endPlug: 'behind',
    })
    // lineGroup.push(line1,line2,line3,line4,line5,line6,line7,line8,line9,line10,line11,line12)
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
    <div class="relation-chart">
      <!-- 第一级 -->
      <div ref="bossRef" class="boss box border">
        <div class="level">
          <AppAgentLevel level="A" color="green" />
        </div>
        <span>
          总业绩<span class="yellow">101万</span>，
          总代理奖金<span class="yellow">1880</span>
        </span>
        <span>
          直属业绩<span class="yellow">16万</span>，
          贡献<span class="yellow">1600</span>
        </span>
        <span>
          其他业绩<span class="yellow">85万</span>，
          贡献<span class="yellow">280</span>
        </span>
      </div>
      <!-- 第二级 -->
      <div class="row">
        <div ref="box1Ref" class="box border">
          <span>
            直属<span class="blue">B1</span>
            贡献给<span class="green">A</span>：<span class="yellow">800</span>
          </span>
          <span>
            其他<span class="pink">C1</span>和<span class="pink">C2</span>
            贡献给<span class="green">A</span>：<span class="yellow">280</span>
          </span>
        </div>
        <div ref="box2Ref" class="box border">
          <span>
            直属<span class="blue">B2</span>
            贡献给<span class="green">A</span>：<span class="yellow">500</span>
          </span>
        </div>
        <div ref="box3Ref" class="box border">
          <span>
            直属<span class="blue">B3</span>
            贡献给<span class="green">A</span>：<span class="yellow">300</span>
          </span>
          <span>
            其他<span class="pink">C1</span>
            贡献给<span class="green">A</span>：<span class="yellow">0</span>
          </span>
        </div>
      </div>
      <div class="row">
        <div ref="box4Ref" class="box">
          <div class="level">
            <AppAgentLevel level="B1" color="blue" />
          </div>
          <span>
            下级总业绩<span class="yellow">14万</span>
            享受<span class="yellow">80/万</span>
          </span>
          <span class="grey">B1自己有效投注8万</span>
        </div>
        <div ref="box5Ref" class="box">
          <div class="level">
            <AppAgentLevel level="B2" color="blue" />
          </div>
          <span>B2无下级自身无收益</span>
          <span class="grey">B2自己有效投注5万</span>
        </div>
        <div ref="box6Ref" class="box">
          <div class="level">
            <AppAgentLevel level="B3" color="blue" />
          </div>
          <span>
            下级总业绩<span class="yellow">71万</span>
            享受<span class="yellow">100/万</span>
          </span>
          <span class="grey">B3自己有效投注3万</span>
        </div>
      </div>

      <!-- 第三级 -->
      <div class="row">
        <div ref="box7Ref" class="box border">
          <span>
            贡献给<span class="green">A</span>：<span class="yellow">200</span>
          </span>
          <span>
            贡献给<span class="blue">B1</span>：<span class="yellow">800</span>
          </span>
        </div>
        <div ref="box8Ref" class="box border">
          <span>
            贡献给<span class="green">A</span>：<span class="yellow">800</span>
          </span>
          <span>
            贡献给<span class="blue">B1</span>：<span class="yellow">320</span>
          </span>
        </div>
        <div ref="box9Ref" class="box border">
          <span>
            贡献给<span class="green">A</span>：<span class="yellow">0</span>
          </span>
          <span>
            贡献给<span class="blue">B3</span>：<span class="yellow">7100</span>
          </span>
        </div>
      </div>
      <div class="row">
        <div ref="box10Ref" class="box">
          <div class="level">
            <AppAgentLevel level="C1" color="pink" />
          </div>
          <span>C1无下级自身无收益</span>
          <span class="grey">C1自己有效投注10万</span>
        </div>
        <div ref="box11Ref" class="box">
          <div class="level">
            <AppAgentLevel level="C2" color="pink" />
          </div>
          <span>C2无下级自身无收益</span>
          <span class="grey">C2自己有效投注4万</span>
        </div>
        <div ref="box12Ref" class="box">
          <div class="level">
            <AppAgentLevel level="C3" color="pink" />
          </div>
          <span>C3无下级自身无收益</span>
          <span class="grey">C3自己有效投注71万</span>
        </div>
      </div>
    </div>
    <div class="des">
      <p>
        <span class="title">举例说明如下:</span>
        <span>本站点返佣以有效投注为依据，假设返佣比例为左上角表格。A在本站第一个发现商机，
          马上发展了B1、B2和B3，B1又往下发展了C1和C2，B2无下级，B3只发展了比较有实力的C3。
          几天后，B1本人的有效投注为8万，B2本人的有效投注为5万，B3本人的有效投注为3万，C1本
          人的有效投注为10万，C2本人的有效投注为4万，C3本人的有效投注达71万，则B1总业绩来自
          C1和C2共14万，对应返佣比例为80/万；B2无下级业绩为0；B3下级C3给力，总业绩为71万，
          对应返佣比例为100/万；A有来自直属团队16万和来自其他团队85万，总业绩为101万，对应返
          佣比例是100/万。那么他们之间的收益计算方式如下:
        </span>
      </p>
      <p>
        <span class="label">1、直属团队: </span>
        <span>(1) B1，B2，B3贡献给A: (8万+5万+3万)x100/万=1600。</span>
        <span>(2) C1和C2贡献给B1: (10万+4万)x80/万=1120。 </span>
        <span>(3) C3贡献给B3: 71万x100/万=7100。</span>
      </p>
      <p>
        <span class="label">2、其他团队: </span>
        <span>是指下级、下下级、下下下级...等发展的成员，统一叫其他团队；因本系统可无限发展下级，为便于解说，
          本文只取2级结构作为例子阐述。</span>
        <span>(1)来自C1和C2：因B1总业绩14万，只享受80/万的返佣比例，而A总业绩101万，享受100/万的
          返佣比例，那么A和B1之间产生了返佣差额为：100-80=20/万，此差额即为C1和C2贡献给A的部分，所
          以C1和C2贡献给A：(10万+4万)×20/万=280。</span>
        <span>(2)来自C3：因B3总业绩71万，享受100/万的返佣比例，A总业绩101万，享受100/万的返佣比例，
          那么A和B3之间产生的返佣差额为：100-100=0/万，C3贡献给A：71万x0/万=0。</span>
      </p>
      <p>
        <span class="label">3、总结说明:</span>
        <span>(1)C3给力，间接让A的所有业绩都享受更高返佣比例。</span>
        <span>(2)B2可能比较懒，没有发展下级，则无收益。</span>
        <span>(3)B3虽然加入比较晚，且属于A的下级，但其下级C3给力，让B3直接享受更高返佣比例，所以B3无论
          何时加入，处于谁的下级，不管身处于第几级，收益永远不受影响，不再吃他人下级的亏，发展也不被制约。
        </span>
        <span>(4)这是一套绝对公平公正的代理模式，并不会因为谁加入得晚，而永远被踩在脚下。</span>
      </p>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.promotion_tutorial {
  position: relative;
  transition: var(--tg-transition);
  font-size: var(--tg-font-size-xs);
  font-weight: var(--tg-font-weight-semibold);
  color: var(--tg-text-white);
  line-height: 1.5;
  padding-top: var(--tg-spacing-20);
}

.relation-chart {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-50);
  align-items: center;
  margin-bottom: var(--tg-spacing-35);
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
  .grey{
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
    .level{
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%,-60%);
      z-index: 1;
    }
  }
  .border {
    border: 2px solid var(--tg-text-warn);
  }

  .boss {
    padding: var(--tg-spacing-23) var(--tg-spacing-68);
  }
  .row{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}

.des {
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-18);
  font-weight: var(--tg-font-weight-normal);
  color: var(--tg-text-grey-lighter);

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
