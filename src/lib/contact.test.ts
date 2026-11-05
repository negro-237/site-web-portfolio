import { describe, expect, it } from 'vitest'
import { contact, createEmailDraft } from './contact'
describe('contact links', () => {
  it('keeps the same number for telephone calls and WhatsApp', () => {
    expect(new URL(contact.whatsapp).pathname.slice(1)).toBe(
      contact.phone.replace(/\D/g, ''),
    )
    expect(contact.phoneHref.replace(/\D/g, '')).toBe(
      contact.phone.replace(/\D/g, ''),
    )
  })
  it('preserves accents and special characters in the email draft without adding URL parameters', () => {
    const draft = new URL(
      createEmailDraft({
        name: 'Élodie',
        email: 'elodie@example.com',
        subject: 'Site & identité ?',
        message: 'Bonjour,\nBudget : à définir & délai #1.',
      }),
    )
    expect(draft.protocol).toBe('mailto:')
    expect(draft.pathname).toBe(contact.email)
    expect([...draft.searchParams.keys()]).toEqual(['subject', 'body'])
    expect(draft.searchParams.get('subject')).toBe('Site & identité ?')
    expect(draft.searchParams.get('body')).toBe(
      'Bonjour,\nBudget : à définir & délai #1.\n\nÉlodie\nelodie@example.com',
    )
  })
})
