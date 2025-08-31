'use client';

import { useState, useEffect } from 'react';
import { UserProgress } from '@/types/detective';

export function useUserProgress() {
  const [userProgress, setUserProgress] = useState<UserProgress>({});

  useEffect(() => {
    const stored = localStorage.getItem('detective_progress');
    if (stored) {
      setUserProgress(JSON.parse(stored));
    }
  }, []);

  const saveProgress = (progress: UserProgress) => {
    setUserProgress(progress);
    localStorage.setItem('detective_progress', JSON.stringify(progress));
  };

  const addSolvedCase = (username: string, caseId: number) => {
    const newProgress = { ...userProgress };
    
    if (!newProgress[username]) {
      newProgress[username] = { solvedCases: [] };
    }
    
    if (!newProgress[username].solvedCases.includes(caseId)) {
      newProgress[username].solvedCases.push(caseId);
      saveProgress(newProgress);
    }
  };

  const getSolvedCases = (username: string): number => {
    return userProgress[username]?.solvedCases.length || 0;
  };

  return {
    userProgress,
    addSolvedCase,
    getSolvedCases
  };
}