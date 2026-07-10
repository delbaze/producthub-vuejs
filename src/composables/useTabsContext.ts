import type { InjectionKey, Ref } from 'vue'

export interface TabsContext {
  activeTab: Readonly<Ref<string>>
  selectTab: (tabId: string) => void
}

export const tabsKey: InjectionKey<TabsContext> = Symbol('tabs')