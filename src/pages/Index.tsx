import { useState } from "react";
import { LoginForm } from "@/components/Auth/LoginForm";
import { Dashboard } from "./Dashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'coach' | 'runner'>('runner');

  const handleLogin = (email: string, password: string, role: 'admin' | 'coach' | 'runner') => {
    // In a real app, this would authenticate with backend
    console.log('Login attempt:', { email, password, role });
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('runner');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <Dashboard userRole={userRole} onLogout={handleLogout} />;
};

export default Index;
