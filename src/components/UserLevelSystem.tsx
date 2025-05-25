
import React from 'react';
import { Badge } from '@/components/ui/badge';

export interface UserLevel {
  level: number;
  name: string;
  description: string;
  emoji: string;
  minTrees: number;
  maxTrees: number;
}

export const userLevels: UserLevel[] = [
  {
    level: 1,
    name: "Sementeira Urbana",
    description: "Você começou a jornada! Toda floresta nasce de uma semente.",
    emoji: "🌱",
    minTrees: 0,
    maxTrees: 4
  },
  {
    level: 2,
    name: "Plantador Verde",
    description: "Você já faz a diferença no seu bairro. Continue espalhando vida!",
    emoji: "🌿",
    minTrees: 5,
    maxTrees: 14
  },
  {
    level: 3,
    name: "Raiz Ativa",
    description: "Sua presença cria sombra e frescor. As raízes estão firmes!",
    emoji: "🌳",
    minTrees: 15,
    maxTrees: 29
  },
  {
    level: 4,
    name: "Guardião da Calçada",
    description: "Suas árvores protegem a cidade. Você é referência na vizinhança!",
    emoji: "🏞️",
    minTrees: 30,
    maxTrees: 49
  },
  {
    level: 5,
    name: "Capibara Verde",
    description: "Integra cidade e natureza com harmonia, como nosso mascote!",
    emoji: "🐹",
    minTrees: 50,
    maxTrees: 99
  },
  {
    level: 6,
    name: "Mestre da Floresta Urbana",
    description: "Você virou lenda! Onde passa, a cidade floresce.",
    emoji: "🌺",
    minTrees: 100,
    maxTrees: 199
  },
  {
    level: 7,
    name: "Embaixador da Natureza",
    description: "O maior nível de todos! Você é um verdadeiro guardião do planeta.",
    emoji: "🌍",
    minTrees: 200,
    maxTrees: Infinity
  }
];

export const getUserLevel = (treesPlanted: number): UserLevel => {
  return userLevels.find(level => 
    treesPlanted >= level.minTrees && treesPlanted <= level.maxTrees
  ) || userLevels[0];
};

export const getNextLevel = (currentLevel: number): UserLevel | null => {
  return userLevels.find(level => level.level === currentLevel + 1) || null;
};

interface UserLevelDisplayProps {
  treesPlanted: number;
  showProgress?: boolean;
}

const UserLevelDisplay = ({ treesPlanted, showProgress = false }: UserLevelDisplayProps) => {
  const currentLevel = getUserLevel(treesPlanted);
  const nextLevel = getNextLevel(currentLevel.level);
  const treesToNext = nextLevel ? nextLevel.minTrees - treesPlanted : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{currentLevel.emoji}</span>
        <div>
          <Badge variant="secondary" className="mb-1">
            Nível {currentLevel.level}
          </Badge>
          <h3 className="font-semibold text-raiz-green-dark">{currentLevel.name}</h3>
          <p className="text-sm text-gray-600">{currentLevel.description}</p>
        </div>
      </div>
      
      {showProgress && nextLevel && (
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-700">
            <strong>{treesToNext}</strong> árvores para alcançar o próximo nível:
          </p>
          <p className="text-sm font-medium text-green-800">
            {nextLevel.emoji} {nextLevel.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserLevelDisplay;
