import Dexie, { Table } from 'dexie';

// Definir a interface para a preferência do tema
export interface AppSettings {
    id: number; // Sempre será 1 para garantir que existe apenas 1 registro
    theme: 'light' | 'dark';
}

export interface Venda {
    id: number; // Agora o id é obrigatório
    produtos: string[];
    total: number;
    data: string;
}

// Configurar o banco de dados
class AppDatabase extends Dexie {
    settings!: Table<AppSettings>;
    vendas!: Table<Venda>; // Adicionar a tabela 'vendas'

    constructor() {
        super('AppDatabase');
        this.version(1).stores({
            settings: 'id', // Definir "id" como chave primária
            vendas: '++id, data', // Adicionar 'vendas' com índice na data
        });
    }
}

export const db = new AppDatabase();
