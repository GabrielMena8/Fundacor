import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import DepartmentDetail from './Pages/DepartmentDetail';
import EventDetail from './Pages/EventDetail'; // <- Importas tu nueva página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/departamento/:departmentId" element={<DepartmentDetail />} />
        <Route path="/evento/:eventId" element={<EventDetail />} /> {/* <- Aquí */}
      </Routes>
    </Router>
  );
}

export default App;
