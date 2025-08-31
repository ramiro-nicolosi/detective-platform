'use client';

import { useState, useCallback } from 'react';
import { DetectiveCase, Clue } from '@/types/detective';

interface SolutionCheck {
  culprit: string;
  keywords: string[];
}

const solutions: Record<number, SolutionCheck> = {
  1: { culprit: "Carlos Martín", keywords: ["guardia", "acceso", "seguridad", "financiero"] },
  2: { culprit: "Robert Sterling", keywords: ["socio", "negocios", "candelabro", "malversación"] },
  3: { culprit: "Thomas Anderson", keywords: ["asistente", "gas", "sedante", "fórmula"] }
};

export function useGameLogic(initialCase: DetectiveCase | null) {
  const [currentCase, setCurrentCase] = useState<DetectiveCase | null>(initialCase);

  const revealClue = useCallback(() => {
    if (!currentCase) return;

    const updatedClues = currentCase.clues.map((clue: Clue, index: number) => {
      if (!clue.revealed && index === currentCase.clues.findIndex(c => !c.revealed)) {
        return { ...clue, revealed: true };
      }
      return clue;
    });

    setCurrentCase({
      ...currentCase,
      clues: updatedClues
    });
  }, [currentCase]);

  const checkSolution = useCallback((culprit: string, method: string, motive: string): boolean => {
    if (!currentCase) return false;

    const correct = solutions[currentCase.id];
    if (!correct) return false;

    const culpritCorrect = culprit === correct.culprit;
    const combinedText = (method + " " + motive).toLowerCase();
    const keywordsFound = correct.keywords.filter(k => 
      combinedText.includes(k.toLowerCase())
    ).length;

    return culpritCorrect && keywordsFound >= 2;
  }, [currentCase]);

  return {
    currentCase,
    setCurrentCase,
    revealClue,
    checkSolution
  };
}