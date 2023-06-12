export interface Emprestimo {
  [index: number]: { tipo: number; parcelas: [] };
}

export interface Parcelas {
  numero: number;
  valorAmortizacao: number;
  valorJuros: number;
  valorPrestacao: number;
}
