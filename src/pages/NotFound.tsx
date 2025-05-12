
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <h1 className="text-9xl font-bold cyber-text mb-4">404</h1>
        <div className="cyber-border p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-cyber mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold">Accés denegat</h2>
          </div>
          <p className="text-gray-300 mb-6">
            La pàgina que estàs buscant no existeix o no tens els permisos necessaris per accedir-hi.
          </p>
          <Button className="cyber-button" asChild>
            <Link to="/">Tornar a l'inici</Link>
          </Button>
        </div>
        <p className="text-gray-500">Suggeriment: Comprova si la URL és correcta o inicia sessió si encara no ho has fet.</p>
      </div>
    </div>
  );
};

export default NotFound;
