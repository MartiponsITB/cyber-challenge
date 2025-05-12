
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useChallenges } from '@/contexts/ChallengeContext';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle2 } from 'lucide-react';

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
      <Button className="cyber-button w-full mt-auto" asChild>
        <Link to={`/challenges/${id}`}>
          <span className="flex items-center justify-center">
            {isCompleted ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Completat
              </>
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descarregar OVA
              </>
            )}
          </span>
        </Link>
      </Button>
    </div>
  );
};

export default ChallengeCard;
