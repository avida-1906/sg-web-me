export const useChatStore = defineStore('chat', () => {
  const languageList = ref<ILanguage[]>([])

  return {
    languageList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
