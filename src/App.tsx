import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { SetupSupabase } from './components/SetupSupabase';
import { Tracking } from './pages/Tracking';
import { Admin } from './pages/Admin';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { ParaVoce } from './pages/ParaVoce';
import { ParaEmpresa } from './pages/ParaEmpresa';
import { Servicos } from './pages/Servicos';
import { Unidades } from './pages/Unidades';

export default function App() {
  if (!supabase) {
    return <SetupSupabase />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tracking />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="/para-voce" element={<ParaVoce />} />
        <Route path="/para-empresa" element={<ParaEmpresa />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/unidades" element={<Unidades />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
