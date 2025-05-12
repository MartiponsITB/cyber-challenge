
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/challenges');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-mono font-bold cyber-text mb-4">Iniciar Sessió</h1>
          <p className="text-gray-300">
            Accedeix al teu compte per completar reptes i pujar a la classificació
          </p>
        </div>

        <div className="cyber-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Nom d'usuari
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black cyber-border text-white w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Contrasenya
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black cyber-border text-white w-full"
                required
              />
            </div>

            <Button
              type="submit"
              className="cyber-button w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Carregant...' : 'Iniciar Sessió'}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-gray-400 text-sm">
                No tens un compte? {' '}
                <Link to="/register" className="text-cyber hover:underline">
                  Registra't
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
