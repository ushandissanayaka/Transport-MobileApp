import { createContext, useContext, useState } from "react";

type CartContextType = {
  favoriteCount: number;
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addToFavorites = (id: string) => {
    setFavorites((prev) => [...prev, id]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  };

  return (
    <CartContext.Provider
      value={{
        favoriteCount: favorites.length,
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
