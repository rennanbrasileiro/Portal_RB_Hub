import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ThemeProvider } from "@/react-app/contexts/ThemeContext";
import { AuthProvider } from "@/react-app/contexts/AuthContext";
import { AdminProvider } from "@/react-app/contexts/AdminContext";
import HomePage from "@/react-app/pages/Home";
import Login from "@/react-app/pages/Login";
import AdminPanel from "@/react-app/pages/AdminPanel";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AdminProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </Router>
        </AdminProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
