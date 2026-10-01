import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact GOODIIZ | Inquiries & Support',
  description: 'Get in touch with GOODIIZ for retail orders, wholesale inquiries, bulk gifting, and customer support.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact GOODIIZ | Inquiries & Support',
    description: 'Get in touch with GOODIIZ for retail orders, wholesale inquiries, bulk gifting, and customer support.',
    url: 'https://goodiiz.com/contact',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
