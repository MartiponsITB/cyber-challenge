
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from "@/hooks/use-toast";

interface Challenge {
  id: string;
  title: string;
  category: string;
  points: number;
  completed: boolean;
}

interface TimerData {
  unlocked_at: string;
  completed_at: string | null;
  elapsed_seconds: number;
  completion_time_seconds: number | null;
}

interface ChallengeContextType {
  challenges: Challenge[];
  isHackathonUnlocked: boolean;
  isLoading: boolean;
  timerData: TimerData | null;
  submitFlag: (challengeId: string, flag: string) => Promise<boolean>;
  refreshProgress: () => Promise<void>;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isHackathonUnlocked, setIsHackathonUnlocked] = useState(false);
  const [timerData, setTimerData] = useState<TimerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      loadUserProgress();
      checkHackathonStatus();
    } else {
      setIsLoading(false);
      setChallenges([]);
      setIsHackathonUnlocked(false);
      setTimerData(null);
    }
  }, [isAuthenticated]);

  const loadUserProgress = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/php/get_progress.php');
      const data = await response.json();
      
      if (data.success) {
        setChallenges(data.challenges);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkHackathonStatus = async () => {
    try {
      const response = await fetch('/php/check_hackathon.php');
      const data = await response.json();
      
      if (data.success) {
        setIsHackathonUnlocked(data.isUnlocked);
        if (data.timerData) {
          setTimerData(data.timerData);
        }
      }
    } catch (error) {
      console.error('Error checking hackathon status:', error);
    }
  };

  const submitFlag = async (challengeId: string, flag: string): Promise<boolean> => {
    try {
      const response = await fetch('/php/submit_flag.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ challenge_id: challengeId, flag }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Correcte!",
          description: "Has resolt el repte correctament!",
        });
        
        // Update local state
        await refreshProgress();
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Incorrecte",
          description: data.message || "La flag no és correcta",
        });
        return false;
      }
    } catch (error) {
      console.error('Flag submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error en enviar la flag",
      });
      return false;
    }
  };

  const refreshProgress = async () => {
    await loadUserProgress();
    await checkHackathonStatus();
  };

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        isHackathonUnlocked,
        isLoading,
        timerData,
        submitFlag,
        refreshProgress
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = () => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
};
