import { OrganizationStructure as OrganizationStructureType } from '@/services/bizkids/organizationService';

interface OrganizationStructureProps {
  data: OrganizationStructureType;
}

export default function OrganizationStructure({ data }: OrganizationStructureProps) {
  return (
    <div className="space-y-12">
      {Object.entries(data).map(([key, committee]) => (
        <div key={key} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-blue-800 mb-6">{committee.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committee.members.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                <p className="text-blue-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
