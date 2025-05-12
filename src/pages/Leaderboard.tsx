
import Trophy from '@/components/Trophy';

const leaderboardData = [];

const Leaderboard = () => {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Trophy />
          
          <div className="cyber-card mt-8 max-w-3xl mx-auto">
            {leaderboardData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-cyber/30">
                      <th className="py-3 pl-4 pr-2">#</th>
                      <th className="py-3 px-2">Usuari</th>
                      <th className="py-3 px-2">Reptes</th>
                      <th className="py-3 px-2">Punts</th>
                      <th className="py-3 px-2">Temps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((user, index) => (
                      <tr key={index} className="border-b border-cyber/10">
                        <td className="py-4 pl-4 pr-2">{index + 1}</td>
                        <td className="py-4 px-2">{user.name}</td>
                        <td className="py-4 px-2">{user.challenges}</td>
                        <td className="py-4 px-2">{user.points}</td>
                        <td className="py-4 px-2">{user.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-300">No hi ha participants encara. Completa els reptes per aparèixer al rànquing!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
