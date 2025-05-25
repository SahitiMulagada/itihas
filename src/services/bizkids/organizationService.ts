export interface CommitteeMember {
  name: string;
  role: string;
}

export interface Committee {
  title: string;
  members: CommitteeMember[];
}

export interface OrganizationStructure {
  [key: string]: Committee;
}

export const getOrganizationStructure = (): OrganizationStructure => ({
  safetyCommittee: {
    title: 'Safety Committee',
    members: [
      { name: 'Dr. Rajesh Kumar', role: 'Head of Safety' },
      { name: 'Mrs. Priya Singh', role: 'Safety Officer' },
      { name: 'Mr. David Chen', role: 'Emergency Response Coordinator' },
      { name: 'Ms. Sarah Thomas', role: 'First Aid Supervisor' }
    ]
  },
  stallConfirmation: {
    title: 'Stall Confirmation Team',
    members: [
      { name: 'Mrs. Anita Patel', role: 'Team Lead' },
      { name: 'Mr. James Wilson', role: 'Verification Officer' },
      { name: 'Ms. Lisa Zhang', role: 'Documentation Manager' }
    ]
  },
  financeTeam: {
    title: 'Finance Team',
    members: [
      { name: 'Mr. Suresh Menon', role: 'Finance Head' },
      { name: 'Mrs. Emily Brown', role: 'Accounts Manager' },
      { name: 'Mr. Rahul Sharma', role: 'Treasury Officer' }
    ]
  },
  communicationTeam: {
    title: 'Communication Team',
    members: [
      { name: 'Ms. Priya Mehta', role: 'Communications Director' },
      { name: 'Mr. Tom Anderson', role: 'Social Media Manager' },
      { name: 'Mrs. Deepa Iyer', role: 'Public Relations Officer' },
      { name: 'Mr. Kevin Zhang', role: 'Content Strategist' }
    ]
  },
  overallOrganization: {
    title: 'Overall Organization',
    members: [
      { name: 'Mrs. Meera Reddy', role: 'Event Director' },
      { name: 'Mr. John Smith', role: 'Operations Head' },
      { name: 'Ms. Angela Lee', role: 'Logistics Coordinator' },
      { name: 'Mr. Vikram Malhotra', role: 'Communications Head' }
    ]
  }
});
