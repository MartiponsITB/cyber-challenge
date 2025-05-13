
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useChallenges } from '@/contexts/ChallengeContext';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle2, Download } from 'lucide-react';

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
}

const ChallengeCard = ({ id, title, description, category, categoryColor }: ChallengeCardProps) => {
  const { isAuthenticated } = useAuth();
  const { challenges } = useChallenges();
  
  const isCompleted = isAuthenticated && challenges.find(c => c.id === id)?.completed;
  
  return (
    <div className="cyber-card flex flex-col h-full">
      <h3 className="text-xl font-bold text-cyber mb-2">{title}</h3>
      <span 
        className="badge inline-block mb-3" 
        style={{ backgroundColor: categoryColor }}
      >
        {category}
      </span>
      <p className="text-gray-300 text-sm mb-6 flex-grow">{description}</p>
      {isCompleted ? (
        <Button className="cyber-button w-full mt-auto" asChild>
          <Link to={`/challenges/${id}`}>
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Completat
          </Link>
        </Button>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          <Button className="cyber-button w-full" asChild>
            <Link to={`/challenges/${id}`}>
              Iniciar Repte
            </Link>
          </Button>
          <Button className="cyber-button w-full" asChild>
            <a href={`https://example.com/downloads/${id}.ova`} download target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-5 w-5" />
              Descarregar OVA
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;
