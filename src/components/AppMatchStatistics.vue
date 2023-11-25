<script lang="ts" setup>
import type { IBasePanelType } from '~/types'

type Qualifier = 'home' | 'away'

withDefaults(defineProps<{
  data: IBasePanelType
  round?: boolean // 是否圆角
}>(), {
  round: true,
})

const eventData = {
  eventStatus: {
    __typename: 'SportFixtureEventStatusData',
    homeScore: 1,
    awayScore: 0,
    matchStatus: '上半场',
    clock: {
      matchTime: '45:00',
      remainingTime: null,
    },
    periodScores: [
      {
        homeScore: 1,
        awayScore: 0,
        matchStatus: '上半场',
      },
      {
        homeScore: 1,
        awayScore: 5,
        matchStatus: '第二盘',
      },
    ],
    currentTeamServing: null,
    homeGameScore: '0',
    awayGameScore: '0',
    statistic: {
      yellowCards: {
        away: 0,
        home: 0,
      },
      redCards: {
        away: 0,
        home: 0,
      },
      corners: {
        home: 1,
        away: 1,
      },
    },
  },
  data: {
    startTime: 'Sat, 07 Oct 2023 06:00:00 GMT',
    competitors: [
      {
        name: 'Bintang Ampenan FC',
        extId: 'sr:competitor:1063998',
        countryCode: 'ID',
        abbreviation: 'BIN',
        iconPath: null,
      },
      {
        name: 'PS Hamzanwadi',
        extId: 'sr:competitor:1063984',
        countryCode: 'ID',
        abbreviation: 'PS ',
        iconPath: null,
      },
    ],
    teams: [
      {
        name: 'Bintang Ampenan FC',
        qualifier: 'home',
      },
      {
        name: 'PS Hamzanwadi',
        qualifier: 'away',
      },
    ],
    tvChannels: [
      {
        language: 'zh',
        name: 'Huya',
        streamUrl: '',
      },
    ],
    __typename: 'SportFixtureDataMatch',
  },
}

const scoreBoard = computed(() => {
  const head = [
    {
      key: 'competitor',
      value: (q: Qualifier) =>
        eventData.data.teams.filter(t => t.qualifier === q)[0]?.name,
      title: eventData.eventStatus.matchStatus,
    },
    {
      key: 'corners',
      value: (q: Qualifier) =>
        eventData.eventStatus.statistic.corners[q],
      icon: 'uni-ruler',
    },
    {
      key: 'yellowCards',
      value: (q: Qualifier) =>
        eventData.eventStatus.statistic.yellowCards[q],
      icon: 'uni-warn-rect',
    },
    {
      key: 'redCards',
      value: (q: Qualifier) =>
        eventData.eventStatus.statistic.redCards[q],
      icon: 'uni-error-rect',
    },
    {
      key: 'period',
      periodScores: eventData.eventStatus.periodScores.map(p =>
        ({ ...p, value: (q: Qualifier) => p[`${q}Score`] })),
    },
    {
      key: 'gameScore',
      value: (q: Qualifier) => eventData.eventStatus[`${q}GameScore`],
    },
    {
      key: 'matchScore',
      value: (q: Qualifier) =>
        eventData.eventStatus[`${q}Score`],
      icon: 'soccer',
    },
  ]
  const headTitle = mapHeadArea(head, 'title')
  const headHome = mapHeadArea(head, 'home')
  const headAway = mapHeadArea(head, 'away')
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
  head: Array<{ key: string; periodScores?: Array<{ [prop: string]: any }> }>,
  label: string,
) {
  return head.reduce((accumulator: any, currentValue) => {
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
    >
      <!-- competitor -->
      <div class="chromatic-ignore heading" style="grid-area: competitor_title;">
        <span class="match-status-label">
          {{ data.startTime }}
        </span>
      </div>
      <div class="competitor-item border" style="grid-area: competitor_home;">
        <AppSportImage :url="data.htpic" is-cloud width="20px" height="20px" />
        <span>{{ data.homeTeamName }}</span>
      </div>
      <div class="competitor-item" style="grid-area: competitor_away;">
        <AppSportImage :url="data.atpic" is-cloud width="20px" height="20px" />
        <span>{{ data.awayTeamName }}</span>
      </div>

      <!-- 角球 -->
      <template v-if="data.corner">
        <div class="heading center" style="grid-area: corners_title;">
          <BaseIcon name="uni-ruler" />
        </div>
        <span class="fill-frame border" style="grid-area: corners_home;">
          <span>{{ data.corner.homeTeam }}</span>
        </span>
        <span class="fill-frame" style="grid-area: corners_away;">
          <span>{{ data.corner.awayTeam }}</span>
        </span>
      </template>

      <!-- 黄牌 -->
      <template v-if="data.yellowCard">
        <div class="heading center" style="grid-area: yellowCards_title;">
          <BaseIcon name="uni-warn-rect" />
        </div>
        <span class="fill-frame border" style="grid-area: yellowCards_home;">
          <span>{{ data.yellowCard.homeTeam }}</span>
        </span>
        <span class="fill-frame" style="grid-area: yellowCards_away;">
          <span>{{ data.yellowCard.awayTeam }}</span>
        </span>
      </template>

      <!-- 红牌 -->
      <template v-if="data.redCard">
        <div class="heading center" style="grid-area: redCards_title;">
          <BaseIcon name="uni-error-rect" />
        </div>
        <span class="fill-frame border" style="grid-area: redCards_home;">
          <span>{{ data.redCard.homeTeam }}</span>
        </span>
        <span class="fill-frame" style="grid-area: redCards_away;">
          <span>{{ data.redCard.awayTeam }}</span>
        </span>
      </template>

      <!-- 1，2，3 场 -->
      <!-- <template v-for="p, idx in eventData.eventStatus.periodScores" :key="idx">
        <div class="heading center" :style="`grid-area: period_title_${idx}`">
          <span>{{ idx + 1 }}st</span>
        </div>
        <span class="fill-frame border" :style="`grid-area: period_home_${idx}`">
          <span>{{ p.homeScore }}</span>
        </span>
        <span class="fill-frame" :style="`grid-area: period_away_${idx}`">
          <span>{{ p.awayScore }}</span>
        </span>
      </template> -->

      <!-- gameScore -->
      <!-- <div class="heading center" style="grid-area: gameScore_title;" />
      <span class="fill-frame border" style="grid-area: gameScore_home;">
        <span>0</span>
      </span>
      <span class="fill-frame" style="grid-area: gameScore_away;">
        <span>16</span>
      </span> -->

      <!-- matchScore -->
      <div class="heading center" style="grid-area: matchScore_title;">
        <AppSportImage :url="data.spic" is-cloud width="20px" height="20px" />
      </div>
      <div
        class="fill-frame completed match-score border"
        style="grid-area: matchScore_home;"
      >
        <span>{{ data.homeTeamScore }}</span>
      </div>
      <div class="match-score fill-frame" style="grid-area: matchScore_away;">
        <span>{{ data.awayTeamScore }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.wrapper {
  .content {
    text-align: left;
    color: var(--tg-secondary-light);
    line-height: 1.5;
    font-size: var(--tg-font-size-default);
    font-weight: var(--tg-font-weight-normal);
    --tg-icon-color: var(--tg-text-white);

    .app-svg-icon {
      font-size: var(--tg-font-size-lg);
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
      color: var(--tg-text-white);
    }

    .match-score.completed {
      background: var(--tg-text-lightblue);
    }
  }
}
</style>
