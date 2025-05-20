import { Routes, Route, Link } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Employees from './pages/Employees';

export default function App() {
  return (
    <RequireAuth>
      <div style={{ padding: '2rem' }}>
        <h1>Nebula Admin</h1>
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
          <Link to="/employees">Employees</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </div>
    </RequireAuth>
  );
}
