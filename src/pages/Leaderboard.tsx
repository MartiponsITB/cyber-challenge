
import { useState, useEffect } from 'react';
import Trophy from '@/components/Trophy';
import { listOrderedIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeaderboardEntry {
  name: string;
  challenges: number;
  points: number;
  time: string;
  seconds: number;
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/php/get_leaderboard.php');
        const data = await response.json();
        
        if (data.success) {
          setLeaderboardData(data.leaderboard);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Trophy />
          
          <div className="cyber-card mt-8 max-w-3xl mx-auto">
            {isLoading ? (
              <div className="py-12 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyber border-r-transparent"></div>
                <p className="mt-4 text-gray-300">Carregant classificació...</p>
              </div>
            ) : leaderboardData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-cyber/30">
                      <TableHead className="py-3 pl-4 pr-2 text-left">#</TableHead>
                      <TableHead className="py-3 px-2 text-left">Usuari</TableHead>
                      <TableHead className="py-3 px-2 text-left">Reptes</TableHead>
                      <TableHead className="py-3 px-2 text-left">Punts</TableHead>
                      <TableHead className="py-3 px-2 text-left">Temps</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardData.map((user, index) => (
                      <TableRow key={index} className="border-b border-cyber/10">
                        <TableCell className="py-4 pl-4 pr-2">{index + 1}</TableCell>
                        <TableCell className="py-4 px-2 font-medium">{user.name}</TableCell>
                        <TableCell className="py-4 px-2">{user.challenges}</TableCell>
                        <TableCell className="py-4 px-2">{user.points}</TableCell>
                        <TableCell className="py-4 px-2 font-mono text-cyber">{user.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
