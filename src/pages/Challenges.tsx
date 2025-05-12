
import { Link } from 'react-router-dom';
import ChallengeCard from '@/components/ChallengeCard';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useChallenges } from '@/contexts/ChallengeContext';
import { CheckCircle2, Lock } from 'lucide-react';

const challengeData = [
  {
    id: 'net-001',
    title: 'Repte de Xarxes',
    description: 'Descobreix la contrasenya d\'administrador explotant una vulnerabilitat en la configuració SSH.',
    category: 'Xarxes',
    categoryColor: '#0073e6'
  },
  {
    id: 'sql-001',
    title: 'Atac SQL',
    description: 'Accedeix a una base de dades protegida utilitzant tècniques d\'injecció SQL.',
    category: 'Web',
    categoryColor: '#9c27b0'
  },
  {
    id: 'exploit-001',
    title: 'Atac amb Exploit',
    description: 'Eleva els teus privilegis d\'usuari normal a root en un sistema Linux utilitzant un exploit.',
    category: 'Exploit',
    categoryColor: '#e91e63'
  },
  {
    id: 'defense-001',
    title: 'Defensa de Sistemes',
    description: 'Configura un sistema segur i defensa\'l contra diferents vectors d\'atac.',
    category: 'Defensa',
    categoryColor: '#00bcd4'
  },
  {
    id: 'forensic-001',
    title: 'Anàlisi Forense',
    description: 'Investiga un incident de seguretat i identifica com es va produir l\'atac.',
    category: 'Forense',
    categoryColor: '#3f51b5'
  }
];

const Challenges = () => {
  const { isAuthenticated } = useAuth();
  const { challenges, isHackathonUnlocked, isLoading } = useChallenges();
  
  const getCompletionStatus = (challengeId: string) => {
    if (!isAuthenticated || isLoading) return false;
    const challenge = challenges.find(c => c.id === challengeId);
    return challenge?.completed || false;
  };
  
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-mono font-bold cyber-text mb-4">Reptes</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Selecciona un dels reptes disponibles, descarrega la màquina virtual i comença a explorar vulnerabilitats.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challengeData.map((challenge) => (
            <div key={challenge.id} className="relative">
              {getCompletionStatus(challenge.id) && (
                <div className="absolute -top-3 -right-3 z-10 bg-green-500 text-black rounded-full p-1">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              )}
              <ChallengeCard {...challenge} />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-mono font-bold cyber-text mb-8">Repte Final</h2>
          
          <div className="cyber-card max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-black cyber-border rounded-md flex items-center justify-center">
                {isHackathonUnlocked ? (
                  <svg className="w-12 h-12 text-cyber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ) : (
                  <Lock className="w-12 h-12 text-cyber" />
                )}
              </div>
            </div>
            
            {isAuthenticated ? (
              <>
                {isHackathonUnlocked ? (
                  <>
                    <h3 className="text-2xl font-bold text-cyber mb-2 text-center">Repte Final Desbloquejat</h3>
                    <p className="text-gray-300 text-center mb-6">
                      Felicitats! Has completat tots els reptes necessaris per desbloquejar el Repte Final.
                    </p>
                    
                    <Button className="cyber-button w-full py-3" asChild>
                      <Link to="/challenges/hackathon">Iniciar Repte Final</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-cyber mb-2 text-center">Repte Final Bloquejat</h3>
                    <p className="text-gray-300 text-center mb-6">
                      Completa tots els altres reptes per desbloquejar el Repte Final.
                    </p>
                    
                    <div className="bg-black cyber-border rounded-md p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Progrés:</span>
                        <span className="text-cyber">{challenges.filter(c => c.completed && c.id !== 'hackathon').length} / {challengeData.length}</span>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-cyber mb-2 text-center">Inicia sessió per desbloquejar</h3>
                <p className="text-gray-300 text-center mb-6">
                  Inicia sessió per veure el teu progrés i desbloquejar reptes
                </p>
                
                <Button className="cyber-button w-full py-3" asChild>
                  <Link to="/login">Iniciar sessió</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
