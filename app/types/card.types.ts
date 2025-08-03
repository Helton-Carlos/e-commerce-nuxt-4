export interface ICard {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  type: 'Masculina' | 'Feminina' | 'Unissex';
}