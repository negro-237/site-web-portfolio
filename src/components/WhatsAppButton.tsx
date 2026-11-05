import { MessageCircle } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageProvider'
import { contact } from '@/lib/contact'
export function WhatsAppButton() {
  const { locale } = useLanguage()
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label={
        locale === 'fr'
          ? 'Discuter avec Negro Services sur WhatsApp'
          : 'Chat with Negro Services on WhatsApp'
      }
    >
      <MessageCircle size={23} />
    </a>
  )
}
