import type { InjectionKey, Ref } from 'vue'

export interface ConfirmModalContext {
  isOpen: Readonly<Ref<boolean>>
  isProcessing: Readonly<Ref<boolean>>
  open: () => void
  close: () => void
  confirm: (action: () => Promise<void>) => Promise<void>
}

export const confirmModalKey: InjectionKey<ConfirmModalContext> = Symbol('confirm-modal')