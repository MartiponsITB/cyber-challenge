
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-cyber/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-mono font-bold cyber-text ml-1">
                <span className="text-white">{'>'}_</span> CyberChallenge
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/challenges" className="text-gray-300 hover:text-cyber transition-colors duration-200">
              Reptes
            </Link>
            <Link to="/leaderboard" className="text-gray-300 hover:text-cyber transition-colors duration-200">
              Classificació
            </Link>
            <Link to="/info" className="text-gray-300 hover:text-cyber transition-colors duration-200">
              Informació
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" className="border-cyber text-cyber hover:bg-cyber hover:text-black">
              Iniciar Sessió
            </Button>
            <Button className="bg-cyber text-black hover:bg-cyber/80">
              Registrar-se
            </Button>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden p-4 border-t border-cyber/30">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/challenges" 
              className="block text-base text-gray-300 hover:text-cyber transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reptes
            </Link>
            <Link 
              to="/leaderboard" 
              className="block text-base text-gray-300 hover:text-cyber transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Classificació
            </Link>
            <Link 
              to="/info" 
              className="block text-base text-gray-300 hover:text-cyber transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Informació
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="outline" className="w-full border-cyber text-cyber hover:bg-cyber hover:text-black">
                Iniciar Sessió
              </Button>
              <Button className="w-full bg-cyber text-black hover:bg-cyber/80">
                Registrar-se
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
