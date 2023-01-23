export interface Expense {
    id: number;
    name: string;
    category_id: number;
    value: number;
    date: Date;
    created_at: Date;
    updated_at: Date;
  }