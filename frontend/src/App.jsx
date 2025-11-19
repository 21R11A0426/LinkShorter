import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import StatsPage from './pages/Statspage';
import { Toaster } from 'react-hot-toast';
function App() {
  return (

      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

        <Routes>
          {/* Page 1: Dashboard */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Page 2: Stats */}
          <Route path="/code/:code" element={<StatsPage />} />
        </Routes>
        <Toaster/>
      </div>
  
  );
}

export default App;