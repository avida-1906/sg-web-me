<script lang="ts" setup>
/* eslint-disable max-len */
usePageTitle({ prefix: 'Wager Requirements' })
const { isLogin } = storeToRefs(useAppStore())
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()
const location = useBrowserLocation()
const { companyData } = storeToRefs(useAppStore())
const hostSite = computed(() => (
  { host: location.value.hostname?.replace('www.', '').toUpperCase(), site: companyData.value?.name.toUpperCase() }
))
</script>

<template>
  <div class="content-block pd-24 wager-requirements">
    <div class="p">
      A wager requirement defines the multiplier in which the sum of your deposit and bonus will need to be turned over. Since the majority of our games have between a 3.5% to 4.5% house edge, we’ve set our wager requirement at a 4% edge.
    </div>
    <div class="p">
      This means that if users play a 1% edged game, it will complete at a 4x slower rate. Thus, the wager requirement would be accumulating at a ratio of $0.25 for every $1 wagered. Conversely, the higher the house edge of the game being played, the less wager required to complete the rollover.
    </div>
    <div class="p">
      While having a wager requirement active, the user’s account will be locked until they meet the requirement set, or alternatively they lose their entire balance (in their relative bonus currency) and have no remaining active bets.
    </div>
    <div class="p">
      Users can check the progress of their wager requirement here.
    </div>
    <div class="p">
      While having an active wager requirement, users are not allowed to wager on certain games. The list of games are as follows:
    </div>
    <h1>{{ hostSite.site }} Originals</h1>
    <ul>
      <li>
        <div class="p">
          Dice
        </div>
      </li>
      <li>
        <div class="p">
          Crash
        </div>
      </li>
      <li>
        <div class="p">
          Dragon Tower
        </div>
      </li>
      <li>
        <div class="p">
          Limbo
        </div>
      </li>
      <li>
        <div class="p">
          Hilo
        </div>
      </li>
      <li>
        <div class="p">
          Slide
        </div>
      </li>
      <li>
        <div class="p">
          Mines
        </div>
      </li>
      <li>
        <div class="p">
          Blackjack
        </div>
      </li>
    </ul>
    <h1>Pragmatic Play</h1>
    <ul>
      <li>
        <div class="p">
          The Champions
        </div>
      </li>
      <li>
        <div class="p">
          Snakes and Ladders Megadice
        </div>
      </li>
      <li>
        <div class="p">
          Jungle Gorilla
        </div>
      </li>
      <li>
        <div class="p">
          Three Kingdoms
        </div>
      </li>
      <li>
        <div class="p">
          Cash Elevator
        </div>
      </li>
      <li>
        <div class="p">
          Dragon Kingdom
        </div>
      </li>
      <li>
        <div class="p">
          Jade Butterfly
        </div>
      </li>
      <li>
        <div class="p">
          Asgard
        </div>
      </li>
      <li>
        <div class="p">
          Pinup Girls
        </div>
      </li>
      <li>
        <div class="p">
          Ding Dong Christmas Bells
        </div>
      </li>
      <li>
        <div class="p">
          Candy Jar Clusters
        </div>
      </li>
    </ul>
    <h1>Hacksaw Gaming</h1>
    <ul>
      <li>
        <div class="p">
          Stick'Em
        </div>
      </li>
    </ul>
    <h1>Playson</h1>
    <ul>
      <li>
        <div class="p">
          Claws vs Paws
        </div>
      </li>
      <li>
        <div class="p">
          Solar King
        </div>
      </li>
      <li>
        <div class="p">
          Coin Strike: Hold & Win
        </div>
      </li>
      <li>
        <div class="p">
          Viking Gods: Thor and Loki
        </div>
      </li>
      <li>
        <div class="p">
          Pearl Ocean: Hold and Win
        </div>
      </li>
      <li>
        <div class="p">
          Solar Queen
        </div>
      </li>
      <li>
        <div class="p">
          Energy Coins: Hold & Win
        </div>
      </li>
      <li>
        <div class="p">
          Solar Temple
        </div>
      </li>
      <li>
        <div class="p">
          Juice Inc
        </div>
      </li>
      <li>
        <div class="p">
          Fire Coins: Hold and Win
        </div>
      </li>
    </ul>
    <h1>OneTouch</h1>
    <ul>
      <li>
        <div class="p">
          Steam Vault
        </div>
      </li>
      <li>
        <div class="p">
          Queens of Glory
        </div>
      </li>
      <li>
        <div class="p">
          Tiki Terror
        </div>
      </li>
      <li>
        <div class="p">
          Reel Fruitz Frenzy
        </div>
      </li>
      <li>
        <div class="p">
          Wacky Wildlife
        </div>
      </li>
      <li>
        <div class="p">
          Golden Stripe
        </div>
      </li>
      <li>
        <div class="p">
          Flexing Dragons
        </div>
      </li>
      <li>
        <div class="p">
          Wealthy Sharks
        </div>
      </li>
    </ul>
    <h1>Truelab</h1>
    <ul>
      <li>
        <div class="p">
          Crypts of Fortune
        </div>
      </li>
      <li>
        <div class="p">
          Victoria Wild
        </div>
      </li>
      <li>
        <div class="p">
          Victoria Wild Deluxe
        </div>
      </li>
      <li>
        <div class="p">
          Startup Valley
        </div>
      </li>
      <li>
        <div class="p">
          Mining Factory
        </div>
      </li>
      <li>
        <div class="p">
          Day&Night
        </div>
      </li>
    </ul>
    <h1>Endorphina</h1>
    <ul>
      <li>
        <div class="p">
          Ninja
        </div>
      </li>
      <li>
        <div class="p">
          Golden Ox
        </div>
      </li>
      <li>
        <div class="p">
          Football Superstar
        </div>
      </li>
      <li>
        <div class="p">
          Blast Boom Bang
        </div>
      </li>
      <li>
        <div class="p">
          Lord of the Seas
        </div>
      </li>
      <li>
        <div class="p">
          Lucky Streak X
        </div>
      </li>
    </ul>
    <h1>BGaming</h1>
    <ul>
      <li>
        <div class="p">
          Blackjack Surrender
        </div>
      </li>
      <li>
        <div class="p">
          WBC Ring of Riches
        </div>
      </li>
      <li>
        <div class="p">
          Mice & Magic Wonder Spin
        </div>
      </li>
      <li>
        <div class="p">
          Road 2 Riches
        </div>
      </li>
      <li>
        <div class="p">
          Candy Monsta
        </div>
      </li>
      <li>
        <div class="p">
          Johnny Cash
        </div>
      </li>
      <li>
        <div class="p">
          Hit the Route
        </div>
      </li>
      <li>
        <div class="p">
          Journey Flirt
        </div>
      </li>
    </ul>
    <h1>Blueprint</h1>
    <ul>
      <li>
        <div class="p">
          Funky Buddha
        </div>
      </li>
      <li>
        <div class="p">
          King Kong Cash
        </div>
      </li>
      <li>
        <div class="p">
          Saint Nicked
        </div>
      </li>
    </ul>
    <h1>NetEnt</h1>
    <ul>
      <li>
        <div class="p">
          Devil's Delight
        </div>
      </li>
      <li>
        <div class="p">
          Cornelius
        </div>
      </li>
      <li>
        <div class="p">
          Serengeti Kings
        </div>
      </li>
      <li>
        <div class="p">
          Lucky Angler
        </div>
      </li>
      <li>
        <div class="p">
          Rome: The Golden Age
        </div>
      </li>
      <li>
        <div class="p">
          Wonders of Christmas
        </div>
      </li>
      <li>
        <div class="p">
          Reel Rush 2
        </div>
      </li>
      <li>
        <div class="p">
          Reel Steal
        </div>
      </li>
      <li>
        <div class="p">
          Robin Hood: Shifting Riches
        </div>
      </li>
      <li>
        <div class="p">
          Scudamore's Super {{ hostSite.site }}
        </div>
      </li>
      <li>
        <div class="p">
          Street Fighter II: The World Warrior Slot
        </div>
      </li>
      <li>
        <div class="p">
          The Wish Master
        </div>
      </li>
      <li>
        <div class="p">
          Jackhammer 2
        </div>
      </li>
      <li>
        <div class="p">
          Wilderland
        </div>
      </li>
    </ul>
    <h1>PlaynGo</h1>
    <ul>
      <li>
        <div class="p">
          Baker's Treat
        </div>
      </li>
      <li>
        <div class="p">
          Rage to Riches
        </div>
      </li>
      <li>
        <div class="p">
          Eye of the Kraken
        </div>
      </li>
      <li>
        <div class="p">
          Golden Legend
        </div>
      </li>
      <li>
        <div class="p">
          Happy Halloween
        </div>
      </li>
      <li>
        <div class="p">
          Hugo 2
        </div>
      </li>
      <li>
        <div class="p">
          Mahjong 88
        </div>
      </li>
      <li>
        <div class="p">
          MULTIFRUIT 81
        </div>
      </li>
      <li>
        <div class="p">
          Pearls of India
        </div>
      </li>
      <li>
        <div class="p">
          Royal Masquerade
        </div>
      </li>
      <li>
        <div class="p">
          Moon Princess
        </div>
      </li>
      <li>
        <div class="p">
          Sea Hunter
        </div>
      </li>
      <li>
        <div class="p">
          Tower Quest
        </div>
      </li>
      <li>
        <div class="p">
          Viking Runecraft
        </div>
      </li>
      <li>
        <div class="p">
          Moon Princess 100
        </div>
      </li>
    </ul>
    <h1>Push Gaming</h1>
    <ul>
      <li>
        <div class="p">
          Jammin Jars 2
        </div>
      </li>
      <li>
        <div class="p">
          Wild Swarm
        </div>
      </li>
      <li>
        <div class="p">
          Wizard Shop
        </div>
      </li>
      <li>
        <div class="p">
          The Shadow Order
        </div>
      </li>
      <li>
        <div class="p">
          Mad Cars
        </div>
      </li>
    </ul>
    <h1>Quickspin</h1>
    <ul>
      <li>
        <div class="p">
          Skulls up!
        </div>
      </li>
      <li>
        <div class="p">
          Dwarfs Gone Wild
        </div>
      </li>
      <li>
        <div class="p">
          Crown of Valor
        </div>
      </li>
    </ul>
    <h1>Red Tiger</h1>
    <ul>
      <li>
        <div class="p">
          Dragon's Mirror
        </div>
      </li>
      <li>
        <div class="p">
          10001 Nights
        </div>
      </li>
      <li>
        <div class="p">
          Astronaut
        </div>
      </li>
      <li>
        <div class="p">
          5 Families
        </div>
      </li>
      <li>
        <div class="p">
          Siren's Riches
        </div>
      </li>
      <li>
        <div class="p">
          Agent Royale
        </div>
      </li>
      <li>
        <div class="p">
          Spooky Carnival
        </div>
      </li>
      <li>
        <div class="p">
          Lion's Hoard
        </div>
      </li>
      <li>
        <div class="p">
          Get the Gold Infinireels
        </div>
      </li>
      <li>
        <div class="p">
          Monsters Unchained
        </div>
      </li>
      <li>
        <div class="p">
          Case Closed
        </div>
      </li>
      <li>
        <div class="p">
          Easy Gold
        </div>
      </li>
      <li>
        <div class="p">
          Wish Master Megaways
        </div>
      </li>
      <li>
        <div class="p">
          London Tube
        </div>
      </li>
      <li>
        <div class="p">
          Dynamite Riches Megaways
        </div>
      </li>
      <li>
        <div class="p">
          Fa Fa Babies
        </div>
      </li>
      <li>
        <div class="p">
          Cyber Attack
        </div>
      </li>
      <li>
        <div class="p">
          10001 Nights Megaways
        </div>
      </li>
      <li>
        <div class="p">
          Ancients Blessing
        </div>
      </li>
      <li>
        <div class="p">
          Arcade Bomb
        </div>
      </li>
      <li>
        <div class="p">
          Atlantis
        </div>
      </li>
      <li>
        <div class="p">
          AurumCodex
        </div>
      </li>
      <li>
        <div class="p">
          Aztec Spins
        </div>
      </li>
      <li>
        <div class="p">
          Get The Gold Infinireels
        </div>
      </li>
      <li>
        <div class="p">
          Betty Boris and Boo
        </div>
      </li>
      <li>
        <div class="p">
          Bombuster
        </div>
      </li>
      <li>
        <div class="p">
          CashUltimate
        </div>
      </li>
      <li>
        <div class="p">
          Diamond Blitz
        </div>
      </li>
      <li>
        <div class="p">
          DragonsFire
        </div>
      </li>
      <li>
        <div class="p">
          Egypt Megaways
        </div>
      </li>
      <li>
        <div class="p">
          DragonsFireInfiniReels
        </div>
      </li>
      <li>
        <div class="p">
          DragonsFireMegaWays
        </div>
      </li>
      <li>
        <div class="p">
          Dynamite Riches
        </div>
      </li>
      <li>
        <div class="p">
          EagleRiches
        </div>
      </li>
      <li>
        <div class="p">
          FruitSnap
        </div>
      </li>
      <li>
        <div class="p">
          GemsGoneWildPowerReels
        </div>
      </li>
      <li>
        <div class="p">
          Gods Of Troy
        </div>
      </li>
      <li>
        <div class="p">
          GoldenLotus
        </div>
      </li>
      <li>
        <div class="p">
          GoldenOffer
        </div>
      </li>
      <li>
        <div class="p">
          GoldenTsar
        </div>
      </li>
      <li>
        <div class="p">
          GonzosQuestMegaWays
        </div>
      </li>
      <li>
        <div class="p">
          HarleCoin
        </div>
      </li>
      <li>
        <div class="p">
          HoardOfPoseidon
        </div>
      </li>
      <li>
        <div class="p">
          JewelScarabs
        </div>
      </li>
      <li>
        <div class="p">
          JingleBellsPowerReels
        </div>
      </li>
      <li>
        <div class="p">
          LionDance
        </div>
      </li>
      <li>
        <div class="p">
          Lucky Fridays
        </div>
      </li>
      <li>
        <div class="p">
          LuckyOktoberfest
        </div>
      </li>
      <li>
        <div class="p">
          MegaPyramid
        </div>
      </li>
      <li>
        <div class="p">
          MegaRise
        </div>
      </li>
      <li>
        <div class="p">
          MultiplierRiches
        </div>
      </li>
      <li>
        <div class="p">
          MysteryReelsMegaWays
        </div>
      </li>
      <li>
        <div class="p">
          MysticStaxx
        </div>
      </li>
      <li>
        <div class="p">
          NightRoller
        </div>
      </li>
      <li>
        <div class="p">
          PiggyPirates
        </div>
      </li>
      <li>
        <div class="p">
          PiratesPlenty
        </div>
      </li>
      <li>
        <div class="p">
          PiratesPlentyBattleForGold
        </div>
      </li>
      <li>
        <div class="p">
          PiratesPlentyMegaWays
        </div>
      </li>
      <li>
        <div class="p">
          PrimateKing
        </div>
      </li>
      <li>
        <div class="p">
          RAsLegend
        </div>
      </li>
      <li>
        <div class="p">
          Reel Heist
        </div>
      </li>
      <li>
        <div class="p">
          ReelKeeper
        </div>
      </li>
      <li>
        <div class="p">
          Reel Keeper Power Reels
        </div>
      </li>
      <li>
        <div class="p">
          Dragon's Clusterbuster
        </div>
      </li>
      <li>
        <div class="p">
          Beriched
        </div>
      </li>
      <li>
        <div class="p">
          ReelKingMega
        </div>
      </li>
      <li>
        <div class="p">
          ReptizillionsPowerReels
        </div>
      </li>
      <li>
        <div class="p">
          RiddleOfTheSphinx
        </div>
      </li>
      <li>
        <div class="p">
          RioStars
        </div>
      </li>
      <li>
        <div class="p">
          RoyalGems
        </div>
      </li>
      <li>
        <div class="p">
          Spin Town
        </div>
      </li>
      <li>
        <div class="p">
          SumoSpins
        </div>
      </li>
      <li>
        <div class="p">
          SylvanSpirits
        </div>
      </li>
      <li>
        <div class="p">
          TheWisecrackerLightning
        </div>
      </li>
      <li>
        <div class="p">
          Three Musketeers
        </div>
      </li>
      <li>
        <div class="p">
          Trillionaire
        </div>
      </li>
      <li>
        <div class="p">
          Well of Wishes
        </div>
      </li>
      <li>
        <div class="p">
          WellOfWildsMegaWays
        </div>
      </li>
      <li>
        <div class="p">
          WildCircus
        </div>
      </li>
      <li>
        <div class="p">
          WildElements
        </div>
      </li>
      <li>
        <div class="p">
          WildExpedition
        </div>
      </li>
      <li>
        <div class="p">
          WildHotChilliReels
        </div>
      </li>
      <li>
        <div class="p">
          WildOClock
        </div>
      </li>
      <li>
        <div class="p">
          WildSpartans
        </div>
      </li>
      <li>
        <div class="p">
          WinEscalator
        </div>
      </li>
      <li>
        <div class="p">
          ZeusLightningPowerReels
        </div>
      </li>
      <li>
        <div class="p">
          Zaida's Fortune
        </div>
      </li>
      <li>
        <div class="p">
          Bounty Raid 2
        </div>
      </li>
    </ul>
    <h1>Relax Gaming</h1>
    <ul>
      <li>
        <div class="p">
          Deep Descent
        </div>
      </li>
      <li>
        <div class="p">
          Frequent Flyer
        </div>
      </li>
      <li>
        <div class="p">
          Hellcatraz
        </div>
      </li>
      <li>
        <div class="p">
          Phoenix Cash Up
        </div>
      </li>
      <li>
        <div class="p">
          5 Monsters
        </div>
      </li>
      <li>
        <div class="p">
          Trail Blazer
        </div>
      </li>
      <li>
        <div class="p">
          Banana Town Dream Drop
        </div>
      </li>
      <li>
        <div class="p">
          3 Secret Cities
        </div>
      </li>
      <li>
        <div class="p">
          Treasure Pirates
        </div>
      </li>
      <li>
        <div class="p">
          Tiki Bonanza
        </div>
      </li>
      <li>
        <div class="p">
          100 Bit Dice
        </div>
      </li>
      <li>
        <div class="p">
          Dueling Jokers Dream Drop
        </div>
      </li>
      <li>
        <div class="p">
          Santa's Stack Dream Drop
        </div>
      </li>
      <li>
        <div class="p">
          Golden Calaveras
        </div>
      </li>
      <li>
        <div class="p">
          Christmas Santa
        </div>
      </li>
      <li>
        <div class="p">
          Valkyrie Wild Storm
        </div>
      </li>
      <li>
        <div class="p">
          Dream Drop Diamonds
        </div>
      </li>
      <li>
        <div class="p">
          Orca's Wild Bonanza Extenda Edition
        </div>
      </li>
      <li>
        <div class="p">
          The Wild Drifter
        </div>
      </li>
    </ul>
    <h1>Big Time Gaming</h1>
    <ul>
      <li>
        <div class="p">
          Royal Mint
        </div>
      </li>
      <li>
        <div class="p">
          Slot Vegas Megaquads
        </div>
      </li>
      <li>
        <div class="p">
          Holy Diver
        </div>
      </li>
      <li>
        <div class="p">
          Kingmaker Megaways
        </div>
      </li>
      <li>
        <div class="p">
          Lil Devil
        </div>
      </li>
    </ul>
    <h1>Thunderkick</h1>
    <ul>
      <li>
        <div class="p">
          1429 Uncharted Seas
        </div>
      </li>
      <li>
        <div class="p">
          Not Enough Kittens
        </div>
      </li>
      <li>
        <div class="p">
          Rocket Fellas Inc
        </div>
      </li>
      <li>
        <div class="p">
          The Rift
        </div>
      </li>
      <li>
        <div class="p">
          Ravens Eye
        </div>
      </li>
      <li>
        <div class="p">
          Beat the Beast: Quetzalcoatl's Trial
        </div>
      </li>
    </ul>
    <h1>Belatra</h1>
    <ul>
      <li>
        <div class="p">
          Zombie Town
        </div>
      </li>
      <li>
        <div class="p">
          Anotherland
        </div>
      </li>
      <li>
        <div class="p">
          Spanish Armada
        </div>
      </li>
      <li>
        <div class="p">
          Richy Hog
        </div>
      </li>
      <li>
        <div class="p">
          Full Moon Magic
        </div>
      </li>
    </ul>
    <h1>ELK Studios</h1>
    <ul>
      <li>
        <div class="p">
          Miss Wildfire
        </div>
      </li>
      <li>
        <div class="p">
          Ecuador Gold
        </div>
      </li>
      <li>
        <div class="p">
          Birthday!
        </div>
      </li>
      <li>
        <div class="p">
          Lakes Five
        </div>
      </li>
      <li>
        <div class="p">
          Kaiju
        </div>
      </li>
      <li>
        <div class="p">
          Wild Seas
        </div>
      </li>
      <li>
        <div class="p">
          Sam on the Beach
        </div>
      </li>
      <li>
        <div class="p">
          Poltava
        </div>
      </li>
      <li>
        <div class="p">
          Bloopers
        </div>
      </li>
      <li>
        <div class="p">
          Electric Sam
        </div>
      </li>
    </ul>
    <h1>3 Oaks Gaming</h1>
    <ul>
      <li>
        <div class="p">
          Tiger Jungle
        </div>
      </li>
      <li>
        <div class="p">
          More Magic Apple
        </div>
      </li>
      <li>
        <div class="p">
          Gods Temple
        </div>
      </li>
      <li>
        <div class="p">
          Gods Temple Deluxe
        </div>
      </li>
      <li>
        <div class="p">
          Green Chilli 2
        </div>
      </li>
      <li>
        <div class="p">
          Poisoned Apple
        </div>
      </li>
      <li>
        <div class="p">
          Black Wolf 2
        </div>
      </li>
      <li>
        <div class="p">
          Little Farm
        </div>
      </li>
      <li>
        <div class="p">
          Rio Gems
        </div>
      </li>
      <li>
        <div class="p">
          Tiger Gems
        </div>
      </li>
      <li>
        <div class="p">
          Forest Spirit
        </div>
      </li>
      <li>
        <div class="p">
          African Spirit Sticky Wilds
        </div>
      </li>
      <li>
        <div class="p">
          Crystal Scarabs
        </div>
      </li>
      <li>
        <div class="p">
          Olaf Viking
        </div>
      </li>
      <li>
        <div class="p">
          Gold Nuggets
        </div>
      </li>
    </ul>
    <h1>Wazdan</h1>
    <ul>
      <li>
        <div class="p">
          9 Lions
        </div>
      </li>
      <li>
        <div class="p">
          9 Bells
        </div>
      </li>
      <li>
        <div class="p">
          American Poker V
        </div>
      </li>
      <li>
        <div class="p">
          Arcade
        </div>
      </li>
      <li>
        <div class="p">
          Black Horse
        </div>
      </li>
      <li>
        <div class="p">
          Lucky Reels
        </div>
      </li>
      <li>
        <div class="p">
          9 Lions Xmas Edition
        </div>
      </li>
      <li>
        <div class="p">
          Larry the Leprechaun Easter
        </div>
      </li>
      <li>
        <div class="p">
          9 Burning Stars
        </div>
      </li>
      <li>
        <div class="p">
          Black Horse Deluxe
        </div>
      </li>
      <li>
        <div class="p">
          Football Mania
        </div>
      </li>
      <li>
        <div class="p">
          9 Coins Grand Diamond Edition
        </div>
      </li>
      <li>
        <div class="p">
          12 Coins Grand Gold Edition
        </div>
      </li>
      <li>
        <div class="p">
          Football Mania Deluxe
        </div>
      </li>
      <li>
        <div class="p">
          Butterfly Lovers
        </div>
      </li>
      <li>
        <div class="p">
          Fruit Mania
        </div>
      </li>
      <li>
        <div class="p">
          Fruit Mania Deluxe
        </div>
      </li>
      <li>
        <div class="p">
          Hot 777
        </div>
      </li>
      <li>
        <div class="p">
          Hot 777 Deluxe
        </div>
      </li>
      <li>
        <div class="p">
          KickOff
        </div>
      </li>
      <li>
        <div class="p">
          Larry the Leprechaun
        </div>
      </li>
      <li>
        <div class="p">
          Magic Poker
        </div>
      </li>
      <li>
        <div class="p">
          Neon City
        </div>
      </li>
      <li>
        <div class="p">
          Power of Gods: Egypt
        </div>
      </li>
      <li>
        <div class="p">
          Power of Gods: Hades
        </div>
      </li>
      <li>
        <div class="p">
          Power of Gods: Medusa
        </div>
      </li>
      <li>
        <div class="p">
          Power of Gods: the Pantheon
        </div>
      </li>
      <li>
        <div class="p">
          Reel Hero
        </div>
      </li>
      <li>
        <div class="p">
          Relic Hunters and the Book of Faith
        </div>
      </li>
      <li>
        <div class="p">
          Sizzling Bells
        </div>
      </li>
      <li>
        <div class="p">
          Sonic Reels
        </div>
      </li>
      <li>
        <div class="p">
          Sic Bo Dragons
        </div>
      </li>
      <li>
        <div class="p">
          Telly Reels
        </div>
      </li>
      <li>
        <div class="p">
          Mighty Symbols: Crowns
        </div>
      </li>
      <li>
        <div class="p">
          Vegas Reels II
        </div>
      </li>
      <li>
        <div class="p">
          Hot Slot Magic Bombs
        </div>
      </li>
      <li>
        <div class="p">
          25 Coins
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
.pd-24 {
  padding: 24px;
}
.p {
  line-height: 24px;
  font-size: 16px;
  color: var(--tg-secondary-light);
}
.content-block {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.content-block>.p+.p {
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
ul {
  list-style-type: disc;
  padding-left: 32px;
  margin-bottom: 16px;
  li {
    margin: 4px 0;
  }
}
</style>
