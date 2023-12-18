<script lang="ts" setup>
/* eslint-disable max-len */
usePageTitle({ prefix: 'Coin Mixing' })
</script>

<template>
  <div class="content-block pd-24">
    <h1>Coin Mixing Policy</h1>
    <div class="p">
      Stake has a strict anti coin mixing policy. This is in accordance with our AML procedures outlined in our terms of service.
    </div>
    <div class="p">
      If deposits & withdrawals are suspected of being attempts to mix coins we reserve the right to hold withdrawals until completion of one of the following procedures
    </div>
    <ul>
      <li>
        <div class="p">
          Withdrawal is refunded to the address in which the deposit was made from
        </div>
      </li>
      <li>
        <div class="p">
          Withdrawal is sent after full completion of account verification & KYC
        </div>
      </li>
      <li>
        <div class="p">
          Withdrawal refunded & sufficient gameplay is reached
        </div>
      </li>
    </ul>
    <div class="p">
      Stake will always try to ensure every matter is resolved & the above can be modified to suit specific situations.
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bold-txt {
  font-weight: 600;
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
ul {
  list-style-type: disc;
  padding-left: 32px;
  margin-bottom: 16px;
  li {
    margin: 4px 0;
  }
}
</style>
