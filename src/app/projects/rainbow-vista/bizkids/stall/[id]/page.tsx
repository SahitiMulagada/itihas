import Layout from '../../../../../../components/layout/Layout'
import StallContent from '../../../../../../components/bizkids/StallContent'
import { registeredStalls } from '../../../../../../data/registeredStalls'

interface PageProps {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return registeredStalls.map((stall) => ({
    id: stall.stl_id?.toString() || '0'
  }))
}

// ❗️ Make this async
export default async function StallPage({ params }: PageProps) {
  const stallId = parseInt(params.id)

  return (
    <Layout>
      <StallContent stallId={stallId} />
    </Layout>
  )
}
