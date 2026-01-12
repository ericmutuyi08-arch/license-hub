import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  cardId: string;
  cardName: string;
  cardImage: string;
  denomination: number;
  deliveryOption: 'digital' | 'physical';
  quantity: number;
  recipientEmail?: string;
  recipientName?: string;
  personalMessage?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (cardId: string, denomination: number, deliveryOption: string) => void;
  updateQuantity: (cardId: string, denomination: number, deliveryOption: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(current => {
      const existingIndex = current.findIndex(
        item => 
          item.cardId === newItem.cardId && 
          item.denomination === newItem.denomination &&
          item.deliveryOption === newItem.deliveryOption
      );

      if (existingIndex >= 0) {
        const updated = [...current];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...current, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (cardId: string, denomination: number, deliveryOption: string) => {
    setItems(current => 
      current.filter(
        item => !(item.cardId === cardId && item.denomination === denomination && item.deliveryOption === deliveryOption)
      )
    );
  };

  const updateQuantity = (cardId: string, denomination: number, deliveryOption: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cardId, denomination, deliveryOption);
      return;
    }

    setItems(current =>
      current.map(item =>
        item.cardId === cardId && item.denomination === denomination && item.deliveryOption === deliveryOption
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getTotalItems = () => items.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () => items.reduce((sum, item) => sum + (item.denomination * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
