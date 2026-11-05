import { useEffect, useRef, type DependencyList } from 'react'

const revealSelector = [
  '.section-intro',
  '.expertise-row',
  '.identity-inner > h2',
  '.identity-inner > div',
  '.section-topline',
  '.section-note',
  '.project-preview',
  '.process-section > div:first-child',
  '.process-grid > div',
  '.closing-cta',
  '.about-page > h1',
  '.about-lead',
  '.about-story > *',
  '.contact-page > h1',
  '.contact-form',
  '.contact-aside',
  '.scroll-fade',
].join(', ')

export function useScrollAnimation(deps: DependencyList = []) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || !('IntersectionObserver' in window)) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined
    let mutations: MutationObserver | undefined

    const reset = () => {
      observer?.disconnect()
      mutations?.disconnect()
      root.querySelectorAll<HTMLElement>('.motion-pending').forEach((el) => {
        el.classList.remove('motion-pending')
        el.style.removeProperty('--reveal-delay')
      })
      root.querySelector('.hero-art')?.classList.remove('motion-active')
    }

    const start = () => {
      reset()
      if (preference.matches) return
      const seen = new WeakSet<Element>()
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target.matches('.hero-art')) {
              entry.target.classList.toggle(
                'motion-active',
                entry.isIntersecting,
              )
            } else if (entry.isIntersecting) {
              entry.target.classList.remove('motion-pending')
              observer?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.06, rootMargin: '0px 0px -20px 0px' },
      )

      const register = () => {
        const targets = root.querySelectorAll<HTMLElement>(revealSelector)
        targets.forEach((el) => {
          if (seen.has(el)) return
          seen.add(el)
          // Keep initial content and already-visible cards immediately readable.
          if (el.getBoundingClientRect().top < window.innerHeight - 20) return
          // Reveal containers together rather than hiding nested content twice.
          if (el.parentElement?.closest('.motion-pending')) return
          const siblings = el.parentElement
            ? Array.from(el.parentElement.children)
            : []
          el.style.setProperty(
            '--reveal-delay',
            `${Math.min(siblings.indexOf(el), 3) * 65}ms`,
          )
          el.classList.add('motion-pending')
          observer?.observe(el)
        })
        const art = root.querySelector('.hero-art')
        if (art && !seen.has(art)) {
          seen.add(art)
          observer?.observe(art)
        }
      }
      register()
      mutations = new MutationObserver(register)
      mutations.observe(root, { childList: true, subtree: true })
    }
    // Keyboard navigation must never land on visually hidden content.
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return
      event.target
        .closest('.motion-pending')
        ?.classList.remove('motion-pending')
    }
    start()
    preference.addEventListener('change', start)
    root.addEventListener('focusin', revealFocused)
    return () => {
      reset()
      preference.removeEventListener('change', start)
      root.removeEventListener('focusin', revealFocused)
    }
  }, deps)

  return ref
}
