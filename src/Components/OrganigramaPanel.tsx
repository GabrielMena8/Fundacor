// src/Components/OrganigramaPanel.tsx
import React from 'react';

type OrganigramaPanelProps = {
    show: boolean;
    mobile: boolean;
};

const OrganigramaPanel: React.FC<OrganigramaPanelProps> = ({ show, mobile }) => {
    if (mobile) {
        return (
            <div className="flex flex-col h-full bg-gradient-to-t from-[#1F322E]/80 to-transparent backdrop-blur-md text-white p-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Organigrama FUNDACOR</h2>
                <div className="flex-1 overflow-y-auto">
                {/* <img src="/organigrama_simplificado.png" alt="Organigrama" className="mx-auto mb-6" /> */}
                    <h3 className="text-xl font-semibold mb-3">Estructura Organizacional</h3>
                    <p className="text-sm mb-4">
                        FUNDACOR está organizada en diferentes áreas especializadas para asegurar 
                        un funcionamiento eficiente y coordinado de todas nuestras actividades.
                    </p>
                    <h4 className="text-lg font-semibold mb-2">Principales Departamentos:</h4>
                    <ul className="list-disc list-inside mb-4 ml-2">
                        <li className="mb-2">Dirección Ejecutiva</li>
                        <li className="mb-2">Administración y Finanzas</li>
                        <li className="mb-2">Gestión de Proyectos</li>
                        <li className="mb-2">Recursos Humanos</li>
                        <li className="mb-2">Desarrollo Comunitario</li>
                    </ul>
                    <p className="text-sm mb-4">
                        Cada departamento trabaja en estrecha colaboración para cumplir 
                        nuestra misión de servicio a la comunidad.
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className={`
                    fixed top-0 left-0 h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4
                    transform transition-transform duration-500 ease-in-out
                    ${show ? 'translate-x-0' : '-translate-x-full'}
                    bg-gradient-to-r from-[#1F322E]/80 to-transparent backdrop-blur-md text-white p-6
                `}
                style={{ overflowY: 'auto' }}
            >
                <div className="mt-5 flex flex-col h-full">
                    <h2 className="text-3xl font-bold mb-6 text-center">Organigrama FUNDACOR</h2>
                    <div className="flex-1 overflow-y-auto">
                        {/* <img src="/organigrama_detallado.png" alt="Organigrama Desktop" className="mx-auto mb-8" /> */}
                        <h3 className="text-2xl font-semibold mb-4">Nuestra Estructura</h3>
                        <p className="text-base mb-6">
                            La estructura organizacional de FUNDACOR está diseñada para maximizar 
                            la eficiencia y el impacto de nuestras iniciativas comunitarias.
                        </p>
                        <h4 className="text-xl font-semibold mb-3">Áreas Principales:</h4>
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            <div className="p-3 bg-white/10 rounded-lg">
                                <h5 className="font-semibold mb-2">Dirección Ejecutiva</h5>
                                <p className="text-sm">Lidera la visión estratégica y supervisa todas las operaciones.</p>
                            </div>
                            <div className="p-3 bg-white/10 rounded-lg">
                                <h5 className="font-semibold mb-2">Administración y Finanzas</h5>
                                <p className="text-sm">Gestiona recursos y asegura la sostenibilidad financiera.</p>
                            </div>
                            <div className="p-3 bg-white/10 rounded-lg">
                                <h5 className="font-semibold mb-2">Gestión de Proyectos</h5>
                                <p className="text-sm">Coordina y ejecuta las iniciativas de desarrollo.</p>
                            </div>
                        </div>
                        <p className="text-sm italic text-center">
                            Trabajamos unidos para crear un impacto positivo en nuestra comunidad.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default OrganigramaPanel;
