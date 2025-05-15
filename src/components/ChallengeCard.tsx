
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useChallenges } from '@/contexts/ChallengeContext';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
    <Card className="cyber-card h-full transition-all duration-300 hover:shadow-lg hover:shadow-cyber/30 hover:translate-y-[-5px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-cyber glow-text">{title}</h3>
          {isCompleted && (
            <div className="bg-green-500/20 p-1 rounded-full animate-pulse">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>
        <span 
          className="badge text-xs font-semibold px-2.5 py-1 rounded inline-block" 
          style={{ backgroundColor: categoryColor, boxShadow: `0 0 8px ${categoryColor}` }}
        >
          {category}
        </span>
      </CardHeader>
      
      <CardContent className="pb-4 flex-grow">
        <p className="text-gray-300 text-sm">{description}</p>
      </CardContent>
      
      <CardFooter className="pt-0 mt-auto">
        <Button className="cyber-button w-full group" asChild>
          <Link to={`/challenges/${id}`} className="flex items-center justify-center">
            {isCompleted ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                <span>Completat</span>
              </>
            ) : (
              <>
                <span>Iniciar Repte</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
