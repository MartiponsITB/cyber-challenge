
const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-mono font-bold text-center cyber-text mb-16">Com funciona</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-black cyber-border p-6 rounded-md mb-4 w-24 h-24 flex items-center justify-center">
              <svg className="w-12 h-12 text-cyber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Descarrega l'OVA</h3>
            <p className="text-gray-400">Baixa la màquina virtual OVA amb el repte configurat.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-black cyber-border p-6 rounded-md mb-4 w-24 h-24 flex items-center justify-center">
              <svg className="w-12 h-12 text-cyber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Resol el repte</h3>
            <p className="text-gray-400">Utilitza les teves habilitats per trobar vulnerabilitats i explotar-les.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-black cyber-border p-6 rounded-md mb-4 w-24 h-24 flex items-center justify-center">
              <svg className="w-12 h-12 text-cyber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Aconsegueix la flag</h3>
            <p className="text-gray-400">Troba la flag oculta que demostra que has superat el repte.</p>
          </div>
        </div>
        
        <div className="text-center mt-12 mb-8">
          <p className="text-lg text-cyber font-bold">[ Completa el repte i puja la flag ]</p>
        </div>
        
        <p className="text-center text-gray-400 max-w-3xl mx-auto">
          Després de trobar la flag oculta, envia-la a la plataforma per validar el repte i desbloquejar
          nous desafiaments. Cada repte superat t'aproparà més a convertir-te en un expert en
          ciberseguretat.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
