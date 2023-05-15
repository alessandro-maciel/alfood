import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminstracaoRestaurantes from './paginas/Admininstracao/Restaurantes/AdminstracaoRestaurantes';
import FormularioRestaurante from './paginas/Admininstracao/Restaurantes/FormularioRestaurante';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminstracaoRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
    </Routes>
  );
}

export default App;
