
import React, { createContext, useContext, useState, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { translations } from '../constants/translations';
import { INITIAL_PRODUCTS } from '../constants/products';
import { Language, Product, InventoryItem, DispatchedItem, RawHide, PurchasedGood, SentMaterial } from '../types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  dispatchedItems: DispatchedItem[];
  setDispatchedItems: React.Dispatch<React.SetStateAction<DispatchedItem[]>>;
  rawHides: RawHide[];
  setRawHides: React.Dispatch<React.SetStateAction<RawHide[]>>;
  purchasedGoods: PurchasedGood[];
  setPurchasedGoods: React.Dispatch<React.SetStateAction<PurchasedGood[]>>;
  sentMaterials: SentMaterial[];
  setSentMaterials: React.Dispatch<React.SetStateAction<SentMaterial[]>>;
  adminPassword: string;
  setAdminPassword: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('am');
  const [products, setProducts] = useLocalStorage<Product[]>('shark-products', INITIAL_PRODUCTS);
  const [inventory, setInventory] = useLocalStorage<InventoryItem[]>('shark-inventory', []);
  const [dispatchedItems, setDispatchedItems] = useLocalStorage<DispatchedItem[]>('shark-dispatched', []);
  const [rawHides, setRawHides] = useLocalStorage<RawHide[]>('shark-rawhides', []);
  const [purchasedGoods, setPurchasedGoods] = useLocalStorage<PurchasedGood[]>('shark-purchased', []);
  const [sentMaterials, setSentMaterials] = useLocalStorage<SentMaterial[]>('shark-sent', []);
  const [adminPassword, setAdminPassword] = useLocalStorage<string>('shark-admin-password', 'shark');

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        products,
        setProducts,
        inventory,
        setInventory,
        dispatchedItems,
        setDispatchedItems,
        rawHides,
        setRawHides,
        purchasedGoods,
        setPurchasedGoods,
        sentMaterials,
        setSentMaterials,
        adminPassword,
        setAdminPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
