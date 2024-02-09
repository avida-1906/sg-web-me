import { reactive } from 'vue'

export const store = reactive({
  isMaximum: false,
  autoStart: false,
  autoEnd: false,
  hotkey: false,
  showGameInfoModal: false,
  showMaxValueModal: false,
  showHotkeyModal: false,
  showStatistics: false,
  showFairness: false,
  appOpacity: false,
  plinkoAmount: 0.000000000,
  plinkoRow: 16,
  plinkoLevel: 'Medium',
  rectShow:
    window.innerWidth > 1100,
  a_w:
    window.innerWidth > 1200
      ? '300px'
      : window.innerWidth > 1100
        ? '300px'
        : '400px',
  a_h:
    window.innerWidth > 1200
      ? '630px'
      : window.innerWidth > 1100
        ? `${(630 * window.innerWidth) / 1200}px`
        : '500px',
  co_w:
    window.innerWidth > 1200
      ? '900px'
      : window.innerWidth > 1100
        ? `${900 - 1200 + window.innerWidth}px`
        : '400px',
  co_h:
    window.innerWidth > 1200
      ? '630px'
      : window.innerWidth > 1100
        ? `${(630 * window.innerWidth) / 1200}px`
        : '310px',
  c_w:
    window.innerWidth > 1200
      ? '800px'
      : window.innerWidth > 1100
        ? '800px'
        : '400px',
  c_h:
    window.innerWidth > 1200
      ? '630px'
      : window.innerWidth > 1100
        ? `${(630 * window.innerWidth) / 1200}px`
        : '310px',
  st_w:
    window.innerWidth > 1200
      ? '1140px'
      : window.innerWidth > 1100
        ? `${window.innerWidth - 60}px`
        : `${window.innerWidth * 0.8 - 60}px`,
  s_w:
    window.innerWidth > 1200
      ? '1200px'
      : window.innerWidth > 1100
        ? `${window.innerWidth}px`
        : '400px',
  currentScore: 0,
  currentColor: '',
  currentShadow: '',
})

export const mutations = {
  showMaximum(value) {
    store.isMaximum = value
  },
  updateAuto(action) {
    action === 'start'
      ? (store.autoStart = !store.autoStart)
      : (store.autoEnd = !store.autoEnd)
    setTimeout(() => {
      action === 'start'
        ? (store.autoStart = !store.autoStart)
        : (store.autoEnd = !store.autoEnd)
    }, 2000)
  },
  updateHotkey() {
    store.hotkey = !store.hotkey
  },
  rectShow(req) {
    store.rectShow = req
  },
  responsive(a_w, a_h, co_w, co_h, c_w, c_h, st_w, s_w) {
    store.a_w = a_w
    store.a_h = a_h
    store.co_w = co_w
    store.co_h = co_h
    store.c_w = c_w
    store.c_h = c_h
    store.st_w = st_w
    store.s_w = s_w
  },
  currentScore(score, color, shadow) {
    store.currentScore = score
    store.currentColor = color
    store.currentShadow = shadow
  },
  showGameInfoModal() {
    store.showGameInfoModal = !store.showGameInfoModal
  },
  showHotkeyModal() {
    store.showHotkeyModal = !store.showHotkeyModal
    this.appOpacity()
  },
  showFairness() {
    store.showFairness = !store.showFairness
  },
  showMaxValueModal() {
    store.showMaxValueModal = !store.showMaxValueModal
    this.appOpacity()
  },
  showStatistics() {
    store.showStatistics = !store.showStatistics
    this.appOpacity()
  },
  appOpacity() {
    if (store.showGameInfoModal || store.showHotkeyModal || store.showMaxValueModal)
      store.appOpacity = true

    else
      store.appOpacity = false
  },
  updatePlinko(amount, rows, level) {
    store.plinkoAmount = amount
    store.plinkoLevel = level
    store.plinkoRow = rows
  },
}
