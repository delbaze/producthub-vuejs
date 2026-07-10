import type { InjectionKey, Ref } from 'vue'

export interface ConfirmModalContext {
  isOpen: Readonly<Ref<boolean>>
  open: () => void
  close: () => void
}

export const confirmModalKey: InjectionKey<ConfirmModalContext> = Symbol('confirm-modal')