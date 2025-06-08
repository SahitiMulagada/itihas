export async function generateStaticParams() {
  // This would typically come from your database
  // For now, we'll return some example stall IDs
  return [
    { id: 'creative-crafts' },
    { id: 'tech-innovators' },
  ];
}
