import { ref, watch, onBeforeUnmount, type Ref } from 'vue'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Shared overlay behavior for drawers, lightboxes, and modals:
 * Escape-to-close, Tab focus containment, body scroll lock while open,
 * and focus restore to the trigger element on close.
 */
export function useOverlayBehavior(
  isOpen: Ref<boolean>,
  onClose: () => void,
  containerRef: Ref<HTMLElement | null>
) {
  let triggerEl: HTMLElement | null = null

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
      return
    }
    if (event.key !== 'Tab' || !containerRef.value) return

    const focusables = Array.from(
      containerRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((el) => el.offsetParent !== null || el === document.activeElement)

    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (event.shiftKey && (active === first || active === document.body)) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  watch(isOpen, (open) => {
    if (open) {
      triggerEl = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeydown)
      requestAnimationFrame(() => {
        const first = containerRef.value?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
        first?.focus()
      })
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeydown)
      triggerEl?.focus()
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  })
}
