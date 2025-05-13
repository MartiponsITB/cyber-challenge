
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { useChallenges } from '@/contexts/ChallengeContext';
import { CheckCircle2, XCircle } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';

// Mock data for the challenges
const challengesData = {
  'net-001': {
    title: 'Repte de Xarxes',
    description: 'Descobreix la contrasenya d\'administrador explotant una vulnerabilitat en la configuració SSH.',
    category: 'Xarxes',
    categoryColor: '#0073e6',
    difficulty: 'Mitjà',
    points: 500,
    detailedDescription: `
      Aquest repte se centra en la identificació i explotació de vulnerabilitats en la configuració d'un servidor SSH.
      
      Hauràs d'utilitzar eines d'escaneig de xarxes per identificar serveis, trobar possibles vulnerabilitats
      i explotar-les per obtenir accés no autoritzat al sistema.
      
      Objectiu: Aconseguir la contrasenya d'administrador i obtenir la flag amagada al sistema.
    `,
    prerequisites: [
      'Coneixements bàsics de xarxes',
      'Familiaritat amb SSH',
      'Comprensió de les vulnerabilitats comunes en configuracions de xarxa'
    ],
    tools: [
      'Nmap o altres escàners de xarxa',
      'Client SSH',
      'Eines de força bruta (opcional)'
    ]
  },
  'sql-001': {
    title: 'Atac SQL',
    description: 'Accedeix a una base de dades protegida utilitzant tècniques d\'injecció SQL.',
    category: 'Web',
    categoryColor: '#9c27b0',
    difficulty: 'Difícil',
    points: 750,
    detailedDescription: `
      En aquest repte, t'enfrontaràs a una aplicació web vulnerable a atacs d'injecció SQL.
      
      La teva missió és explotar aquesta vulnerabilitat per accedir a dades protegides a la base de dades.
      Necessitaràs entendre com funcionen les consultes SQL i com pots manipular-les per obtenir informació no autoritzada.
      
      Objectiu: Aconseguir accés a la base de dades i trobar la flag amagada entre les taules.
    `,
    prerequisites: [
      'Coneixements bàsics de SQL',
      'Comprensió de les vulnerabilitats d\'injecció SQL',
      'Familiaritat amb aplicacions web'
    ],
    tools: [
      'Navegador web',
      'Eines de proxy com Burp Suite (opcional)',
      'SQLMap (opcional)'
    ]
  },
  'exploit-001': {
    title: 'Atac amb Exploit',
    description: 'Eleva els teus privilegis d\'usuari normal a root en un sistema Linux utilitzant un exploit.',
    category: 'Exploit',
    categoryColor: '#e91e63',
    difficulty: 'Difícil',
    points: 600,
    detailedDescription: `
      Aquest repte consisteix en trobar i explotar una vulnerabilitat en un sistema Linux per elevar privilegis.
      
      Començaràs amb un accés d'usuari normal i hauràs d'aconseguir permisos de root mitjançant l'explotació
      d'alguna vulnerabilitat del sistema o serveis.
      
      Objectiu: Aconseguir permisos de root i obtenir la flag amagada al directori /root.
    `,
    prerequisites: [
      'Coneixements de sistemes Linux',
      'Comprensió de permisos i gestió d\'usuaris',
      'Familiaritat amb exploits comuns'
    ],
    tools: [
      'Eines de reconeixement de sistema',
      'Eines d\'explotació',
      'Coneixements de shell scripting'
    ]
  },
  'defense-001': {
    title: 'Defensa de Sistemes',
    description: 'Configura un sistema segur i defensa\'l contra diferents vectors d\'atac.',
    category: 'Defensa',
    categoryColor: '#00bcd4',
    difficulty: 'Mitjà',
    points: 450,
    detailedDescription: `
      Aquest repte es centra en la configuració segura d'un sistema.
      
      Hauràs de configurar correctament un firewall, gestionar permisos i usuaris,
      i implementar bones pràctiques de seguretat per evitar diferents tipus d'atacs.
      
      Objectiu: Configurar correctament el sistema i trobar la flag que es generarà automàticament
      un cop el sistema estigui segur.
    `,
    prerequisites: [
      'Coneixements de configuració de firewall',
      'Gestió segura d\'usuaris i permisos',
      'Comprensió de bones pràctiques de seguretat'
    ],
    tools: [
      'Eines de configuració de firewall',
      'Utilitats de gestió de permisos',
      'Eines d\'auditoria de seguretat'
    ]
  },
  'forensic-001': {
    title: 'Anàlisi Forense',
    description: 'Investiga un incident de seguretat i identifica com es va produir l\'atac.',
    category: 'Forense',
    categoryColor: '#3f51b5',
    difficulty: 'Mitjà',
    points: 550,
    detailedDescription: `
      En aquest repte hauràs d'analitzar les evidències d'un sistema compromès.
      
      La teva tasca és investigar logs, fitxers i altres evidències per determinar
      com es va produir l'atac, quines accions va realitzar l'atacant i quins sistemes
      van ser compromesos.
      
      Objectiu: Reconstruir la cronologia de l'atac i trobar la flag amagada en les evidències.
    `,
    prerequisites: [
      'Coneixements d\'anàlisi forense digital',
      'Comprensió de logs de sistema',
      'Familiaritat amb eines d\'anàlisi forense'
    ],
    tools: [
      'Eines d\'anàlisi forense',
      'Utilitats d\'anàlisi de logs',
      'Eines de recuperació de dades (opcional)'
    ]
  },
  'hackathon': {
    title: 'Repte Final',
    description: 'Un repte especial que combina totes les habilitats apreses durant la competició.',
    category: 'Especial',
    categoryColor: '#ff9800',
    difficulty: 'Expert',
    points: 1000,
    detailedDescription: `
      Aquest és el repte final de la competició, que combina elements de tots els reptes anteriors.
      
      Hauràs d'aplicar totes les habilitats apreses per superar una sèrie de desafiaments
      interconnectats que posen a prova tant les teves capacitats ofensives com defensives.
      
      Objectiu: Completar tota la cadena d'atacs i defenses per obtenir la flag final.
    `,
    prerequisites: [
      'Haver completat tots els altres reptes',
      'Coneixements en múltiples àrees de ciberseguretat',
      'Capacitat per combinar diferents tècniques i eines'
    ],
    tools: [
      'Totes les eines utilitzades en els reptes anteriors',
      'Creativitat i pensament lateral',
      'Capacitat d\'anàlisi i resolució de problemes'
    ]
  }
};

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const { submitFlag, challenges, isHackathonUnlocked, timerData } = useChallenges();
  const [flag, setFlag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flagResult, setFlagResult] = useState<'correct' | 'incorrect' | null>(null);
  const navigate = useNavigate();
  
  // Calculate the 48-hour total in seconds
  const HACKATHON_TIME_LIMIT = 48 * 60 * 60; // 48 hours in seconds
  
  // Check if the current challenge is the hackathon
  const isHackathonChallenge = id === 'hackathon';
  
  // If the challenge ID doesn't exist, show an error message
  if (!id || !challengesData[id as keyof typeof challengesData]) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Repte no trobat</h1>
          <p className="text-gray-300 mb-8">El repte que busques no existeix o ha estat eliminat.</p>
          <Button asChild>
            <Link to="/challenges">Tornar als reptes</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Check if the challenge is hackathon and it's not unlocked
  if (id === 'hackathon' && !isHackathonUnlocked) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-cyber mb-4">Repte Bloquejat</h1>
          <p className="text-gray-300 mb-8">
            Aquest repte està bloquejat. Has de completar tots els altres reptes per desbloquejar-lo.
          </p>
          <Button asChild>
            <Link to="/challenges">Tornar als reptes</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const challenge = challengesData[id as keyof typeof challengesData];
  
  // Find if the challenge is completed
  const currentChallengeProgress = challenges.find(c => c.id === id);
  const isCompleted = currentChallengeProgress?.completed || false;
  
  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    setFlagResult(null);
    
    try {
      const success = await submitFlag(id, flag);
      setFlagResult(success ? 'correct' : 'incorrect');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/challenges" className="text-cyber hover:underline flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tornar als reptes
          </Link>
        </div>
        
        <div className="cyber-card mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold cyber-text mb-2">{challenge.title}</h1>
              <div className="flex items-center">
                <span 
                  className="badge mr-3" 
                  style={{ backgroundColor: challenge.categoryColor }}
                >
                  {challenge.category}
                </span>
                <span className="text-gray-400 text-sm">Dificultat: {challenge.difficulty}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 bg-black cyber-border rounded-md px-4 py-2">
              <span className="text-cyber font-bold">{challenge.points} punts</span>
            </div>
          </div>
          
          <p className="text-gray-300 mb-8">{challenge.description}</p>
          
          {isHackathonChallenge && timerData && (
            <div className="mb-8">
              <CountdownTimer 
                startTimeSeconds={timerData.elapsed_seconds} 
                totalSeconds={HACKATHON_TIME_LIMIT}
                isCompleted={isCompleted}
              />
            </div>
          )}
          
          <Button className="cyber-button w-full py-3 mb-4">
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descarregar OVA
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="cyber-card">
            <h2 className="text-xl font-bold cyber-text mb-4">Descripció detallada</h2>
            <div className="text-gray-300 whitespace-pre-line">
              {challenge.detailedDescription}
            </div>
          </div>
          
          <div>
            <div className="cyber-card mb-8">
              <h2 className="text-xl font-bold cyber-text mb-4">Prerequisits</h2>
              <ul className="text-gray-300 list-disc pl-5 space-y-2">
                {challenge.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
            
            <div className="cyber-card">
              <h2 className="text-xl font-bold cyber-text mb-4">Eines recomanades</h2>
              <ul className="text-gray-300 list-disc pl-5 space-y-2">
                {challenge.tools.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 cyber-card">
          <h2 className="text-xl font-bold cyber-text mb-4">
            Envia la teva flag
            {isCompleted && (
              <span className="ml-2 text-green-500 inline-flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-1" /> Completat
              </span>
            )}
          </h2>
          
          {!isAuthenticated ? (
            <div className="text-center py-4">
              <p className="text-gray-300 mb-4">Has d'iniciar sessió per enviar la flag.</p>
              <Button 
                asChild
                className="bg-cyber text-black hover:bg-cyber/80"
              >
                <Link to="/login">Iniciar sessió</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleFlagSubmit}>
              <div className="bg-black cyber-border rounded-md p-4 mb-4">
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Introdueix la flag..."
                    className="bg-transparent border-none text-white flex-grow focus:outline-none focus:ring-0"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    disabled={isSubmitting || isCompleted}
                  />
                  <Button 
                    type="submit" 
                    className="ml-2 bg-cyber text-black hover:bg-cyber/80"
                    disabled={isSubmitting || isCompleted || !flag}
                  >
                    {isSubmitting ? 'Verificant...' : 'Verificar'}
                  </Button>
                </div>
              </div>
              
              {flagResult === 'correct' && (
                <div className="flex items-center text-green-500 mb-4">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  <span>Correcte! Has resolt el repte.</span>
                </div>
              )}
              
              {flagResult === 'incorrect' && (
                <div className="flex items-center text-red-500 mb-4">
                  <XCircle className="w-5 h-5 mr-2" />
                  <span>Flag incorrecta. Torna a intentar-ho.</span>
                </div>
              )}
              
              <p className="text-gray-400 text-sm">
                Assegura't d'introduir la flag exactament com l'has trobada.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
