import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const LandingPage = lazy(() => import('./Pages/LandingPage'));
const DepartmentDetail = lazy(() => import('./Pages/DepartmentDetail'));
const EventDetail = lazy(() => import('./Pages/EventDetail'));
const EventsPage = lazy(() => import('./Pages/EventsPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#FFDD08]">Cargando…</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/departamento/:departmentName" element={<DepartmentDetail />} />
          <Route path="/evento/:eventId" element={<EventDetail />} />
          <Route path="/eventos" element={<EventsPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
