<template>
  <main class="wrap">
    <div class="left-sidebar">
      123
    </div>
    <div class="main-content">
      <header class="navigation">
        <div class="group">
          <div class="container">
            Logo
          </div>
        </div>
      </header>
      <div class="scrollable">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.wrap {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.left-sidebar {
  width: 60px;
  background-color: var(--app-secondary-dark);
}
.main-content {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: column;

  & > .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: red;

    & > .group {
      width: 100%;
      padding: 0 3vw;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }

  & > .scrollable {
    flex: 1;
    overflow: auto;
  }
}
</style>
