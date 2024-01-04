<!-- eslint-disable eslint-comments/no-unlimited-disable -->
<script setup>
/* eslint-disable */

import * as PIXI from 'pixi.js'
import { onMounted, ref } from 'vue'

const betAmount = ref('0.000000000')
const app = new PIXI.Application({
  width: 900,
  height: 630,
  backgroundColor: 0x0F212E,
  resolution: window.devicePixelRatio || 1,
})
const text = new PIXI.Text('0.00X', {
  fontFamily: 'Arial',
  fontSize: 80,
  fill: 0xFF0000,
  align: 'center',
})
text.x = app.screen.width / 2
text.y = app.screen.height / 2
text.anchor.set(0.5)
app.stage.addChild(text)
// document.body.appendChild(app.view)
// const app = ref(Object)
// const text = ref(Object)
// const result = ref('1.00x')

// inserted(el, binding, vnode) {

//   /**

//   * 数字格式化，目前支持 正数 plus, 整数 int, 浮点正数 floatpos， 正常的浮点数，

//   * 以上方法都已去掉精度

//   * 使用方法如下：

//   * v-input-num.plus 正数

//   * v-input-num.int 整数

//   * v-input-num.floatpos 浮点正数

//   * v-input-num 正常的浮点数

//   *

//   * 特别需要注意的是：

//   * 1. 如果vnode.data.model存在，类似于element ui 组件的 el-input，不能直接使用e.target.value 去赋值，要不然表面上是格式化

//   * 了数字，但是实际提交的数字还是未格式化的，可以用vnode.data.model.callback(value)去赋值

//   * 2. 如果自己写的input，可以直接使用e.target.value 去赋值

//   */

//   el.addEventListener('change', (e) => {
//     const { modifiers } = binding
//     const { value } = e.target
//     let val = 0 // 默认值为0
//     const valIsNaN = isNaN(parseInt(value, 10)) // 如果是NaN, 设置为0
//     if (!valIsNaN) {
//       // 正数
//       if (modifiers.plus) {
//         val = Math.abs(parseInt(value, 10))
//       } else if (modifiers.int) {
//         // 整数
//         val = parseInt(value, 10)
//       } else if (modifiers.floatpos) {
//         // 浮点正数,去精度
//         val = Math.abs(parseFloat(value).toFixed(8))
//       } else {
//         // 数字
//         val = parseFloat(parseFloat(value).toFixed(2))
//       }
//     }

//     /**

//   * 1. 如果vnode.data.model存在，类似于element ui 组件的 el-input，不能直接使用e.target.value 去赋值，要不然表面上是格式化

//   * 了数字，但是实际提交的数字还是未格式化的，可以用vnode.data.model.callback(value)去赋值

//   * 2. 如果自己写的input，可以直接使用e.target.value 去赋值

//   */

//     if (vnode.data.model) vnode.data.model.callback(val)
//     else {
//       e.target.value = val
//     }
//   })
// }

/**
 * func:投注
 */
function touzhu() {
  let ff = 0
  let times = 0
  app.ticker.add((delta) => {
    ff += delta
    times += 1
    if (times >= 100) {
      ff = 100
      text.text = `${ff.toFixed(2)}X`
    }
    text.text = `${ff.toFixed(2)}X`
  })
  // app.ticker.start()
}

onMounted(() => {
  document.getElementById('gamepanel').appendChild(app.view)

  touzhu()
})
</script>

<template>
  <div>
    <div style="max-width: 1200px;margin: 0 auto;min-height: 600px;">
      <div style="display: flex;flex-direction: row;width: 100%;">
        <div
          style="display: flex;gap:0.75rem;width: 100%;min-width: 300px;background-color: #213743;height: 630px;padding: 12px;flex-direction: column;border-top-left-radius: 0.5rem;"
        >
          <!-- 投注按钮 -->
          <div
            style="display: flex;flex-direction: row;width: 100%;max-height: 50px;background-color: #0f212e;border-radius: 3rem;padding: 5px;vertical-align: center;flex: 1 1 0%;gap:0.75rem"
          >
            <button
              style="color: #ffffff;background-color: #2f4553;padding: 13px 16px;justify-content: center;border-radius: 4rem;width: 100%;align-items: center;display: flex;"
            >
              <span>手动投注</span>
            </button>
            <button
              style="color: #ffffff;padding: 13px 16px;justify-content: center;border-radius: 4rem;width: 100%;align-items: center;display: flex;margin-left: 5px;"
            >
              <span>自动投注</span>
            </button>
          </div>
          <!-- 投注额部分 -->
          <label style="display: inline-flex;flex-direction: column-reverse;align-items: flex-start;width: 100%;">
            <div style="width: 100%;">
              <div>
                <div style="position: relative;">
                  <div class="after-icon svelte-1pryo3e">
                    <svg fill="none" viewBox="0 0 96 96" class="svg-icon" style="">
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
                  <input v-model="betAmount" v-filter-fix8 type="number" step="1e-8">
                </div>
              </div>
            </div>
            <div style="width: 100%;">
              <span
                style="display: inline-flex;width:100%;align-items: center;font-weight: 600;font-size: var(--text-size-default);color: var(--label-color);transition: var(--transition-fast);letter-spacing: 0;padding: 0 0 0.25rem;justify-content: space-between;"
              >
                <div>
                  <span style="color: #b1bad3;font-size: 0.875rem;">投注额</span>
                </div>
                <div>
                  <div style="color: #b1bad3;font-size: 0.875rem;">US$0.00</div>
                </div>
              </span>
            </div>
          </label>
          <!-- 投注额部分 end -->
          <!-- 获取利润部分 -->
          <label style="display: inline-flex;flex-direction: column-reverse;align-items: flex-start;width: 100%;">
            <div style="width: 100%;">
              <div>
                <div style="position: relative;">
                  <div class="after-icon svelte-1pryo3e">
                    <svg fill="none" viewBox="0 0 96 96" class="svg-icon" style="">
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
                  <input readonly style="background: #2f4553;" type="number">
                </div>
              </div>
            </div>
            <div style="width: 100%;">
              <span
                style="display: inline-flex;width:100%;align-items: center;font-weight: 600;font-size: var(--text-size-default);color: var(--label-color);transition: var(--transition-fast);letter-spacing: 0;padding: 0 0 0.25rem;justify-content: space-between;"
              >
                <div>
                  <span style="color: #b1bad3;font-size: 0.875rem;">获取利润</span>
                </div>
                <div>
                  <div style="color: #b1bad3;font-size: 0.875rem;">US$0.00</div>
                </div>
              </span>
            </div>
          </label>
          <!-- 获取利润部分 end -->
          <button
            class="button svelte-1epmied" style="font-size: 1rem;padding: 1.125rem 1.75rem;justify-content: center;color: #05080a;background: #00e701;box-shadow: 0rem .125rem .25rem #0000001f , 0rem .25rem .375rem #1b171733;"
            @click="touzhu"
          >
            <span class="button-span-touzhu"><span>投注</span></span>
          </button>
        </div>
        <div
          id="gamepanel"
          style="display: flex;width: 100%;min-width: 900px;min-height: 630px;background-color: #0f212e;"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

button {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  padding: 0;
  cursor: pointer;
  outline: none;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: center;
}

button:hover {
  background-color: #2f4553;
}

input {
  width: 100%;
  color: #fff;
  background: #0f212e;
  box-shadow: none;
  border: 2px solid #2f4553;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.5em;
  outline: none;
  padding-right: 2em;
}

/* input图标样式 */

.after-icon.svelte-1pryo3e.svelte-1pryo3e.svelte-1pryo3e {
  cursor: text;
  right: 0.75em;
}

.after-icon.svelte-1pryo3e.svelte-1pryo3e.svelte-1pryo3e,
.before-icon.svelte-1pryo3e.svelte-1pryo3e.svelte-1pryo3e {
  position: absolute;
  display: flex;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #b1bad3;
  z-index: 2
}

.svg-icon {
  pointer-events: none;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  flex-shrink: 0;
  display: inline-block;
  width: 1em;
  height: 1em;
}

.button.svelte-1epmied {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  padding: 0;
  background: 0 0;
  border: none;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  font-weight: 600;
  touch-action: manipulation;
  position: relative;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.2s, color 0.2s;
  flex-shrink: 0;
  border-radius: 0.25rem;
}
</style>
