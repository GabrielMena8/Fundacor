import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import DepartmentDetail from './Pages/DepartmentDetail';
import EventDetail from './Pages/EventDetail'; // <- Importas tu nueva página
import EventsPage from './Pages/EventsPage'; // Import the EventsPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/departamento/:departmentId" element={<DepartmentDetail />} />
        <Route path="/evento/:eventId" element={<EventDetail />} /> {/* <- Aquí */}
        <Route path="/eventos" element={<EventsPage />} /> {/* New route for events listing */}
      </Routes>
    </Router>
  );
}

export default App;
