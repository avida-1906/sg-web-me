<script lang="ts" setup>
import type { IBasePanelType } from '~/types'

const props = withDefaults(defineProps<{
  data: IBasePanelType
  round?: boolean // 是否圆角
}>(), {
  round: true,
})

const route = useRoute()

type HeadType = Array<{
  key: string
  show?: boolean
  periodScores?: Array<{ [prop: string]: any }>
}>

const head = computed(() => [
  {
    key: 'competitor',
  },
  {
    key: 'corners',
    show: !!(route.params.sport === '1'),
  },
  {
    key: 'yellowCards',
    show: !!(route.params.sport === '1'),
  },
  {
    key: 'redCards',
    show: !!(route.params.sport === '1'),
  },
  {
    key: 'period',
    periodScores: props.data.period,
    show: !!(props.data.period && props.data.period.length),
  },
  {
    key: 'gameScore',
    show: !!props.data.gameScore,
  },
  {
    key: 'matchScore',
  },
])

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
  <div class="app-match-statistics wrapper has-background" :class="{ round }">
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
        <span class="match-status-label">
          {{ data.startTime }}
        </span>
      </div>
      <div class="sticky-left competitor-item border" style="grid-area: competitor_home;">
        <AppImage :url="data.htpic" is-network width="20px" height="20px" />
        <span class="sport-title">{{ data.homeTeamName }}</span>
      </div>
      <div class="competitor-item sticky-left" style="grid-area: competitor_away;">
        <AppImage :url="data.atpic" is-network width="20px" height="20px" />
        <span class="sport-title">{{ data.awayTeamName }}</span>
      </div>

      <!-- 角球 -->
      <template v-if="route.params.sport === '1'">
        <div class="heading center" style="grid-area: corners_title;">
          <BaseIcon name="uni-ruler" />
        </div>
        <span class="fill-frame border" style="grid-area: corners_home;">
          <span>{{ data.corner?.homeTeam }}</span>
        </span>
        <span class="fill-frame" style="grid-area: corners_away;">
          <span>{{ data.corner?.awayTeam }}</span>
        </span>
      </template>

      <!-- 黄牌 -->
      <template v-if="route.params.sport === '1'">
        <div class="heading center" style="grid-area: yellowCards_title;">
          <BaseIcon name="uni-warn-rect" />
        </div>
        <span class="fill-frame border" style="grid-area: yellowCards_home;">
          <span>{{ data.yellowCard?.homeTeam }}</span>
        </span>
        <span class="fill-frame" style="grid-area: yellowCards_away;">
          <span>{{ data.yellowCard?.awayTeam }}</span>
        </span>
      </template>

      <!-- 红牌 -->
      <template v-if="route.params.sport === '1'">
        <div class="heading center" style="grid-area: redCards_title;">
          <BaseIcon name="uni-error-rect" />
        </div>
        <span class="fill-frame border" style="grid-area: redCards_home;">
          <span>{{ data.redCard?.homeTeam }}</span>
        </span>
        <span class="fill-frame" style="grid-area: redCards_away;">
          <span>{{ data.redCard?.awayTeam }}</span>
        </span>
      </template>

      <!-- 1，2，3 场 -->
      <template v-for="p, idx in data.period" :key="idx">
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

      <!-- matchScore -->
      <div class="heading center sticky-right" style="grid-area: matchScore_title;">
        <AppImage
          style="filter: brightness(2);"
          :url="data.spic" is-network width="16px" height="16px"
        />
      </div>
      <div
        class="fill-frame sticky-right completed match-score border"
        style="grid-area: matchScore_home;"
      >
        <span>{{ data.homeTeamScore }}</span>
      </div>
      <div
        class="match-score fill-frame sticky-right"
        style="grid-area: matchScore_away;"
      >
        <span>{{ data.awayTeamScore }}</span>
      </div>
    </div>
    <div v-if="data.overtime" class="overtime">
      加时 ({{ data.overtime.awayTeam }}-{{ data.overtime.homeTeam }})
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-match-statistics {
  min-width: 250px;
  max-width: calc(100% - 32px);
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
