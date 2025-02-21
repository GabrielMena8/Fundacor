// src/components/EventsPanel3D.tsx
import React, { useEffect } from 'react';
import { Html } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import EventCard from './EventCard';

type EventsPanel3DProps = {
  show: boolean;
};

const EventsPanel3D: React.FC<EventsPanel3DProps> = ({ show }) => {
  // Datos de ejemplo
  const events = [
    {
      image: '/images/sample1.jpg',
      title: 'Evento 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      image: '/images/sample2.jpg',
      title: 'Evento 2',
      description: 'Suspendisse potenti. Nulla quis lorem libero.'
    },
    {
      image: '/images/sample3.jpg',
      title: 'Evento 3',
      description: 'Curabitur ac felis at dolor tincidunt suscipit.'
    }
  ];

  // Animación de aparición usando react-spring
  // Por ejemplo, escalamos de 0 a 1 para "surgir" en la escena
  const [springs, api] = useSpring(() => ({
    scale: 0,
    rotationY: 0,
    config: { mass: 1, tension: 50, friction: 20 }
  }));

  useEffect(() => {
    if (show) {
      // Al mostrar, escalamos a 1 y rotamos un poco si quieres un efecto
      api.start({ scale: 1, rotationY: 0 });
    } else {
      // Al ocultar, escalamos a 0 para "desaparecer"
      api.start({ scale: 0, rotationY: 0 });
    }
  }, [show, api]);

  return (
    // a.group nos permite animar la escala y rotación en 3D
    <a.group
      // Posición en el mundo 3D (ajústala a tu gusto)
      position={[10, 0, -2]}
      // Escala y rotación animadas
      scale={springs.scale.to(s => [s, s, s])}
      rotation-y={springs.rotationY}
    >
      {/* Html de drei para renderizar contenido HTML en el mundo 3D */}
      <Html transform>
        <div
          className="bg-gray-800 bg-opacity-90 p-4 w-64 text-white rounded"
          style={{ overflowY: 'auto', maxHeight: '70vh' }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Eventos</h2>
          <div className="space-y-4">
            {events.map((ev, idx) => (
              <EventCard
                key={idx}
                image={ev.image}
                title={ev.title}
                description={ev.description}
              />
            ))}
          </div>
        </div>
      </Html>
    </a.group>
  );
};

export default EventsPanel3D;
