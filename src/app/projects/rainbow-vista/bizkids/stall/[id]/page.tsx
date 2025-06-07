import Layout from '../../../../../../components/layout/Layout'
import StallContent from '../../../../../../components/bizkids/StallContent'
import { stallsService } from '../../../../../../components/bizkids/stallsService'

interface PageProps {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  const stalls = await stallsService.getStalls();
  return stalls.map((stall) => ({
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
