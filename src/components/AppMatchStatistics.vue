<script lang="ts" setup>
import type { IBasePanelType, PanelTypeItem } from '~/types'

const props = withDefaults(defineProps<{
  data: IBasePanelType
  round?: boolean // 是否圆角
  showSkeleton?: boolean // 展示骨架屏
}>(), {
  round: true,
})

type HeadType = Array<{
  key: string
  show?: boolean
  periodScores?: Array<{ [prop: string]: any }>
}>

const _data = computed(() => {
  /**
     * 3 主队红牌
     * 4 客队红牌
     * 5 主队⻩牌
     * 6 客队⻩牌
     * 7 主队⾓球
     * 8 客队⾓球
     * 9 主队上半场⽐分——1H
     * 10 客队上半场⽐分——1H
     * 11 主队下半场⽐分——2H
     * 12 客队下半场⽐分——2H
     * 13 主队第⼀节⽐分——1st
     * 14 客队第⼀节⽐分——1st
     * 15 主队第⼆节⽐分——2nd
     * 16 客队第⼆节⽐分——2nd
     * 17 主队第三节⽐分——3rd
     * 18 客队第三节⽐分——3rd
     * 19 主队第四节⽐分——4th
     * 20 客队第四节⽐分——4th
     * 21 主队加时赛⽐分
     * 22 客队加时赛⽐分
     * 25,  // 第一盘 主队 网球, 排球
     * 26,  // 第一盘 客队 网球, 排球
      27,  // 第二盘 主队 网球, 排球
      28,  // 第二盘 客队 网球, 排球
      29,  // 第三盘 主队 网球, 排球
      30,  // 第三盘 客队 网球, 排球
      31,  // 第四盘 主队 网球, 排球
      32,  // 第四盘 客队 网球, 排球
      33,  // 第五盘 主队 网球, 排球
      34,  // 第五盘 客队 网球, 排球

      37,  // 第1局 主队 乒乓球
      38,  // 第1局 客队 乒乓球
      39,  // 第2局 主队 乒乓球
      40,  // 第2局 客队 乒乓球
      41,  // 第3局 主队 乒乓球
      42,  // 第3局 客队 乒乓球
      43,  // 第4局 主队 乒乓球
      44,  // 第4局 客队 乒乓球
      45,  // 第5局 主队 乒乓球
      46,  // 第5局 客队 乒乓球
      47,  // 第6局 主队 乒乓球
      48,  // 第6局 客队 乒乓球
      49,  // 第7局 主队 乒乓球
      50,  // 第7局 客队 乒乓球

      51,  // 第1局 主队 板球, 棒球
      52,  // 第1局 客队 板球, 棒球
      53,  // 第2局 主队 板球, 棒球
      54,  // 第2局 客队 板球, 棒球

      55,  // 加时 主队 板球
      56,  // 加时 客队 板球

      57,  // 第3局 主队 棒球
      58,  // 第3局 客队 棒球
      59,  // 第4局 主队 棒球
      60,  // 第4局 客队 棒球
      61,  // 第5局 主队 棒球
      62,  // 第5局 客队 棒球
      63,  // 第6局 主队 棒球
      64,  // 第6局 客队 棒球
      65,  // 第7局 主队 棒球
      66,  // 第7局 客队 棒球
      67,  // 第8局 主队 棒球
      68,  // 第8局 客队 棒球
      69,  // 第9局 主队 棒球
      70,  // 第9局 客队 棒球
      71,  // 加时局 主队 棒球
      72,  // 加时局 客队 棒球
     */
  const _map = cloneDeep(props.data)

  const pol = props.data.pol ?? {}
  _map.redCard = {
    homeTeam: pol['3'] || '-',
    awayTeam: pol['4'] || '-',
  }

  _map.yellowCard = {
    homeTeam: pol['5'] || '-',
    awayTeam: pol['6'] || '-',
  }

  _map.corner = {
    homeTeam: pol['7'] || '-',
    awayTeam: pol['8'] || '-',
  }

  // 半场数据 篮球
  const _h: PanelTypeItem[] = []
  if (pol['9'] !== void 0 || pol['10'] !== void 0) {
    _h.push({
      title: '1H',
      homeTeam: `${pol['9'] || 0}`,
      awayTeam: `${pol['10'] || 0}`,
    })
  }
  if (pol['11'] !== void 0 || pol['12'] !== void 0) {
    _h.push({
      title: '2H',
      homeTeam: `${pol['11'] || 0}`,
      awayTeam: `${pol['12'] || 0}`,
    })
  }
  // 第1-4节数据 篮球
  const _p: PanelTypeItem[] = []

  if (pol['13'] !== void 0 || pol['14'] !== void 0) {
    _p.push({
      title: '1st',
      homeTeam: `${pol['13'] || 0}`,
      awayTeam: `${pol['14'] || 0}`,
    })
  }

  if (pol['15'] !== void 0 || pol['16'] !== void 0) {
    _p.push({
      title: '2nd',
      homeTeam: `${pol['15'] || 0}`,
      awayTeam: `${pol['16'] || 0}`,
    })
  }

  if (pol['17'] !== void 0 || pol['18'] !== void 0) {
    _p.push({
      title: '3rd',
      homeTeam: `${pol['17'] || 0}`,
      awayTeam: `${pol['18'] || 0}`,
    })
  }

  if (pol['19'] !== void 0 || pol['20'] !== void 0) {
    _p.push({
      title: '4th',
      homeTeam: `${pol['19'] || 0}`,
      awayTeam: `${pol['20'] || 0}`,
    })
  }

  // 网球，排球
  if (pol['25'] !== void 0 || pol['26'] !== void 0) {
    _p.push({
      title: '1st',
      homeTeam: `${pol['25'] || 0}`,
      awayTeam: `${pol['26'] || 0}`,
    })
  }

  if (pol['27'] !== void 0 || pol['28'] !== void 0) {
    _p.push({
      title: '2nd',
      homeTeam: `${pol['27'] || 0}`,
      awayTeam: `${pol['28'] || 0}`,
    })
  }

  if (pol['29'] !== void 0 || pol['30'] !== void 0) {
    _p.push({
      title: '3rd',
      homeTeam: `${pol['29'] || 0}`,
      awayTeam: `${pol['30'] || 0}`,
    })
  }

  if (pol['31'] !== void 0 || pol['32'] !== void 0) {
    _p.push({
      title: '4th',
      homeTeam: `${pol['31'] || 0}`,
      awayTeam: `${pol['32'] || 0}`,
    })
  }

  if (pol['33'] !== void 0 || pol['34'] !== void 0) {
    _p.push({
      title: '5th',
      homeTeam: `${pol['33'] || 0}`,
      awayTeam: `${pol['34'] || 0}`,
    })
  }

  // 乒乓球
  if (pol['37'] !== void 0 || pol['38'] !== void 0) {
    _p.push({
      title: '1st',
      homeTeam: `${pol['37'] || 0}`,
      awayTeam: `${pol['38'] || 0}`,
    })
  }

  if (pol['39'] !== void 0 || pol['40'] !== void 0) {
    _p.push({
      title: '2nd',
      homeTeam: `${pol['39'] || 0}`,
      awayTeam: `${pol['40'] || 0}`,
    })
  }

  if (pol['41'] !== void 0 || pol['42'] !== void 0) {
    _p.push({
      title: '3rd',
      homeTeam: `${pol['41'] || 0}`,
      awayTeam: `${pol['42'] || 0}`,
    })
  }

  if (pol['43'] !== void 0 || pol['44'] !== void 0) {
    _p.push({
      title: '4th',
      homeTeam: `${pol['43'] || 0}`,
      awayTeam: `${pol['44'] || 0}`,
    })
  }

  if (pol['45'] !== void 0 || pol['46'] !== void 0) {
    _p.push({
      title: '5th',
      homeTeam: `${pol['45'] || 0}`,
      awayTeam: `${pol['46'] || 0}`,
    })
  }

  if (pol['47'] !== void 0 || pol['48'] !== void 0) {
    _p.push({
      title: '6th',
      homeTeam: `${pol['47'] || 0}`,
      awayTeam: `${pol['48'] || 0}`,
    })
  }

  if (pol['49'] !== void 0 || pol['50'] !== void 0) {
    _p.push({
      title: '7th',
      homeTeam: `${pol['49'] || 0}`,
      awayTeam: `${pol['50'] || 0}`,
    })
  }

  // 板球
  if (pol['51'] !== void 0 || pol['52'] !== void 0) {
    _p.push({
      title: '1st',
      homeTeam: `${pol['51'] || 0}`,
      awayTeam: `${pol['52'] || 0}`,
    })
  }

  if (pol['53'] !== void 0 || pol['54'] !== void 0) {
    _p.push({
      title: '2nd',
      homeTeam: `${pol['53'] || 0}`,
      awayTeam: `${pol['54'] || 0}`,
    })
  }

  // 棒球
  if (pol['57'] !== void 0 || pol['58'] !== void 0) {
    _p.push({
      title: '3rd',
      homeTeam: `${pol['57'] || 0}`,
      awayTeam: `${pol['58'] || 0}`,
    })
  }

  if (pol['59'] !== void 0 || pol['60'] !== void 0) {
    _p.push({
      title: '4th',
      homeTeam: `${pol['59'] || 0}`,
      awayTeam: `${pol['60'] || 0}`,
    })
  }

  if (pol['61'] !== void 0 || pol['62'] !== void 0) {
    _p.push({
      title: '5th',
      homeTeam: `${pol['61'] || 0}`,
      awayTeam: `${pol['62'] || 0}`,
    })
  }

  if (pol['63'] !== void 0 || pol['64'] !== void 0) {
    _p.push({
      title: '6th',
      homeTeam: `${pol['63'] || 0}`,
      awayTeam: `${pol['64'] || 0}`,
    })
  }

  if (pol['65'] !== void 0 || pol['66'] !== void 0) {
    _p.push({
      title: '7th',
      homeTeam: `${pol['65'] || 0}`,
      awayTeam: `${pol['66'] || 0}`,
    })
  }

  if (pol['67'] !== void 0 || pol['68'] !== void 0) {
    _p.push({
      title: '8th',
      homeTeam: `${pol['67'] || 0}`,
      awayTeam: `${pol['68'] || 0}`,
    })
  }

  if (pol['69'] !== void 0 || pol['70'] !== void 0) {
    _p.push({
      title: '9th',
      homeTeam: `${pol['69'] || 0}`,
      awayTeam: `${pol['70'] || 0}`,
    })
  }

  _map.period = [
    ..._h,
    ..._p,
  ]

  // 加时数据
  if (pol['21'] !== void 0 || pol['22'] !== void 0) {
    // 篮球
    _map.overtime = {
      homeTeam: pol['21'] || 0,
      awayTeam: pol['22'] || 0,
    }
  }
  else if (pol['55'] !== void 0 || pol['56'] !== void 0) {
    // 板球
    _map.overtime = {
      homeTeam: pol['55'] || 0,
      awayTeam: pol['56'] || 0,
    }
  }
  else if (pol['71'] !== void 0 || pol['72'] !== void 0) {
    // 棒球
    _map.overtime = {
      homeTeam: pol['71'] || 0,
      awayTeam: pol['72'] || 0,
    }
  }

  return Object.assign(props.data, _map)
})
const head = computed(() => [
  {
    key: 'competitor',
  },
  {
    key: 'corners',
    show: !!(_data.value.si === 1),
  },
  {
    key: 'yellowCards',
    show: !!(_data.value.si === 1),
  },
  {
    key: 'redCards',
    show: !!(_data.value.si === 1),
  },
  {
    key: 'period',
    periodScores: _data.value.period,
    show: !!(_data.value.period && _data.value.period.length),
  },
  {
    key: 'gameScore',
    show: !!_data.value.gameScore,
  },
  {
    key: 'matchScore',
  },
])
// 足球
const isFootBall = computed(() => _data.value.si === 1)

const scoreBoard = computed(() => {
  const headTitle = mapHeadArea(head.value, 'title')
  const headHome = mapHeadArea(head.value, 'home')
  const headAway = mapHeadArea(head.value, 'away')
  return {
    head,
    headTitle,
    headHome,
    headAway,
  }
})

const gridAreas = computed(() => {
  if (props.showSkeleton) {
    return `
      "competitor_title"
      "competitor_home"
      "competitor_away"
    `
  }
  return `
    "${scoreBoard.value.headTitle.map((i: any) => i.name).join(' ')}"
    "${scoreBoard.value.headHome.map((i: any) => i.name).join(' ')}"
    "${scoreBoard.value.headAway.map((i: any) => i.name).join(' ')}"
  `
})

function mapHeadArea(
  head: HeadType,
  label: string,
) {
  return head.reduce((accumulator: any, currentValue) => {
    if (currentValue.show !== undefined ? currentValue.show : true) {
      if (currentValue.periodScores && currentValue.periodScores.length) {
        accumulator.push(...currentValue.periodScores.map((p, idx) => ({
          ...p,
          key: currentValue.key,
          name: `${currentValue.key}_${label}_${idx}`,
          qualifier: label,
        })))
      }
      else {
        accumulator.push({
          ...currentValue,
          name: `${currentValue.key}_${label}`,
          qualifier: label,
        })
      }
    }
    return accumulator
  }, [])
}
</script>

<template>
  <div
    class="app-match-statistics wrapper has-background" :class="{ round }"
    :title="formatTitleData(_data)"
  >
    <div
      class="content scroll-x" :style="{
        'grid-template-areas': gridAreas,
      }"
      style="--app-sport-image-error-icon-size: 20px"
    >
      <!-- competitor -->
      <div
        class="chromatic-ignore sticky-left competitor-title heading"
        style="grid-area: competitor_title;"
      >
        <span
          class="match-status-label"
          style="display:inline-block;width: 5ch;text-align: left;white-space: nowrap;"
        >
          {{ _data.startTime.split('@@')[0] }}
        </span>&nbsp;
        <span class="match-status-label">
          {{ _data.startTime.split('@@')[1] }}
        </span>
      </div>
      <div class="sticky-left competitor-item border" style="grid-area: competitor_home;">
        <template v-if="showSkeleton">
          <BaseSkeleton
            width="20px" height="20px"
            style="--tg-skeleton-border-radius:3px"
          />
          <BaseSkeleton
            style="margin-left: 8px;--tg-skeleton-border-radius:3px"
            width="100px" height="16px"
          />
        </template>
        <template v-else>
          <AppImage :url="_data.htpic" is-network width="20px" height="20px" />
          <span class="sport-title">{{ _data.homeTeamName }}</span>
        </template>
      </div>
      <div class="competitor-item sticky-left" style="grid-area: competitor_away;">
        <template v-if="showSkeleton">
          <BaseSkeleton
            width="20px" height="20px"
            style="--tg-skeleton-border-radius:3px"
          />
          <BaseSkeleton
            style="margin-left: 8px;--tg-skeleton-border-radius:3px"
            width="100px" height="16px"
          />
        </template>
        <template v-else>
          <AppImage :url="_data.atpic" is-network width="20px" height="20px" />
          <span class="sport-title">{{ _data.awayTeamName }}</span>
        </template>
      </div>

      <template v-if="!showSkeleton">
        <template v-if="isFootBall">
          <!-- 角球 -->
          <div class="heading center" style="grid-area: corners_title;">
            <BaseIcon name="uni-ruler" />
          </div>
          <span class="fill-frame border" style="grid-area: corners_home;">
            <span>{{ _data.corner?.homeTeam }}</span>
          </span>
          <span class="fill-frame" style="grid-area: corners_away;">
            <span>{{ _data.corner?.awayTeam }}</span>
          </span>

          <!-- 黄牌 -->
          <div class="heading center" style="grid-area: yellowCards_title;">
            <BaseIcon name="uni-warn-rect" />
          </div>
          <span class="fill-frame border" style="grid-area: yellowCards_home;">
            <span>{{ _data.yellowCard?.homeTeam }}</span>
          </span>
          <span class="fill-frame" style="grid-area: yellowCards_away;">
            <span>{{ _data.yellowCard?.awayTeam }}</span>
          </span>

          <!-- 红牌 -->
          <div class="heading center" style="grid-area: redCards_title;">
            <BaseIcon name="uni-error-rect" />
          </div>
          <span class="fill-frame border" style="grid-area: redCards_home;">
            <span>{{ _data.redCard?.homeTeam }}</span>
          </span>
          <span class="fill-frame" style="grid-area: redCards_away;">
            <span>{{ _data.redCard?.awayTeam }}</span>
          </span>
        </template>

        <!-- 1，2，3 场 -->
        <template v-for="p, idx in _data.period" :key="idx">
          <div class="heading center" :style="`grid-area: period_title_${idx}`">
            <span>{{ idx + 1 }}st</span>
          </div>
          <span class="fill-frame border" :style="`grid-area: period_home_${idx}`">
            <span>{{ p.homeTeam }}</span>
          </span>
          <span class="fill-frame" :style="`grid-area: period_away_${idx}`">
            <span>{{ p.awayTeam }}</span>
          </span>
        </template>
        <!-- gameScore -->
        <!-- <div class="heading center" style="grid-area: gameScore_title;" />
      <span class="fill-frame border" style="grid-area: gameScore_home;">
        <span>0</span>
      </span>
      <span class="fill-frame" style="grid-area: gameScore_away;">
        <span>16</span>
      </span> -->

        <div class="heading center sticky-right" style="grid-area: matchScore_title;">
          <AppImage
            style="filter: brightness(2);"
            :url="_data.spic" is-network width="16px" height="16px"
          />
        </div>

        <!-- matchScore -->
        <div
          class="fill-frame sticky-right completed match-score border"
          style="grid-area: matchScore_home;"
        >
          <span>{{ _data.homeTeamScore }}</span>
        </div>
        <div
          class="match-score fill-frame sticky-right"
          style="grid-area: matchScore_away;"
        >
          <span>{{ _data.awayTeamScore }}</span>
        </div>
      </template>
    </div>
    <div v-if="_data.overtime" class="overtime">
      {{ $t('additional_time') }} ({{ _data.overtime.awayTeam }}-{{ _data.overtime.homeTeam }})
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --tg-app-match-statistics-max-width: calc(100% - 32px);
}
</style>

<style lang="scss" scoped>
.app-match-statistics {
  min-width: 250px;
  max-width: var(--tg-app-match-statistics-max-width);
  width: auto;
}
.competitor-title {
  background: var(--tg-secondary-dark);
}
.wrapper.has-background {
  // min-width: 250px;
  // max-width: calc(100% - var(--tg-spacing-32));
  width: auto;
  &.round{
    border-radius: var(--tg-radius-default);
    box-shadow: var(--tg-header-shadow);
    overflow: hidden;
  }
}

.overtime {
  text-align: right;
  font-size: var(--tg-font-size-default);
  color: #{rgba($color: var(--tg-color-white-rgb), $alpha: 0.7)};
  padding: 8px;
}

.wrapper {
  position: relative;
  width: fit-content;
  .content {
    text-align: left;
    color: var(--tg-secondary-light);
    line-height: 1.5;
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-normal);
    --tg-icon-color: var(--tg-text-white);

    .app-svg-icon {
      font-size: var(--tg-font-size-base);
    }

    display: grid;
    background: var(--tg-primary-main);
    justify-items: center;
    align-items: center;
    overflow: auto;
    width: 100%;
    // border-radius: var(--tg-radius-default);

    >* {
      padding: var(--tg-spacing-8);
    }

    .heading {
      width: 100%;
      height: 100%;
      display: flex;
      text-align: center;
      background: var(--tg-secondary-dark);
    }

    .heading.center {
      justify-content: center;
      align-items: center;
    }

    .competitor-item {
      display: flex;
      align-items: center;
      justify-self: stretch;
      color: var(--tg-text-white);
      gap: var(--tg-spacing-4);
      background: var(--tg-primary-main);

      img {
        width: var(--tg-spacing-20);
        height: var(--tg-spacing-20);
        fill: var(--tg-text-lightblue);
        margin-right: var(--tg-spacing-8);
      }
    }

    .border {
      border-bottom: 1px solid var(--tg-secondary-main);
    }

    .fill-frame {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .match-score {
      font-weight: 700;
      background: var(--tg-secondary-main);
      // color: var(--tg-text-white);
      color: var(--tg-text-warn-sub);
    }

    .match-score.completed {
      // background: var(--tg-text-lightblue);
    }
  }
}

.sticky-left {
  position: sticky;
  left: 0;
  .sport-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}

.sticky-right {
  position: sticky;
  right: 0;
}
</style>
