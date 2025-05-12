
import ChallengeCard from '@/components/ChallengeCard';

const challenges = [
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
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              id={challenge.id}
              title={challenge.title}
              description={challenge.description}
              category={challenge.category}
              categoryColor={challenge.categoryColor}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-mono font-bold cyber-text mb-8">Repte Final</h2>
          
          <div className="cyber-card max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-black cyber-border rounded-md flex items-center justify-center">
                <svg className="w-12 h-12 text-cyber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-cyber mb-2 text-center">Inicis sessió per desbloquejar</h3>
            <p className="text-gray-300 text-center mb-6">
              Inicia sessió per veure el teu progrés i desbloquejar reptes
            </p>
            
            <button className="cyber-button w-full py-3">
              Iniciar sessió
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
