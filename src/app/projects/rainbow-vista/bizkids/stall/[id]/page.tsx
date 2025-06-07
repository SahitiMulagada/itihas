import Layout from '../../../../../../components/layout/Layout'
import StallContent from '../../../../../../components/bizkids/StallContent'

interface PageProps {
  params: {
    id: string
  }
}

// Generate static paths for all possible stall IDs
export function generateStaticParams() {
  // Generate an array of IDs from 1 to 100 (adjust range as needed)
  return Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1)
  }))
}

// This runs at build time for each static path
export default function StallPage({ params }: PageProps) {
  const stallId = parseInt(params.id);
  
  return (
    <Layout>
      <StallContent stallId={stallId} />
    </Layout>
  )
}
