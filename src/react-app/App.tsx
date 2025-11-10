import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { ThemeProvider } from "@/react-app/contexts/ThemeContext";
import { ProposalProvider } from "@/react-app/contexts/ProposalContext";
import { AuthProvider, useAuth } from "@/react-app/contexts/AuthContext";
import { AdminProvider } from "@/react-app/contexts/AdminContext";
import HomePage from "@/react-app/pages/Home";
import Login from "@/react-app/pages/Login";
import AdminPanel from "@/react-app/pages/AdminPanel";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AdminProvider>
          <ProposalProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Router>
          </ProposalProvider>
        </AdminProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
