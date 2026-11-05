export const contact = {
  email: 'contact@negro-services.com',
  phone: '+237 678 66 08 00',
  phoneHref: 'tel:+237678660800',
  whatsapp: 'https://wa.me/237678660800',
}
export function createEmailDraft(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const body = `${data.message}\n\n${data.name}\n${data.email}`
  return `mailto:${contact.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`
}
