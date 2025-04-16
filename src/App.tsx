// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import DepartmentDetail from './Pages/DepartmentDetail';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Ruta dinámica para cada departamento; el parámetro departmentId se usará en la página de detalle */}
        <Route path="/departamento/:departmentId" element={<DepartmentDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
