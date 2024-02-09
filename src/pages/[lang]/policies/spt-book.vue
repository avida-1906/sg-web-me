<script lang="ts" setup>
/* eslint-disable max-len */
usePageTitle({ prefix: 'Sportsbook' })
const { isLogin } = storeToRefs(useAppStore())
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
BeforeUnmount(() => {
  scrollToTop()
})
</script>

<template>
  <div class="content-block pd-24">
    <h1>
      <span id="Sportsbook_Rules_and_Policies">Sportsbook Rules and Policies</span>
    </h1>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#General" inline="true">
            <span>General</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Soccer" inline="true"><span>Soccer</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Tennis" inline="true"><span>Tennis</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Basketball" inline="true">
            <span>Basketball</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#American_Football" inline="true">
            <span>American Football</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Ice_Hockey" inline="true"><span>Ice Hockey</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Baseball" inline="true">
            <span>Baseball</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Mixed_Martial_Arts_(MMA)" inline="true">
            <span>Mixed Martial Arts (MMA)</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Boxing" inline="true"><span>Boxing</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Golf" inline="true"><span>Golf</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Handball" inline="true">
            <span>Handball</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Volleyball_+_Beach_Volleyball" inline="true">
            <span>Volleyball</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Motor_Sports" inline="true"><span>Motor Sports</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Formula_1" inline="true"><span>Formula 1</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#MotoGP" inline="true"><span>MotoGP</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#NASCAR" inline="true"><span>NASCAR</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Futsal" inline="true"><span>Futsal</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Badminton" inline="true">
            <span>Badminton</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Rugby_Union_+_League" inline="true">
            <span>Rugby</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Rugby_Sevens" inline="true"><span>Rugby Sevens</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Darts" inline="true"><span>Darts</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Snooker" inline="true">
            <span>Snooker</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Table_Tennis" inline="true"><span>Table Tennis</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Bowls" inline="true"><span>Bowls</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Squash" inline="true"><span>Squash</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Aussie_Rules" inline="true"><span>Aussie Rules</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Field_Hockey" inline="true"><span>Field Hockey</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Alpine_Skiing" inline="true"><span>Alpine Skiing</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Ski_Jumping" inline="true"><span>Ski Jumping</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Athletics" inline="true">
            <span>Athletics</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Cricket_T20_+_ODI" inline="true">
            <span>Cricket</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#All_Other_Sports" inline="true"><span>All Other Sports</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Esports_General" inline="true">
            <span>Esports - General</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Counter-Strike:_Global_Offensive" inline="true">
            <span>Counter-Strike: Global Offensive</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Valorant" inline="true">
            <span>Valorant</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Dota_2" inline="true"><span>Dota 2</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#League_of_Legends" inline="true">
            <span>League
              of Legends</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#King_of_Glory" inline="true"><span>King of Glory</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#FIFA" inline="true"><span>FIFA</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#NBA2K" inline="true"><span>NBA2K</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Counter-Strike:_Global_Offensive_Wingman" inline="true"><span>Counter-Strike: Global Offensive - Wingman</span></a>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <a class="link" href="/policies/spt-book#Other_Esports_Titles" inline="true"><span>Other Esports Titles</span></a>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="General">General </span></h2>
    <h3><span id="Matches_not_played_as_listed">Matches not played as listed </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>In situations where the event is played at a venue different to that listed, all
            bets on the event
            will stand provided the match is not switched to the opponent’s ground and home and away team for a listed
            match are not reversed, in which we reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the event of a change of opponent from the one listed, all bets for that match
            are void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a team field their reserve team or an underage team instead of their first
            team,
            we reserve the
            right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match does not adhere to the generally accepted format (e.g., unusual period
            length, counting
            procedure, format of a match etc.); we reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the rules or format of a match differ from our accepted norm, we reserve the
            right to void
            betting.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Markets_including_overtime">Markets including overtime </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All match markets DO NOT include overtime unless otherwise stated.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Odds/Time_Changes">Odds/Time Changes </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>We reserve the right to change the odds-on offer at any time as well as suspend
            or
            close betting on
            events before the scheduled start time.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of any obviously incorrectly displayed or calculated prices, we
            reserve
            the right to
            void betting. This includes a deviation of more than 100% in the pay-out compared to the market
            average.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Technical_Errors">Technical Errors </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>We reserve the right to suspend odds during an event due to failed transmission
            or
            other technical
            related issues or if fraud is suspected.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>We reserve the right to void bets even subsequently if any such bet was won by
            the
            customer because
            of a technical fault or error, inclusive of but not limited to an error or fault in transmission.</span>
        </div>
      </li>
    </ul>
    <h3>
      <span id="Abandonments,_cancellations_&amp;_postponements">Abandonments, cancellations &amp;
        postponements </span>
    </h3>
    <div class="inline-text">
      <span>Unless otherwise stated in the Specific Rules for the specific sport:</span>
    </div>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is postponed or abandoned and is completed within 48 hours of the
            previous scheduled
            start time, then all open bets will be settled with the final result.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the match is not completed within 48 hours, then all undecided bets are
            considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Please note that games which have their start date altered well in advance to
            accommodate live TV,
            or to ease fixture congestion will not be classed as postponed.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>An abandonment is where a match is halted before the completion of the allocated
            match time and not
            played out to conclusion on the same day. Markets which have been determined at the time of abandonment
            (i.e., the outcome has already been decided) such as ‘First Team to Score’, ‘First goalscorer”, etc. will
            stand. The market must be fully determined for bets to stand.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If live coverage must be halted and the match finishes regularly, all markets
            will
            be settled
            according to the result.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text">
      <span>Push Rule (2-way Markets)</span>
    </div>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>In the event of a Winner market (with just home and away team as outcomes) being
            offered and the
            event results in a draw we will settle the market as void.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text">
      <span>Total</span>
    </div>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>When an exact number is quoted as the line for an over/ under market, if the
            result
            will be the
            quoted line, then bets will be made void.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text">
      <span>Handicap</span>
    </div>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>When an exact number is quoted as the line for an home/ away market, if the
            result
            will be the
            quoted line, then bets will be made void.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text">
      <span>Race to X (incl. overtime)</span>
    </div>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match ends before the Xth is reached, this market is considered void.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text">
      <span>Half/Quarter/Period Markets</span>
    </div>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Unless otherwise stated, only goals/points/corners etc. scored in the respective
            period will count
            towards settlement of the market.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Odd/Even_Markets">Odd/Even Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Unless otherwise stated, total counts of zero will be settled as Even.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Results">Results </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If the outcome of a market cannot be verified, we reserve the right to delay the
            settlement until
            official confirmation. If the outcome of a market cannot be verified officially, we reserve the right to
            void them.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets were offered when the outcome was already known, we reserve the right
            to
            void any
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of an incorrect settlement of markets, we reserve the right to
            correct
            them
            anytime.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Head_to_Head">Head to Head </span></h3>
    <div class="inline-text">
      <span>Unless otherwise stated in the Special Rules for the specific sport:</span>
    </div>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>At least one competitor must finish the event, or all bets are considered
            void</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If one or more competitor(s) fail to start all bets are considered void</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If all competitors are disqualified or otherwise excluded all bets are considered
            void</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If both competitors in a head-to-head achieve the same result and no draw odds
            are
            offered, then
            all bets are considered void.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Outright_Markets">Outright Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Outright markets are considered All In Run Or Not and therefore will be settled
            as
            a loss if the
            selection does not take part in the event.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In cases where the event is cancelled then all bets will be declared void</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In cases where the venue for an event is changed, we reserve the right to void
            any
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Unless stated otherwise, whenever the organising association deems it fit to
            include any necessary
            rounds, matches, or series of matches (e.g. Play-offs, Play-outs, Postseason) following the end of the
            so-called Regular Season in order to determine the classification, league winners, promotion/relegation,
            etc., Sportradar will take into account the results and outcomes deriving from these matches for settlement
            purposes of tickets referring to the final league classification, promotion, relegation, etc. For example,
            seasonal bets on the team winning the NHL will refer to the Stanley Cup Winners.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All events are settled based on the award ceremony or the competition’s official
            scoresheet,
            without taking into consideration the results of any subsequent investigations or disqualifications.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Dead_Heat_Rule">Dead Heat Rule </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Dead Heat rules apply for Outright markets. A dead heat is when two or more
            competitors tie for a
            position in an event. In these cases, we will send a dead heat void factor based on the number of positions
            tied for divided by number of competitors tied in that position.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Player_Markets_PMOS">Player Markets PMOS </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All bets created prior to the venue change shall be Auto Voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the match starts but is abandoned or suspended at any time before the match
            reaches a natural
            end and the match does not resume within 5 hours, then all bets on that player shall be Auto Voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If any player selected for any bet type does not participate in game, then all
            bets
            on that player
            shall be Auto Voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>For Soccer only, if any player selected for any bet type does not start the game,
            then all bets on
            that player shall be Auto Voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All Player Markets include overtime for bet resulting. Penalty shootouts are not
            included.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Cashout">Cashout </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Cashout is a feature that offers the customer the opportunity to take a return on
            a
            bet placed
            before the bet has reached its conclusion. Cashout is available on selected events and markets both
            Pre-Match and Live for Singles and Multi bets. If you choose to cashout (if available) you simply need to
            click on the Cashout button next to your bet in the 'My Bets' section of the site. The Cashout amount will
            then be credited to your account. Please note that the final result will then have no impact on the outcome
            of your bet.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>The following also applies to the Cashout feature:</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Cashout may not be available on certain markets and events.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>A time delay is applied on every Cashout.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Cashout will not be available if the event and/or market you have placed a bet on
            is
            suspended.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>A Cashout attempt may not be successful if a market or event is suspended or odds
            change at the
            point in which the time delay is applied after Cashout is attempted.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Where Cashout is available on a Pre-Match event, if we do not cover the event
            Live
            then Cashout
            will be unavailable once the event starts.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Your Cashout value will differ depending on how your selection is performing and
            may be higher or
            lower than your original Meibo, allowing you to guarantee a profit or minimise a loss.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Meibo reserves the right to reverse the settlement of a cashout on any bet that
            has
            been settled in
            error.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Meibo will not be responsible in the event that Cashout is unavailable due to
            technical issues. Any
            bets will be settled as normal based on the final result.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Meibo reserves the right to remove the Cashout feature for any customer who
            misuses
            it by regularly
            taking advantage of Pre-Match price movements to close their bets before events have started.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Meibo reserves the right to remove the cashout feature for any customer who
            misuses
            it by taking
            advantage of latency to guarantee profit when placing bets then immediately cashing out.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Third_Party_Content">Third Party Content </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>The Meibo sportsbook contains content provided by Third Party Providers. This
            includes the
            information related to sports scores and analytics. Meibo is not responsible for, do not endorse and make no
            representation either expressly or impliedly concerning the Third Party Content provided on our platform.
            You rely on Third Party Content completely at your own risk.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Player_Props">Player Props </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Specific terminology used for player prop bets:</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>PLAYER MUST PLAY: applies to all Prematch Player Props markets across NBA, NHL,
            NFL, CBB, and CFB
            and all In-Play Player Prop markets across MLB, NBA and NFL.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>PLAYER MUST START: all prematch MLB player prop markets (Pitcher and Batter
            markets) are "Player
            must start". We do not offer bench player markets for prematch. NHL Goalie markets are "Goalie Must
            Start".</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>The following rules also apply to all player prop bets:</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>We reserve the right to void bets placed on known outcomes or known
            results.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Settlements are sourced from the official league data in the box scores: nfl.com,
            nba.com, mlb.com,
            nhl.com</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Postponed/Cancelled/Abandonded Game: bets are void on postponed, canceled, or
            abandoned games. The
            game must be played on the originally scheduled date (if the game is rescheduled to a new date then it is
            considered postponed) and considered final for bets to be action.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If any selection as part of a Bet Builder is void, the whole bet is considered as
            a
            void.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Soccer">Soccer </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets (except halftime, first half markets, overtime and penalty shoot-
            out)
            are considered
            for regular time only unless otherwise stated.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted and continued within 48h after initial kickoff, all
            open
            bets will be
            settled with the final result. Otherwise all undecided bets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Regular 90 Minutes: Markets are based on the result at the end of a scheduled 90
            minutes play
            unless otherwise stated. This includes any added injury or stoppage time but does not include extra-time,
            time allocated for a penalty shootout or golden goal. </span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Prematch bets on friendly matches that last between 80 and 120 minutes will be
            settled per the
            final result (2x40, 2x60, 3x30).</span>
        </div>
      </li>
    </ul>
    <h3><span id="Market_description">Market description </span></h3>
    <div class="inline-text">
      <span>Winning Method</span><span>: In the case of multiple matches, all of them are
        considered for this market</span>
    </div>
    <div class="inline-text">
      <span>To qualify</span><span>: In the case of multiple legs, all matches are considered for
        this market</span>
    </div>
    <div class="inline-text">
      <span>1st Goalscorer &amp; 1x2</span><span>: Any player who doesn’t score will be settled
        as
        “other”</span>
    </div>
    <div class="inline-text">
      <span>Anytime goalscorer &amp; 1x2</span><span>: Any player who doesn’t score will be
        settled
        as “other”</span>
    </div>
    <div class="inline-text">
      <span>1st Goalscorer &amp; correct score</span><span>: Any player who doesn’t score will be
        settled as “other”, as well as if any team scores more than 4
        goals.</span>
    </div>
    <div class="inline-text">
      <span>Anytime goalscorer &amp; correct score</span><span>: Any player who doesn’t score
        will
        be settled as “other”, as well as if any team scores more than 4
        goals.</span>
    </div>
    <div class="inline-text">
      <span>Who will advance to next round</span><span>: In the case of multiple legs, all
        matches
        are considered for this market</span>
    </div>
    <div class="inline-text">
      <span>Who will win the final</span><span>: In the case of multiple legs, all matches are
        considered for this market</span>
    </div>
    <div class="inline-text">
      <span>Who will win the 3rd place final</span><span>: In the case of multiple legs, all
        matches are considered for this market</span>
    </div>
    <div class="inline-text">
      <span>Player to score (incl. overtime)</span><span>: If no overtime is played, the market
        will be settled according to the result at the end of the
        regular time.</span>
    </div>
    <div class="inline-text">
      <span>Next goalscorer</span><span>: Own goals are considered for settlement purposes as a
        dedicated outcome is provided. Players which
        are not listed as well as goal keepers and players on the bench are reflected within the outcome “other”, which
        will be used for settlement purposes accordingly.</span>
    </div>
    <div class="inline-text">
      <span>Next goalscorer &amp; 1x2</span><span>: Any player who doesn’t score will be settled
        as
        “other”</span>
    </div>
    <div class="inline-text">
      <span>Next goalscorer &amp; correct score</span><span>: Any player who doesn’t score will
        be
        settled as “other”, as well as if any team scores more than 4
        goals.</span>
    </div>
    <div class="inline-text">
      <span>When will the next goal be scored?</span><span> If a goal is scored in added injury
        or
        stoppage time, it will be accounted for outcomes Min 31-45/Min
        76-90.</span>
    </div>
    <h3><span id="Time_Frame_Betting">Time Frame Betting </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Time frames are defined as follows: 1-10 minutes is 0:00-9:59, 11-20 minutes is
            10:00-19:59, etc.
            1-15 minutes is 00:00-14:59, 16-30 minutes is 15:00-29:59, etc.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Time periods 31-45 and 76-90 include any added time</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>1st/2nd Half Markets apply to the statutory 45 minutes play, including injury
            time
            and added
            time</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of unusual time periods (e.g., 3 periods of 30 minutes each), 1st half
            markets will be
            settled based on goals scored between start of the game and 44:59 min, and 2nd half markets - between 45:00
            min and the end of the game (including added time and injury time, excluding extra-time and/or
            penalties)</span>
        </div>
      </li>
    </ul>
    <h3><span id="Interval_Markets">Interval Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Markets will be settled based on the goal time announced by TV. If this is not
            available, the time
            according to the match clock is considered.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Goal markets are settled based on the time the ball crosses the line, and not the
            time the kick is
            made.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Corner interval markets are settled based on the time the corner kick is taken
            and
            not the time the
            corner is conceded or awarded.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Booking interval markets are settled based on the time the card is shown and not
            the time the
            infringement is made</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Offsides will be settled based on the time when the referee gives the decision.
            This rule will be
            applied on any video assistant referee (VAR) situation.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Penalty markets will be settled based on the time when the referee gives the
            decision. This rule
            will be applied on any video assistant referee (VAR) situation.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Penalties awarded but not taken are not considered</span>
        </div>
      </li>
    </ul>
    <h3><span id="Booking_markets">Booking markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Yellow card counts as 1 card and red or yellow-red card as 2. The 2nd yellow for
            one player which
            leads to a yellow-red card is not considered. Consequently, one player cannot cause more than 3
            cards.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Settlement will be made according to all available evidence of cards shown during
            the regular 90
            minutes play.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Cards shown after the match are not considered.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Cards for non-players (already substituted players, managers, players on bench)
            are
            not
            considered.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Booking_points_markets">Booking points markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Yellow card counts as 10 points and red o r yellow-red cards as 25. The 2nd
            yellow
            for one player
            which leads to a yellow-red card is not considered. Consequently, one player cannot cause more than 35
            booking points.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Settlement will be made according to all available evidence for cards shown
            during
            the regular 90
            minutes play. Cards shown after the match are not considered.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Cards for non-players (already substituted players, managers, players on bench)
            are
            not
            considered.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Goalscorer_Markets">Goalscorer Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Own goals do not count in the settlement of bets (except when the ‘Include
            players,
            no goal, other
            and own goal’ Prematch Feed Option for ‘Goalscorer markets’ is applied).</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If for any reason an unlisted player scores a goal all bets on listed players
            stand</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All players who took part in the match since kick off or previous goal are
            considered as
            runners</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All players who are currently taking part are listed</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Market will be settled based on TV insert and statistics provided by Press
            Association unless there
            is clear evidence that these statistics are not correct.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Corner_Markets">Corner Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Corners awarded but not taken are not considered.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Player_Markets">Player Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If a player was not in the starting lineup the bet will be voided</span>
        </div>
      </li>
    </ul>
    <h3>
      <span id="Anytime_Goalscorer_and_Player_to_score_X_or_more">Anytime Goalscorer and Player to score X or
        more </span>
    </h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Own goals will not be considered for Anytime Goalscorer or Player to score X or
            more settlement
            purposes and are ignored</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All players who took part in the match since kick off or previous goal are
            considered as
            runners</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All players who are currently taking part are listed.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If for any reason an unlisted player scores a goal all bets on listed players
            stand</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Market will be settled based on TV insert and statistics provided by Press
            Association unless there
            is clear evidence that these statistics are not correct.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Next_Goalscorer">Next Goalscorer </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Own goals will not be considered for Next Goalscorer settlement purposes and are
            ignored</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All players who took part in the match since kick off or previous goal are
            considered as
            runners</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All players who are currently taking part are listed.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If for any reason an unlisted player scores a goal all bets on listed players
            stand</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Market will be settled based on TV insert and statistics provided by Press
            Association unless there
            is clear evidence that these statistics are not correct.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Next_scoring_type">Next scoring type </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Freekick: The goal has to be scored directly from the freekick or corner to
            qualify
            as a goal by
            freekick. Deflected shots count as long as the freekick or corner taker is awarded the goal</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Penalty: Goal must be scored directly from the penalty. Goals after a rebound of
            a
            missed penalty
            do not count</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Own Goal: If goal is declared as an own goal</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Header: The scorers last touch has to be with the head</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Shot: Goal has to be with any other part of the body than the head and the other
            types do not
            apply</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>No Goal.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Settlement_and_Cancellation_Rules">Settlement and Cancellation Rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets (except halftime, first half markets, overtime and penalty shoot-out)
            are considered
            for regular time only unless otherwise stated.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted and continued within 48h after initial kick-off time,
            all
            open bets will
            be settled with the final result. Otherwise all undecided bets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Regular 90 Minutes: Markets are based on the result at the end of a scheduled 90
            minutes play
            unless otherwise stated. This includes any added injury or stoppage time but does not include extra-time,
            time allocated for a penalty shootout or golden goal.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the market remains open when the following events have already taken place:
            goals, red or
            yellow-red cards and penalties, we reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the market was opened with a missing or incorrect red card, we reserve the
            right
            to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If odds were offered with an incorrect match time (more than 5 minutes), we
            reserve
            the right to
            void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a wrong score is entered, all markets will be cancelled for the time when the
            incorrect score
            was displayed.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48h after
            initial kick-off date,
            betting will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the team names or category are displayed incorrectly, we reserve the right to
            void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of any score or card/corner/penalty related changes, we reserve the right
            to void betting
            on any video assistant referee (VAR) situation.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Bet_Builder">Bet Builder </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If any selection as part of a Bet Builder is void, the whole bet is considered as
            a
            void</span>
        </div>
      </li>
    </ul>
    <h3><span id="Player_Props">Player Props </span></h3>
    <h3><span id="Goals">Goals </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>The number of goals scored by a player in the opposition net.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>A goal may not be counted if the attempt is off target and deflected into the net
            by an opposition
            player (own goal)</span>
        </div>
      </li>
    </ul>
    <h3><span id="Assists">Assists </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>A final contribution (pass, shot or any other touch of the ball) made by a player
            leading to the
            receiving teammate scoring a goal.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>An assist may not be counted if the attempt is deflected via an opposition player
            and the recipient
            was unlikely to have received the ball without the deflection.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Assists are not given for own goals, penalties, goals scored directly from
            corners
            or goals scored
            directly from direct free kicks.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Shots">Shots </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Any clear attempt by a player to score a goal (on target, off target or
            blocked).</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Shots going over or wide or saved by the goalkeeper are included.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Blocked shots by any players are included.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Shots that hit the frame are included.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Set-piece attempts (corner or free kicks) that have no clear intent to score a
            goal
            and do not
            directly result in a goal are not included.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Other attempts that have no clear intent to score a goal such as a cross-cum-shot
            or flick-on, that
            do not directly result in a goal are not included.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>A shot can be made with any part of the body as long as it is legal according to
            the rules of the
            game.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Shots_on_Goal_/_Shots_on_Target">Shots on Goal / Shots on Target </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>An attempt by a player which directly results in a goal (regardless of clear
            intent
            to score a
            goal), or a clear attempt by a player to score a goal that clearly would have went into the net if not for a
            goalkeeper save or a stop made by the last-man (with the goalkeeper clearly unable to save).</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Shots that hit the frame and directly go into the net resulting in a goal are
            included.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Shots that hit the frame and do not directly go into the net are not
            included.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Set-piece attempts (corners or free-kicks) that have no clear intent to score a
            goal and do not
            directly result in a goal are not included.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>A shot can be made with any part of the body as long as it is legal according to
            the rules of the
            game.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Passes">Passes </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Attempted pass (successful or unsuccessful) with the clear intention of one
            player
            to find a
            teammate.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Open-play passes are included. Goal kicks, free-kicks, or corners that are played
            as an attempted
            pass (played short) are included.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Crosses, throw-ins and keeper throws are not included.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>A pass can be made with any part of the body as long as it is legal according to
            the rules of the
            game.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Tackles">Tackles </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>When a player connects with the ball in a ground challenge, successfully taking
            the
            ball away from
            the player in possesion.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All outcomes of a successful tackle are included (player/teammate takes
            possession,
            the ball goes
            out of play or the ball goes to an opposition player).</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Missed tackles (failed attempts), aerial duels, fouls and pass interceptions are
            not
            included.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>The tackled player must clearly be in possession of the ball before the tackle is
            made.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Cards">Cards </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Player carded: 0 = No, 1 = Yes. (Not the total number of cards received)</span>
        </div>
      </li>
    </ul>
    <h3><span id="Settlement_Process">Settlement Process </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If a player does not participate, the market will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a player was not in the starting line-up, the market will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a player is a substitute, the market will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets are settled including overtime but does not include penalty
            shootouts.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>At the conclusion of each game, we receive the final box score from the
            statistics
            provider
            (soccerstats.info) which is then used to settle all markets</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the event of discrepancies between statistics presented by external sources
            for
            a match, the
            prevailing statistics shall be those used by the Website for settlement, which may include data from service
            providers not explicitly listed on the Website.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Tennis">Tennis </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>A tennis match is deemed to have started with the first serve of the match</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the event of a retirement or disqualification in a match, all markets that
            have
            not already had
            their result determined will be settled as void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Markets must be actually decided in order to have settlements. For example, if
            the
            match ends via
            retirement in the first set with the score at 4-4 we would void the first set total 9.5 line as the actual
            number of total games at the time of retirement was only eight.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of a retirement and walkover of any player, all undecided bets are
            considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of any delay (rain, darkness…) all markets remain unsettled and the
            trading
            will be
            continued as soon as the match continues.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If penalty point(s) are awarded by the umpire, all bets on that game will
            stand.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of a match being finished before certain points/games were finished, all
            affected
            point/game related markets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score which has a significant impact on
            the prices, we
            reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the players/teams are displayed incorrectly, we reserve the right to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a player retires or is disqualified, all undecided markets are considered
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match tie-break is played as a deciding set in BestOf3 format, it will be
            considered as the
            3rd set.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>For all bets referring to the number of games played, a tie-break is counted as
            one
            game.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the event of a Walkover all markets will be settled as void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the event of any of the following circumstances, all bets will stand:</span>
        </div>
      </li>
      <li class="level-2">
        <div class="inline-text">
          <span>Change of schedule and/or day of match</span>
        </div>
      </li>
      <li class="level-2">
        <div class="inline-text">
          <span>Change of venue</span>
        </div>
      </li>
      <li class="level-2">
        <div class="inline-text">
          <span>Change from indoor court to outdoor court or vice versa</span>
        </div>
      </li>
      <li class="level-2">
        <div class="inline-text">
          <span>Change of surface (either before or during match).</span>
        </div>
      </li>
      <li class="level-2">
        <div class="inline-text">
          <span>If the players/teams are displayed incorrectly, we reserve the right to void
            betting.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Basketball">Basketball </span></h2>
    <h3><span id="Market_description">Market description </span></h3>
    <div class="inline-text">
      <span>Will there be overtime</span><span>: Market will be settled as yes if at the end of
        regular time the match finishes in a draw, regardless
        of whether overtime is played.</span>
    </div>
    <div class="inline-text">
      <span>Who scores Xth point? (incl. ot)</span><span>: If a match ends before the Xth is
        reached, this market is considered void (cancelled).</span>
    </div>
    <div class="inline-text">
      <span>Which team will win race to x points? (incl. ot)</span><span>: If a match ends before
        the Xth is reached, this market is considered void (cancelled).</span>
    </div>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Markets do not consider overtime unless otherwise stated.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48h after
            initial tip-off date,
            all undecided bets will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If odds were offered with an incorrect match time (more than 2 minutes), we
            reserve
            the right to
            void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score which has a significant impact on
            the prices, we
            reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the event that a match does not finish in a tie, but overtime is played for
            qualification
            purposes, the markets will be settled according to the result at the end of regular time.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Player_Props">Player Props </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If any selection as part of a Bet Builder is void, the whole bet is considered as
            a
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the stated player logs court-time according to NBA.com, all bets will
            stand</span>
        </div>
      </li>
    </ul>
    <div class="inline-text">
      <span>3pt Field Goals (FG) Made</span><span>: The number of 3-point field goals that a
        player
        or team has made</span>
    </div>
    <div class="inline-text">
      <span>Points</span><span>: The number of points scored</span>
    </div>
    <div class="inline-text">
      <span>FG Made</span><span>: The number of field goals that a player has made. This includes
        both 2 pointers and 3 pointers</span>
    </div>
    <div class="inline-text">
      <span>Assists</span><span>: The number of assists - passes that lead directly to a made
        basket by a player</span>
    </div>
    <div class="inline-text">
      <span>Blocks</span><span>: A block occurs when an offensive player attempts a shot, and the
        defense player tips the ball,
        blocking their chance to score</span>
    </div>
    <div class="inline-text">
      <span>Total Rebound</span><span>s: A rebound occurs when a player recovers the ball after a
        missed shot. This statistic is the number
        of total rebounds a player has collected on either offense or defense</span>
    </div>
    <div class="inline-text">
      <span>Steals</span><span>: Number of times a defensive player takes the ball from a player
        on
        offense, causing a turnover</span>
    </div>
    <div class="inline-text">
      <span>Points + Rebounds + Assists</span><span>: SUM of the player’s Points + Rebounds +
        Assists individual scores for the game</span>
    </div>
    <div class="inline-text">
      <span>Rebounds + Assists</span><span>: SUM of the player’s Rebounds + Assists individual
        scores for the game</span>
    </div>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="American_Football">American Football </span></h2>
    <h3><span id="Market_descriptions">Market descriptions </span></h3>
    <div class="inline-text">
      <span>Total home team</span><span>: Includes overtime</span>
    </div>
    <div class="inline-text">
      <span>Total away team</span><span>: Includes overtime</span>
    </div>
    <div class="inline-text">
      <span>Xth drive play n – play type</span><span>: A sack will be considered as a pass play.
        Only a forward pass will be taken into consideration for a
        pass play by definition.</span>
    </div>
    <div class="inline-text">
      <span>Xth drive play n – pass completion</span><span>: Only a forward pass will be taken
        into
        consideration for a pass play by definition.</span>
    </div>
    <div class="inline-text">
      <span>Xth drive - result</span><span>: Only offensive plays will be considered for
        settlement
        purposes. A drive ending by interception
        return Touchdown by the defense, end of half or end of game, will be settled with “other”.</span>
    </div>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of abandoned or postponed matches all undecided markets are considered
            void
            unless the
            match continues in the same weekly schedule (Thursday - Wednesday local stadium time).</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of any delay (rain, darkness etc) all markets remain unsettled and the
            trading will be
            continued as soon as the match continues.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Markets do not consider overtime unless otherwise stated.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score which has a significant impact on
            the prices, we
            reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If odds were offered with an incorrect match time (more than 89 seconds), we
            reserve the right to
            void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a wrong score is displayed, we reserve the right to void betting for this
            timeframe.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of abandoned or postponed matches, all markets are considered void unless
            the match
            continues in the same NFL weekly schedule (Thursday - Wednesday local stadium time).</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the teams are displayed incorrectly, we reserve the right to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All offered players are considered as runners.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Players which are not listed are considered as "Competitor1 other player" or
            "Competitor2 other
            player" for settlement purposes. Note: this does not include players which are listed without an active
            price.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Players of the Defense - or Special team are considered as "Competitor1 d/st
            player" or
            "Competitor2 d/st player" for settlement purposes, even if the player is listed as dedicated outcome.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Market will be settled based on TV insert and statistics provided by official
            associations unless
            there is clear evidence that statistics are not correct.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of no plays, all markets will be settled with the next play or voided if
            the drive ends
            before reaching the respective play.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of the drive ended before the respective play number was reached, all
            markets for the
            respective play will be considered void. This includes punts and field goals.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Field goal yardage will not be considered for total yards gained in a
            play.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Any references to First Half refer to Quarters 1 &amp; 2, any to Second Half
            refer
            to Quarters 3
            &amp; 4.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Market outcome is determined only based on the score in the respective period
            (e.g., 1st Quarter,
            2nd Half etc.) excluding points scored in other periods both in regular time and overtime.</span>
        </div>
      </li>
      <li class="level-2">
        <div class="inline-text">
          <span>The quarter must have been completed for bets to stand.</span>
        </div>
      </li>
      <li class="level-2">
        <div class="inline-text">
          <span>The half must have been completed for bets to stand.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Player_props">Player props </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>For "Anytime Touchdown" markets, only receiving and rushing touchdowns will
            count;
            a player passing
            a touchdown will not count for this market</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>NFL Defensive Tackles, Assists, and Tackles+Assists markets only include Tackles
            and Assists made
            on defensive plays. Special Teams plays do not count.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If any selection as part of a Bet Builder is void, the whole bet is considered as
            a
            void</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All players who participate in the match (all who play at least one snap) will be
            settled based on
            final statistics, regardless of whether they are injured, ejected or leave the game early.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Ice_Hockey">Ice Hockey </span></h2>
    <h3><span id="Settlement_and_cancellation_rule">Settlement and cancellation rule </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets (except period, overtime and penalty shootout markets) are considered
            for regular time
            only unless it is mentioned in the market.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted and continued within 48h after initial start-time, all
            open bets will be
            settled with the final result. Otherwise all undecided bets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the event of a game being decided by a penalty shootout, then one goal will be
            added to the
            winning team’s score and the game total for settlement purposes. This applies to all markets including
            overtime and penalty shootout.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the market remains open when the following events have already taken place:
            goals and penalties,
            we reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If odds were offered with an incorrect match time (more than 2 minutes), we
            reserve
            the right to
            void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a wrong score is entered all markets will be cancelled for the time when the
            incorrect score was
            displayed.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Market outcome is determined only based on the score in the respective period
            (e.g., 1st Period,
            2nd Period, 3rd Period). Only the goals scored within the nominated period count. Unless otherwise stated,
            overtime does not count for the result of the 3rd period. The period must have been completed for tickets
            all that period to stand.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Player_Props">Player Props </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Pre-match only</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Goalie Win (the rule is the Goalie on ice when the winning, go-ahead goal is
            score
            receives the
            win)</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>For settlement purposes, Overtime is included; penalties are excluded</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If any selection as part of a Bet Builder is void, the whole bet is considered as
            a
            void</span>
        </div>
      </li>
    </ul>
    <h3>
      <span id="Anytime_Goalscorer_and_Player_to_score_a_point">Anytime Goalscorer and Player to score a point
      </span>
    </h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Live/Inplay Only</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All offered players are considered as runners.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If an unlisted player scores a goal or earns a point, all bets on listed players
            stand.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>For settlement purposes, only goals and assists scored during regular time are
            considered.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All bets on players that were listed but left the game before the match ended
            (such
            as injuries or
            expulsions) will stand.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Markets will be settled based on TV inserts and data provided by official
            associations unless there
            is clear evidence these statistics are not correct.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Next_scoring_type">Next scoring type </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Even strength: Goals are considered even strength when every team has the same
            number of players on
            the ice.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Power-play: A goal is considered to be a power-play goal if the team with
            numerical
            advantage
            scores.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Short-handed: A goal is considered to be a short-handed goal if the team with
            numerical
            disadvantage scores.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Penalty shot: A penalty shot is considered to be a goal if converted.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Empty net: A goal is considered to be an empty net goal, if the trailing team
            pulls
            the goalkeeper
            for an extra attacker and the leading team scores. In power-play/short-handed and empty net situations, a
            goal will always be considered as empty net goal for settlement purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>No goal</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Baseball">Baseball </span></h2>
    <div class="inline-text">
      <span>A baseball match is usually scheduled for 9 innings but, in some instances, can be
        scheduled for
        anywhere between 5 to 8. Matches don’t need to play for the full number of scheduled innings for the result to
        be considered official.</span>
    </div>
    <h3><span id="Market_descriptions">Market descriptions </span></h3>
    <div class="inline-text">
      <span>1x2: </span><span>The match must go the full number of scheduled innings, otherwise
        the
        market will be voided. If the
        match ends early due to a Mercy rule all bets on the Winner and 1x2 markets will stand.</span>
    </div>
    <div class="inline-text">
      <span>Winner (incl. Extra Innings):</span><span> The Winner market will be settled for
        pre-match betting if the match goes at least 5 innings (4.5 if
        the home team is leading) and is considered official.</span>
    </div>
    <div class="inline-text">
      <span>Winning Margin (incl. Extra Innings): </span><span>The match must go the full number
        of
        scheduled innings otherwise the market will be voided.</span>
    </div>
    <div class="inline-text">
      <span>Handicap: </span><span>The match must go the full number of scheduled innings
        otherwise
        the market will be voided.</span>
    </div>
    <div class="inline-text">
      <span>Total (incl. Extra Innings): </span><span>The match must go the full number of
        scheduled innings otherwise the market will be voided.</span>
    </div>
    <div class="inline-text">
      <span>Odd/Even (incl. Extra Innings): </span><span>The match must go the full number of
        scheduled innings otherwise the market will be voided.</span>
    </div>
    <div class="inline-text">
      <span>Race to x runs (incl. Extra Innings): </span><span>Will be voided if neither team
        reaches the x value.</span>
    </div>
    <div class="inline-text">
      <span>Will there be an extra inning: The match must go the full number of scheduled innings
        otherwise the
        market will be voided.</span>
    </div>
    <div class="inline-text">
      <span>Team x to bat in the 9th Inning:</span><span> The match must go the full number of
        scheduled innings otherwise the market will be voided.</span>
    </div>
    <div class="inline-text">
      <span>Team to win more innings: </span><span>The match must go the full number of scheduled
        innings otherwise the market will be voided.</span>
    </div>
    <div class="inline-text">
      <span>Team with highest scoring inning: </span><span>The match must go the full number of
        scheduled innings otherwise the market will be voided.</span>
    </div>
    <div class="inline-text">
      <span>Highest scoring inning: </span><span>The match must go the full number of scheduled
        innings otherwise the market will be voided.</span>
    </div>
    <div class="inline-text">
      <span>Innings 1 to 5 (all markets): </span><span>The match must have completed 5 innings
        (4.5
        if home team is leading).</span>
    </div>
    <div class="inline-text">
      <span>Innings 1 to 5 (Totals, all markets): </span><span>The match must have completed 5
        innings (4.5 if home team is leading) unless the over has already
        won.</span>
    </div>
    <div class="inline-text">
      <span>Xth Inning 1x2:</span><span> The inning must be completed.</span>
    </div>
    <div class="inline-text">
      <span>Xth Inning Total: </span><span>The inning must be completed unless the over has
        already
        won.</span>
    </div>
    <div class="inline-text">
      <span>Maximum consecutive runs by either team: The match must go the full number of
        scheduled
        innings unless
        5+ has already won.</span>
    </div>
    <div class="inline-text">
      <span>When will the match be decided: </span><span>The match must go the full number of
        scheduled innings. This market will be settled as "Any extra
        inning" if at the end of regular time (after full 9 innings) the match finishes in a draw, regardless of whether
        or not extra innings are played.</span>
    </div>
    <div class="inline-text">
      <span>When will the Xth run be scored (incl. extra innings): </span><span>The match must go
        the full number of scheduled innings. If a match ends before the Xth run is reached
        this market is considered void.</span>
    </div>
    <div class="inline-text">
      <span>Xth Inning (Home Team to Score):</span><span> The inning must be completed unless the
        home team have already scored.</span>
    </div>
    <div class="inline-text">
      <span>Xth Inning (Away Team to Score):</span><span> The inning must be completed unless the
        away team have already scored.</span>
    </div>
    <div class="inline-text">
      <span>Total Hits (incl. Extra Innings) (All markets): </span><span>The match must go the
        full
        number of scheduled innings unless the over has already won at the time the
        match ends.</span>
    </div>
    <div class="inline-text">
      <span>1st Innings Total Hits (All markets): </span><span>The 1st Inning must be completed
        unless the over has already won.</span>
    </div>
    <div class="inline-text">
      <span>Innings 1 to 5 (Total Hits) (All Markets): </span><span>The match must have completed
        5
        innings (4.5 if home team is leading).</span>
    </div>
    <div class="inline-text">
      <span>Winner &amp; Total (incl. Extra Innings): </span><span>The match must go the full
        number of scheduled innings.</span>
    </div>
    <div class="inline-text">
      <span>Total Home Runs (incl. Extra Innings) (All Markets): </span><span>The match must go
        the
        scheduled number of innings unless the over has already won at the time the match
        ends.</span>
    </div>
    <div class="inline-text">
      <span>1st Inning Winner - The 1st Inning must be completed.</span>
    </div>
    <div class="inline-text">
      <span>Race to x runs (incl. Extra Innings):</span><span> If a match ends before the Xth run
        is reached, this market is considered void.</span>
    </div>
    <div class="inline-text">
      <span>Will there be an extra inning: </span><span>Market will be settled as "Yes" if at the
        end of regular time (after the full 9 Innings) the match
        finishes in a draw, regardless of whether or not extra innings are played.</span>
    </div>
    <div class="inline-text">
      <span>Which team wins race to x points?</span><span> If an inning ends before the Xth point
        is reached (incl. extra innings), this market is considered
        void (cancelled).</span>
    </div>
    <div class="inline-text">
      <span>When will the match be decided?</span><span> Market will be settled as “Any extra
        inning” if at the end of regular time. (After a full 9 Innings)
        the match finishes in a draw, regardless of whether or not overtime (Extra innings) is played.</span>
    </div>
    <div class="inline-text">
      <span>Will there be overtime?</span><span> Market will be settled as “Yes” if at the end of
        regular time. (After full 9 Innings) the match
        finishes in a draw, regardless of whether or not overtime (Extra innings) is played.</span>
    </div>
    <div class="inline-text">
      <span>Result of player xth time at bat</span><span>: If an intentional walk is signaled, it
        will count as plate appearance and market is considered void
        (cancelled).</span>
    </div>
    <div class="inline-text">
      <span>Player to strike out xth time at bat</span><span>: If an intentional walk is
        signaled,
        it will count as plate appearance and market is considered void
        (cancelled).</span>
    </div>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Possible extra innings are not considered in any market unless otherwise
            stated.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of a postponed match all markets are considered void unless the match
            continues to an
            official result on the scheduled day.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of an abandoned match that is not considered official, all undecided
            markets are
            considered void unless the match continues to an official result on the scheduled day. All fully decided
            markets will be settled.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All bets stand irrespective of starting pitchers or starting pitcher
            changes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets will be cleared according the final result after 9 innings (8 ½
            innings
            if home team is
            leading at this point).</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score or incorrect match status which
            has
            a significant
            impact on the prices, we reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All bets placed on double headers will be resulted as normal.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Player_Markets">Player Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All bets created prior to a venue change shall be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the match starts but is abandoned or suspended at any time before the match
            reaches a natural
            end and the match does not resume within 5 hours, then all bets on that player shall be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If any player selected for any bet type does not participate in game, then all
            bets
            on that player
            shall be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All Player Markets include extra innings for bet resulting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a player was not in the starting lineup the bet will be voided</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a game ends early due to weather with an official result called before 9
            innings
            have been
            completed (Match is settled as 'FINAL' on MLB.com), all player props bets will stand.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Batter">Batter </span></h3>
    <div class="inline-text">
      <span>Hits (H):</span><span> Reaching base because of a batted, fair ball without error by
        the defense</span>
    </div>
    <div class="inline-text">
      <span>Home Runs (HR)</span><span>: Hits on which the batter successfully touched all four
        bases, without the contribution of a fielding
        error</span>
    </div>
    <div class="inline-text">
      <span>Total Bases (TB)</span><span>: One for each single, two for each double, three for
        each
        triple, and four for each home run [H + 2B +
        (2 × 3B) + (3 × HR)] or [1B + (2 × 2B) + (3 × 3B) + (4 × HR)]</span>
    </div>
    <div class="inline-text">
      <span>Runs + RBI’s</span><span>: SUM of Runs And RBI`s (Run batted in: number of runners
        who
        score due to a batter’s action, except
        when the batter grounded into a double play or reached on an error)</span>
    </div>
    <div class="inline-text">
      <span>Hits + Runs + RBIs</span><span>: SUM of Hits, Runs And RBI`s (Run batted in: number
        of
        runners who score due to a batter’s action,
        except when the batter grounded into a double play or reached on an error)</span>
    </div>
    <h3><span id="Pitcher">Pitcher </span></h3>
    <div class="inline-text">
      <span>Strikeouts (SO)</span><span>: Number of batters who received strike three</span>
    </div>
    <div class="inline-text">
      <span>Earned Runs</span><span>: Number of runs that did not occur as a result of errors or
        passed balls</span>
    </div>
    <div class="inline-text">
      <span>Win Probability</span><span>: pitcher has to be pitching for at least 5 full innings
        and the team needs to be in the lead at the
        moment he is subbed and never relinquish that lead for him to be awarded with a win</span>
    </div>
    <h3><span id="Rapid_markets">Rapid markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If a player does not show up at the plate again but related player markets have
            been offered,
            undecided markets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>A foul ball will always be considered as a strike for settlement purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Player props</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Pitcher Win (the "No" side includes Losses and No Decisions)</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If any selection as part of a Bet Builder is void, the whole bet is considered as
            a
            void</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Mixed_Martial_Arts_(MMA)">Mixed Martial Arts (MMA) </span></h2>
    <h3><span id="Market_descriptions">Market descriptions </span></h3>
    <div class="inline-text">
      <span>Winner (To Win the Fight)</span><span>: Predict which competitor will win the bout.
        No
        draw selection is offered. For the Winner market where
        no draw selection is offered all bets will be void in the event of a draw (this includes a fight which ends in a
        Majority Draw or a Technical Draw).</span>
    </div>
    <div class="inline-text">
      <span>1x2 (Fight Result)</span><span>: Predict the result of the bout. If the fight ends in
        a
        Majority Draw or a Technical Draw then Draw
        will be the winning selection.</span>
    </div>
    <div class="inline-text">
      <span>Total (Over/Under)</span><span>: Betting on the round in which the fight result will
        be
        determined.</span>
    </div>
    <div class="inline-text">
      <span>For settlement purposes where a half round is stated then 2 minutes 30 seconds of the
        respective round
        will define the half to determine under or over. Thus, 2.5 rounds would be two minutes and thirty seconds of the
        3rd round. If the fight ends at exactly 2 minutes 30 seconds of the 3rd round then the result would be over 2.5
        rounds.</span>
    </div>
    <div class="inline-text">
      <span>Winning Method</span><span>: Predict the method by which the result of the fight will
        be decided.</span>
    </div>
    <div class="inline-text">
      <span>All bets will be settled on the official result declared. A win by disqualification
        is
        counted as
        Knockout/Technical Knockout.</span>
    </div>
    <div class="inline-text">
      <span>For the purposes of the Winning Method market, a KO includes the following:</span>
    </div>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>referee stoppage due to strikes while either fighter is, or both fighters are,
            standing;</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>referee stoppage due to strikes while either fighter is, or both fighters are, on
            the
            canvas;</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>stoppage by doctor;</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>stoppage by a fighter’s corner/team</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>a fighter retires due to injury</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>a win by disqualification</span>
        </div>
      </li>
    </ul>
    <div class="inline-text">
      <span>For the purposes of the Winning Method market, a submission includes the
        following:</span>
    </div>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>referee stoppage due to tap-out;</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>referee stoppage due to technical submission</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>a fighter’s verbal submission (including a verbal submission which is made due to
            strikes).</span>
        </div>
      </li>
    </ul>
    <div class="inline-text">
      <span>Winner &amp; exact rounds: </span><span>Predict the round in which your selection
        will
        win the fight. Betting on winner and exact round is for
        a fighter to win by KO, TKO, disqualification or submission during that round or to win by decision. Where a
        fighter fails to answer the bell for the next round, his opponent shall be deemed to have won the contest in the
        previous round. In the event of a Technical Decision before the end of the fight all bets will be settled as a
        win by Decision and round bets will be deemed losers.</span>
    </div>
    <div class="inline-text">
      <span>Will the fight go the distance?</span><span> Predict if the fight will be decided
        before the scheduled number of rounds. In the event of a
        technical decision, for settlement purposes, the fight will have been deemed NOT to have gone the
        distance.</span>
    </div>
    <h3><span id="Match_Abandonments/Postponements">Match Abandonments/Postponements </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets are settled according to the result available immediately after the
            end
            of the fight.
            Any subsequent appeals or amendments to the result are not taken into consideration for settlement
            purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the fight does not take place for any reason on the scheduled date then all
            bets
            will be
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If either fighter fails to answer the bell for the next round then his opponent
            will be deemed to
            have won in the previous round.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Should there be a withdrawal or a substitution of one of the fighters concerned,
            bets will be
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the event of a fight being declared a No Contest all bets will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Should the scheduled number of rounds be changed before the fight then all "Total
            Rounds", "Winner
            and exact rounds" and "Winning Method" bets will be made void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Half of round must pass to be counted for settlements</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Boxing">Boxing </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets are settled according to the result available immediately after the
            end
            of the
            fight.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Any subsequent appeals or amendments to the result are not be taken into
            consideration for
            settlement purposes.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Market_descriptions">Market descriptions </span></h3>
    <div class="inline-text">
      <span>Winner (To Win the Fight): </span><span>Predict which competitor will win the bout.
        No
        draw selection is offered. For the Winner market where
        no draw selection is offered all bets will be void in the event of a draw (this includes a fight which ends in a
        Majority Draw or a Technical Draw).</span>
    </div>
    <div class="inline-text">
      <span>1x2 (Fight Result)</span><span>: Predict the result of the bout. If the fight ends in
        a
        Majority Draw or a Technical Draw then Draw
        will be the winning selection.</span>
    </div>
    <div class="inline-text">
      <span>Total Rounds (Over/Under)</span><span>: Betting on the round in which the fight
        result
        will be determined. For settlement purposes where a
        half round is stated then 1 minute 30 seconds of the respective round will define the half to determine under or
        over. Thus, 9.5 rounds would be one minute and thirty seconds of the 10th round. If the fight ends at exactly 1
        minute 30 seconds of the 10th round then the result would be over 9.5 rounds</span>
    </div>
    <div class="inline-text">
      <span>Winner &amp; exact round</span><span>: Predict the round in which your selection will
        win the fight. Betting on winner and exact round is
        for a fighter to win by KO, TKO or disqualification during that round. Where a boxer fails to answer the bell
        for the next round, his opponent shall be deemed to have won the contest in the previous round. In the event of
        a Technical Decision before the end of the fight all bets will be settled as a win by Decision and round bets
        will be deemed losers.</span>
    </div>
    <div class="inline-text">
      <span>Winning Method</span><span>: Predict the method by which the result of the fight will
        be decided. All bets will be settled on the
        official result declared. A win by disqualification is counted as Knockout/Technical Knockout.</span>
    </div>
    <div class="inline-text">
      <span>Any fighter to win inside the distance</span><span>: Predict if the fight will be
        decided before the scheduled number of rounds. In the event of a
        technical decision, for settlement purposes, the fight will have been deemed NOT to have gone the
        distance.</span>
    </div>
    <h3><span id="Match_Abandonments/Postponements">Match Abandonments/Postponements </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If the fight does not take place for any reason on the scheduled date then all
            bets
            will be
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If either fighter fails to answer the bell for the next round then his opponent
            will be deemed to
            have won in the previous round.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Should there be a withdrawal or a substitution of one of the boxers concerned,
            bets
            will be
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the event of a fight being declared a No Contest all bets will be void and
            Meibos
            returned.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Should the scheduled number of rounds be changed before the fight then all Total
            Rounds, Round
            Betting and Method of Victory bets will be made void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Half of round must pass to be counted for settlements</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Golf">Golf </span></h2>
    <h3><span id="Market_descriptions">Market descriptions </span></h3>
    <div class="inline-text">
      <span>2 Balls</span><span>: Predict which player will shoot the lowest score in the listed
        round.If both players retire at the
        same hole, the market will be void. Market will be void if both competitors achieve the same score for the
        affected round. A player can be considered as runner if he tees off on his first scheduled hole.</span>
    </div>
    <div class="inline-text">
      <span>3 Balls</span><span>: Predict which player will shoot the lowest score in the listed
        round. Dead heat rules apply.</span>
    </div>
    <div class="inline-text">
      <span>Outright Winner</span><span>: All outright bets are settled on the player awarded the
        trophy. The result of playoffs is taken into
        account. Where a tournament is reduced from the scheduled number of holes for any reason (e.g., bad weather
        conditions) outright bets (except “First round leader” bets) placed prior to the final completed round will be
        settled on the player awarded the trophy.</span>
    </div>
    <div class="inline-text">
      <span>Group Betting (Top XY)</span><span>: The winner will be the player achieving the
        highest placing at the end of the tournament. Dead-heat
        rules apply except where the winner is determined by a playoff. Special case: If we offer a group betting and
        only one competitor starts bets will be void.</span>
    </div>
    <div class="inline-text">
      <span>Finishing Position of a Named Player</span><span>: In the event of a tie for a
        finishing position the tied position will count. For example, a tie with
        4 other players for 7th place will count as a finishing position of 7th</span>
    </div>
    <div class="inline-text">
      <span>End of Round Leader (e.g., First round – Winner)</span><span>: Settlement is based on
        the tournament score at the end of the specified round. Dead-heat rules
        apply.</span>
    </div>
    <div class="inline-text">
      <span>Tournament Top 4/Top 5/top 6/Top 10/Top 20 Finish</span><span>: Dead-heat rules
        apply.</span>
    </div>
    <div class="inline-text">
      <span>To Win/Not to Win a Major</span><span>: The 4 majors are US Open, US Masters, USPGA
        and
        the British Open.</span>
    </div>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Dead heat rule applies for 3 ball markets.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If players are displayed incorrectly, we reserve the right to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>A player is deemed to have played in a tournament or a specific round once they
            have teed off. If a
            player withdraws, retires, or is disqualified after having teed off, bets will stand.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In tournaments affected by bad weather or other similar reasons, bets will be
            resulted on the
            official result regardless of the number of rounds played. If the tournament is abandoned, any bets placed
            after the last completed round will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the tournament is abandoned, any bets placed after the last completed round
            will
            be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Official tour site results at the time of trophy presentation are used for
            settlement purposes
            (subsequent disqualification after this time does not count).</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Group Markets: If a player withdraws from the tournament or is disqualified, we
            reserve the right
            to void betting on affected group markets</span>
        </div>
      </li>
    </ul>
    <div class="inline-text">
      <span>Round markets</span><span>: If a golf round is abandoned, all undecided markets will
        be
        void.</span>
    </div>
    <div class="inline-text">
      <span>2 ball markets</span><span>: If both players retire at the same hole, the market will
        be void. A player can be considered as
        runner, if he tees off on his first scheduled hole.</span>
    </div>
    <div class="inline-text">
      <span>3 ball markets</span><span>: If all 3 players retire at the same hole, the market
        will
        be void. A player can be considered as
        runner, if he tees off on his first scheduled hole.</span>
    </div>
    <div class="inline-text">
      <span>Competitor markets</span><span>: If the affected competitor retires, all undecided
        competitor markets will be void.</span>
    </div>
    <div class="inline-text">
      <span>Total markets</span><span>: If a player which is listed in the group retires, all
        undecided total markets will be void.</span>
    </div>
    <div class="inline-text">
      <span>“Hole” &amp; “Hole a to b” markets</span><span>: If a player which is listed in the
        group retires, all related and undecided “hole” and “hole a to b”
        markets will be void</span>
    </div>
    <div class="inline-text">
      <span>Tournament/Event markets</span><span>: In tournaments affected by bad weather</span>
    </div>
    <div class="inline-text">
      <span>or other similar reasons, bets will be resulte on the official result regardless of
        th
        number of rounds
        played.</span>
    </div>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Handball">Handball </span></h2>
    <h3><span id="Market_descriptions">Market descriptions </span></h3>
    <div class="inline-text">
      <span>Who scores Xth point? (incl. ot)</span><span>: If a match ends before the Xth is
        reached, this market is considered void (cancelled).</span>
    </div>
    <div class="inline-text">
      <span>Which team will win race to x points (incl. ot)?</span><span> If a match ends before
        the Xth is reached, this market is considered void (cancelled).</span>
    </div>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets (except who scores the Xth point and Which team will win race to X
            points) are
            considered for regular time only.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the match goes to a 7-meter shootout; the markets "Who scores Xth point?" and
            "Which team will
            win race to X points?" will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>“Who scores Xth point?” and “Which team will win race to X points?”will be
            voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48h after the
            initial start
            date/time, betting will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If odds were offered with an incorrect match time (more than 3 minutes), we
            reserve
            the right to
            void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score which has a significant impact on
            the prices, we
            reserve the right to void betting.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Volleyball_+_Beach_Volleyball">Volleyball + Beach Volleyball </span></h2>
    <h3><span id="Market_descriptions">Market descriptions </span></h3>
    <div class="inline-text">
      <span>Will there be a 4th set:</span><span> If the 4th set has started, then the outcome
        will
        be yes</span>
    </div>
    <div class="inline-text">
      <span>Will there be a 5th set</span><span>: If the 5th set has started, then the outcome
        will
        be yes</span>
    </div>
    <div class="inline-text">
      <span>Who scores [Xth] point in set [y]: </span><span>If a set ends before the Xth point is
        reached, this market is considered void (cancelled)</span>
    </div>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of a match not being finished, all undecided markets are considered
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Golden set is not considered in any of the mentioned markets.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48h after the
            initial start
            date/time, betting will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score that has a significant impact on
            the
            prices, we
            reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Official points deductions will be taken into account for all undetermined
            markets.
            Markets that
            have already been determined will not take deductions into account.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Motor_Sports">Motor Sports </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If a specific event is postponed or abandoned, then bets remain valid provided
            that
            the event is
            completed within 72 hours.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Formula_1">Formula 1 </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Unless otherwise stated in the market rules, the result at the time of the podium
            presentation is
            considered valid for settlement purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>For a Driver to be classified they have to complete at least 90% of the total
            laps.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Events being shortened due to weather conditions or other circumstances, but are
            deemed official by
            the governing association, will be settled accordingly.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a race is postponed to another day (to be determined within UTC time zone) all
            markets are
            considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Unless otherwise stated in the market rules, the dead heat rule will be applied
            if
            the number of
            winners exceeds the expected amount of winning selections for a specific market.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If one or more drivers have to start the race from the pit-lane, he/they will be
            ranked at the end
            of the starting grid for settlement purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If competitors (which are reflected as dedicated selections) retire in different
            laps, the number
            of finished laps is considered for settlement purposes.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Markets_for_fastest_lap">Markets for fastest lap </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>The driver who achieved the fastest lap in the specified lap, cluster of laps or
            race is considered
            as the winner.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>The lap time in milliseconds is valid for settlement purposes.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Head2head_markets_&amp;_Winner_of_group">Head2head markets &amp; Winner of group </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If all competitors (which are reflected as dedicated selections) retire in the
            same
            lap, the market
            will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Markets will be considered void if one of the drivers retires in or before the
            formation
            lap.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Markets_for_overtakings">Markets for overtakings </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>An overtaking needs to be maintained until the end of the lap in order to be
            considered for
            settlement purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Overtakings during the first lap are not considered for settlement
            purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Overtakings of a specific driver in the same lap when he enters or exits the pit
            are not considered
            for settlement purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Overtakings of a car in the lap of its retirement are not considered for
            settlement
            purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Lapping and unlapping is not considered as overtaking</span>
        </div>
      </li>
    </ul>
    <h3><span id="Markets_for_retirements">Markets for retirements </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>A car is considered as retired for settlement purposes if it doesn’t pass the
            finish line when the
            session is considered as completed, unless he is disqualified.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If more than 1 competitor retires in the same lap where the first retirement
            happened, the dead
            heat rule will be applied.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a car retires in the pit or pit lane, the last started lap is considered for
            settlement
            purposes.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Markets_for_pit_stops">Markets for pit stops </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>The car which enters the pit-lane first will be considered as winner of this
            market.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a car enters the pit lane and retires it will still be considered as a pit
            stop
            for settlement
            purposes.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Total_finishers_market_rules">Total finishers market rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Winner (team), Top x (team) and Head2head (team) are settled with the team which
            has the best
            ranked car in the final result.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>1st to retire (teams) is settled with the team which retired one car
            first.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>1st pit stop (teams) is settled with the team whose car entered the pit-lane
            first.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Team total overtakings is settled based on the accumulated number of overtakings
            of
            both cars in
            the specified team.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="MotoGP">MotoGP </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Unless otherwise stated in the market rules, the result at the time of the podium
            presentation is
            considered valid for settlement purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Event being shortened due to weather conditions or other circumstances, but are
            deemed official by
            the governing association, will be settled accordingly as long as full points are awarded.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a race is postponed to another day (to be determined within UTC time zone) all
            markets are
            considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If competitors (which are reflected as dedicated selections) retire in different
            laps, the number
            of finished laps is considered for settlement purposes.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Head2head_markets">Head2head markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If all competitors (which are reflected as dedicated selections) retire in the
            same
            lap, the market
            will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Markets will be considered void if one of the drivers retires in or before the
            warm-up lap.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="NASCAR">NASCAR </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          All markets include a possible overtime
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Unless otherwise stated in the market rules, the result at the time of the podium
            presentation is
            considered valid for settlement purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Event being shortened due to weather conditions or other circumstances, but are
            deemed official by
            the governing association, will be settled accordingly as long as full points are awarded.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a race is postponed to another day (to be determined within UTC time zone) all
            markets are
            considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If competitors (which are reflected as dedicated selections) retire in different
            laps, the number
            of finished laps is considered for settlement purposes</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a competitor does not participate in the race at all (no start), all bets on
            this competitor
            should be voided.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Head2head_markets">Head2head markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Markets will be considered void if one of the drivers retires in or before the
            warm- up lap.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If all competitors (which are reflected as dedicated selections) retire in the
            same
            lap, the market
            will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If all competitors (which are reflected as dedicated selections) retire in the
            same
            lap, the market
            will be voided.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Top_3_market">Top 3 market </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If the number of finishers is lower than 3, then the competitor who retired the
            latest will be
            settled as won. This applies until 3 competitors are settled as won</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Futsal">Futsal </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets (except halftime, first half markets, overtime and penalty shoot out)
            are considered
            for regular time only.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted and continued within 48h after the initial kick-off
            date,
            all open bets
            will be settled with the final result. Otherwise all undecided bets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the market remains open when the following events have already taken place:
            goals, red or
            yellow-red cards and penalties, we reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the market was opened with a missing or incorrect red card, we reserve the
            right
            to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If odds were offered with an incorrect match time (more than 2 minutes), we
            reserve
            the right to
            void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a wrong score is entered, all markets will be cancelled for the time when the
            incorrect score
            was displayed.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48 h after
            initial kick-off date
            betting will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the team names or category are displayed incorrectly, we reserve the right to
            void
            betting.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Badminton">Badminton </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of a match not being finished, all undecided markets are considered
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48h after
            initial start date,
            betting will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score which has a significant impact on
            the prices, we
            reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a team retires, all undecided markets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the players/teams are displayed incorrectly, we reserve the right to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Official points deductions will be taken into account for all undetermined
            markets.
            Markets that
            have already been determined will not take deductions into account.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Rugby_Union_+_League">Rugby Union + League </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets (except halftime, first half markets, overtime and penalty shoot out)
            are considered
            for regular time only.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted and continued within 48h after initial kick-off, all
            open
            bets will be
            settled with the final result. Otherwise all undecided bets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Regular 80 Minutes: Markets are based on the result at the end of a scheduled 80
            minutes play
            unless otherwise stated. This includes any added injury or stoppage time but does not include extra-time,
            time allocated for a penalty shootout or sudden death.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the market remains open when the following events have already taken place:
            score changes or red
            cards, we reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the market was opened with a missing or incorrect red card, we reserve the
            right
            to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If odds were offered with an incorrect match time (more than 2 minutes), we
            reserve
            the right to
            void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48h after
            initial kick-off date,
            betting will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the team names or category are displayed incorrectly, we reserve the right to
            void
            betting.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Rugby_Sevens">Rugby Sevens </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets (except halftime, first half markets, overtime and penalty shoot out)
            are considered
            for regular time only.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted and continued within 48h after initial kick-off, all
            open
            bets will be
            settled with the final result. Otherwise, all undecided bets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Regular 14 / 20 Minutes: Markets are based on the result at the end of a
            scheduled
            14 / 20 minutes
            play unless otherwise stated. This includes any added injury or stoppage time but does not include
            extra-time, time allocated for a penalty shootout or sudden death.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the market remains open when the following events have already taken place:
            score changes or red
            cards, we reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the market was opened with a missing or incorrect red card, we reserve the
            right
            to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If odds were offered with an incorrect match time (more than 1 minute), we
            reserve
            the right to
            void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48h after
            initial kick-off date
            betting will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the team names or categories are displayed incorrectly, we reserve the right
            to
            void
            betting.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Darts">Darts </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of a match not being finished, all undecided markets are considered
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score which has a significant impact on
            the prices, we
            reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the players/teams are displayed incorrectly, we reserve the right to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is not completed all undecided markets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Bullseye counts as red check out colour.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Snooker">Snooker </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of a retirement of a player or disqualification all undecided markets
            are considered
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of a re-rack, settlement stays if the outcome was determined before the
            re-rack.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>No fouls or free balls are considered for settlement of any Potted-Colour
            market.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of a frame starting but not being completed, all frame related markets
            will
            be voided
            unless the outcome has already been determined.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score which has a significant impact on
            the prices, we
            reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the players/teams are displayed incorrectly, we reserve the right to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is not completed all undecided markets are considered void.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Table_Tennis">Table Tennis </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of a match not being finished all undecided markets are considered
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48h after
            initial kick-off date,
            betting will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score which has a significant impact on
            the prices, we
            reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the players/teams are displayed incorrectly, we reserve the right to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a player retires, all undecided markets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Official points deductions will be taken into account for all undetermined
            markets.
            Markets which
            have already been determined will not take deductions into account.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Bowls">Bowls </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>In case of a retirement and walkover of any player, all undecided bets are
            considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted and continued within 48h after initial start time, all
            open bets will be
            settled with the final result. Otherwise all undecided bets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score which has a significant impact on
            the prices, we
            reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the players/teams are displayed incorrectly, we reserve the right to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a player retires all undecided markets are considered void.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Squash">Squash </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of a match not being finished, all undecided markets are considered
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48h after
            initial kick-off date,
            betting will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score which has a significant impact on
            the prices, we
            reserve the right to void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the players/teams are displayed incorrectly, we reserve the right to void
            betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a player retires, forfeits the match or is disqualified all undecided markets
            are considered
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Official points deductions will be taken into account for all undetermined
            markets.
            Markets which
            have already been determined will not take deductions into account.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If penalty point(s) are awarded by the umpire, all bets on that game will
            stand.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Aussie_Rules">Aussie Rules </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets exclude overtime unless otherwise stated.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted and continued within 48h after initial start time, all
            open bets will be
            settled with the final result. Otherwise all undecided bets are considered void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Regular 80 Minutes: Markets are based on the result at the end of a scheduled 80
            minutes play
            unless otherwise stated. This includes any added injury or stoppage time but does not include
            extra-time.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If odds were offered with an incorrect match time (more than 2 minutes), we
            reserve
            the right to
            void betting.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Regular game time: Markets are based on the result at the end of the four
            quarters
            unless otherwise
            stated. This does not include extra time.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48h after
            initial kick-off date
            betting will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the team names or category are displayed incorrectly, we reserve the right to
            void
            betting.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Field_Hockey">Field Hockey </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets are considered for regular time only unless otherwise
            mentioned.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is interrupted or postponed and is not continued within 48h after
            initial kick-off date,
            betting will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If markets remain open with an incorrect score which has a significant impact on
            prices, we reserve
            the right to void betting.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Winter_Sports">Winter Sports </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If a specific event is postponed or abandoned, then bets remain valid provided
            that
            the event is
            completed within 72 hours.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Alpine_Skiing">Alpine Skiing </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Unless otherwise stated in the market rules, the result at the time of the podium
            presentation will
            be considered valid for settlement purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Winner and Top 3 market will be settled accordingly as long as world cup points
            are
            awarded to the
            competitors. If there are no world cup points awarded, Winner and Top 3 market will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a race is postponed to another day (to be determined within UTC time zone) all
            markets will be
            voided unless takes place within 48 hours of its initial starting time at the same venue. If there is a
            venue change for a postponed race, all markets will always be voided. If a race is postponed only by a few
            minutes or hours but still takes place on the same day, all markets will be settled accordingly.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If more than 1 competitor wins the race, there will be dead heat settlement. The
            number of
            competitors who finish first will determine the dead heat factor e.g., if 3 competitors finish first with
            the exact same time, the dead head factor will be 0.33.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a competitor does not participate in the race at all (no start), all bets on
            this competitor
            will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In races with 2 runs, Winner and Top 3 markets will always be voided if the 1st
            run
            takes place but
            the 2nd run gets cancelled.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Bets on “Others” competitor will never be refunded unless the entire market gets
            voided.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Head2head_markets">Head2head markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Markets will be voided if at least one of the two competitors does not
            participate
            at all in the
            race.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If both competitors retire in the same run, the market will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If both competitors finish with the exact same time after the entire race, the
            market will be
            voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In races with 2 runs, if one competitor does not finish the 1st run and the other
            one does not
            finish the 2nd run, the competitor who participated in the 2nd run will be declared the winner of the
            market.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In races with 2 runs, if both competitors finish the 1st run, but do not qualify
            for the 2nd run,
            the competitor who finishes further ahead, will be the declared winner of the market, even if the 2nd run
            gets cancelled.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In races with 2 runs, markets that are decided after the 1st run will be settled
            accordingly even
            if the 2nd run gets cancelled. This applies in the following cases:</span>
        </div>
      </li>
      <li class="level-2">
        <div class="inline-text">
          <span>One competitor does not finish the 1st run while the other one does</span>
        </div>
      </li>
      <li class="level-2">
        <div class="inline-text">
          <span>One competitor does not qualify for the 2nd run while the other one does</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In races with 2 runs, if both competitors qualify for the 2nd run but do not
            participate in the 2nd
            run, due to injury, for example, markets will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If one of them only participates in the 2nd run, he or she will be declared the
            winner of the
            market.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Top_3_market">Top 3 market </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If there are more than 3 competitors on the first 3 places, dead heat settlement
            will be applied
            between the competitors on the last of the Top 3 ranks.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>For example, if there is one winner, one second place and two with the same time
            on
            the third
            place, the winner and the 2nd place finisher will be settled as winner and the other two will be settled
            with a dead heat factor of 0.5.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If there is one winner and three second place finishers, the winner will be
            settled
            as winner and
            the other three will be settled with a dead heat factor of 0.66.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Ski_Jumping">Ski Jumping </span></h2>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Unless otherwise stated in the market rules, the result at the time of the podium
            presentation will
            be considered valid for settlement purposes.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Winner and Top 3 market will be settled accordingly as long as world cup points
            are
            awarded to the
            competitors. If</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>there are no world cup points awarded, Winner and Top 3 market will be voided. In
            Ski Jumping
            competitions points</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>are awarded if the 1st jump has been completed and the 2nd jump gets cancelled.
            If
            a competition is
            postponed to another day (to be determined within UTC time zone) all markets will be voided unless it takes
            place within 48 hours of its initial starting time at the same venue. If there is a venue change for a
            postponed competition, all markets will always be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a competition is postponed only by a few minutes or hours but still takes
            place
            on the same day,
            all markets will be settled accordingly.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If more than 1 competitor wins the competition, there will be dead heat
            settlement.
            The number of
            competitors who finish first will determine the dead heat factor e.g., if 3 competitors finish first with
            the exact points, the dead head factor will be 0.33.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a competitor does not participate in the competition at all (no jump), all
            bets
            on this
            competitor will be voided.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Head2head_markets">Head2head markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Markets will be voided if at least one of the two competitors does not
            participate
            at all in the
            competition.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If both competitors finish with the exact same points after the entire
            competition,
            the market will
            be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If both competitors do not qualify for the 2nd jump, the competitor who finishes
            further ahead,
            will be the declared winner of the market, even if the 2nd jump gets cancelled.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the 2nd jump gets cancelled, the competitor that finished further ahead after
            the 1st jump, will
            be declared winner of the market</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If both competitors qualify for the 2nd jump but do not participate in the 2nd
            jump, due to injury,
            for example, markets will be voided. If one of them only participates in the 2nd jump, he will be declared
            the winner of the market.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If one competitor is already outside of the Top 30 and the other one is inside
            the
            Top 30 and the
            competition gets cancelled during the 1st jump, the competitor inside the Top 30 will be declared the winner
            of the market.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If both competitors are inside the Top 30 and the competition gets cancelled
            during
            the 1st jump,
            the market will be voided.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Top_3_market">Top 3 market </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If there are more than 3 competitors on the first 3 places, dead heat settlement
            will be applied
            between the competitors on the last of the Top 3 ranks.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>For example, if there is one winner, one second place and two with the same time
            on
            the third
            place, the winner and the 2nd place finisher will be settled as winner and the other two will be settled
            with a dead heat factor of 0.5.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If there is one winner and three second place finishers, the winner will be
            settled
            as winner and
            the other three will be settled with a dead heat factor of 0.66.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Athletics">Athletics </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If a specific event is postponed or abandoned, then bets remain valid provided
            that
            the event is
            completed within 72 hours.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Cricket_T20_+_ODI">Cricket T20 + ODI </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All match betting will be settled in accordance with official competition
            rules.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If there is no official result, all bets will be void. An official result
            includes
            match results
            declared official by the governing body, determined using calculation methods (VJD, DLS, etc.) for matches
            interrupted by weather or external factors.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets do not consider super overs unless otherwise mentioned.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Penalty runs are not considered in any over or delivery market (markets for
            multiple overs are not
            considered for this rule).</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Markets affected by loss of overs: In T20/ODIs/Limited overs matches interrupted
            or
            abandoned due
            to external factors (including bad weather or any other delay), bets will stand if at least 80% of agreed
            scheduled overs at the time of bet acceptance (or the relevant market percentage of overs listed in these
            rules) were completed. If it was not possible to complete 80% (or the relevant market percentage of overs
            listed in these rules) of agreed scheduled overs at time of bet acceptance then bets will be void. Should
            the outcome of a bet be already determined before the interruption and no further play would possibly change
            the outcome of such bets, bets will be settled accordingly.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is declared a 'no result' bets will be void and Meibod money returned
            to
            the customer.
            If a match/market is canceled before a ball being bowled, and it is not rescheduled within 36 hours, bets on
            the match will be classified as void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>For the Hundred, an over will consist of 5 legal deliveries, so a full innings
            will
            be made up of
            20 overs. All other rules remain the same as other limited overs formats.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Market_description">Market description </span></h3>
    <div class="inline-text">
      <span>Match betting: double chance &amp; draw no bet</span><span>; a tie will be considered
        a
        dead heat.</span>
    </div>
    <div class="inline-text">
      <span>Tied match; first-class matches</span><span>; A tie is when the side batting in the
        4th
        innings is bowled out when the scores are level.</span>
    </div>
    <div class="inline-text">
      <span>Runs in 1st over</span><span>: The 1st over must be completed for the bets to stand
        unless settlement has already been determined.
        If an innings ends during an over then that over will be deemed to be complete unless the innings is ended due
        to external factors, including bad weather, in cases all bets will be void, unless settlement already has been
        determined. In first-class matches, the market refers only to each team's innings. Extras and penalty runs in
        the particular over count towards settlement. For the Hundred, an over will consist of 5 legal deliveries, so a
        full innings will be made up of 20 overs. All other rules remain the same as other formats.</span>
    </div>
    <div class="inline-text">
      <span>Runs off 1st delivery</span><span>: the result will be determined by the number of
        runs
        added to the team total, or the first ball of the
        match. For settlement purposes, all illegal balls count as a delivery</span>
    </div>
    <div class="inline-text">
      <span>Runs in 1st over</span><span>: The first over must be completed for bets to stand. If
        the innings ends during the first over, the
        over will be deemed to be completed.;</span>
    </div>
    <div class="inline-text">
      <span>Most Fours</span><span>; Only 'fours' scored from the bat ( off any delivery ) will
        count toward to total 'four' count.
        overthrows and 'fours' s all run will not count towards the market. fours in a super over do not count. In
        first-class games, only fours in the first innings will count.</span>
    </div>
    <div class="inline-text">
      <span>Most Sixes (per team inning market)</span><span>: Only 'sixes' scored from the bat (
        off any delivery ) will count toward to total
        'six'count.overthrows and 'sixes' s all run will not count towards the market. Sixes scored in a super over do
        not count. In first-class games, only first innings sixes count.</span>
    </div>
    <div class="inline-text">
      <span>Most Extras</span><span>: All wide deliveries, no balls, byes, leg byes, and penalty
        runs in the match count towards the final
        result. If there is runs of the bat at the same time extras are being scored, the runs off the bat do not count
        towards the extras tally. Extras in a super over don't count. In first-class games, only first innings extras
        will count.</span>
    </div>
    <div class="inline-text">
      <span>Most run outs conceded</span><span>: A run out 'conceded' means that a team member
        will
        be run out while batting. Run outs in a super over
        do not count. First class games, only first innings runouts count.</span>
    </div>
    <div class="inline-text">
      <span>Highest first over</span><span>: the first over must be completed for bets to stand
        unless settlement has already been determined. In
        limited overs matches, if a match is shortened due to external factors after the start of the first innings, the
        market will be void. In first-class matches, the market refers only to each team's first innings. Extras and
        penalty runs contribute towards settlement.For the Hundred, an over will consist of 5 legal deliveries, so a
        full innings will be made up of 20 overs. All other rules remain the same as other formats.</span>
    </div>
    <div class="inline-text">
      <span>Highest first group of overs</span><span>: If the specified number of overs are not
        complete the bet will be void, unless the team is all out,
        declares, reaches their target or settlement of the bet has already been determined. In limited over matches, if
        the match is shortened due to external factors after the start of the first innings, the market will be void. In
        first-class matches the market only refers to each team's first innings. For the Hundred, an over will consist
        of 5 legal deliveries, so a full innings will be made up of 20 overs. All other rules remain the same as other
        formats.</span>
    </div>
    <div class="inline-text">
      <span>Highest first partnership</span><span>: If the batting team reaches the end of their
        allotted overs, reaches their target or declares before
        the first wicket falls, the result will be the total amassed. For settlement purposes, a batsman retiring hurt
        does not count as a wicket. In limited overs matches, bets will be void if the innings has been reduced to
        external factors, including bad weather unless the settlement is already determined. In drawn first-class
        matches, bets will be void if fewer than 200 overs have been bowled, unless settlement of the bet has been
        already been determined. In first-class matches the market only refers to each team's first innings.</span>
    </div>
    <div class="inline-text">
      <span>Match Fours</span><span>: Only fours scored from the bat ( off any delivery- legal or
        not) will count towards the total fours.
        Overthrows, all run fours and extras do not count. fours in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Match Sixes</span><span>: Only sixes scored off the bat ( off any delivery - legal or
        not) will count towards the total sixes
        count. Overthrows, all run sixes and extras do not count. sixes in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Match Extras</span><span>: All wide deliveries, no balls, byes, leg byes and penalty
        runs in the match count towards the final
        result. If there is runs of the bat at the same time extras are being scored, the runs off the bat do not count
        towards the extras tally. Extras in a super over don't count. In first-class games, only first innings extras
        will count.</span>
    </div>
    <div class="inline-text">
      <span>Match Runouts</span><span>: run outs in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Maximum over in a match</span><span>; All runs, including extras, count towards
        settlement. Super overs do not count.</span>
    </div>
    <div class="inline-text">
      <span>Match top batsman (highest batting score by an individual batsman)</span><span>: When
        2
        or more batsmen score the same amount of runs, dead heat rules apply. Runs scored in a super
        over do not count.If a player was named at the toss, but later is removed as a substitute, that player will
        still be counted, as will the replacement player.</span>
    </div>
    <div class="inline-text">
      <span>Match top Bowler (the bowler who takes the most wickets in the match)</span><span>:
        In
        limited overs matches the bets will be void if it has not been possible to complete at least 50%
        of the overs scheduled to be bowled in each innings at the time the bet was placed due to the external factors,
        including bad weather. If two or more bowlers end up taking the same amount of wickets, the bowler who conceded
        the least amount of runs will be declared the winner. If 2 or more bowlers end up with the same amount of
        wickets and runs conceded, dead heat rules apply. Wickets taken in a super over do not count.If a player was
        named at the toss, but later is removed as a substitute, that player will still be counted, as will the
        replacement player.”</span>
    </div>
    <div class="inline-text">
      <span>Man of the Match</span><span>: dead heat rules apply. If no man of the match
        announced,
        bets will be void.</span>
    </div>
    <div class="inline-text">
      <span>Runs off delivery</span><span>: For settlement purposes, all illegal balls count as
        deliveries. For example, if an over starts with a
        wide, then the first ball will be settled as 1 and, although there has not been a legal ball bowled, the next
        ball will be deemed as delivery 2 for that over. If a delivery leads to a free hit or a free hit is to be
        re-bowled because of an illegal delivery, the runs scored off the additional delivery do not count. All runs,
        whether off the bat or not are included. For example, a wide with three extra runs taken equates to 4 runs in
        total off that delivery.</span>
    </div>
    <div class="inline-text">
      <span>Runs in an over</span><span>: The specified over must be completed for the bets to
        stand unless settlement has already been
        determined. If an innings ends in that over, the over will be determined as completed. If an over does not
        commence for any reason, the bet will be considered void. Extras and penalty runs do count towards
        settlement.</span>
    </div>
    <div class="inline-text">
      <span>Boundary in an Over</span><span>: Only boundaries scored from the bat ( off any
        delivery - legal or not) will count as a boundary. All
        run fours and extras do not count as boundaries.</span>
    </div>
    <div class="inline-text">
      <span>Wickets in an Over</span><span>: Any wickets in an over will count, including run
        outs.
        A batsman retiring hurt does not count as a
        wicket. If a batsman is timed out or retired out, the wicket will be deemed to have been taken the ball before.
        For the Hundred, an over will consist of 5 legal deliveries, so a full innings will be made up of 20 overs. All
        other rules remain the same as other formats.</span>
    </div>
    <div class="inline-text">
      <span>Odd/Even runs</span><span>: Zero will be deemed as Even.</span>
    </div>
    <div class="inline-text">
      <span>Runs in groups of Overs: If the specified amount of overs are not completed, the bet
        will be void,
        unless the team is all out, declares, reached their target or settlement of the bet has already been
        determined</span>
    </div>
    <div class="inline-text">
      <span>Wickets in groups of overs</span><span>: If the specified amount of overs are not
        completed, the bet will be void, unless the team is all out,
        declares, reached their target or settlement of the bet has already been determined. A batsman retiring hurt
        does not count as a wicket. If a batsman is timed out or retired out, the wicket will be deemed to have been
        taken the ball before. In limited overs matches, bets will be void if it has not been possible to complete at
        least 80% of the specified overs have been bowled at the time the bet was placed due to external factors,
        including bad weather, unless settlement of the bet has already been determined. For the Hundred, an over will
        consist of 5 legal deliveries, so a full innings will be made up of 20 overs. All other rules remain the same as
        other formats.</span>
    </div>
    <div class="inline-text">
      <span>Runs in a session</span><span>: Total amount of runs in a session, regardless of
        which
        team scores them. If there has been fewer than
        20 overs bowled in a session, bets will be void, unless settlement has already been reached.</span>
    </div>
    <div class="inline-text">
      <span>Innings runs</span><span>: The number of runs scored in specific innings.</span>
    </div>
    <div class="inline-text">
      <span>Innings wickets</span><span>: Retired hurt does not count as a wicket.</span>
    </div>
    <div class="inline-text">
      <span>Innings Fours</span><span>: specific innings fours. rules same as total match
        fours.</span>
    </div>
    <div class="inline-text">
      <span>Innings Sixes</span><span>: specific innings sixes. rules same as total match
        sixes.</span>
    </div>
    <div class="inline-text">
      <span>Innings extras</span><span>: How many extras will be added to a teams score as a
        whole
        inning.</span>
    </div>
    <div class="inline-text">
      <span>Innings run outs</span><span>; How many run outs will occur in a set innings</span>
    </div>
    <div class="inline-text">
      <span>Maximum overs in an innings</span><span>: How many runs will be scored in the highest
        scoring over of the innings.</span>
    </div>
    <div class="inline-text">
      <span>Innings runs - Odd/ Even</span><span>: Total innings score judged to be odd or even.
        0
        counts as even</span>
    </div>
    <div class="inline-text">
      <span>Innings to finish with a boundary</span><span>; Only boundaries scored from the bat (
        off any delivery - legal or not) will count as a boundary. All
        run fours and extras do not count as boundaries. In limited overs matches, bets will be void if there is any
        reduction in the number of overs scheduled to have been bowled at the time the bet was placed due to external
        factors, including bad weather.</span>
    </div>
    <div class="inline-text">
      <span>Over/Under Wides</span><span>: 'for settling purposes, over and under wides is for
        the
        nominated bowling team bowling the
        wides'</span>
    </div>
    <div class="inline-text">
      <span>Exact runs in Innings</span><span>: In limited over matches, bets will be void if
        there
        is any reduction in the number of overs to have
        been bowled at the time the bet was placed due to external factors, including bad weather.</span>
    </div>
    <div class="inline-text">
      <span>Top batsmen in innings</span><span>: the batsmen (or appear as a substitute) who has
        the highest individual run score of that specified
        innings. In limited overs matches, bets will be void if it has not been possible to complete at least 50% of the
        overs scheduled to have been bowled at the time the bet was placed due to external factors, including bad
        weather. When 2 players end up on the exact amount of runs, the dead heat rule applies. Runs scored in a super
        over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Top Bowler in an innings</span><span>: The bowler (or appear as a substitute) who has
        taken the most amount of wickets in specified innings.
        In limited overs matches the bets will be void if it has not been possible to complete at least 50% of the overs
        scheduled to be bowled in each innings at the time the bet was placed due to the external factors, including bad
        weather.</span>
    </div>
    <div class="inline-text">
      <span>If two or more bowlers end up taking the same amount of wickets, the bowler who
        conceded the least
        amount of runs will be declared the winner. If 2 or more bowlers end up with the same amount of wickets and runs
        conceded, dead heat rules apply. Wickets taken in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Last man standing</span><span>; which batsmen will be not out upon completion of the
        innings.; If there are two or more batsmen who
        are not out at the completion of the innings, the winner for the purpose of settlement will be the last batsmen
        to face a ball ( legal or not). Players will not to be deemed to have been not out if they were no longer at the
        crease having retired hurt or did not bat. In limited overs matches, bets will be void if, subsequent to placing
        the bet, the innings has been reduced in any way due to external factors, including bad weather.</span>
    </div>
    <div class="inline-text">
      <span>Batsman Runs</span><span>; how many runs will the nominated batsmen (or appear as a
        substitute) score in specific innings. If a
        batsman does not bat, the bet will be void. If a batsman is not in the starting 11, the bet will be void. If a
        batsmen retires hurt and returns, the additional runs will count towards his innings total. If a batsmen retires
        and doesn't return, the bet settlement will be on the current score the batter has as a retired batsman. Runs
        scored in a super over don't count.</span>
    </div>
    <div class="inline-text">
      <span>Batsman fours</span><span>: How many boundaries a batsman will hit, including of
        illegal deliveries. All run fours do not count.
        Fours scored in a super over do not count. overthrows and extras do not count. If a batsman does not bat, bet is
        void.</span>
    </div>
    <div class="inline-text">
      <span>Batsman sixes</span><span>: How many sixes a batsman will hit, including off illegal
        deliveries. All run sixes, do not count.
        sixes scored in a super over do not count. overthrows and extras do not count. If a batsman does not bat, bet is
        void</span>
    </div>
    <div class="inline-text">
      <span>Batsman milestones</span><span>: Will a batsman reach 'xx '. Only runs coming from
        the
        bat count. Including legal and illegal
        deliveries.</span>
    </div>
    <div class="inline-text">
      <span>Rabbit runs</span><span>: The number 11 is taken to be the last man to come out to
        bat
        in the innings, regardless of previously
        stated batting order. If the innings in completed without the number 11 coming to the crease, that batsmen will
        be deemed to have scored 0.</span>
    </div>
    <div class="inline-text">
      <span>Method of next dismissal</span><span>: 'How will the named batsman be out?' If the
        specified batsman is not out, bets will be void. If the
        specified batsmen retires out and does not return, the bets will be void. If the retired batsman does return,
        the bets will stand. Caught and bowled is included in Fielder Catch. Other dismissal method in cricket includes:
        hit wicket, timed out, obstructing the field and hit the ball twice.</span>
    </div>
    <div class="inline-text">
      <span>Fall of next wicket</span><span>: 'how many runs will the batting team be on when the
        next wicket falls' If the batting team reaches
        the end of their allotted overs, reaches their target or declares before the specified wicket falls, the result
        will be the total amassed. The retiring batsman does not count as a wicket.</span>
    </div>
    <div class="inline-text">
      <span>Next man out</span><span>: if either batsman retires hurt or the batsman at the
        crease
        is different from those quoted, the bets
        placed on both batsmen will be declared void.</span>
    </div>
    <div class="inline-text">
      <span>Method of next dismissal</span><span>: If a specified wicket does not fall, bets will
        be void.</span>
    </div>
    <div class="inline-text">
      <span>Total Player Performance</span><span>: Points are allocated in this manner: 1 point
        per
        run, 20 points per wicket, 10 points per catch and
        25 points per stumping</span>
    </div>
    <div class="inline-text">
      <span>Batsman Match Bet</span><span>: Both players must be named in the starting 11 (or
        appear as a substitute).If either does not get
        named then bets are void. Both batsmen need to bat for the market to be valid. . Runs in a super over do not
        count.</span>
    </div>
    <div class="inline-text">
      <span>Bowler Matchbet</span><span>: Both players must be named in the starting 11 (or
        appear
        as a substitute) If either does not then
        subsequently bowl all bets are still settled. Wickets in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>All-rounder match bet (or appear as a substitute)</span><span>: Points are scored as
        follows: 1 point per run. 20 points per wicket. 10 points per catch. 25 points
        per stumping.Both players must be named in the starting 11. If either does not then subsequently bat or bowl,
        all bets are still settled. Runs in a super over do not count. Keeper match bet (or appear as a substitute): as
        'Allrounder match bet above'</span>
    </div>
    <div class="inline-text">
      <span>Free Hit</span><span>: The result will be determined by the number of runs added to
        the
        team total, off the specified
        delivery. If the free hit is re-bowled because of an illegal delivery, the runs scored off the second free hit
        do not count. Extras and penalty runs will count towards settlement.</span>
    </div>
    <div class="inline-text">
      <span>Race to 'x' runs</span><span>: All bets stand. If neither batsman reaches 'x' the
        markets will be settled as 'Neither'</span>
    </div>
    <div class="inline-text">
      <span>Next to hit a six</span><span>: All bets stand. If neither batsman hits a six the
        markets will be settled as 'Neither'</span>
    </div>
    <div class="inline-text">
      <span>Next to take a wicket</span><span>: If none of the named bowlers take the next
        wicket,
        the market will be settled as ' none of the
        above'. A batsman retiring hurt does not count as a wicket. Run outs, Timed out, and any other method of
        dismissal not awarded to the bowler will be settled as 'none of the above'</span>
    </div>
    <div class="inline-text">
      <span>Winning Over</span><span>: In which over of the named team's innings be completed.
        All
        bets will be void if there is no official
        result. In limited overs matches, all bets will be void if, subsequent to placing the bet, the maximum overs
        possible are reduced in any way.</span>
    </div>
    <h3><span id="Settlement_and_cancellation_rules">Settlement and cancellation rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All match betting will be settled in accordance with official competition rules.
            If
            there is no
            official result, all bets will be void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of a tie, if the official competition rules do not determine a winner
            then dead-heat
            rules will apply.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In competitions where a bowl off or super over determines a winner, bets will be
            settled on the
            official result.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In first-class matches, if the official result is a tie, bets will be settled as
            a
            dead heat
            between both teams. Bets on a draw will be settled as a loss.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Dead Heat rule: in the event of a Dead Heat, selections that are settled due to
            the
            dead heat rule
            shall be paid as 'Half Win' (ie) a initial 10 unit bet at 1.70 match winner would = 17.00 for a win. - A
            dead heat rule ( two declared winners half win each ) = 17.00/2 = 8.50 return to player on above example
            bet.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Other markets in the given 'dead heat' match are settled as per normal settlement
            rules.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a team declares, that innings will be considered complete for settlement
            purposes</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>For eCricket - If for any reason a match is deemed to be abandoned before the
            completion of the
            match, then all match bets will be void and Meibos refunded unless an outcome/market has already reached an
            unconditional conclusion.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Pre-match_Market_Details">Pre-match Market Details </span></h3>
    <h3><span id="Match_markets">Match markets </span></h3>
    <div class="inline-text">
      <span>Match Betting - Who will win the match?</span><span>: All match betting will be
        settled
        in accordance with official competition rules. In matches affected
        by adverse weather, bets will be settled according to the official result. If there is no official result, all
        bets will be void. In the case of a tie, if the official competition rules do not determine a winner then
        deadheat rules will apply. In competitions where a bowl off or super over determines a winner, bets will be
        settled on the official result. In First Class Matches, if the official result is a tie, bets will be settled as
        a dead-heat between both teams. Bets on the draw will be settled as losers. If a match is abandoned due to
        external factors, then bets will be void unless a winner is declared based on the official competition rules. If
        a match is cancelled then all bets will be void if it is not replayed or restarted within 36 hours of its
        advertised start time.</span>
    </div>
    <div class="inline-text">
      <span>Match Betting: Double Chance - Will the match result be either of the three options
        given? </span><span>A tie will be settled as a dead heat. All match betting will be settled in accordance with
        official
        competition rules. If there is no official result, all bets will be void.</span>
    </div>
    <div class="inline-text">
      <span>Match Betting: Draw No Bet - Who will win the match given that all bets will be void
        if
        the match is a
        draw? </span><span>A tie will be settled as a dead heat. All match betting will be settled in accordance with
        official
        competition rules. If there is no official result, all bets will be void.</span>
    </div>
    <div class="inline-text">
      <span>Tied Match - Will the match be tied? </span><span>All bets will be settled according
        to
        the official result. If the match is abandoned or there is no
        official result, all bets will be void. For First Class matches a tie is when the side batting in the fourth
        innings is bowled out when the scores are level.</span>
    </div>
    <div class="inline-text">
      <span>Toss Winner - Who will win the toss?</span><span> If no toss takes place, all bets
        will
        be void.</span>
    </div>
    <div class="inline-text">
      <span>Toss/Win Double - Who will win the toss, and then who will win the game?</span><span>
        Toss Winner rules as above. Match Winner rules as above.</span>
    </div>
    <div class="inline-text">
      <span>Runs in First Over - How many runs will be scored in the first over of the
        match?</span><span> The first over must be completed for bets to stand unless settlement has already been
        determined. If
        an innings ends during an over then that over will be deemed to be complete unless the innings is ended due to
        external factors, including bad weather, in which case all bets will be void, unless settlement has already been
        determined. In First Class matches the market refers only to each team’s first innings. Extras and penalty runs
        in the particular over count towards settlement</span>
    </div>
    <div class="inline-text">
      <span>Runs off First Delivery - How many runs will be scored off the first delivery of the
        match?
      </span><span>The result will be determined by the number of runs added to the team total, off the first ball of
        the
        match. For settlement purposes, all illegal balls count as deliveries. For example, if the over starts with a
        wide, then the first delivery will be settled as 1 and, although there has not been a legal ball bowled, the
        next ball will be deemed as delivery 2 for that over. If the delivery leads to free hit, the runs scored off the
        additional delivery do not count. All runs, whether off the bat or not are included. For example, a wide with
        three extra runs taken equates to 4 runs in total off that delivery. In First Class matches the market refers
        only to each team’s first innings.</span>
    </div>
    <div class="inline-text">
      <span>Runs in Groups of Overs - How many runs will be scored in the first specified number
        of
        overs?
      </span><span>If the specified number of overs are not complete the bet will be void, unless the team is all out,
        declares, reaches their target or settlement of the bet has already been determined before the reduction. In
        limited overs matches, bets will be void if the total innings is reduced at any stage to less than 80% of the
        stated maximum overs at the time the bet was placed, unless settlement of the bet was already determined. In
        First Class matches the market refers only to each team’s first innings.</span>
    </div>
    <div class="inline-text">
      <span>Wickets in Groups of Overs - How many wickets will fall in the first specified number
        of overs?
      </span><span>If the specified number of overs are not complete the bet will be void, unless the team is all out,
        declares, reaches their target or settlement of the bet has already been determined. In limited overs matches,
        bets will be void if the total innings is reduced at any stage to less than 80% of the stated maximum overs at
        the time the bet was placed, unless settlement of the bet was already determined before the reduction. For
        settlement purposes, if a batsman is timed out or retired out then the wicket is deemed to have taken place on
        the previous ball. Retired hurt does not count as a dismissal. In First Class matches the market refers only to
        each team’s first innings.</span>
    </div>
    <div class="inline-text">
      <span>Runs in First Partnership - How many runs will the batting team have scored when the
        first wicket
        falls? </span><span>If the batting team reaches the end of their allotted overs, reaches their target or
        declares before
        the first wicket falls, the result will be the total amassed. For settlement purposes, a batsman retiring hurt
        does not count as a wicket. In limited overs matches, bets will be void if the innings has been reduced due to
        external factors, including bad weather, if it has not been possible to complete at least 80% of the overs
        scheduled to be bowled in the innings, unless settlement has already been determined. Result will be considered
        determined if the lines at which the bet was placed is passed, or if a wicket has fallen. In drawn First Class
        matches, bets will be void if fewer than 200 overs have been bowled, unless settlement of the bet has already
        been determined. In First Class matches the market refers only to each team’s first innings.</span>
    </div>
    <div class="inline-text">
      <span>Method of First Dismissal - How will the first batsman be out? </span><span>Retired
        hurt will not count as the first wicket. If the first batsman retires out, all bets will be
        void. If the specified wicket does not fall, all bets will be void. In First Class matches the market refers
        only to each team’s first innings.</span>
    </div>
    <div class="inline-text">
      <span>Match Fours - How many fours will be hit in the match? </span><span>In limited overs
        matches, bets will be void if it has not been possible to complete at least 80% of the
        overs scheduled to be bowled due to external factors, including bad weather, unless settlement of the bet has
        already been determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200
        overs have been bowled, unless settlement of the bet has already been determined. Only fours scored from the bat
        (off any delivery – legal or not) will count towards the total fours. Overthrows, all run fours and extras do
        not count. Fours scored in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Match Sixes - How many sixes will be hit in the match? </span><span>In limited overs
        matches, bets will be void if it has not been possible to complete at least 80% of the
        overs scheduled to be bowled due to external factors, including bad weather, unless settlement of the bet has
        already been determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200
        overs have been bowled, unless settlement of the bet has already been determined. Only sixes scored from the bat
        (off any delivery – legal or not) will count towards the total sixes. Overthrows and extras do not count. Sixes
        scored in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Match Run Outs - How many run outs will there be in the match? </span><span>In
        limited
        overs matches, bets will be void if it has not been possible to complete at least 80% of the
        scheduled overs in either innings due to external factors, including bad weather, unless settlement of the bet
        has already been determined before the reduction. In drawn First Class matches, bets will be void if fewer than
        200 overs have been bowled, unless settlement of the bet has already been determined. Run outs in a super over
        do not count.</span>
    </div>
    <div class="inline-text">
      <span>Maximum Over in Match - How many runs will be scored in the highest scoring over in
        the
        match?
      </span><span>In limited overs matches, bets will be void if it has not been possible to complete at least 80% of
        the
        overs scheduled to be bowled due to external factors, including bad weather, unless settlement of the bet has
        already been determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200
        overs have been bowled, unless settlement of the bet has already been determined before the reduction. All runs,
        including extras, count towards settlement. Super overs do not count.</span>
    </div>
    <div class="inline-text">
      <span>Match Ducks - How many ducks will be scored in total in the match? </span><span>In
        limited overs matches, bets will be void if it has not been possible to complete at least 80% of the
        overs scheduled to be bowled due to external factors, including bad weather, unless settlement of the bet has
        already been determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200
        overs have been bowled, unless settlement of the bet has already been determined. A duck is classed as someone
        being dismissed for zero runs. Retired hurt does not count as a dismissal. Ducks in a super over do not
        count.</span>
    </div>
    <div class="inline-text">
      <span>Match Wides - How many wides will be scored in total in the match? </span><span>In
        limited overs matches, bets will be void if it has not been possible to complete at least 80% of the
        overs scheduled to be bowled due to external factors, including bad weather, unless settlement of the bet has
        already been determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200
        overs have been bowled, unless settlement of the bet has already been determined. Any runs resulting from a wide
        delivery, except penalty runs, will count towards the final total. Wides in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Match Extras - How many extras will be scored in total in the match? </span><span>In
        limited overs matches, bets will be void if it has not been possible to complete at least 80% of the
        overs scheduled to be bowled due to external factors, including bad weather, unless settlement of the bet has
        already been determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200
        overs have been bowled, unless settlement of the bet has already been determined. All wide deliveries, no balls,
        byes, leg byes and penalty runs in the match count towards the final result. If there are runs off the bat as
        well as extras from the same delivery, the runs off the bat do not count towards the final total. Extras in a
        super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Match Wickets - How many wickets will fall in the match? </span><span>In limited
        overs
        matches, bets will be void if it has not been possible to complete at least 80% of the
        overs scheduled to be bowled due to external factors, including bad weather, unless settlement of the bet has
        already been determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200
        overs have been bowled, unless settlement of the bet has already been determined. Retired hurt does not count as
        a dismissal. Wickets in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Match Top Batsman - Which batsman will score the most runs in the match?
      </span><span>The result of this market is determined on the batsman with the highest individual score in the
        match.
        In limited overs matches, bets will be void if it has not been possible to complete at least 50% of the overs
        scheduled to be bowled in each innings at the time the bet was placed due to external factors, including bad
        weather. Top batsmen bets for First Class matches apply only to the first innings of each team, and will be void
        if fewer than 200 overs have been bowled, unless both first innings have been completed. If a player was named
        at the toss, but later is removed as a substitute, that player will still be counted, as will the replacement
        player. If a batsman does not bat, but was named in the starting XI (or later introduced as a substitute), bets
        on that batsman will stand. When two or more players score the same number of runs, dead-heat rules will apply.
        Runs scored in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Match Top Bowler - Which bowler will take the most wickets in the match?
      </span><span>The result of this market is determined on the bowler with the most wickets in the match. In limited
        overs matches, bets will be void if it has not been possible to complete at least 50% of the overs scheduled to
        be bowled in each innings at the time the bet was placed due to external factors, including bad weather. Top
        bowler bets for First Class matches apply only to the first innings of each team, and will be void if fewer than
        200 overs have been bowled, unless both first innings have been completed. If a player was named at the toss,
        but later is removed as a substitute, that player will still be counted, as will the replacement player. If a
        bowler does not bowl, but was named in the starting XI (or later introduced as a substitute), bets on that
        bowler will stand. If two or more bowlers have taken the same number of wickets, the bowler who has conceded the
        fewest runs will be the winner. If there are two or more bowlers with the same wickets taken and runs conceded,
        dead heat rules will apply. Wickets taken in a super over don’t count.</span>
    </div>
    <div class="inline-text">
      <span>Team of Top Batsman - Which team will contain the top batsman in the match?
      </span><span>Same rules apply as Match Top Batsman, with dead heat rules applying if the runs scored by the top
        batsman on both teams is the same.</span>
    </div>
    <div class="inline-text">
      <span>Team of Top Bowler- Which team will contain the top bowler in the match?
      </span><span>Same rules apply as Match Top Bowler, with dead heat rules applying if the wickets taken by the top
        bowler on both teams is the same.</span>
    </div>
    <div class="inline-text">
      <span>Man of the Match - Who will be named Man of the Match? </span><span>Bets will be
        settled on the officially declared man of the match. Dead-heat rules apply. If no man of
        the match is officially declared then all bets will be void.</span>
    </div>
    <div class="inline-text">
      <span>First Innings Lead - What will be the run deficit between first innings in a First
        Class match?
      </span><span>Both first innings must be completed. Dead heat rules apply in the case of a tie. In drawn First
        Class
        matches, bets will be void if fewer than 200 overs have been bowled, unless settlement of the bet has already
        been determined.</span>
    </div>
    <div class="inline-text">
      <span>Fifty/Hundred in Match - Will there be a fifty/hundred scored in the match?
      </span><span>Any score of 50 and above counts as a fifty. Similar for hundred. In limited overs matches, bets will
        be void if it has not been possible to complete at least 80% of the overs scheduled to be bowled due to external
        factors, including bad weather, unless settlement of the bet has already been determined before the reduction.
        In First Class matches, this market refers to just the first innings of the match, not both teams' first
        innings. In drawn First Class matches, bets will be void if fewer than 200 overs have been bowled, unless
        settlement of the bet has already been determined.</span>
    </div>
    <div class="inline-text">
      <span>Fifty/Hundred in First Innings - Will there be a fifty/hundred scored in the first
        innings of the
        match? </span><span>Any score of 50 and above counts as a fifty. Similar for hundred. In limited overs matches,
        bets will
        be void if it has not been possible to complete at least 80% of the overs scheduled to be bowled in the first
        innings due to external factors, including bad weather, unless settlement of the bet has already been determined
        before the reduction. In drawn First Class matches, the innings must be completed, or over 200 overs, unless
        settlement of the bet has already been determined before the reduction.</span>
    </div>
    <div class="inline-text">
      <span>Highest Individual Score - What will be the highest score by a batsman in the match?
      </span><span>In limited overs matches, bets will be void if it has not been possible to complete at least 80% of
        the
        overs scheduled to be bowled due to external factors, including bad weather, unless settlement of the bet has
        already been determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200
        overs have been bowled, unless settlement of the bet has already been determined Dead heat rules apply.</span>
    </div>
    <div class="inline-text">
      <span>Rabbit Runs - How many runs will the number 11s score in the match? </span><span>In
        limited overs matches, bets will be void if it has not been possible to complete at least 80% of the
        overs scheduled to be bowled due to external factors, including bad weather, unless settlement of the bet has
        already been determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200
        overs have been bowled. The number 11 is taken to be the last man to come out to bat in the innings, regardless
        of previously stated batting order. If more than 11 players bat, the market will be void unless this is due to
        concussion substitutions. If the innings is completed without the number 11 coming to the crease, that batsman
        will be deemed to have scored 0.</span>
    </div>
    <h3><span id="Head_to_Head">Head to Head </span></h3>
    <div class="inline-text">
      <span>Most Runs in First Over - Which team will score the most runs in the first over of
        their first
        innings?</span><span> Same as Runs in First Over.</span>
    </div>
    <div class="inline-text">
      <span>Most Runs in Groups of Overs - Which team will score the most runs in the first
        specified number of
        overs of their first innings? </span><span>Same as Runs in Groups of Overs.</span>
    </div>
    <div class="inline-text">
      <span>Highest First Partnership - Which team will score the most runs before losing their
        first wicket?
      </span><span>Same as Runs in First Partnership.</span>
    </div>
    <div class="inline-text">
      <span>Most Fours - Which team will hit the most fours? </span><span>In limited overs
        matches,
        bets will be void if it has not been possible to complete at least 80% of the
        scheduled overs in either innings due to external factors, including bad weather, unless settlement has been
        determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200 overs have
        been bowled, unless settlement of the bet has already been determined. In First Class games, only first innings
        fours will count. Only fours scored from the bat (off any delivery – legal or not) will count towards the total
        fours. Overthrows, all run fours and extras do not count. Fours scored in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Most Sixes - Which team will hit the most sixes? </span><span>In limited overs
        matches,
        bets will be void if it has not been possible to complete at least 80% of the
        scheduled overs in either innings due to external factors, including bad weather, unless settlement has been
        determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200 overs have
        been bowled, unless settlement of the bet has already been determined. In First Class games, only first innings
        sixes will count. Only sixes scored from the bat (off any delivery – legal or not) will count towards the total
        fours. Overthrows and extras do not count. Sixes scored in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Batsman Matchbet - Which of the named players will score the most runs?
      </span><span>In
        limited overs matches, bets will be void if it has not been possible to complete at least 80% of the
        scheduled overs in either innings due to external factors, including bad weather, unless settlement has been
        determined. In drawn First Class matches, bets will be void if fewer than 200 overs have been bowled, unless
        settlement of the bet has already been determined. Both players must be named in the starting eleven. If either
        does not then subsequently bat all bets are void. In First Class games, only first innings runs will count. Runs
        scored in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Bowler Matchbet - Which of the named players will take the most wickets?
      </span><span>In limited overs matches, bets will be void if it has not been possible to complete at least 80% of
        the
        scheduled overs in either innings due to external factors, including bad weather, unless settlement has been
        determined. In drawn First Class matches, bets will be void if fewer than 200 overs have been bowled, unless
        settlement of the bet has already been determined. Both players must be named in the starting eleven. If either
        does not then subsequently bowl all bets are still settled. In First Class games, only first innings wickets
        will count. If no bowlers take a wicket in an innings then all bets will be void. Wickets taken in a super over
        do not count.</span>
    </div>
    <div class="inline-text">
      <span>All-Rounder Matchbet - Which of the named players will score the most points in the
        player performance
        scoring system? </span><span>Points are scored as follows: 1 point per run, 20 points per wicket, 10 points per
        catch, 25 points per
        stumping. In limited overs matches, bets will be void if it has not been possible to complete at least 80% of
        the scheduled overs in either innings due to external factors, including bad weather. In drawn First Class
        matches, bets will be void if fewer than 200 overs have been bowled. Both players must be named in the starting
        eleven. If either player does not then subsequently bat or bowl then all bets are still settled. In First Class
        games, only first innings points will count. Points scored in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Keeper Matchbet - Which of the named wicket keepers score the more points in the
        player
        performance
        scoring system? </span><span>Points are scored as above. In limited overs matches, bets will be void if it has
        not been possible to
        complete at least 80% of the scheduled overs in either innings due to external factors, including bad weather.
        In drawn First Class matches, bets will be void if fewer than 200 overs have been bowled. Both named players
        must start the match as a wicket keeper but if their playing role changes for any reason all bets will still be
        settled in accordance with scoring system above. In First Class games, only first innings points will count.
        Points scored in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Most Keeper Catches - Which team’s wicket keeper will take more catches?
      </span><span>In limited overs matches, bets will be void if it has not been possible to complete at least 80% of
        the
        scheduled overs in either innings due to external factors, including bad weather, unless settlement has been
        determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200 overs have
        been bowled, unless settlement of the bet has already been determined. If a team changes their wicket keeper mid
        innings, the catches taken by the replacement will count towards settlement. In First Class games, only first
        innings catches will count. Catches taken in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Most Catches - Which team will take more catches?</span><span> Including fielders and
        wicket keeper.</span>
    </div>
    <div class="inline-text">
      <span>In limited overs matches, bets will be void if it has not been possible to complete
        at
        least 80% of the
        scheduled overs in either innings due to external factors, including bad weather, unless settlement has been
        determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200 overs have
        been bowled, unless settlement of the bet has already been determined. In First Class games, only first innings
        catches will count. Catches taken in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Most Stumpings - Which team will take more stumpings? </span><span>In limited overs
        matches, bets will be void if it has not been possible to complete at least 80% of the
        scheduled overs in either innings due to external factors, including bad weather, unless settlement has been
        determined before the reduction. In drawn First Class matches, bets will be void if fewer than 200 overs have
        been bowled, unless settlement of the bet has already been determined. In First Class games, only first innings
        stumpings will count. Stumpings taken in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Most Run Outs Conceded - Which team will concede the most run outs in the match?
      </span><span>A run out “conceded” means that a member of that team will be run out while batting. In limited overs
        matches, bets will be void if it has not been possible to complete at least 80% of the scheduled overs in either
        innings due to external factors, including bad weather, unless settlement has been determined before the
        reduction. In drawn First Class matches, bets will be void if fewer than 200 overs have been bowled, unless
        settlement of the bet has already been determined. In First Class games, only first innings run outs will count.
        Run Outs in a super over do not count.</span>
    </div>
    <h3><span id="Team_Markets">Team Markets </span></h3>
    <div class="inline-text">
      <span>Runs in Team A First Over - How many runs will Team A score off the first over of
        their
        first innings?
      </span><span>Same as Runs in First Over.</span>
    </div>
    <div class="inline-text">
      <span>Runs in Team A Group of Overs - How many runs will Team A score in the first
        specified
        number of overs?
      </span><span>Same as Runs in Groups of Overs.</span>
    </div>
    <div class="inline-text">
      <span>Runs in Team A First Partnership - How many runs will Team A score before their first
        wicket falls?
      </span><span>Same as Runs in First Partnership.</span>
    </div>
    <div class="inline-text">
      <span>Team A Method of First Dismissal - How will the first batsman in Team A be out?
      </span><span>Same as Method of First Dismissal.</span>
    </div>
    <div class="inline-text">
      <span>Team A Fours - How many fours will Team A score? </span><span>Same as Match Fours,
        with
        the 80% of required overs only applying to Team A’s innings. In First Class
        matches where the result will solely be based on the first innings of each team.</span>
    </div>
    <div class="inline-text">
      <span>Team A Sixes - How many sixes will Team A score? </span><span>Same as Match Sixes,
        with
        the 80% of required overs only applying to Team A’s innings. In First Class
        matches where the result will solely be based on the first innings of each team.</span>
    </div>
    <div class="inline-text">
      <span>Team A Innings Run Outs - How many of Team A will be run out? </span><span>Same as
        Match Run Outs, with the 80% of required overs only applying to Team A’s innings. In First
        Class matches where the result will solely be based on the first innings of each team.</span>
    </div>
    <div class="inline-text">
      <span>Team A Maximum Over - How many runs will be scored in the highest scoring over of
        Team
        A’s innings?
      </span><span>Same as Maximum Over in Match, with the 80% of required overs only applying to Team A’s innings. In
        First Class matches where the result will solely be based on the first innings of each team.</span>
    </div>
    <div class="inline-text">
      <span>Team A Ducks - How many of Team A will score a duck in their innings?
      </span><span>Same
        as Match Ducks, with the 80% of required overs only applying to Team A’s innings. In First Class
        matches where the result will solely be based on the first innings of each team.</span>
    </div>
    <div class="inline-text">
      <span>Team A Wides - How many wides will there be when Team A are batting?
      </span><span>Same
        as Match Wides, with the 80% of required overs only applying to when Team A are batting. In First
        Class matches where the result will solely be based on the first innings of each team.</span>
    </div>
    <div class="inline-text">
      <span>Team A Extras - How many extras will there be when Team A are batting?
      </span><span>Same as Match Extras, with the 80% of required overs only applying to when Team A are batting. In
        First
        Class matches where the result will solely be based on the first innings of each team.</span>
    </div>
    <div class="inline-text">
      <span>Team A Wickets Lost - How many wickets will fall when Team A are batting?
      </span><span>Same as Match Wickets, with the full overs required only applying to when Team A are bowling. In
        First
        Class matches where the result will solely be based on the first innings of each team.</span>
    </div>
    <div class="inline-text">
      <span>Team A Top Batsman - Which batsman will score the most runs for Team A?
      </span><span>The result of this market is determined on the batsman with the highest individual score in Team A’s
        first innings. Otherwise, same as Match Top Batsman, with the 50% of required overs only applying in Team A’s
        innings.</span>
    </div>
    <div class="inline-text">
      <span>Team A Top Bowler - Which bowler will take the most wickets for Team A?
      </span><span>The result of this market is determined on the bowler with the most wickets when Team A are bowling
        in
        the first innings. If two or more bowlers have taken the same number of wickets, the bowler who has conceded the
        fewest runs will be the winner. If there are two or more bowlers with the same wickets taken and runs conceded,
        dead heat rules will apply. Otherwise, same as Match Top Bowler, with the 50% of required overs only applying
        when Team A are bowling.</span>
    </div>
    <h3><span id="Player_Markets">Player Markets </span></h3>
    <div class="inline-text">
      <span>Batsman Runs - How many runs will the named batsman score? </span><span>If the
        batsman
        finishes the innings not out, as a result of a declaration, the team reaching the end of
        their allotted overs, or the team reaching their target; his score will be the final result. If a batsman does
        not bat, the bet will be void. If a batsman is not in the starting 11, bets will be void. If a batsman retires
        hurt, but returns later, the total runs scored by that batsman in the innings will count. If the batsman does
        not return later, the final result will be as it stood when the batsman retired. In limited overs matches, bets
        will be void if it has not been possible to complete at least 80% of the scheduled overs in the relevant innings
        due to external factors, including bad weather, unless settlement has been determined, or goes on to be
        determined. Result will be considered determined if the line at which the bet was placed is passed, or the
        batsman is dismissed. In drawn First Class matches, bets will be void if fewer than 200 overs have been bowled,
        unless the player has completed their innings, or result has already been determined. In First Class games, only
        first innings runs will count. Runs scored in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Combined Batsman Runs - How many runs will the named batsmen score? </span><span>As
        “Batsman Runs”, and if any of the named batsmen do not bat, the bet will be void, unless settlement
        of the bet has already been determined or goes on to be determined.</span>
    </div>
    <div class="inline-text">
      <span>Batsman Fours - How many fours will the named batsman score? </span><span>If a
        batsman
        finishes the innings not out, as a result of a declaration, the team reaching the end of
        their allotted overs, or the team reaching their target; his number of fours will be the final result. If a
        batsman does not bat, the bet will be void. If a batsman is not in the starting 11, bets will be void. If a
        batsman retires hurt, but returns later, the total fours hit by that batsman in the innings will count. If the
        batsman does not return later, the final result will be as it stood when the batsman retired. In limited overs
        matches, bets will be void if it has not been possible to complete at least 80% of the scheduled overs in the
        relevant innings due to external factors, including bad weather, unless settlement has been determined, or goes
        on to be determined. Result will be considered determined if the line at which the bet was placed is passed, or
        the batsman is dismissed. In drawn First Class matches, bets will be void if fewer than 200 overs have been
        bowled, unless the player has completed their innings, or result has already been determined. Only fours scored
        from the bat (off any delivery – legal or not) will count towards the total fours. Overthrows, all run fours and
        extras do not count. In First Class games, only first innings fours will count. Fours scored in a super over do
        not count.</span>
    </div>
    <div class="inline-text">
      <span>Batsman Sixes - How many sixes will the named batsman score? </span><span>If a
        batsman
        finishes the innings not out, as a result of a declaration, the team reaching the end of
        their allotted overs, or the team reaching their target; his number of sixes will be the final result. If a
        batsman does not bat, the bet will be void. If a batsman is not in the starting 11, bets will be void. If a
        batsman retires hurt, but returns later, the total sixes hit by that batsman in the innings will count. If the
        batsman does not return later, the final result will be as it stood when the batsman retired. In limited overs
        matches, bets will be void if it has not been possible to complete at least 80% of the scheduled overs in the
        relevant innings due to external factors, including bad weather, unless settlement has been determined, or goes
        on to be determined. Result will be considered determined if the line at which the bet was placed is passed, or
        the batsman is dismissed. In drawn First Class matches, bets will be void if fewer than 200 overs have been
        bowled, unless the player has completed their innings, or result has already been determined. Only sixes scored
        from the bat (off any delivery – legal or not) will count towards the total fours. Overthrows and extras do not
        count. In First Class games, only first innings sixes will count. Sixes scored in a super over do not
        count.</span>
    </div>
    <div class="inline-text">
      <span>Bowler Wickets - How many wickets will the named bowler take? </span><span>If a
        bowler
        does not bowl, he will be deemed to have taken 0 wickets. If a bowler is not in the
        starting 11, bets will be void. In limited overs matches, bets will be void if it has not been possible to
        complete at least 80% of the scheduled overs in the relevant innings due to external factors, including bad
        weather, unless settlement has been determined. Result will be considered determined if the line at which the
        bet was placed is passed. In drawn First Class matches, bets will be void if fewer than 200 overs have been
        bowled, unless the player’s bowling innings is complete. In First Class games, only first innings wickets will
        count. Wickets scored in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Named Player Performance - How many points will the named player score in the player
        performance
        scoring system? </span><span>Points are scored as in All-Rounder v All-Rounder Head to Heads. If the player does
        not bat or bowl,
        but is in the staring eleven, all bets will still be settled. If the player is not in the starting eleven bets
        will be void. In limited overs matches, bets will be void if it has not been possible to complete at least 80%
        of the scheduled overs in either innings due to external factors, including bad weather, unless settlement has
        been determined. Result will be considered determined if the line at which the bet was placed is passed. In
        drawn First Class matches, bets will be void if fewer than 200 overs have been bowled, unless both first innings
        have been completed. In First Class games, only first innings points will count. Points scored in a super over
        do not count.</span>
    </div>
    <h4
      class="size-default responsive-type-scale variant-highlighted svelte-1myjzud weight-normal line-height-responsive align-left with-icon-space text-size-default inline"
    >
      <span id="One-sided_Markets">One-sided Markets </span>
    </h4>
    <div class="inline-text">
      <span>Both Teams to Score ‘X’ Runs - Will both teams score the specified number of runs?
      </span><span>In limited overs matches, bets will be void if it has not been possible to complete at least 80% of
        the
        overs scheduled to have been bowled in both innings at the time the bet was placed due to external factors,
        including bad weather, unless settlement of the bet has already been determined before the reduction. In drawn
        First Class matches, bets will be void if fewer than 100 overs have been bowled in either teams first innings,
        unless settlement of the bet has already been determined. Only runs scored in the first innings count. If a team
        declares, that innings will be considered complete for the purposes of settlement.</span>
    </div>
    <div class="inline-text">
      <span>Batsman and Bowler Combo Milestones - Will the named batsman, and the named bowler,
        reach their
        specified milestones? </span><span>For batsman – same as “Batsman Runs”. In first class games, only runs scored
        in the first innings will
        count. If a batsman is not in the starting XI, or substituted in, bets will be void. For bowler – if a bowler
        does not bowl, they will be deemed to have taken 0 wickets. If a bowler is not in the starting XI, or
        substituted in, bets will be void. In limited overs matches, bets will be void if it has not been possible to
        complete at least 80% of the scheduled overs in the relevant innings due to external factors, including bad
        weather, unless settlement has been determined. In drawn First Class matches, bets will be void if fewer than
        200 overs have been bowled, unless the player’s bowling innings is complete. The result will be considered
        determined if the lines at which the bet was placed are passed. In First Class games, only first innings wickets
        will count and runs. Wickets and runs scored in a super over do not count.</span>
    </div>
    <div class="inline-text">
      <span>Batsmen Combo Milestones - Will both the batsmen reach their specified milestones?
      </span><span>Same as “Combined Batsman Runs”.</span>
    </div>
    <h3><span id="Notes_for_all_Markets">Notes for all Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Players sent off/retired out: A player being sent off is viewed as retired out,
            so
            counts as a
            wicket.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Concussion substitutions: When a player leaves the field as a concussion
            substitute, this does not
            count as a wicket. If the player does not return later, the final result will be as it stood when the player
            left the field. When a player enters the match as a concussion substitute, for settlement purposes both they
            and the player replaced are looked upon as to have played a full part in the match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Penalty runs after the conclusion of an innings: Penalty runs added to a team’s
            total after the
            start of the other team’s innings do not count towards settlement of markets in the previous innings.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a team declares, that innings will be considered complete for the purposes of
            settlement</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="All_Other_Sports">All Other Sports </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>No sport-specific rules, general rules apply.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Esports_General">Esports General </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>All esports markets are based on in-game score events or results at the end of a
            scheduled
            match/map. All settlements will occur using the official score and results, which are declared on the
            official video stream or the in-game stream of the relevant matches.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All match start dates and times displayed for Esports matches are for indication
            purposes only and
            are not guaranteed to be correct. Bets will stand if a match is offered with an incorrect date and/or
            time.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is paused/postponed and not rescheduled to a later time within 24
            hours
            of the actual
            scheduled start time, then all bets on that match will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the name of a player/team/tournament is misspelled, all bets will still stand
            unless it’s
            obvious that the misspelled name is the same as a different entity.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a team name is changed due to a team leaving the organization, joining another
            organization, or
            due to an official change of team name, all bets will stand.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the organizer of the event allows for stand-ins and there is an official
            result,
            all bets will
            be resulted as normal.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case where there is an overruling of a match result by the organizer due
            to
            unforeseen
            circumstances - such as cheating - all bets on that match will be voided. This rule is applicable within 72
            hours from the end of the match, then we don't change the result of the tickets.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match has been declared as a walkover win by the tournament organizer, all
            bets will be
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If one team retires during a match, only wagers on the completed individual maps
            will be resulted.
            Match market, match side markets, and all other undecided map markets will be voided. Bets placed on any
            following maps that will be completed will be resulted with the official results. However, any and all live
            offer will be suspended on this match and moved to a new match with a different match ID that will genuinely
            reflect the state of the match. The only exemption to this rule would be in this very situation: team A wins
            map 1 and proceeds to forfeit map 2. In this case, we would void all wagers on all undecided match and map 2
            markets&nbsp; and continue our offer within map 3 of the match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>All markets consider overtime, unless stated otherwise in the market name.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the match format is changed or differs from the one which is being offered, we
            reserve the right
            to void all bets.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the fixture is listed incorrectly, we reserve the right to void all
            bets.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match is played before the scheduled start date / time, all bets placed
            after
            the actual start
            of the match will be refunded. All bets placed before the actual start of the match will stand.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a match or map is replayed due to an organizer or technical issues, all
            affected
            markets will be
            voided, while the replayed matches or maps will be handled separately as a new match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a game on the map starts with less than ten players, all bets on that map will
            be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If the final gameplay length/duration is the same as a particular threshold, it
            is
            resolved as
            OVER.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Unless stated otherwise, each Market has just one winning Selection.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Unless stated otherwise, results are announced by the official organizer, usually
            over the stream
            and/or web.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Glossary">Glossary </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Selection</span><span>: a single option that punters can bet on. There are
            usually
            2 Selections per Market, but there can
            be much more</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Title</span><span>: computer/console/mobile game developed by a publisher with an
            active Esports ecosystem; for the
            purpose of this specification, it means mainly League of Legends, DOTA2, Counter Strike: Global Offensive,
            Rush Soccer/Rush Football (FIFA 2023), Rush Basketball (NBA 2k23), and Counter-Strike: Global Offensive –
            Head 2 Head Global Gaming League (H2HGGL).</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map</span><span>: one particular Esports game within an Esports
            competition</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match</span><span>: multiple Maps, where the first team to win 1 (Bo1 / Best of
            1),
            2 (Bo3 / Best of 3) or 3 (Bo3 /
            Best of 5) Map(s) wins. Bo2 (Best of 2) can be played with a draw 1:1 or won by one team 2:0.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Market_Types">Market Types </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Continuously open Markets</span><span>: Markets are available for pre-Match and
            live betting, i.e., bets are accepted both before the Map
            start and while the Map is being played. Bets are resulted after the Match is finished, or after a certain
            event happens in-game.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Temporarily open Markets</span><span>: Markets are only available for pre-Match
            betting, where bets are accepted only before the actual
            Map start or before a certain in-game event. The resulting happens after the Map is finished, or after a
            certain event happens in-game.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Counter-Strike_2_/_CS:GO">Counter-Strike 2 / CS:GO </span></h2>
    <h3><span id="General_Counter-Strike_2_betting_rules">General Counter-Strike 2 betting rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If one of the players disconnects and is unable to reconnect or be replaced for
            the
            rest of the
            Map, both teams decide to continue 4v5, and they play at least 3 rounds. All affected bets on that Map,
            Match, and match side markets will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a team retires, receives a win by admin decision, or is disqualified before
            all
            scheduled rounds
            of a Map are played, all undecided bets on that Map and Match will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Rounds 1-12 constitute the first half of CS2 Maps.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>In the case of a round restart, all bets will stand. All markets will be resolved
            based on the
            official score.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Glossary">Glossary </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>T / CT (Terrorists / Counter-terrorists)</span><span>: title specific name of
            Dark
            / Light team</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Round</span><span>: Team wins Rounds to win the Map. A Round is won when 1) one
            team eliminates the other, or 2) by
            Terrorists when they successfully detonate the bomb, or 3) by Counter-terrorists when the bomb does not
            detonate in 115 seconds from the start of the Round, or 4) by Counter-terrorists when the bomb is defused.
            The first team to score 16 Rounds wins the Map in CSGO while in CS2 the first team to score 13 Rounds wins
            the Map.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Overtime</span><span>: In case of Map draw score (15:15 for CSGO or 12:12 for
            CS2),
            first overtime is being played in
            Bo6 format. In case of another draw (18:18 for CSGO or 15:15 for CS2), next overtime with the same rules
            will be played. This process repeats until one team wins overtime. Overtime rules can be
            tournament-specific.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Pistol Round:</span><span> 1. and 16. Round on a particular Map.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Markets">Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner 2-way</span><span>: which team (Terrorists / Counter-terrorists)
            wins
            the Match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner 3-way</span><span>: which team (Terrorists / Counter-terrorists)
            wins
            the Match or both teams score one Map and Match
            is concluded as a draw.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner with handicap</span><span>: which team (Terrorists /
            Counter-terrorists) wins the alternated game when the handicap is
            deducted from particular team final Map score. Handicap 1.5 is used for Bo2 and Bo3 Matches, handicap 2.5 is
            additionally used for Bo5 Matches.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Exact Match score</span><span>: what would be the final score of the Match,
            presented as “No. of Maps won by team A: No. of Maps
            won by team B”.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map winner 2-way</span><span>: which team (Terrorists / Counter-terrorists) won
            the
            Map.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map winner 3-way</span><span>: which team (Terrorists / Counter-terrorists) wins
            the map after the regular period, if the map
            goes into Overtime the winning selection is a draw.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Total Maps over/under</span><span>: whether the count of Maps played in a certain
            Match is over or under a certain figure. Number 2.5
            is used for Bo3, while numbers 3.5 and 4.5 are used for Bo5.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Team to win at least 1 Map yes/no</span><span>: whether a certain team wins at
            least one Map in a particular Match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Overtime Selection</span><span>: whether Overtime will be played or not.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Number of Rounds</span><span>: whether the count of Rounds played in a certain
            Map
            is over or under a certain figure.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map winner with handicap</span><span>: which team (Terrorists /
            Counter-terrorists)
            wins the alternated Map when handicap is deducted
            from particular team final Map score.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Correct Round score</span><span>: what would be the final score of the Map,
            presented as “No. of Rounds won by team A: No. of
            Rounds won by team B”.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Round X winner</span><span>: which team (Terrorists / Counter-terrorists) win
            Round
            X.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Pistol Round winner</span><span>: which team (Terrorists / Counter-terrorists)
            wins
            specified pistol (1./16.) Round.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>First to win # of Rounds</span><span>: which team (Terrorists /
            Counter-terrorists)
            reaches # of won Rounds first.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>First half winner</span><span>: which team (Terrorists / Counter-terrorists) has
            higher number of won Rounds after first 15
            Rounds.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Second half winner</span><span>: which team (Terrorists / Counter-terrorists) has
            higher number of won Rounds after first 15
            Rounds and before Map is concluded as draw or won by one team.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Valorant">Valorant </span></h2>
    <h3><span id="General_Valorant_betting_rules">General Valorant betting rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If one of the players disconnects and is unable to reconnect or be replaced for
            the
            rest of the
            Map, both teams decide to continue 4v5, and they play at least 5 rounds. All affected bets on that Map,
            Match and match side markets will be voided.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a team retires, receives a win by admin decision or is disqualified before all
            scheduled rounds
            of a Map are played, all undecided bets on that Map and Match will be voided</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Rounds 1-12 constitute the first half of Valorant Maps.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Glossary">Glossary </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>A / D (Attackers / Defenders)</span><span>: title specific name of Dark / Light
            team</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Round</span><span>: Team wins Rounds to win the Map. A Round is won when 1) one
            team eliminates the other, or 2) by
            Attackers when they successfully detonate the spike, or 3) by Defenders when the spike does not detonate in
            45 seconds from the start of the Round, or 4) by Defenders when the spike is defused. The first team to
            score 13 Rounds wins the Map.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Overtime</span><span>: In case of Map draw score (12:12), first overtime is being
            played in Bo2 format. In case of
            another draw (13:13), next overtime with the same rules will be played. This process repeats until one team
            wins overtime. Overtime rules can be tournament-specific.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Pistol Round:</span><span> 1. and 13. Round on a particular Map.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Markets">Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner 2-way</span><span>: which team (Attackers / Defenders) wins the
            Match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner 3-way</span><span>: which team (Attackers / Defenders) wins the
            Match
            or both teams score one Map and Match is
            concluded as a draw.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner with handicap</span><span>: which team (Attackers / Defenders) wins
            the alternated game when the handicap is deducted from
            particular team final Map score. Handicap 1.5 is used for Bo2 and Bo3 Matches, handicap 2.5 is additionally
            used for Bo5 Matches.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Exact Match score</span><span>: what would be the final score of the Match,
            presented as “No. of Maps won by team A: No. of Maps
            won by team B”.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map winner 2-way</span><span>: which team (Attackers / Defenders) won the
            Map.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Total Maps over/under</span><span>: whether the count of Maps played in a certain
            Match is over or under a certain figure. Number 2.5
            is used for Bo3, while numbers 3.5 and 4.5 are used for Bo5.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Team to win at least 1 Map yes/no: whether a certain team wins at least one Map
            in
            a particular
            Match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Overtime Selection</span><span>: whether Overtime will be played or not.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Number of Rounds</span><span>: whether the count of Rounds played in a certain
            Map
            is over or under a certain figure.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map winner with handicap</span><span>: which team (Attackers / Defenders) wins
            the
            alternated Map when handicap is deducted from
            particular team final Map score.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Round X winner</span><span>: which team (Attackers / Defenders) win Round
            X.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Pistol Round winner</span><span>:&nbsp; which team (Attackers / Defenders) wins
            specified pistol (1./13.) Round.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>First to win # of Rounds</span><span>: which team (Attackers / Defenders) reaches
            #
            of won Rounds first.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>First half winner</span><span>: which team (Attackers / Defenders) has higher
            number of won Rounds after first 12 Rounds.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Second half winner</span><span>: which team (Attackers / Defenders) has higher
            number of won Rounds after first 12 Rounds and
            before Map is concluded as draw or won by one team.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Dota_2">Dota 2 </span></h2>
    <h3><span id="General_Dota_2_betting_rules">General Dota 2 betting rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If a Map starts with fewer than 10 competitors, all bets on the Map will be
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a competitor disconnects in the first 10 minutes and is unable to reconnect or
            be replaced for
            the rest of the Map, all affected bets on that Map and Match will be voided. If a competitor disconnects or
            quits after the 10th minute of play of a Map has started, bets have action according to the official
            result.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a walkover or win by admin decision is given in the first 10 minutes of a Map,
            all bets on the
            Map will be void. If a win by admin decision is awarded after the 10th minute of play of a Map has started,
            bets have action according to the official result.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Glossary">Glossary </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Ancient</span><span>: The primary objective of the Map. The first team to destroy
            the opposing team’s Ancient wins the
            Map.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>GG</span><span>: This allows the relevant team to surrender the Map when typed
            into
            the all chat.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Dire / Radiant</span><span>: The title specific name of Dark / Light opposing
            teams</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Kill</span><span>: The Light/Dark team’s score, which represents the total number
            of times members of the opposing
            team were killed.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Aegis</span><span>: An item which appears after the game objective Roshan is
            killed. It can be picked up by a
            player.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Tower</span><span>: A team specific game objective, which can be destroyed by the
            opposite team.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Barracks</span><span>: A team specific game objective, which can be destroyed by
            the opposite team.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Markets">Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner 2-way</span><span>: which team (Dark or Light) wins the
            Match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner 3-way</span><span>: which team (Dark or Light) wins the Match or
            both
            teams score for one Map (Bo2) and the Match is
            concluded as a draw.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner with handicap</span><span>: which team (Dark or Light) wins the
            alternated game when handicap is deducted from that
            particular team’s final Map score. A handicap of 1.5 is used for Bo2 and Bo3 Matches, a handicap of 2.5 is
            additionally used for Bo5 Matches.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Exact Match score</span><span>: the final score of the Match, presented as “No.
            of
            Maps won by team A: No. of Maps won by team
            B”.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map winner 2-way</span><span>: which team (Dark or Light) wins the Map.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Total Maps over/under</span><span>: whether the count of Maps played in a certain
            Match is over or under a certain figure. Number 2.5
            is used for Bo3, while numbers 3.5 and 4.5 are used for Bo5.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Team to win at least 1 Map yes/no</span><span>: whether a certain team wins at
            least one Map in a particular Match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Duration</span><span>: whether a Map’s final gameplay length/duration is over
            or under a certain figure.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map TotalKills</span><span>: whether the final kill count (Based on the visible
            in-game score, which is the sum of the Dark
            and Light kills) in a Map is over or under a certain figure.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map TotalTowers</span><span>: whether the final count of destroyed towers (Based
            on
            the visible in-game score, which is the sum
            of the Dark and Light destroyed towers) in a certain Map is over or under a certain figure.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Kill Handicap</span><span>: which team (Dark or Light) has more kills after
            the
            deduction of the handicap from that
            particular team’s final Map score.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Xth Kill</span><span>: the winner of this market is the team that makes a
            kill,
            forcing the sum of the total kills for
            both teams to be equal to X.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map FirstToReach</span><span>: which team reaches a certain number of kills
            first.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map First Blood</span><span>: which team scores the first kill.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map First Tower</span><span>: which team scores the first destroyed Tower.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map First Barracks</span><span>: which team scores the first destroyed
            Barracks.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map First Aegis</span><span>: the first team which picks-up the first
            aegis.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map TotalKillsParity</span><span>: whether the final count of kills (Based on the
            visible in-game score, which is the sum of the
            Dark and Light kills) in a certain Map is an odd or even number.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Rampage</span><span>: whether at least one player, from the Dark or Light
            teams, has scored 5 or more kills in a short
            period of time and this event is announced in game.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Ultrakill</span><span>: whether at least one player, from the Dark or Light
            teams, has scored 4 or more kills in a short
            period of time and this event is announced in game.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map BeyondGodlike</span><span>: whether at least one player, from the Dark or
            Light
            teams, has scored 10 or more kills without
            dying and this event is announced in game.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Megacreeps</span><span>: whether all Dark or Light barracks are destroyed and
            this event is announced in game.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Type of activated rune spawned at specific Map time</span><span>: Type of
            rune,
            which spawns at specific game time (thresholds) and is activated (Or bottled and
            activated later) by one of the players. The market is cancelled if a player destroys the rune.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="League_of_Legends">League of Legends </span></h2>
    <h3><span id="General_League_of_Legends_betting_rules">General League of Legends betting rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If a Map starts with fewer than 10 competitors, all bets on the Map will be
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a competitor disconnects in the first 10 minutes and is unable to reconnect or
            be replaced for
            the rest of the Map, all affected bets on that Map and Match will be voided. If a competitor disconnects or
            quits after the 10th minute of play of a Map that has started, bets have action according to the official
            result.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a walkover or win by admin decision is given in the first 10 minutes of a Map,
            all undecided
            bets on that Map and Match will be voided. If a win by admin decision is awarded after the 10th minute of
            play of a Map has started, bets have action according to the official result.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Glossary">Glossary </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Nexus</span><span>: the primary objective of the Map. The first team to destroy
            the
            opposing team’s Nexus wins the
            Map.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Kill</span><span>: The Blue/Red team’s score, which represents the total number
            of
            times members of the opposing
            team were killed.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Turret</span><span>: a team specific game objective, which can be destroyed by
            the
            opposite team.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Inhibitor</span><span>: a team specific game objective, which can be destroyed by
            the opposite team.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Dragon</span><span>: a game objective, can be killed by players.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Baron</span><span>: a game objective, can be killed by players.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Herald</span><span>: a game objective, can be killed by players.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <h3><span id="Markets">Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner 2-way</span><span>: which team (Red or Blue) wins the Match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner 3-way</span><span>: which team (Red or Blue) wins the Match or both
            teams score one Map (Bo2) and Match is concluded
            as a draw.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner with handicap</span><span>: which team (Red or Blue) wins the
            alternated game when handicap is deducted from a particular
            team’s final Map score. A handicap 1.5 is used for Bo2 and Bo3 Matches, handicap 2.5 is additionally used
            for Bo5 Matches.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Exact Match score</span><span>: what would be the final score of the Match,
            presented as “No. of Maps won by team A: No. of Maps
            won by team B”.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map winner 2-way</span><span>: which team (Red or Blue) wins the Map.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Total Maps over/under</span><span>: whether the Map-count played in a certain
            Match
            is over or under a certain figure. Number 2.5 is
            used for Bo3, while numbers 3.5 and 4.5 are used for Bo5.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Team to win at least 1 Map yes/no</span><span>: whether a certain team wins at
            least one Map in a particular Match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Duration</span><span>: whether a certain Map’s final gameplay length/duration
            is over or under a certain figure. If the
            Duration is the same as the threshold is resolved as OVER Selection.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map TotalKills</span><span>: whether the final count of kills (Based on visible
            in-game score, sum of Red and Blue kills) in a
            certain Map is over or under a certain figure.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map TotalTurrets</span><span>: whether the final count of destroyed towers (Based
            on the visible in-game score, which is the sum
            of the Red + Blue destroyed towers) in a certain Map is over or under a certain figure.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Kill Handicap</span><span>: which team (Dark or Light) has more kills after
            the
            deduction of the handicap from that
            particular team’s final Map score.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Xth Kill</span><span>: the winner of this market is the team that makes a
            kill
            forcing the sum of the total kills for
            both teams to be equal to X.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map FirstToReach</span><span>: which team reaches a certain number of kills
            first.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map First Blood</span><span>: which team scores the first kill.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map First Inhibitor</span><span>: which team scores the first destroyed
            Inhibitor.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map First Baron</span><span>: which team kills a Baron first.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map TotalKillsParity</span><span>: whether the final count of kills (Based on the
            visible in-game score, which is the sum of the Red
            and Blue kills) in a certain Map is an odd or even number.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map QuadraKill (yes)</span><span>: whether at least one player, from the Red or
            Blue teams, score 4 or more kills in a short period
            of time and this event is announced in game.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map PentaKill (yes)</span><span>: whether at least one player, from the Red or
            Blue
            teams, has scored 5 or more kills in a short
            period of time and this event is announced in game.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Xth Dragon type</span><span>: Type of first / second spawned dragon since the
            start of the Map.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map Dragon soul type</span><span>: Type of third spawned dragon since the start
            of
            the Map.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="King_of_Glory">King of Glory </span></h2>
    <h3><span id="General_King_of_Glory_betting_rules">General King of Glory betting rules </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>If a Map starts with fewer than 10 competitors, all bets on the Map will be
            void.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a competitor disconnects in the first 10 minutes and is unable to reconnect or
            be replaced for
            the rest of the Map, all undecided bets on that Map and Match will be voided. If a competitor disconnects or
            quits after the 10th minute of play of a Map has started, bets have action according to the official
            result.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>If a walkover or win by admin decision is given in the first 10 minutes of a Map,
            all undecided
            bets on that Map and Match will be voided. If a win by admin decision is awarded after the 10th minute of
            play after the Map has started, bets have action according to the official result.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="FIFA">FIFA </span></h2>
    <h3><span id="Glossary">Glossary </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Goal:</span><span>&nbsp;a goal is scored when the whole ball passes over the goal
            line.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Draw</span><span>: Occurs when the number of goals scored by each team is
            identical.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>First Period</span><span>: the first 45 minutes of in-game time + additional time
            in the first period.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Markets">Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Match Winner 3-way</span><span>: The team (Home / Away) which scores the most
            goals
            wins the Match or if both teams score the same
            number of goals in the set time, then the Match is concluded as a draw.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match First Half Winner 3-way</span><span>: the team (Home / Away) which scores
            the
            most goals in the first period wins the first period or
            if both teams score the same number of goals in the first period, then the market is concluded as a
            draw.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match Total Goals</span><span>: whether the final count of goals scored in a
            certain Match is over or under a certain
            figure.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match First Half Total Goals</span><span>: whether the final count of goals
            scored
            in the first period of a certain Match is over or under a
            certain figure.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match Total Goals Parity</span><span>: whether the final count of goals scored in
            a
            certain Match is an odd or even number.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match First Half Total Goals Parity</span><span>: whether the final count of
            goals
            scored in the first period of a certain Match is odd or even
            number.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match Winner Double Chance</span><span>: Match winner market that combines two
            possible outcomes into one bet (home/draw, away/draw,
            home/away)</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match First Half Winner Double Chance</span><span>: Match first half winner
            market
            that combines two possible outcomes into one bet (home/draw,
            away/draw, home/away)</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="NBA2K">NBA2K </span></h2>
    <h3><span id="Glossary">Glossary </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Basket</span><span>:&nbsp; a basket is scored when the whole ball passes over the
            basket.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>3-points basket</span><span>: for any basket made beyond the 3 point line, in
            bounds.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>2-points basket</span><span>: for any basket made inside the 3 point line, in
            bounds.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>1-point basket: for the made free throws.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Free throws</span><span>: shots when a player is fouled in the act of shooting. A
            free throw shot is also taken when the
            other team is over the foul limit, putting the offensive team in a bonus “1 and 1” situation.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Draw</span><span>: Occurs when the number of points scored by each team is
            identical.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Quarter</span><span>: 5 minutes of in-game time</span>
        </div>
      </li>
    </ul>
    <h3><span id="Markets">Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Match Winner No Draw</span><span>: The team (Home / Away) which gets the most
            points wins the Match. If both teams get the same
            number of points in the set time, then the Match is concluded as a draw; in this case, the market is
            cancelled and all bets should be voided.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Counter-Strike:_Global_Offensive_Wingman">Counter-Strike: Global Offensive Wingman </span></h2>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>The teams play 2 Maps in 1 Match (the Bo2 format). A draw is possible only at the
            Match, but not at
            the Map level.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Glossary">Glossary </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>T / CT (Terrorists / Counter-terrorists)</span><span>: title-specific name of
            Dark
            / Light team</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Round:</span><span> A team needs to win Rounds to win the Map. A Round is won
            when
            1) one team eliminates the other,
            or 2) by Terrorists when they successfully detonate the bomb, or 3) by Counter-terrorists when the bomb does
            not detonate in 90 seconds from the start of the Round, or 4) by Counter-terrorists when the bomb is
            defused. First team to score 9 Rounds wins the Map.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Overtime</span><span>: In the case of the Map draw score (8:8), overtime will be
            played in Bo1 format. Overtime is
            played as a knife-only Round.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Pistol Round</span><span>: 1st and 9th Round on a particular Map.</span>
        </div>
      </li>
    </ul>
    <h3><span id="Markets">Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner 3-way</span><span>: which team (Terrorists / Counter-terrorists)
            wins
            the Match or both teams score one Map and Match
            is concluded as a draw.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner with handicap: which team (Terrorists / Counter-terrorists) wins the
            alternated game
            when the handicap is deducted from particular team final Map score. Handicap 1.5 is used for Bo2.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Exact Match score</span><span>: what would be the final score of the Match,
            presented as “No. of Maps won by team A: No. of Maps
            won by team B”.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map winner 2-way</span><span>: which team (Terrorists / Counter-terrorists) won
            the
            Map.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map winner 3-way</span><span>: which team (Terrorists / Counter-terrorists)
            reaches
            a score of 9 Rounds first or both teams
            score 8 Rounds and the Map is concluded as a draw.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Team to win at least 1 Map yes/no</span><span>: whether a certain team wins at
            least one Map in a particular Match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Overtime yes/no</span><span>: whether Overtime will be played or not.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Number of Rounds</span><span>: whether the count of Rounds played on a certain
            Map
            is over or under a certain figure.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map winner with handicap</span><span>: which team (Terrorists /
            Counter-terrorists)
            wins the alternated Map when the handicap is
            deducted from a particular team’s final Map score.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Correct Round score</span><span>: what would be the final score of the Map,
            presented as “No. of Rounds won by team A: No. of
            Rounds won by team B”.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Round X winner</span><span>: which team (Terrorists / Counter-terrorists) wins
            Round X.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Pistol Round winner</span><span>:&nbsp; which team (Terrorists /
            Counter-terrorists) wins a specified pistol (1st/9th)
            Round.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>First to win # of Rounds</span><span>: which team (Terrorists /
            Counter-terrorists)
            reaches # won Rounds first.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>First half winner</span><span>: which team (Terrorists / Counter-terrorists) has
            a
            higher number of won Rounds after the first 8
            Rounds.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Second half winner</span><span>: which team (Terrorists / Counter-terrorists) has
            a
            higher number of won Rounds after the first 8
            Rounds and before the Map is concluded as a draw or won by one team.</span>
        </div>
      </li>
    </ul>
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <div class="inline-text" />
    <h2><span id="Other_Esports_Titles">Other Esports Titles </span></h2>
    <h3><span id="Markets">Markets </span></h3>
    <ul>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner 2-way</span><span>: which team wins the Match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner 3-way</span><span>: which team wins the Match or both teams score
            one
            Map and Match is concluded as a draw.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Total Maps over/under</span><span>: whether the count of Maps played in a certain
            Match is over or under a certain figure.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Match winner with handicap</span><span>: which team wins the alternated game when
            the handicap is deducted from particular team final Map
            score.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Exact Match score</span><span>: what would be the final score of the Match,
            presented as “No. of Maps won by team A: No. of Maps
            won by team B”.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Team to win at least 1 Map yes/no</span><span>: whether a certain team wins at
            least one Map in a particular Match.</span>
        </div>
      </li>
      <li class="level-1">
        <div class="inline-text">
          <span>Map winner 2-way</span><span>: which team won the Map.</span>
        </div>
      </li>
    </ul>
    <div v-if="!isLogin" class="p buttons">
      <BaseButton type="text" size="none" @click="openLoginDialog()">
        {{ $t('login') }}
      </BaseButton>
      <span>{{ $t('or') }}</span>
      <BaseButton type="text" size="none" @click="openRegisterDialog()">
        {{ $t('reg') }}
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buttons {
  text-align: center;
  --tg-base-button-text-default-color: var(--tg-text-white);
  --tg-base-button-font-size: 16px;
  margin-top: 20px !important;

  :deep(button) {
    padding: 0 8px;
  }
}

.bold-txt {
  font-weight: 600;
}

.pd-24 {
  padding: 24px;
}

.p,
.inline-text {
  line-height: 24px;
  font-size: 16px;
  color: var(--tg-secondary-light);
}

.content-block {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content-block>.p+.p,
.content-block>.inline-text+.inline-text {
  margin-top: 12px;
}

h1 {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}

.content-block>h1:first-of-type {
  margin-top: 0;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  margin-top: 16px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}

h3 {
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}

h4 {
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  margin-top: 24px;
  margin-bottom: 8px;
  color: var(--tg-text-white);
}

ul {
  list-style-type: disc;
  padding-left: 32px;
  margin-bottom: 16px;

  li {
    margin: 4px 0;
  }
}
</style>
