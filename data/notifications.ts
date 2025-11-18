import type { Notification } from '../types';

export const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'critical',
    title: 'Estoque Crítico',
    message: 'O item "Café Torrado e Moído 500g" acabou!',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    productId: 3,
  },
  {
    id: 2,
    type: 'low_stock',
    title: 'Estoque Baixo',
    message: 'O item "Sabão em Pó 1kg" está acabando. Restam apenas 1 unidade.',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    productId: 5,
  },
  {
    id: 3,
    type: 'suggestion',
    title: 'Sugestão de Compra',
    message: 'Pelo seu histórico, o "Pão de Forma" deve acabar até amanhã. Vamos repor?',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    productId: 6,
  },
  {
    id: 4,
    type: 'expiry',
    title: 'Alerta de Validade',
    message: 'Seu "Queijo Mussarela" vence em 3 dias. Evite o desperdício!',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    productId: 8,
  },
];
