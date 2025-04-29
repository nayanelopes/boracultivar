
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para formatar CEP
export function formatCEP(cep: string): string {
  // Remove caracteres não numéricos
  const numbers = cep.replace(/\D/g, '');
  
  // Aplica a máscara de CEP: 00000-000
  if (numbers.length <= 5) {
    return numbers;
  }
  
  return numbers.slice(0, 5) + '-' + numbers.slice(5, 8);
}

// Função para formatar telefone
export function formatPhone(phone: string): string {
  // Remove caracteres não numéricos
  const numbers = phone.replace(/\D/g, '');
  
  // Aplica a máscara de telefone: (00) 00000-0000
  if (numbers.length <= 2) {
    return `(${numbers}`;
  }
  if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }
  if (numbers.length <= 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }
  
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

// Função para gerar protocolo aleatório
export function generateProtocol(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

