
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

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
  // Més reptes aquí...
};

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Si no existeix l'ID o no es troba el repte, mostrem un missatge d'error
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
  
  const challenge = challengesData[id as keyof typeof challengesData];
  
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
          <h2 className="text-xl font-bold cyber-text mb-4">Envia la teva flag</h2>
          <div className="bg-black cyber-border rounded-md p-4 mb-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="flag{...}"
                className="bg-transparent border-none text-white flex-grow focus:outline-none focus:ring-0"
              />
              <Button className="ml-2 bg-cyber text-black hover:bg-cyber/80">
                Verificar
              </Button>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            La flag ha de seguir el format: flag&#123;text_aquí&#125;
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
