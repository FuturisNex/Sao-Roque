// routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Winthor from './pages/Winthor/Winthor';
import Rebaixa from './pages/Rebaixa/Rebaixa';
import NotFound from './pages/Notfound/NotFund';
import Encarte from './pages/Encarte/Encarte';
import Agenda from './pages/Agenda/Agenda';
import Comprador from './pages/Comprador/Comprador';
import Analise from './pages/Analise/Analise';
import Contratos from './pages/Contratos/Contratos';

import Sergio from './pages/Compradores/Sergio/Sergio';
import Vitor from './pages/Compradores/Vitor/Vitor';
import Marivone from './pages/Compradores/Marivone/Marivone';
import Sena from './pages/Compradores/Sena/Sena';
import Jurandir from './pages/Compradores/Jurandir/Jurandir';

const AppRoutes = () => (
  <Routes>
    {/* compradores */}
    <Route path="/sergio" element={<Sergio />} />
    <Route path="/marivone" element={<Marivone />} />
    <Route path="/vitor" element={<Vitor />} />
    <Route path="/sena" element={<Sena />} />
    <Route path="/jurandir" element={<Jurandir />} />

    {/* dashboard */}
    <Route path="/" element={<Comprador />} />
    <Route path="/comprador" element={<Comprador />} />
    <Route path="/rebaixa" element={<Rebaixa />} />
    <Route path="/encarte" element={<Encarte />} />
    <Route path="/analise" element={<Analise />} />
    <Route path="/contratos" element={<Contratos />} />
    <Route path="/agenda" element={<Agenda />} />
    <Route path="/winthor" element={<Winthor />} />

    {/* Não Encontrado */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
