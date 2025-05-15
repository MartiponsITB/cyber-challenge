
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { useChallenges } from '@/contexts/ChallengeContext';
import { CheckCircle2, XCircle, Download } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';

// Mapa de correspondencias entre IDs de retos y rutas de descarga OVA
const ovaFilePaths = {
  'defense-001': [{ label: 'Descarregar OVA', path: '/ova/repte_defensa.ova' }],
  'sql-001': [
    { label: 'Descarregar OVA (Víctima)', path: '/ova/repte_sql_victima.ova' },
    { label: 'Descarregar OVA (Atacant)', path: '/ova/repte_sql_atacant.ova' }
  ],
  'exploit-001': [
    { label: 'Descarregar OVA (Víctima)', path: '/ova/repte_exploit_victima.ova' },
    { label: 'Descarregar OVA (Atacant)', path: '/ova/repte_exploit_atacant.ova' }
  ],
  'net-001': [{ label: 'Descarregar OVA', path: '/ova/repte_xarxes.ova' }],
  'forensic-001': [
    { label: 'Descarregar OVA (Víctima)', path: '/ova/repte_escalada_victima.ova' },
    { label: 'Descarregar OVA (Atacant)', path: '/ova/repte_escalada_atacant.ova' }
  ],
  'hackathon': [
    { label: 'Descarregar OVA (Víctima)', path: '/ova/hackaton_victima.ova' },
    { label: 'Descarregar OVA (Atacant)', path: '/ova/hackaton_atacant.ova' }
  ]
};

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
      Aquest repte és centra en la identificació i explotació de vulnerabilitats en la configuració d'un servidor SSH.
      
      Hauràs d'utilitzar eines d'escaneig de xarxes per identificar serveis, trobar possibles vulnerabilitats
      i explotar-els per obtenir accés no autoritzat al sistema.
      
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
    title: 'Repte SQL',
    description: 'Descobreix vulnerabilitats en un sistema Linux i aconsegueix accés root superant diverses fases d\'explotació.',
    category: 'Web',
    categoryColor: '#9c27b0',
    difficulty: 'Difícil',
    points: 750,
    detailedDescription: `
      Aquest repte es centra en la identificació i explotació de vulnerabilitats de tipus injecció SQL (SQLi) dins d'una aplicació web que utilitza PostgreSQL com a motor de base de dades.
      
      És tracta d'un laboratori dissenyat per posar a prova tècniques d'enumeració, injecció bàsica i avançada, i va unir de taules (UNION SELECT). A més, inclou configuracions de seguretat reals que l'atacant haurà de comprendre i, si pot, esquivar.
      
      Objectiu: Obtenir informació confidencial de la base de dades (com usuaris i contrasenyes en text pla) mitjançant injeccions SQL en una interfície web vulnerable.
    `,
    prerequisites: [
      'Coneixement de sintaxi SQL (consultes SELECT, WHERE, JOIN…)',
      'Comprensió del concepte d\'injecció SQL',
      'Familiaritat amb consultes UNION SELECT',
      'Coneixement bàsic d\'Apache i fitxers .htaccess',
      'Entendre els conceptes de permisos i privilegis en bases de dades'
    ],
    tools: [
      'Navegador web',
      'Proxy com Burp Suite o ZAP per modificar peticions HTTP',
      'sqlmap per automatitzar la detecció d\'injeccions SQL',
      'PostgreSQL CLI o DBeaver per explorar bases de dades si s\'hi accedeix',
      'dig, nslookup o eines de DNS si cal resoldre noms locals (/etc/hosts)'
    ]
  },
  'exploit-001': {
    title: 'Repte Exploit',
    description: 'Aprofita una vulnerabilitat en WebDAV per aconseguir una connexió inversa i obtenir accés root.',
    category: 'Exploit',
    categoryColor: '#e91e63',
    difficulty: 'Mitjà',
    points: 500,
    detailedDescription: `
      Aquest repte posa a prova la capacitat de detectar i aprofitar una vulnerabilitat de WebDAV en un servidor Apache 2.4.58 funcionant sobre Ubuntu Server.
      
      Mitjançant aquesta vulnerabilitat, l'usuari pot pujar fitxers maliciosos i executar-los per aconseguir una connexió inversa i obtenir accés a la màquina amb privilegis.
      
      Passos clau del repte:
      Configurar xarxa i màquines virtuals
      Explorar el servidor vulnerable
      Verificar suport WebDAV
      Crear i pujar un payload PHP
      Obtenir una shell inversa
      Llegir la flag des del sistema víctima
    `,
    prerequisites: [
      'Coneixements bàsics de xarxa i configuració IP',
      'Experiència amb Apache, WebDAV i serveis HTTP',
      'Habilitats en reconeixement de serveis amb nmap, curl',
      'Familiaritat amb creació i execució de payloads en PHP',
      'Ús d\'eines com netcat, nano, curl, nmap'
    ],
    tools: [
      'Kali Linux com a màquina atacant',
      'nmap per detectar serveis i mètodes HTTP',
      'curl per provar mètodes HTTP i pujar fitxers via WebDAV',
      'netcat (nc) per escoltar connexions inverses',
      'PHP per crear una shell inversa',
      'VirtualBox amb adaptadors de xarxa configurats (Host-Only)',
      'Script de shell inversa PHP amb connexió a IP atacant',
      'Editor de text (nano, vim)',
      'Accés a la flag: /root/flag.txt'
    ]
  },
  'defense-001': {
    title: 'Repte Defensa',
    description: 'Corregeix una configuració insegura d\'un sistema Linux i protegeix-lo eliminant vulnerabilitats crítiques.',
    category: 'Defensa',
    categoryColor: '#00bcd4',
    difficulty: 'Mitjà',
    points: 450,
    detailedDescription: `
      Aquest repte consisteix a revisar una màquina Linux amb configuració insegura i corregir vulnerabilitats crítiques per tal de protegir-la.
      
      L'objectiu és identificar i eliminar serveis insegurs, arxius sensibles exposats, permisos inadequats, i garantir una configuració segura del sistema.
      
      L'usuari haurà de:
      Tancar serveis obsolets com FTP i Telnet
      Configurar correctament Apache2 i activar HTTPS
      Esborrar arxius confidencials accessibles via web
      Corregir permisos de fitxers crítics del sistema
      Executar un script de validació per comprovar que tot està protegit
    `,
    prerequisites: [
      'Coneixement bàsic d\'administració de sistemes Linux',
      'Familiaritat amb serveis com Apache, FTP, Telnet',
      'Experiència amb permisos de fitxers (chmod)',
      'Ús de comandes com ss, nano, systemctl, rm, chmod',
      'Coneixement de vulnerabilitats habituals en sistemes exposats a xarxa'
    ],
    tools: [
      'Editor de text: nano o vim',
      'Comandes de xarxa: ss, netstat, curl, nc',
      'Apache2 amb mòduls SSL activats',
      'Script de validació: /opt/check.sh',
      'Systemd (systemctl) per gestionar serveis',
      'Comandes bàsiques de fitxers: chmod, rm, ls, etc.'
    ]
  },
  'forensic-001': {
    title: 'Repte Escalada',
    description: 'Investiga un incident de seguretat i identifica com es va produir l\'atac.',
    category: 'Forense',
    categoryColor: '#3f51b5',
    difficulty: 'Mitjà',
    points: 550,
    detailedDescription: `
      Aquest repte es centra en la identificació i explotació de vulnerabilitats dins d'una màquina interna amb serveis mal configurats, amb l'objectiu final d'escalar privilegis i obtenir accés root.
      
      L'escenari simula un entorn real amb un servidor Ubuntu amb Apatxe i WebDAV habilitat, on calç obtenir una shell inicial (a través d'un fitxer PHP pujat) i, posteriorment, aprofitar configuracions errònies com cronjobs editables per escalar privilegis i llegir una flag amagada dins de /etc/passwd.
      
      Objectiu: Obtenir una shell inicial, escalar privilegis fins root i trobar la flag amagada: CTF{privesc_root_success}.
    `,
    prerequisites: [
      'Coneixements bàsics de serveis web (Apache)',
      'Familiaritat amb permisos de sistema i cronjobs',
      'Experiència prèvia amb escalada de privilegis',
      'Comprensió del funcionament de WebDAV i execució de scripts PHP'
    ],
    tools: [
      'Nmap o altres eines d\'escaneig de ports',
      'Un navegador web o curl per interactuar amb el servidor WebDAV',
      'Reverse shell generators (com php-reverse-shell)',
      'Eines per gestionar shells no interactives (socat, stty, python)',
      'linpeas, pspy, o altres eines d\'enumeració local',
      'Coneixements de crontab i bash scripting'
    ]
  },
  'hackathon': {
    title: 'Hackathon',
    description: 'Descobreix vulnerabilitats en un sistema Linux i aconsegueix accés root superant diverses fases d\'explotació.',
    category: 'Especial',
    categoryColor: '#ff9800',
    difficulty: 'Expert',
    points: 1000,
    detailedDescription: `
      Aquest repte es centra en posar a prova la capacitat d'anàlisi, enumeració, explotació i escalada de privilegis dins d'un entorn Linux simulat.
      
      L'objectiu és accedir a una màquina donis d'un portal web aparentment inofensiu, descobrir vulnerabilitats com SQL Injection, aprofitar configuracions errònies (com crons o serveis amb permisos elevats) i escalar privilegis fins obtenir accés root.
      
      Caldrà interactuar amb serveis com Apatxe, SQLite3, i scripts cron, a més d'identificar usuaris amagats i tokens secrets.
      
      Objectiu: Obtenir accés root i descobrir la flag amagada al sistema.
    `,
    prerequisites: [
      'Coneixements bàsics de sistemes Linux',
      'Familiaritat amb serveis com Apache, cron i SUID',
      'Comprensió de vulnerabilitats comunes: SQL Injection, enginyeria social, escalada de privilegis',
      'Ús de comandes de xarxa com curl, nc, nmap, etc.'
    ],
    tools: [
      'Nmap o altres eines d\'escaneig de xarxa',
      'Curl i Netcat per provar connexions i enviar peticions',
      'Burp Suite (opcional, per manipular peticions web)',
      'Python per scripts de connexió o explotació',
      'Eines de força bruta (opcional)',
      'SQLmap (opcional, per aprofitar vulnerabilitats SQL)'
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
  
  // Get OVA download options for the current challenge
  const ovaDownloads = ovaFilePaths[id as keyof typeof ovaFilePaths] || [];
  
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
          
          {ovaDownloads.length > 0 && (
            <div className="space-y-2 mb-4">
              {ovaDownloads.map((ova, index) => (
                <Button key={index} className="cyber-button w-full py-3" asChild>
                  <a href={ova.path} download target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    {ova.label}
                  </a>
                </Button>
              ))}
            </div>
          )}
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
