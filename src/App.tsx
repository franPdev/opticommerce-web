import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import { AIProvider } from './context/AIContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { InventoryPage } from './pages/InventoryPage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          element={
            <InventoryProvider>
              <AIProvider>
                <DashboardLayout />
              </AIProvider>
            </InventoryProvider>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inventario" element={<InventoryPage />} />
          <Route path="/ai-insights" element={<AIInsightsPage />} />
          <Route path="/configuracion" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
