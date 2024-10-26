export interface Item {
  nome: string;
  categoria: 'Automóvel' | 'Caminhão' | 'Avião';
  ativo: boolean;
  quantidade?: number;
  preco?: number;
}
