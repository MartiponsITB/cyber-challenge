
const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold cyber-text mb-4">{title}</h2>
    <div className="cyber-card">
      {children}
    </div>
  </div>
);

const Info = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-mono font-bold cyber-text mb-4">Informació</h1>
          <p className="text-gray-300">
            Tot el que necessites saber sobre la plataforma CyberChallenge
          </p>
        </div>
        
        <InfoSection title="Sobre CyberChallenge">
          <p className="text-gray-300 mb-4">
            CyberChallenge és una plataforma de reptes de ciberseguretat dissenyada per ajudar a 
            professionals i estudiants a millorar les seves habilitats en hacking ètic i 
            administració de sistemes en un entorn segur i controlat.
          </p>
          <p className="text-gray-300">
            Tots els reptes estan dissenyats per simular situacions reals que es poden trobar 
            en entorns professionals, però en un context controlat i legal.
          </p>
        </InfoSection>
        
        <InfoSection title="Com utilitzar la plataforma">
          <ol className="list-decimal list-inside text-gray-300 space-y-4">
            <li>
              <strong className="text-white">Registra't</strong> - Crea un compte per accedir a tots els reptes i seguir el teu progrés.
            </li>
            <li>
              <strong className="text-white">Explora els reptes</strong> - Navega per les diferents categories de reptes disponibles.
            </li>
            <li>
              <strong className="text-white">Descarrega la màquina virtual</strong> - Cada repte ve amb un fitxer OVA que pots importar a VirtualBox o VMware.
            </li>
            <li>
              <strong className="text-white">Resol el desafiament</strong> - Utilitza les teves habilitats per trobar i explotar vulnerabilitats.
            </li>
            <li>
              <strong className="text-white">Envia la flag</strong> - Quan trobis la flag oculta, envia-la a la plataforma per verificar-la.
            </li>
          </ol>
        </InfoSection>
        
        <InfoSection title="Preguntes freqüents">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Què necessito per començar?</h3>
              <p className="text-gray-300">
                Necessites un ordinador amb VirtualBox o VMware instal·lat per executar les màquines virtuals. Es recomana un mínim de 8GB de RAM i 20GB d'espai lliure al disc.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Els reptes són difícils?</h3>
              <p className="text-gray-300">
                Els reptes estan classificats per nivell de dificultat. Comença pels més senzills i avança gradualment cap als més complexos a mesura que milloris les teves habilitats.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">És legal practicar hacking aquí?</h3>
              <p className="text-gray-300">
                Sí, tots els reptes s'executen en un entorn controlat. Les tècniques que aprens aquí només han de ser utilitzades en entorns autoritzats.
              </p>
            </div>
          </div>
        </InfoSection>
        
        <InfoSection title="Contacte">
          <p className="text-gray-300 mb-4">
            Si tens dubtes, suggeriments o problemes amb la plataforma, no dubtis a contactar-nos:
          </p>
          <ul className="text-gray-300">
            <li><strong className="text-white">Email:</strong> cyberchallenge@gmail.com</li>
            <li><strong className="text-white">Twitter:</strong> @CyberChallenge</li>
            <li><strong className="text-white">Discord:</strong> Uneix-te al nostre servidor</li>
          </ul>
        </InfoSection>
      </div>
    </div>
  );
};

export default Info;
