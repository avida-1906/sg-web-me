<script lang="ts" setup>
/* eslint-disable max-len */
usePageTitle({ prefix: 'Privacy' })
</script>

<template>
  <div class="content-block pd-24">
    <h1>Privacy Policy</h1>
    <div class="p">
      This is the privacy policy of Medium Rare N.V. (owner and operator of Stake.) This Privacy Policy sets out how Stake.com will manage your personal information which we collect as a result of your membership of Stake, your use of our websites located at
      https://stake.com
      and any pages or websites under the 'Stake' brand including any mobile phone or tablet applications that are owned and/or operated by us or whenever we otherwise deal with you. We are committed to ensuring that the personal information we collect about you is protected and is used, stored and disclosed in accordance with the Privacy Act and this Privacy Policy.
    </div>
    <h2>1. Website Use</h2>
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
