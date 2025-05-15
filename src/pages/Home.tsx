
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import HowItWorks from '@/components/HowItWorks';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
          <span className="text-white">Cyber</span>
          <span className="cyber-text animate-pulse-glow">Challenge</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Desafia les teves habilitats en ciberseguretat, hacking ètic i
          administració de sistemes
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button className="bg-cyber text-black hover:bg-cyber/80 py-6 px-8 text-lg group transition-all duration-300 transform hover:translate-y-[-5px]" asChild>
            <Link to="/challenges" className="flex items-center">
              Començar ara
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" className="border-cyber text-cyber hover:bg-cyber/10 hover:text-cyber py-6 px-8 text-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:border-cyber/80" asChild>
            <Link to="/info">Més informació</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const SkillSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black/70 to-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 cyber-text">Habilitats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="cyber-card hover:scale-105 transition-transform duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-black rounded-xl cyber-border flex items-center justify-center animate-border-glow">
                <svg className="w-10 h-10 text-cyber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center text-cyber mb-4">Seguretat de xarxa</h3>
            <p className="text-gray-300 text-center">
              Descobreix vulnerabilitats en xarxes i aprèn a protegir-les.
            </p>
          </div>
          
          <div className="cyber-card hover:scale-105 transition-transform duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-black rounded-xl cyber-border flex items-center justify-center animate-border-glow">
                <svg className="w-10 h-10 text-cyber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center text-cyber mb-4">Hacking ètic</h3>
            <p className="text-gray-300 text-center">
              Practica tècniques de penetració en entorns segurs i controlats.
            </p>
          </div>
          
          <div className="cyber-card hover:scale-105 transition-transform duration-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-black rounded-xl cyber-border flex items-center justify-center animate-border-glow">
                <svg className="w-10 h-10 text-cyber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center text-cyber mb-4">Administració de sistemes</h3>
            <p className="text-gray-300 text-center">
              Millora les teves habilitats en configuració i protecció de servidors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGZmOWQiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00em0tMTYgNGMtMi4yIDAtNC0xLjgtNC00czEuOC00IDQtNCA0IDEuOCA0IDQtMS44IDQtNCA0em0tMTYgMGMtMi4yIDAtNC0xLjgtNC00czEuOC00IDQtNCA0IDEuOCA0IDQtMS44IDQtNCA0eiIvPjwvZz48L2c+PC9zdmc+')] bg-fixed">
      <HeroSection />
      <SkillSection />
      <HowItWorks />
    </div>
  );
};

export default Home;
