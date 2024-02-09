<!-- eslint-disable eslint-comments/no-unlimited-disable -->
<script setup>
/* eslint-disable */
const { t } = useI18n()
const balance = 1// 用户余额，接口获取
const gameData = ref({
  betAmount: '0.00000001', // 投注额
  profit: '0.00000000', // 获取利润
  betFrequency: 0, // 投注次数
  ifWinRest: true, // 若赢 true:重置 false:增加
  ifWinPercent: 0, // 若赢增加百分比
  ifLoseRest: true, // 若输 true:重置 false:增加
  ifLosePercent: 0, // 若输增加百分比
  takeProfit: '0.00000000', // 止盈
  stopLose: '0.00000000', // 止损
  targetMulti: '2.00', // 目标乘数
  winOdd: '49.5000000', // 获胜几率
})
let during = false
const waitAutoFinishFlag = ref(false)
const results = ref([])// 结果集合
const touzhuDisabled = ref(false)// 投注按钮状态
const touzhuDisabled1 = ref(false)
const autoBetFlag = ref(false)
const gameResultNum = ref('1.00')
const btnToggle = ref(true)
const inputBool = ref({
  betAmount: true,
  betFrequency: true,
  targetMulti: true,
  winOdd: true,

})
const errMsg = ref({
  betAmount: '',
  betFrequency: '',
  targetMulti: '',
  winOdd: '',
})
const minStyle = ref(false)
// 自适应
const screenWidth = ref(0)
const autoStyle = ref({
  gameResult: {
    minHeight: '630px',
  },
  resultFontSize: {
    fontSize: '128px',
    color: '#FFF',
  },
})
let isMobile = false

function getResults() {
  if (minStyle.value)
    return results.value.slice(0, 4)

  return results.value
}

function inptMouseout(targetId, time) {
  const div = document.getElementById(targetId)
  if (!div)
    return
  if (time === 0) {
    if (div && div.parentNode)
      div.parentNode.removeChild(div)
  }
  else {
    setTimeout(() => {
      if (div && div.parentNode)
        div.parentNode.removeChild(div)
    }, time || 500)
  }
}
/**
* 投注额减半
*/
function betHalf() {
  if (touzhuDisabled.value || touzhuDisabled1.value || autoBetFlag.value)
    return
  if (Number.parseFloat(gameData.value.betAmount) > 0)
    gameData.value.betAmount = (Number.parseFloat(gameData.value.betAmount) / 2).toFixed(8)
}
/**
* 双倍投注额
*/
function betDouble() {
  if (touzhuDisabled.value || touzhuDisabled1.value || autoBetFlag.value)
    return
  if (Number.parseFloat(gameData.value.betAmount) > 0)
    gameData.value.betAmount = (Number.parseFloat(gameData.value.betAmount) * 2).toFixed(8)
}
function sdtz() {
  if (!autoBetFlag.value)
    btnToggle.value = true
}
function zdtz() {
  if (!autoBetFlag.value)
    btnToggle.value = false
}
function rybtnRestFunc() {
  if (touzhuDisabled.value || touzhuDisabled1.value || autoBetFlag.value)
    return
  gameData.value.ifWinRest = true
}
function rybtnAddFunc() {
  if (touzhuDisabled.value || touzhuDisabled1.value || autoBetFlag.value)
    return
  gameData.value.ifWinRest = false
}
function rsbtnRestFunc() {
  if (touzhuDisabled.value || touzhuDisabled1.value || autoBetFlag.value)
    return
  gameData.value.ifLoseRest = true
}
function rsbtnAddFunc() {
  if (touzhuDisabled.value || touzhuDisabled1.value || autoBetFlag.value)
    return
  gameData.value.ifLoseRest = false
}

/**
* 开始自动投注
*/
function autoTouzhu() {
  if (verifyData())
    return
  // 开始自动投注
  showAutoTip(1)
  autoBetFlag.value = true
  touzhuDisabled.value = true
  if (gameData.value.betFrequency === 0) {
    const callback = function () {
      if (waitAutoFinishFlag.value) {
        if (during) {
          setTimeout(() => {
            callback()
          }, 100)
        }
        else {
          autoBetFlag.value = false
          touzhuDisabled.value = false
          waitAutoFinishFlag.value = false
        }
        return
      }
      if (during) {
        setTimeout(() => {
          callback()
        }, 100)
      }
      else {
        setTimeout(() => {
          conform(callback)
        }, 1000)
      }
    }
    conform(callback)
  }
  else {
    const callback = function (skip) {
      if (!skip)
        gameData.value.betFrequency--
      if (gameData.value.betFrequency <= 0) {
        setTimeout(() => {
          autoBetFlag.value = false
          touzhuDisabled.value = false
        }, 550)
      }
      else {
        if (during) {
          setTimeout(() => {
            callback(true)
          }, 100)
        }
        else {
          setTimeout(() => {
            conform(callback)
          }, 1000)
        }
      }
    }
    conform(callback)
  }
}
const autoTip = ref([])
function showAutoTip(ty) {
  if (autoTip.value.length === 2)
    return

  if (ty === 1)
    autoTip.value.push(t('mini_start_auto_bet_tip'))

  if (ty === 2)
    autoTip.value.push(t('mini_stop_auto_bet_tip'))

  setTimeout(() => {
    autoTip.value.shift()
  }, 5000)
}
function stopAutoTouzhu() {
  showAutoTip(2)
  waitAutoFinishFlag.value = true
}

function conform(callback) {
  autoStyle.value.resultFontSize.color = '#FFF'
  gameResultNum.value = '1.00'
  // 请求数据
  setTimeout(() => {
    during = true
    const multi = (Math.random() * 10)
    const step = multi / 100
    let stopValue = 1
    const interval = setInterval(() => {
      stopValue += step
      gameResultNum.value = stopValue.toFixed(2)
      if (stopValue > gameData.value.targetMulti)
        autoStyle.value.resultFontSize.color = '#00E700'

      if (stopValue >= multi) {
        if (multi <= gameData.value.targetMulti)
          autoStyle.value.resultFontSize.color = '#E9103D'

        gameResultNum.value = multi.toFixed(2)
        clearInterval(interval)
        // 执行结果滚动
        if (results.value.length > 5)
          results.value.pop()

        results.value.unshift({
          id: multi,
          result: multi.toFixed(2),
          style: {
            color: multi > gameData.value.targetMulti ? '#05080A' : '#FFF',
            backgroundColor: multi > gameData.value.targetMulti ? '#00E700' : '#304554',
          },
        })
        if (callback)
          callback()

        during = false
      }
    }, 10)
  }, 1000)
}
function touzhu() {
  if (verifyData())
    return
  touzhuDisabled.value = true
  conform(() => {
    setTimeout(() => {
      touzhuDisabled.value = false
    }, 550)
  })
}

/**
* 数据校验 通过返回false
*/
function verifyData() {
  if ((gameData.value.betAmount <= balance && gameData.value.betAmount >= 0)
      && (gameData.value.betFrequency < 999999999 && gameData.value.betFrequency >= 0)
      && (gameData.value.targetMulti > 1.01 && gameData.value.targetMulti < 1000000)
      && (gameData.value.winOdd > 0.000099 && gameData.value.winOdd < 98.01980198)) {
    touzhuDisabled1.value = false
    return false
  }
  else {
    touzhuDisabled1.value = true
  }
  return true
}

onMounted(() => {
  screenWidth.value = document.body.clientWidth
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth
    })()
  }
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  if (isMobile)
    console.log('mobile')
  else
    console.log('pc')
})
watch(screenWidth, (newValue, oldValue) => {
  if (newValue >= 700) {
    const boxWidth = document.getElementById('canvasIdv').offsetWidth
    console.log('画布宽度：', boxWidth)
    const boxMinHeight = boxWidth / 900 * 630
    autoStyle.value.gameResult.minHeight = `${boxMinHeight}px`
    minStyle.value = false
    // 结果字体缩放
    const fontSize = boxWidth / 900 * 128
    autoStyle.value.resultFontSize.fontSize = `${fontSize}px`
  }

  if (newValue < 700) {
    console.log(`newValue<700${newValue}:${oldValue}`)
    minStyle.value = true
    autoStyle.value.gameResult.minHeight = '281px'
    autoStyle.value.resultFontSize.fontSize = '64px'
  }
})

watch(() => gameData.value, (newValue, valuOld) => {
  console.log(`vaule2对象的name属性改变了，新值${JSON.stringify(newValue)}旧值${JSON.stringify(valuOld)}`)
  // gameData.value.betAmount = parseFloat(gameData.value.betAmount).toFixed(8);
  gameData.value.profit = gameData.value.betAmount

  // gameData.value.takeProfit = parseFloat(gameData.value.takeProfit).toFixed(8);
  // gameData.value.stopLose = parseFloat(gameData.value.stopLose).toFixed(8);
  // gameData.value.winOdd = parseFloat(gameData.value.winOdd).toFixed(8);

  // 数据校验,错误提示框
  if (gameData.value.betAmount > balance) {
    inputBool.value.betAmount = false
    errMsg.value.betAmount = t('mini_more_than_balance')
  }
  else if (gameData.value.betAmount < 0) {
    inputBool.value.betAmount = false
    errMsg.value.betAmount = t('mini_must_than_zero')
  }
  else {
    inputBool.value.betAmount = true
    errMsg.value.betAmount = ''
  }

  if (gameData.value.betFrequency > 999999999) {
    inputBool.value.betFrequency = false
    errMsg.value.betFrequency = 'Maximum is "999999999"'
  }
  else if (gameData.value.betFrequency < 0) {
    inputBool.value.betFrequency = false
    errMsg.value.betFrequency = 'Minimum is "0"'
  }
  else {
    inputBool.value.betFrequency = true
    errMsg.value.betFrequency = ''
  }

  if (gameData.value.targetMulti < 1.01) {
    inputBool.value.targetMulti = false
    errMsg.value.targetMulti = 'Minimum is "1.01"'
  }
  else if (gameData.value.targetMulti > 1000000) {
    inputBool.value.targetMulti = false
    errMsg.value.targetMulti = 'Maximum is "1000000"'
  }
  else {
    inputBool.value.targetMulti = true
    errMsg.value.targetMulti = ''
  }

  if (gameData.value.winOdd < 0.000099) {
    inputBool.value.winOdd = false
    errMsg.value.winOdd = 'Minimum is "0.000099"'
  }
  else if (gameData.value.winOdd > 98.01980198) {
    inputBool.value.winOdd = false
    errMsg.value.winOdd = 'Maximum is "98.01980198"'
  }
  else {
    inputBool.value.winOdd = true
    errMsg.value.winOdd = ''
  }

  verifyData()
}, { deep: true })
watch(() => gameData.value.targetMulti, (newValue) => {
  gameData.value.winOdd = (99 / newValue).toFixed(8)
})
watch(() => gameData.value.winOdd, (newValue) => {
  gameData.value.targetMulti = (99 / newValue).toFixed(2)
})

/**
* getElementPosition
*
* @description 获得目标元素x,y
* @param {target} 目标元素
* @return {object} {x, y}
*
*/
function getElementPosition(element) {
  let [actualLeft, actualTop, current] = [
    element.offsetLeft,
    element.offsetTop,
    element.offsetParent,
  ]
  while (current !== null) {
    actualLeft += current.offsetLeft
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  let [elementScrollLeft, elementScrollTop] = [0, 0]

  if (document.compatMode === 'BackCompat') {
    elementScrollLeft = document.body.scrollLeft
    elementScrollTop = document.body.scrollTop
  }
  else {
    elementScrollLeft = document.documentElement.scrollLeft
    elementScrollTop = document.documentElement.scrollTop
  }

  return {
    x: actualLeft - elementScrollLeft,
    y: actualTop - elementScrollTop,
  }
}

/**
* divId : 提示框id
* targetId:定位目标框
* e：点击事件
*/
function inptMousemove(divId, targetId, e) {
  if (document.getElementById(divId) || !e.target.getAttribute('errmessage'))
    return

  let target = e.target
  if (targetId)
    target = document.getElementById(targetId)

  const position = getElementPosition(target)

  const div = document.createElement('div')
  div.id = divId

  const top = position.y - 44.828
  div.style.cssText = `
      top:${top}px;
      border-radius: 4px;
      background-color: white;
      position: absolute;
      z-index: 2;
      height: 40px;
      padding: 0 16px;
      `

  const span = document.createElement('span')
  span.innerHTML = e.target.getAttribute('errmessage')
  span.style.cssText = `
      color: #000;
      text-align: center;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      `
  const div1 = document.createElement('div')
  div1.style.cssText = `
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
      background-color: white;
      position: relative;
      left: 50%;
      top: 35px;
      z-index: 1;
      `
  div.appendChild(div1)
  div.appendChild(span)
  document.body.appendChild(div)
  console.log(`trets${div.offsetWidth}`)
  const left = position.x + (target.offsetWidth - div.offsetWidth) / 2
  div.style.cssText = `
      left:${left}px;
      top:${top}px;
      border-radius: 4px;
      background-color: white;
      position: absolute;
      z-index: 2;
      height: 40px;
      padding: 0 16px;
      `
}
</script>

<template>
  <div
    style="position: absolute;z-index:999;flex-direction: column-reverse;display:flex;
  left: 15px;
  top: 80px;"
  >
    <LimboAutoBetTip
      v-for="(item) in autoTip" :key="item"
      :tip-msg="item" style="margin-bottom: 20px;"
    />
  </div>

  <div class="container-game align-center-block" :class="{ 'deirect-column': minStyle }">
    <div class="left-box" :class="{ 'min-left order1': minStyle }">
      <div class="btn-box order0" :class="{ order3: minStyle }">
        <button
          class="btn-button"
          :class="{
            'disabled': touzhuDisabled || autoBetFlag,
            'active': btnToggle,
            'width-180': minStyle,
          }"
          @click="sdtz"
        >
          <span>{{ $t('mini_manual_bet') }}</span>
        </button>
        <button
          class="btn-button"
          :class="{
            'disabled': touzhuDisabled || autoBetFlag,
            'active': !btnToggle,
            'width-180': minStyle,
          }"
          @click="zdtz"
        >
          <span>{{ $t('mini_auto_bet') }}</span>
        </button>
      </div>
      <div class="ipt-box order1" :class="{ order0: minStyle }" style="margin-top: 8px;">
        <div id="betAmoutTitle" class="title" err="hello wod">
          <span>{{ $t('mini_bet_amount') }}</span>
          <span class="doll">US$0.00</span>
        </div>
        <div class="ipt-item">
          <div class="ipt-item-wrapper">
            <div class="after-icon">
              <svg fill="none" viewBox="0 0 96 96" class="svg-icon">
                <title />
                <path
                  d="M95.895 48.105C95.895 74.557 74.453 96 48.002 96 21.549 96
                  .105 74.556.105 48.105.105 21.653 21.55.21 48.001.21s47.895
                  21.443 47.895 47.895Z"
                  fill="#F7931A"
                />
                <path
                  d="M69.525
                  42.18c.93-6.27-3.84-9.645-10.38-11.895l2.115-8.505-5.16-1.29-2.1
                  8.28c-1.365-.345-2.76-.66-4.14-.975l2.1-8.295-5.175-1.29-2.115
                  8.49c-1.125-.255-2.235-.51-3.3-.78l-7.14-1.785-1.365 5.52s3.84.885
                  3.75.93a2.763 2.763 0 0 1 2.414 3.011l.001-.01-2.415
                  9.69c.213.049.394.106.568.174l-.028-.01-.54-.135-3.39
                  13.5a1.879 1.879 0 0 1-2.383 1.226l.013.004-3.765-.93L24.525 63l6.735
                   1.665
                  3.69.96-2.145 8.595 5.175 1.29 2.115-8.505c1.41.375 2.775.735 4.125
                  1.065l-2.115 8.475 5.175 1.29 2.13-8.58c8.835 1.665 15.465.99
                  18.255-6.99 2.25-6.42-.105-10.125-4.755-12.54 3.39-.72 5.925-2.955 6.615-7.545ZM57.69 58.755c-1.59 6.435-12.405 3-15.915 2.085L44.61 49.5c3.51.825 14.76 2.565 13.08 9.255Zm1.605-16.665c-1.5 5.85-10.5 2.865-13.38 2.145l2.58-10.32c2.91.72 12.315 2.085 10.8 8.175Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <input
              v-model="gameData.betAmount" type="number" :readonly="touzhuDisabled || autoBetFlag"
              class="ipt-betamout"
              style="border-radius: 4px 0px 0px 4px;"
              :errMessage="errMsg.betAmount" :class="{ 'disabled': touzhuDisabled || autoBetFlag, 'input-error': !inputBool.betAmount }"
              step="1e-8"
              @mouseover="inptMousemove('betAmoutErrorDiv', 'betAmoutTitle', $event)" @mouseleave="inptMouseout('betAmoutErrorDiv')"
            >
          </div>
          <div class="btn-box1">
            <span
              class="btn-span" :class="{ disabled: touzhuDisabled || autoBetFlag }"
              @click="betHalf"
            >½</span>
            <div class="line" />
            <span
              class="btn-span" :class="{ disabled: touzhuDisabled || autoBetFlag }"
              style="border-radius: 0px 4px 4px 0px;" @click="betDouble"
            >2x</span>
          </div>
        </div>
      </div>
      <div v-show="btnToggle" class="ipt-box order1" :class="{ order2: minStyle }">
        <div class="title">
          <span>{{ $t('mini_profit') }}</span>
          <span class="doll">US$0.00</span>
        </div>
        <div class="ipt-item">
          <div class="ipt-item-wrapper">
            <div class="after-icon">
              <svg fill="none" viewBox="0 0 96 96" class="svg-icon">
                <title />
                <path
                  d="M95.895 48.105C95.895 74.557 74.453 96 48.002 96 21.549 96 .105 74.556.105 48.105.105 21.653 21.55.21 48.001.21s47.895 21.443 47.895 47.895Z"
                  fill="#F7931A"
                />
                <path
                  d="M69.525 42.18c.93-6.27-3.84-9.645-10.38-11.895l2.115-8.505-5.16-1.29-2.1 8.28c-1.365-.345-2.76-.66-4.14-.975l2.1-8.295-5.175-1.29-2.115 8.49c-1.125-.255-2.235-.51-3.3-.78l-7.14-1.785-1.365 5.52s3.84.885 3.75.93a2.763 2.763 0 0 1 2.414 3.011l.001-.01-2.415 9.69c.213.049.394.106.568.174l-.028-.01-.54-.135-3.39 13.5a1.879 1.879 0 0 1-2.383 1.226l.013.004-3.765-.93L24.525 63l6.735 1.665 3.69.96-2.145 8.595 5.175 1.29 2.115-8.505c1.41.375 2.775.735 4.125 1.065l-2.115 8.475 5.175 1.29 2.13-8.58c8.835 1.665 15.465.99 18.255-6.99 2.25-6.42-.105-10.125-4.755-12.54 3.39-.72 5.925-2.955 6.615-7.545ZM57.69 58.755c-1.59 6.435-12.405 3-15.915 2.085L44.61 49.5c3.51.825 14.76 2.565 13.08 9.255Zm1.605-16.665c-1.5 5.85-10.5 2.865-13.38 2.145l2.58-10.32c2.91.72 12.315 2.085 10.8 8.175Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <input
              v-model="gameData.profit" class="ipt-readonly" type="number" style="opacity: 1;" readonly
              step="1e-8"
            >
          </div>
        </div>
      </div>
      <button
        v-show="btnToggle"
        class="btn-submit order1" :class="{ disabled: touzhuDisabled || touzhuDisabled1, order1: minStyle }"
        @click="touzhu"
      >
        <span>{{ $t('mini_touzhu') }}</span>
      </button>

      <!-- 自动投注-start -->
      <div v-show="!btnToggle" class="ipt-box order1">
        <div id="betFrequencyTitle" class="title">
          <span>{{ $t('mini_bet_frequency') }}</span>
          <span />
        </div>
        <div class="ipt-item">
          <div class="ipt-item-wrapper">
            <div class="after-icon">
              <svg fill="none" viewBox="0 0 64 64" class="svg-icon">
                <title />
                <path
                  d="M47.746 15.695c-9.287 0-13.851 7.073-17.908 13.345-4.377 6.752-7.473 10.836-13.531 10.836a7.846 7.846 0 0 1-7.847-7.847 7.845 7.845 0 0 1 7.847-7.846 9.29 9.29 0 0 1 6.915 2.669l1.014-1.549c1.094-1.708 2.349-3.602 3.79-5.524a17.365 17.365 0 0 0-11.743-4.084h.024C7.302 15.695 0 22.998 0 32.002 0 41.007 7.302 48.31 16.307 48.31c11.103 0 16.387-8.006 20.63-14.705 3.79-5.872 6.352-9.448 10.81-9.448a7.846 7.846 0 0 1 7.846 7.846 7.846 7.846 0 0 1-7.847 7.847 9.27 9.27 0 0 1-5.791-1.78l.027.018a65.172 65.172 0 0 1-5.047 6.937l.082-.104a17.38 17.38 0 0 0 10.358 3.392c.113 0 .225 0 .334-.003h-.016C56.698 48.31 64 41.007 64 32.002c0-9.004-7.302-16.307-16.307-16.307h.053Z"
                  fill="#B1BAD3"
                />
              </svg>
            </div>
            <input
              v-model="gameData.betFrequency" type="number"
              :readonly="touzhuDisabled || autoBetFlag"
              :errMessage="errMsg.betFrequency" :class="{ 'disabled': touzhuDisabled, 'input-error': !inputBool.betFrequency }"
              step="1"
              @mousemove="inptMousemove('betFrequencyErrorDiv', 'betFrequencyTitle', $event)" @mouseleave="inptMouseout('betFrequencyErrorDiv')"
            >
          </div>
        </div>
      </div>
      <div v-show="!btnToggle" class="ipt-box order1">
        <div class="title">
          <span>{{ $t('mini_if_win') }}</span>
          <span />
        </div>
        <div class="ipt-item">
          <div class="ipt-item-wrapper" style="order:1;">
            <div class="after-icon">
              <svg fill="none" viewBox="0 0 64 64" class="svg-icon">
                <title />
                <path
                  d="M18.38 29.904c6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524-6.364 0-11.525 5.16-11.525 11.524 0 6.364 5.16 11.524 11.524 11.524Zm0-14.666a3.142 3.142 0 1 1-.001 6.285 3.142 3.142 0 0 1 0-6.285Zm27.24 18.858c-6.364 0-11.524 5.16-11.524 11.524 0 6.364 5.16 11.524 11.524 11.524 6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524Zm0 14.666a3.142 3.142 0 1 1 0-6.285 3.142 3.142 0 0 1 0 6.285Zm.585-41.904L6.857 57.144h10.644L56.85 6.858H46.205Z"
                />
              </svg>
            </div>
            <input
              v-model="gameData.ifWinPercent" type="number"
              :readonly="gameData.ifWinRest || touzhuDisabled || autoBetFlag" :class="{ disabled: touzhuDisabled }" step="1"
            >
          </div>
          <div class="btn-box1" style="order:0;width:auto;padding:2px;height: 2.25rem;">
            <button
              class="reset-btn"
              :class="{ 'reset-btn-active': gameData.ifWinRest, 'disabled': touzhuDisabled || autoBetFlag }"
              style="width: auto;padding:0 12px;" @click="rybtnRestFunc"
            >
              <span>{{ $t('mini_reset')
              }}</span>
            </button>
            <!-- <div class="line"></div> -->
            <button
              class="reset-btn"
              :class="{ 'reset-btn-active': !gameData.ifWinRest, 'disabled': touzhuDisabled || autoBetFlag }"
              style="width: auto;padding:0 12px;" @click="rybtnAddFunc"
            >
              <span>{{ $t('mini_add') }}</span>
            </button>
          </div>
        </div>
      </div>
      <div v-show="!btnToggle" class="ipt-box order1">
        <div class="title">
          <span>{{ $t('mini_if_lose') }}</span>
          <span />
        </div>
        <div class="ipt-item">
          <div class="ipt-item-wrapper" style="order:1;">
            <div class="after-icon">
              <svg fill="none" viewBox="0 0 64 64" class="svg-icon">
                <title />
                <path
                  d="M18.38 29.904c6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524-6.364 0-11.525 5.16-11.525 11.524 0 6.364 5.16 11.524 11.524 11.524Zm0-14.666a3.142 3.142 0 1 1-.001 6.285 3.142 3.142 0 0 1 0-6.285Zm27.24 18.858c-6.364 0-11.524 5.16-11.524 11.524 0 6.364 5.16 11.524 11.524 11.524 6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524Zm0 14.666a3.142 3.142 0 1 1 0-6.285 3.142 3.142 0 0 1 0 6.285Zm.585-41.904L6.857 57.144h10.644L56.85 6.858H46.205Z"
                />
              </svg>
            </div>
            <input
              v-model="gameData.ifLosePercent" type="number"
              :readonly="gameData.ifLoseRest || touzhuDisabled || autoBetFlag" :class="{ disabled: touzhuDisabled || autoBetFlag }"
              step="1"
            >
          </div>
          <div class="btn-box1" style="order:0;width:auto;padding: 2px;height: 2.25rem;">
            <button
              class="reset-btn"
              :class="{ 'reset-btn-active': gameData.ifLoseRest, 'disabled': touzhuDisabled || autoBetFlag }"
              style="width: auto;padding:0 12px;" @click="rsbtnRestFunc"
            >
              <span>{{ $t('mini_reset')
              }}</span>
            </button>
            <!-- <div class="line"></div> -->
            <button
              class="reset-btn"
              :class="{ 'reset-btn-active': !gameData.ifLoseRest, 'disabled': touzhuDisabled || autoBetFlag }"
              style="width: auto;padding:0 12px;" @click="rsbtnAddFunc"
            >
              <span>{{ $t('mini_add') }}</span>
            </button>
          </div>
        </div>
      </div>
      <div v-show="!btnToggle" class="ipt-box order1">
        <div class="title">
          <span>{{ $t('mini_take_profit') }}</span>
          <span class="doll">US$0.00</span>
        </div>
        <div class="ipt-item">
          <div class="ipt-item-wrapper">
            <div class="after-icon">
              <svg fill="none" viewBox="0 0 96 96" class="svg-icon">
                <title />
                <path
                  d="M95.895 48.105C95.895 74.557 74.453 96 48.002 96 21.549 96 .105 74.556.105 48.105.105 21.653 21.55.21 48.001.21s47.895 21.443 47.895 47.895Z"
                  fill="#F7931A"
                />
                <path
                  d="M69.525 42.18c.93-6.27-3.84-9.645-10.38-11.895l2.115-8.505-5.16-1.29-2.1 8.28c-1.365-.345-2.76-.66-4.14-.975l2.1-8.295-5.175-1.29-2.115 8.49c-1.125-.255-2.235-.51-3.3-.78l-7.14-1.785-1.365 5.52s3.84.885 3.75.93a2.763 2.763 0 0 1 2.414 3.011l.001-.01-2.415 9.69c.213.049.394.106.568.174l-.028-.01-.54-.135-3.39 13.5a1.879 1.879 0 0 1-2.383 1.226l.013.004-3.765-.93L24.525 63l6.735 1.665 3.69.96-2.145 8.595 5.175 1.29 2.115-8.505c1.41.375 2.775.735 4.125 1.065l-2.115 8.475 5.175 1.29 2.13-8.58c8.835 1.665 15.465.99 18.255-6.99 2.25-6.42-.105-10.125-4.755-12.54 3.39-.72 5.925-2.955 6.615-7.545ZM57.69 58.755c-1.59 6.435-12.405 3-15.915 2.085L44.61 49.5c3.51.825 14.76 2.565 13.08 9.255Zm1.605-16.665c-1.5 5.85-10.5 2.865-13.38 2.145l2.58-10.32c2.91.72 12.315 2.085 10.8 8.175Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <input
              v-model="gameData.takeProfit" type="number"
              :readonly="autoBetFlag" :class="{ disabled: touzhuDisabled || autoBetFlag }"
              step="1e-8"
            >
          </div>
        </div>
      </div>
      <div v-show="!btnToggle" class="ipt-box order1">
        <div class="title">
          <span>{{ $t('mini_stop_lose') }}</span>
          <span class="doll">US$0.00</span>
        </div>
        <div class="ipt-item">
          <div class="ipt-item-wrapper">
            <div class="after-icon">
              <svg fill="none" viewBox="0 0 96 96" class="svg-icon">
                <title />
                <path
                  d="M95.895 48.105C95.895 74.557 74.453 96 48.002 96 21.549 96 .105 74.556.105 48.105.105 21.653 21.55.21 48.001.21s47.895 21.443 47.895 47.895Z"
                  fill="#F7931A"
                />
                <path
                  d="M69.525 42.18c.93-6.27-3.84-9.645-10.38-11.895l2.115-8.505-5.16-1.29-2.1 8.28c-1.365-.345-2.76-.66-4.14-.975l2.1-8.295-5.175-1.29-2.115 8.49c-1.125-.255-2.235-.51-3.3-.78l-7.14-1.785-1.365 5.52s3.84.885 3.75.93a2.763 2.763 0 0 1 2.414 3.011l.001-.01-2.415 9.69c.213.049.394.106.568.174l-.028-.01-.54-.135-3.39 13.5a1.879 1.879 0 0 1-2.383 1.226l.013.004-3.765-.93L24.525 63l6.735 1.665 3.69.96-2.145 8.595 5.175 1.29 2.115-8.505c1.41.375 2.775.735 4.125 1.065l-2.115 8.475 5.175 1.29 2.13-8.58c8.835 1.665 15.465.99 18.255-6.99 2.25-6.42-.105-10.125-4.755-12.54 3.39-.72 5.925-2.955 6.615-7.545ZM57.69 58.755c-1.59 6.435-12.405 3-15.915 2.085L44.61 49.5c3.51.825 14.76 2.565 13.08 9.255Zm1.605-16.665c-1.5 5.85-10.5 2.865-13.38 2.145l2.58-10.32c2.91.72 12.315 2.085 10.8 8.175Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <input
              v-model="gameData.stopLose" type="number"
              :readonly="autoBetFlag" :class="{ disabled: touzhuDisabled || autoBetFlag }"
              step="1e-8"
            >
          </div>
        </div>
      </div>
      <button
        v-if="!autoBetFlag" v-show="!btnToggle"
        class="btn-submit"
        :class="{ 'disabled': touzhuDisabled || touzhuDisabled1, 'order0': minStyle, 'order1': !minStyle, 'marign-b20': !minStyle }" @click="autoTouzhu"
      >
        <span>{{ $t('mini_start_auto_bet') }}</span>
      </button>
      <button
        v-else v-show="!btnToggle"
        class="btn-submit" :class="{ 'order0': minStyle, 'order1': !minStyle, 'marign-b20': !minStyle }"
        @click="stopAutoTouzhu"
      >
        <span>{{ waitAutoFinishFlag ? $t('mini_auto_bet_finish') : $t('mini_stop_auto_bet') }}</span>
        <img  class="auto-img" src="/png/mini/autobtn.svg" />
      </button>
      <!-- 自动投注-end -->
    </div>
    <div
      id="canvasIdv" class="right-box" :class="{ 'deirect-column order0': minStyle }"
      :style="autoStyle.gameResult"
    >
      <!-- <div id="gameCanvas"></div> -->
      <div
        class="right-box-results" :class="{ full: results.length > 5 || (minStyle && results.length > 3) }"
        style="--duration: 500ms;"
      >
        <button v-for="(item) in getResults()" :key="item.id" class="button-tag" :style="item.style">
          <span>{{
            item.result }}x</span>
        </button>
      </div>

      <div class="right-box-bigresult">
        <span :style="autoStyle.resultFontSize">{{ gameResultNum }}x</span>
      </div>
      <div class="bottom-ipt-box">
        <div class="ipt-box order1">
          <div id="targetMultititle" class="title">
            <span>{{ $t('mini_target_multi') }}</span>
            <span />
          </div>
          <div class="ipt-item">
            <div class="ipt-item-wrapper">
              <div class="after-icon">
                <svg fill="none" viewBox="0 0 64 64" class="svg-icon">
                  <title />
                  <path
                    d="M55.92 7.227H43.493L32 23.307 20.507 7.227H8.08L25.787 32 8.08 56.773h12.453L32 40.694l11.467 16.08H55.92L38.213 32 55.92 7.227Z"
                  />
                </svg>
              </div>
              <input
                v-model="gameData.targetMulti"
                type="number"
                :class="{ 'disabled': touzhuDisabled, 'input-error': !inputBool.targetMulti }"
                :errMessage="errMsg.targetMulti"
                :readonly="autoBetFlag" step="0.01"
                @mousemove="inptMousemove('targetMultiErrorDiv', 'targetMultititle', $event)" @mouseleave="inptMouseout('targetMultiErrorDiv')"
              >
            </div>
          </div>
        </div>
        <div class="ipt-box order1">
          <div id="winOddErroId" class="title">
            <span>{{ $t('mini_win_odd') }}</span>
            <span />
          </div>
          <div class="ipt-item">
            <div class="ipt-item-wrapper">
              <div class="after-icon">
                <svg fill="none" viewBox="0 0 64 64" class="svg-icon">
                  <title />
                  <path
                    d="M18.38 29.904c6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524-6.364 0-11.525 5.16-11.525 11.524 0 6.364 5.16 11.524 11.524 11.524Zm0-14.666a3.142 3.142 0 1 1-.001 6.285 3.142 3.142 0 0 1 0-6.285Zm27.24 18.858c-6.364 0-11.524 5.16-11.524 11.524 0 6.364 5.16 11.524 11.524 11.524 6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524Zm0 14.666a3.142 3.142 0 1 1 0-6.285 3.142 3.142 0 0 1 0 6.285Zm.585-41.904L6.857 57.144h10.644L56.85 6.858H46.205Z"
                  />
                </svg>
              </div>
              <input
                v-model="gameData.winOdd"
                type="number"
                :class="{ 'disabled': touzhuDisabled, 'input-error': !inputBool.winOdd }"
                :errMessage="errMsg.winOdd"
                :readonly="autoBetFlag" step="1"
                @mousemove="inptMousemove('winOddErrorDiv', 'winOddErroId', $event)" @mouseleave="inptMouseout('winOddErrorDiv')"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-box align-center-block" :class="{ 'bottom-box-min': minStyle }">
    <div class="bottom-left-box">
      <div class="button-svg-box">
        <button
          class="button-svg" :errMessage="$t('mini_game_set')"
          @mouseover="inptMousemove('button-svg1', '', $event)" @mouseleave="inptMouseout('button-svg1', 0)"
        >
          <span>
            <svg fill="none" viewBox="0 0 64 64" class="svg-icon">
              <title>游戏设置</title>
              <path
                d="M55.44 32a26.082 26.082 0 0 0-.34-3.99l.02.15 8.16-6-7.12-12.32-9.253 4.054a23.828 23.828 0 0 0-6.502-3.784l-.164-.056L39.12 0H24.88l-1.12 10.054c-2.554.98-4.76 2.276-6.71 3.874l.042-.034L7.839 9.84.719 22.16l8.16 6a25.007 25.007 0 0 0-.32 3.828V32c.012 1.366.128 2.694.34 3.99l-.02-.15-8.16 6 7.12 12.32 9.254-4.054a23.83 23.83 0 0 0 6.502 3.784l.164.056L24.879 64h14.24l1.12-10.054c2.554-.98 4.76-2.276 6.71-3.874l-.042.034 9.254 4.054 7.12-12.32-8.16-6c.192-1.146.308-2.474.32-3.828V32ZM32 40.666A8.666 8.666 0 1 1 40.668 32c-.016 4.78-3.886 8.652-8.666 8.666H32Z"
              />
            </svg>
          </span>
        </button>
      </div>
      <div v-if="!minStyle" class="button-svg-box">
        <button
          class="button-svg" :errMessage="$t('mini_ju_mode')"
          @mouseover="inptMousemove('button-svg1', '', $event)" @mouseleave="inptMouseout('button-svg1', 0)"
        >
          <span>
            <svg fill="none" viewBox="0 0 64 64" class="svg-icon">
              <title>{{t('mini_ju_mode')}}</title>
              <path d="M64 58.5H0v-53h64v53Zm-56-8h48v-37H8v37Z" />
            </svg>
          </span>
        </button>
      </div>
      <div class="button-svg-box">
        <button
          class="button-svg" :errMessage="$t('mini_sstj')"
          @mouseover="inptMousemove('button-svg1', '', $event)" @mouseleave="inptMouseout('button-svg1', 0)"
        >
          <span>
            <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon">
              <title>{{t('mini_sstj')}}</title>
              <path
                fill-rule="evenodd" clip-rule="evenodd"
                d="M33.013 19.707 64 0v12.64L30.987 33.627 18.133 18.853 0 30.693V17.947L20.107 4.853l12.906 14.854ZM16 64H5.333V35.173L16 28.213V64Zm13.707-21.653-3.04-3.52V64h10.666V37.493l-2.773 1.76-4.853 3.094ZM58.667 64H48V30.72l10.667-6.8V64Z"
              />
            </svg>
          </span>
        </button>
      </div>
      <div class="button-svg-box">
        <button
          class="button-svg" :errMessage="$t('mini_collect_game')"
          @mouseover="inptMousemove('button-svg1', '', $event)" @mouseleave="inptMouseout('button-svg1', 0)"
        >
          <span>
            <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon">
              <title>{{t('mini_collect_game')}}</title>
              <path
                fill-rule="evenodd" clip-rule="evenodd"
                d="m32.001 16 3.094 5.76c1.742 3.217 4.813 5.525 8.457 6.201l.074.012 6.425 1.146-4.505 4.72a12.013 12.013 0 0 0-3.396 8.385c0 .588.042 1.166.124 1.732l-.008-.064.88 6.453L37.6 47.68c-1.635-.808-3.563-1.282-5.599-1.282s-3.964.472-5.675 1.314l.075-.034-5.545 2.666.88-6.453c.074-.5.116-1.08.116-1.668a12.01 12.01 0 0 0-3.398-8.39l.004.005-4.505-4.854 6.425-1.146a12.152 12.152 0 0 0 8.501-6.15l.032-.063 3.094-5.626-.004.002Zm0-14.612h-.006c-1.32 0-2.466.736-3.052 1.822l-.01.018-7.599 14.292a3.532 3.532 0 0 1-2.432 1.784l-.022.004-15.998 2.88A3.474 3.474 0 0 0 0 25.603c0 .93.366 1.774.962 2.398L.96 28l11.225 11.705a3.371 3.371 0 0 1 .93 2.982l.004-.02-2.186 15.998a3.466 3.466 0 0 0 3.432 3.946h.008a3.248 3.248 0 0 0 1.644-.382l-.018.008 14.264-6.88a4.191 4.191 0 0 1 3.704.01l-.024-.01 14.053 6.88a3.15 3.15 0 0 0 1.5.374h.021-.002c.034.002.074.002.114.002a3.466 3.466 0 0 0 3.43-3.966l.002.018-2.186-15.998a3.37 3.37 0 0 1 .934-2.88l11.225-11.705a3.468 3.468 0 0 0-1.872-5.81l-.022-.003-15.998-2.88a3.534 3.534 0 0 1-2.47-1.846l-.01-.02-7.6-14.292a3.469 3.469 0 0 0-3.061-1.84h-.006l.006-.002Z"
              />
            </svg>
          </span>
        </button>
      </div>
      <div class="line" />
    </div>
    <div class="bottom-right-box">
      <button><span>{{ $t('fairness') }}</span></button>
    </div>
  </div>
</template>

<style scoped>
.right-box-bigresult {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem 1rem;
}

.right-box-bigresult span {
  font-variant-numeric: tabular-nums;
  font-weight: 600;

  color: #E9103D;
  font-family: PingFang SC;
  font-size: 128px;
  font-style: normal;
  font-weight: 600;

}

.right-box-results {
  position: absolute;
  right: 16px;
  top: 16px;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  gap: 0.25rem;
  overflow: hidden;

}

.button-tag {
  display: flex;
  padding: 7px 13px 7px 14px;
  justify-content: center;
  align-items: center;

  background: #00E700;
  border-radius: 20px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.20);

  color: #05080A;
  text-align: right;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.button-tag {
  min-width: 8ch;
  font-variant-numeric: tabular-nums;
  will-change: transform;
  animation-fill-mode: forwards;
  animation-duration: 500ms;
  animation-timing-function: ease-out
}

.right-box-results>*:nth-child(odd) {
  animation-name: svelte-13tfusv-slideOdd;
}

.right-box-results>*:nth-child(even) {
  animation-name: svelte-13tfusv-slideEven;
}

.right-box-results.full>*:last-child {
  animation-name: svelte-13tfusv-slideOut;
}

@keyframes svelte-13tfusv-slideOdd {
  0% {
      transform: translate(100%)
  }
}

@keyframes svelte-13tfusv-slideEven {
  0% {
      transform: translate(100%)
  }
}

@keyframes svelte-13tfusv-slideOut {
  0% {
      transform: translate(100%)
  }

  to {
      transform: translate(0);
      opacity: 0;
      pointer-events: none
  }
}

.bottom-box {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 25rem;
  max-width: 75rem;
  /* height: 39.375rem; */
  border-radius: 0px 0px 8px 8px;
  background-color: #0F212E;
  justify-content: space-between;
  height: 63px;
  background: #0F212E url('/png/mini/bottom.svg') center center no-repeat;
}

.bottom-box-min {
  width: 25rem;
}

.bottom-box .bottom-left-box {
  display: flex;
  flex-direction: row;
  margin-left: 9px;
  align-items: center;
}

.bottom-left-box img {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  padding: 7px;
  padding-top: 25px;
  color: #00E701;
}

.bottom-right-box {
  display: flex;

}

.bottom-right-box button {
  color: #B1BAD3;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-right: 18px;
}

.bottom-right-box button :hover {
  color: #ffffff;
}

.button-svg-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
}

.button-svg {
  color: #b1bad3;
  background: none;
  box-shadow: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  font-weight: 600;
  touch-action: manipulation;
  border: none;
  width: 45.25px;
  height: 40px;
}

button {
  background: none;
  box-shadow: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  touch-action: manipulation;
  border: none;
}

svg :hover {
  fill: #FFFFFF;
}

.button-svg .svg-icon {
  pointer-events: none;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  flex-shrink: 0;
  display: inline-block;
  width: 14px;
  height: 14px;
}

.bottom-box .line {
  width: 1px;
  height: 40px;
  background: #2F4552;
  margin-left: 9px;
}

.button-svg:hover svg {
  fill: white;
}

.align-center-block {
  margin: 0 auto;
}

.align-center-flex {
  align-items: center;
}

.container-game {
  max-width: 75rem;
  /* height: 43.5rem; */
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  background: #213743;
  display: flex;
  flex-direction: row;
}

.container-game .left-box {
  display: flex;
  width: 18.75rem;
  /* height: 39.375rem; */
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  margin: 0 auto
}

.container-game .right-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 25rem;
  /* height: 39.375rem; */
  background-color: #0F212E;
  margin-bottom: 3px;
  position: relative;
  justify-content: flex-end;
}

.container-game .btn-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  width: 92%;
  background-color: #0F212E;
  height: 3.125rem;
  margin-top: 0.75rem;
  border-radius: 1.875rem;
}

.container-game .btn-box .btn-button {
  color: rgb(255, 255, 255);
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  width: 130px;
  height: 80%;
  display: flex;
  text-align: center;
  font-family: PingFang SC;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  text-transform: none;
  text-indent: 0;
  text-shadow: none;
  text-align: center;
}

.container-game .btn-box .active {
  background: #2F4552;
}

.container-game .disabled {
  opacity: 0.5;
  cursor: not-allowed !important
}

.container-game .btn-box .btn-button:hover {
  background: #2F4552;
}

.left-box .ipt-box {
  display: flex;
  flex-direction: column;
  width: 92%;
  margin-top: 11px;
}

.ipt-box .title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #B1BAD3;
  font-family: PingFang SC;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 100%;

}

.ipt-box .title .doll {
  font-size: 0.75rem;
  font-weight: 500;
}

.ipt-item {
  display: flex;
  flex-direction: row;
  background-color: #2F4553;
  border-radius: 4px 4px 4px 4px;
  width: 100%;
  margin-top: 2px;
}

.ipt-item .ipt-item-wrapper {
  display: flex;
  width: 100%;
  position: relative;
}

.ipt-item input {
  width: 100%;
  height: 34px;
  color: #fff;
  background: #0f212e;
  box-shadow: none;
  border: 2px solid #2f4553;
  border-radius: 0.25rem;
  font-family: PingFang SC;
  font-weight: 600;
  font-size: .875rem;
  outline: none;
  padding-left: 9px;
  padding-right: 2em;
}

.ipt-readonly[readonly] {
  background: #2f4553;
}

.ipt-item input[readonly] {
  opacity: 0.5;
  cursor: not-allowed !important
}

.ipt-item-wrapper .after-icon {
  position: absolute;
  display: flex;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #b1bad3;
  z-index: 2;
  cursor: text;
  right: 0.75em;
}

.ipt-item-wrapper .after-icon .svg-icon {
  pointer-events: none;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  flex-shrink: 0;
  display: inline-block;
  width: 1em;
  height: 1em;
}

.ipt-item .btn-box1 {
  width: 5.75rem;
  height: 2.5rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  color: #FFF;
  font-family: PingFang SC;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
}

.btn-box1 .btn-span {
  cursor: pointer;
  width: 100%;
  height: 100%;
  line-height: 40px;

}

.btn-box1 .btn-span:hover {
  background: #557086;
}

.ipt-item:hover .ipt-betamout {
  border: 2px solid #567086;
}

.ipt-item .btn-box1 .line {
  width: 2px;
  height: 20px;
  background: #1A2C37;
  position: absolute;
}

.btn-submit {
  display: flex;
  width: 92%;
  height: 3.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.25rem;
  background: #00E701;
  border: none;
  cursor: pointer;
  color: var(---, #071824);
  text-align: center;
  font-family: PingFang SC;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 0.75rem;
}

#gameCanvas {
  margin-left: auto;
}

.bottom-ipt-box {
  display: flex;
  flex-direction: row;
  margin: 16px;
  padding: 16px;
  background-color: #213743;
  border-radius: 4px;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.13);
}

.deirect-column {
  flex-direction: column;
  width: 25rem;
}

.min-left {
  width: 100% !important;
  padding-bottom: 16px;
}

.ipt-box {
  width: 100%;
}

.order0 {
  order: 0;
}

.order1 {
  order: 1;
}

.order2 {
  order: 2;
}

.order3 {
  order: 3;
}

.reset-btn {
  border: none;
  cursor: pointer;
  background-color: #304554;
  text-align: center;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  color: #ffffff;
}

.reset-btn-active {
  background-color: #071824;
  color: #B1BAD3;
}

input:focus:not(input[readonly]) {
  border: 2px solid #567086;
}

input:hover:not(input[readonly]) {
  border: 2px solid #567086;
}

.input-error {
  border: 2px solid #ED4263 !important;
}

.tip {
  background: url('/png/mini/Vector.svg') no-repeat;
  background-size: 100% 100%;
  min-width: 200px;
  height: 44.828px;
  flex-shrink: 0;
  line-height: 40px;
  position: absolute;
  text-align: center;
  z-index: 999;
}

.tip span {
  color: #000;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.auto-img {
  width: 24px;
  height: 24px;
  animation-name: scaleDraw;
  /*关键帧名称*/
  animation-timing-function: ease-in-out;
  /*动画的速度曲线*/
  animation-iteration-count: infinite;
  /*动画播放的次数*/
  animation-duration: 2s;
  /*动画所花费的时间*/

}

@keyframes scaleDraw {

  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
  0% {
      transform: scale(1);
      /*开始为原始大小*/
  }

  25% {
      transform: scale(0.7);
      /*放大1.1倍*/
  }

  50% {
      transform: scale(1);
  }

  75% {
      transform: scale(0.7);
  }

}

.width-180 {
  width: 180px !important;
}

button:active span {
  transform: scale(0.95);
}

.marign-b20 {
  margin-bottom: 20px;
}
</style>
