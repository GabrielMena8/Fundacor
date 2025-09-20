// src/Components/OrganigramaPanel.tsx
import React, { useEffect, useState } from 'react';
import MemberCard from './MemberCard';
import { getMembers } from '../lib/sanity';
import type { Member } from '../Types/sanity';
import { Button } from './ui/Button';

type OrganigramaPanelProps = {
  show: boolean;
  isMobile?: boolean;
};

// We'll group members dynamically by their `department` string

export const OrganigramaPanel: React.FC<OrganigramaPanelProps> = ({ show }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await getMembers();
        setMembers(membersData);
        setError(null);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // dynamic grouping replaces fixed hierarchy

  return (
    <div 
  className="fixed md:left-0 inset-x-0 md:inset-x-auto top-0 bottom-0 w-full md:w-[520px] bg-[#1F322E]/90 backdrop-blur-lg shadow-2xl z-50 overflow-hidden"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        visibility: show ? 'visible' : 'hidden'
      }}
    >
      <div className="h-full overflow-y-auto pr-2">
        <div className="p-4 md:p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#FFDD08]"></div>
              <h2 className="text-[#FFDD08] text-xl md:text-2xl font-bold tracking-wider">
                ORGANIGRAMA
              </h2>
              <div className="w-8 h-[2px] bg-[#FFDD08]"></div>
            </div>
            <p className="text-white/90 text-sm mb-6">
              Conoce nuestro equipo y la estructura organizacional
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="w-12 h-12 border-4 border-[#FFDD08] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-white/80 min-h-[200px] flex items-center justify-center">
              <p>{error}</p>
            </div>
          ) : (
            <div className="space-y-8">
              {members.length === 0 && (
                <div className="text-center text-white/80 min-h-[200px] flex items-center justify-center">
                  <div>
                    <p className="mb-2">Aún no hay miembros registrados.</p>
                    <p className="text-sm text-white/70">Agrega miembros desde el Studio o revisa la conexión.</p>
                  </div>
                </div>
              )}
              {Object
                .entries(
                  members.reduce((acc: Record<string, Member[]>, m) => {
                    const dept = m.department || 'Sin departamento';
                    if (!acc[dept]) acc[dept] = [];
                    acc[dept].push(m);
                    return acc;
                  }, {})
                )
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([department, list]) => {
                  const sorted = (list as Member[]).slice().sort((a, b) => a.name.localeCompare(b.name));
                  const isExpanded = !!expanded[department];
                  const visible = isExpanded ? sorted : sorted.slice(0, 3);
                  return (
                    <div key={department} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[#FFDD08] text-sm font-medium uppercase tracking-wider">
                          {department}
                        </h3>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FFDD08]/10 text-[#FFDD08]">
                          {sorted.length}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-5">
                        {visible.map((member) => (
                          <MemberCard key={member._id} member={member} />
                        ))}
                      </div>
                      {sorted.length > 3 && (
                        <div className="pt-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full border-[#FFDD08]/40 text-[#FFDD08] hover:text-[#FFDD08]"
                            onClick={() => setExpanded((e) => ({ ...e, [department]: !isExpanded }))}
                          >
                            {isExpanded ? 'Mostrar menos' : `Mostrar todos (${sorted.length})`}
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganigramaPanel;
