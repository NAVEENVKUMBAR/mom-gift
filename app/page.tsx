import { MomGiftSite } from '@/components/mom-gift-site'

export default function Page() {
  return <MomGiftSite />
}

export const metadata = {
  title: 'Mom Gift | Homestay in Mawphlanlur, Meghalaya',
  description: 'Discover Mom Gift, a homestay in Mawphlanlur, Markasa, Meghalaya. Contact us directly for stay inquiries and booking information.',
}

export const viewport = {
  themeColor: '#17241d',
}

export const dynamic = 'force-static'

export const revalidate = 3600

export const generateStaticParams = () => []

export const preferredRegion = 'auto'

export const runtime = 'nodejs'

export const fetchCache = 'default-cache'

export const maxDuration = 60

export const experimental_ppr = false

export const metadataBase = new URL('https://mom-gift.vercel.app')

export const openGraph = {
  title: 'Mom Gift | Homestay in Mawphlanlur, Meghalaya',
  description: 'A peaceful homestay in Mawphlanlur, Markasa, Meghalaya.',
  type: 'website',
}

export const twitter = {
  card: 'summary_large_image',
  title: 'Mom Gift | Homestay in Meghalaya',
  description: 'A peaceful homestay in Mawphlanlur, Markasa, Meghalaya.',
}

export const keywords = ['Mom Gift homestay', 'Mawphlanlur homestay', 'Markasa Meghalaya homestay', 'Meghalaya stay', 'homestay in Meghalaya']

export const other = {
  'business:contact_data:locality': 'Mawphlanlur, Markasa',
  'business:contact_data:region': 'Meghalaya',
  'business:contact_data:country_name': 'India',
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Mom Gift',
  address: { '@type': 'PostalAddress', streetAddress: 'Mawphlanlur, Markasa', postalCode: '793119', addressRegion: 'Meghalaya', addressCountry: 'IN' },
  telephone: '+91 87988 45028',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '84' },
  geo: { '@type': 'GeoCoordinates', latitude: 25.5463354, longitude: 91.4465269 },
}
