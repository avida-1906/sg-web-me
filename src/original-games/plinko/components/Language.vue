<script>
export default {
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale
    },
  },
}
</script>

<template>
  <label class="dropdown">
    <div class="dd-button">Language</div>
    <input type="checkbox" class="dd-input">
    <ul class="dd-menu">
      <li><button @click="changeLocale('en')">EN</button></li>
      <li><button @click="changeLocale('ch')">CH</button></li>
    </ul>
  </label>
</template>

<style scoped>
@import "../assets/css/language.css";
</style>
