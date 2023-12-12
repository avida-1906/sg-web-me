import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const sideBigActiveMenu = ref(Local.get(STORAGE_MENU_ACTIVE_ITEM)?.value ?? '')

  function setSideBigActiveMenu(p: string) {
    Local.set(STORAGE_MENU_ACTIVE_ITEM, p)
    sideBigActiveMenu.value = p
  }

  return {
    sideBigActiveMenu,
    setSideBigActiveMenu,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
