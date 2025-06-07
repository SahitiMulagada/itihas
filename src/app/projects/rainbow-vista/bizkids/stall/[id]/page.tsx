import Layout from '../../../../../../components/layout/Layout'
import StallContent from '../../../../../../components/bizkids/StallContent'
import { stallsService } from '../../../../../../components/bizkids/stallsService'

interface PageProps {
  params: {
    id: string
  }
}

// This runs on the server for each request
export default function StallPage({ params }: PageProps) {
  const stallId = parseInt(params.id);
  
  return (
    <Layout>
      <StallContent stallId={stallId} />
    </Layout>
  )
}
