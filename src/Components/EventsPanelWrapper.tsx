// src/components/EventsPanelWrapper.tsx
import React from 'react';
import EventsPanel from './EventsPanel';

type EventsPanelWrapperProps = {
    show: boolean;
    mobile: boolean;
};

const EventsPanelWrapper: React.FC<EventsPanelWrapperProps> = ({ show, mobile }) => {
    // Clases comunes para el contenedor
    const commonClasses =
        "backdrop-blur-md text-[#FFDD08] p-4 overflow-y-auto";

    if (mobile) {
        // Para móviles: el contenedor ocupa la mitad inferior
        return (
            <div className={`w-full h-1/2 min-h-0 bg-gradient-to-t from-[#1F322E]/80 to-transparent ${commonClasses}`}>
                <EventsPanel show={true} mobile={false} />
            </div>
        );
    } else {
        // Para desktop: se posiciona como overlay con animación de slide
        return (
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transform transition-transform duration-500 ease-in-out ${
                    show ? "translate-x-0" : "translate-x-full"
                } bg-gradient-to-l from-[#1F322E]/80 to-transparent ${commonClasses}`}
                style={{ overflowY: "auto" }}
            >
                <EventsPanel show={true} mobile={false}  />
            </div>
        );
    }
};

export default EventsPanelWrapper;
