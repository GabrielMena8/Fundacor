import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import DepartmentDetail from './Pages/DepartmentDetail';
import EventDetail from './Pages/EventDetail';
import EventsPage from './Pages/EventsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/departamento/:departmentName" element={<DepartmentDetail />} />
        <Route path="/evento/:eventId" element={<EventDetail />} />
        <Route path="/eventos" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
