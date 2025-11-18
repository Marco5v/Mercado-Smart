
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import QuickAccess from './components/QuickAccess';
import BottomNav from './components/BottomNav';
import CategoriesScreen from './components/CategoriesScreen';
import ShoppingListScreen from './components/ShoppingListScreen';
import MoreScreen from './components/MoreScreen';
import NotificationsScreen from './components/NotificationsScreen';
import AddProductFlow from './components/product-add/AddProductFlow';
import NotesModal from './components/NotesModal';
import SplashScreen from './components/SplashScreen';
import RegistrationModal from './components/RegistrationModal';
import ProfileScreen from './components/ProfileScreen';
import type { Product, Notification, UserProfile } from './types';
import { initialNotifications } from './data/notifications';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import CameraIcon from './components/icons/CameraIcon';
import HistoryIcon from './components/icons/HistoryIcon';
import ShelvesIcon from './components/icons/ShelvesIcon';

// New Dashboard Components
import DashboardHeader from './components/dashboard/DashboardHeader';
import IntelligenceCarousel from './components/dashboard/IntelligenceCarousel';
import SuggestionsSection from './components/dashboard/SuggestionsSection';
import FloatingActionButton from './components/FloatingActionButton';
import QrCodeScannerIcon from './components/icons/QrCodeScannerIcon';
import PencilSquareIcon from './components/icons/PencilSquareIcon';
import CategoryIcon from './components/icons/CategoryIcon';
import PieChartIcon from './components/icons/PieChartIcon';
import TagIcon from './components/icons/TagIcon';


// --- MOCK DATA ---
const mockProducts: Product[] = [
  { id: 1, name: 'Leite Integral Longa Vida 1L', brand: 'Marca A', weight: '1L', imageUrl: 'https://picsum.photos/id/292/200/200', stock: 2, minStock: 3, avgPrice: 5.50, currentPrice: 5.25, category: 'Frios e Leite', consumptionRate: 10 },
  { id: 2, name: 'Arroz Branco Tipo 1 (5kg)', brand: 'Marca B', weight: '5kg', imageUrl: 'https://picsum.photos/id/312/200/200', stock: 10, minStock: 5, avgPrice: 22.00, currentPrice: 22.90, category: 'Mercearia', consumptionRate: 8 },
  { id: 3, name: 'Café Torrado e Moído 500g', brand: 'Marca C', weight: '500g', imageUrl: 'https://picsum.photos/id/325/200/200', stock: 0, minStock: 2, avgPrice: 15.80, currentPrice: 16.50, category: 'Mercearia', consumptionRate: 12 },
  { id: 4, name: 'Detergente Líquido Neutro 500ml', brand: 'Marca D', weight: '500ml', imageUrl: 'https://picsum.photos/id/106/200/200', stock: 8, minStock: 4, avgPrice: 2.10, currentPrice: 1.99, category: 'Limpeza', consumptionRate: 5 },
  { id: 5, name: 'Sabão em Pó 1kg', brand: 'Marca E', weight: '1kg', imageUrl: 'https://picsum.photos/id/128/200/200', stock: 1, minStock: 2, avgPrice: 12.00, currentPrice: 11.50, category: 'Limpeza', consumptionRate: 9 },
  { id: 6, name: 'Pão de Forma Tradicional 500g', brand: 'Marca F', weight: '500g', imageUrl: 'https://picsum.photos/id/343/200/200', stock: 4, minStock: 2, avgPrice: 7.00, currentPrice: 7.20, category: 'Padaria', consumptionRate: 15 },
  { id: 7, name: 'Refrigerante Cola 2L', brand: 'Marca G', weight: '2L', imageUrl: 'https://picsum.photos/id/102/200/200', stock: 6, minStock: 3, avgPrice: 8.50, currentPrice: 8.50, category: 'Bebidas', consumptionRate: 7 },
  { id: 8, name: 'Queijo Mussarela Fatiado 200g', brand: 'Marca H', weight: '200g', imageUrl: 'https://picsum.photos/id/321/200/200', stock: 3, minStock: 2, avgPrice: 10.00, currentPrice: 9.80, category: 'Frios e Leite', consumptionRate: 11 },
];

const quickAccessItems = [
    { id: 'categories_qa', label: 'Categorias', icon: <CategoryIcon className="w-7 h-7 text-blue-800"/> },
    { id: 'history', label: 'Histórico', icon: <HistoryIcon className="w-7 h-7 text-blue-800"/> },
    { id: 'stats', label: 'Estatísticas', icon: <PieChartIcon className="w-7 h-7 text-blue-800"/> },
    { id: 'offers', label: 'Ofertas', icon: <TagIcon className="w-7 h-7 text-blue-800"/> },
];

const App: React.FC = () => {
  // --- APP LIFECYCLE STATE ---
  const [isLoading, setIsLoading] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // --- DATA STATE ---
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [shoppingCart, setShoppingCart] = useState<Map<number, number>>(() => {
    const initialCart = new Map<number, number>();
    initialCart.set(1, 2);
    initialCart.set(3, 1);
    initialCart.set(5, 1);
    return initialCart;
  });
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  
  // Notes functionality
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [userNotes, setUserNotes] = useState('');

  // --- INITIALIZATION LOGIC ---
  useEffect(() => {
    const initApp = async () => {
        // Simulate splash screen delay (e.g. 2.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 2500));

        const storedProfile = localStorage.getItem('mercado_smart_user_profile');
        const isFirstLaunch = !localStorage.getItem('mercado_smart_is_first_launch_complete');
        
        if (storedProfile && !isFirstLaunch) {
            setUserProfile(JSON.parse(storedProfile));
            setIsLoading(false);
        } else {
            // Transition from Splash -> Registration Modal
            setIsLoading(false);
            setShowRegistration(true);
        }
    };

    initApp();
  }, []);

  const handleRegistrationComplete = (profile: UserProfile) => {
    localStorage.setItem('mercado_smart_user_profile', JSON.stringify(profile));
    localStorage.setItem('mercado_smart_is_first_launch_complete', 'true');
    setUserProfile(profile);
    setShowRegistration(false);
  };

  const handleProfileUpdate = (profile: UserProfile) => {
    localStorage.setItem('mercado_smart_user_profile', JSON.stringify(profile));
    setUserProfile(profile);
  };

  useEffect(() => {
    setSearchTerm('');
  }, [activeTab]);

  const handleAddToCart = (productId: number) => {
    setShoppingCart(prevCart => {
      const newCart = new Map<number, number>(prevCart);
      const currentQuantity = newCart.get(productId) || 0;
      newCart.set(productId, currentQuantity + 1);
      return newCart;
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    setShoppingCart(prevCart => {
      const newCart = new Map<number, number>(prevCart);
      if (newQuantity <= 0) {
        newCart.delete(productId);
      } else {
        newCart.set(productId, newQuantity);
      }
      return newCart;
    });
  };
  
  const handleConsumeItem = (productId: number) => {
    let consumedProduct: Product | undefined;
    setProducts(prevProducts => {
        const newProducts = prevProducts.map(p => {
            if (p.id === productId && p.stock > 0) {
                consumedProduct = {...p, stock: p.stock - 1};
                return consumedProduct;
            }
            return p;
        });

        // Generate notification based on new stock level
        if (consumedProduct) {
            const { stock, minStock, name } = consumedProduct;
            let newNotification: Notification | null = null;

            if (stock === 0) {
                newNotification = {
                    id: Date.now(),
                    type: 'critical',
                    title: 'Estoque Crítico',
                    message: `O item "${name}" acabou! Adicione à sua lista.`,
                    read: false,
                    timestamp: new Date().toISOString(),
                    productId,
                };
            } else if (stock === minStock) {
                newNotification = {
                    id: Date.now(),
                    type: 'low_stock',
                    title: 'Estoque Baixo',
                    message: `O item "${name}" atingiu o estoque mínimo.`,
                    read: false,
                    timestamp: new Date().toISOString(),
                    productId,
                };
            }
            
            if (newNotification) {
                setNotifications(prev => [newNotification!, ...prev]);
            }
        }
        return newProducts;
    });
     if (consumedProduct) {
      alert(`1 unidade de "${consumedProduct.name}" consumida. Estoque atual: ${consumedProduct.stock}`);
    }
  };

  const handleProductAdd = (newProduct: Product, destination: 'inventory' | 'list') => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    if (destination === 'list') {
      handleAddToCart(newProduct.id);
    }
  };

  const cartItemCount = useMemo(() => {
    return Array.from(shoppingCart.values()).reduce((sum: number, quantity: number) => sum + quantity, 0);
  }, [shoppingCart]);
  
  const unreadNotificationCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const dashboardData = useMemo(() => {
    const itemsOutOfStock = products.filter(p => p.stock === 0).length;
    const suggestedProducts = products
        .filter(p => p.stock <= p.minStock && p.stock > 0)
        .sort((a,b) => b.consumptionRate - a.consumptionRate);

    return {
        spending: { current: 450.0, budget: 800.0 },
        alerts: { count: itemsOutOfStock },
        deal: { product: 'Leite', market: 'Mercado X' }, // This will be ignored by EconomyCard
        economy: { savings: 45.90 },
        suggestions: suggestedProducts,
    };
  }, [products]);
  
  const handleQuickAccessClick = (id: string) => {
    switch(id) {
        case 'categories_qa':
            setActiveTab('categories');
            break;
        case 'history':
            alert('Navegando para Histórico...');
            break;
        case 'stats':
            alert('Navegando para Estatísticas...');
            break;
        case 'offers':
            alert('Navegando para Ofertas...');
            break;
    }
  }

  const renderContent = () => {
    // Ensure dashboard elements are not interactive/visible during registration for a cleaner look
    if (showRegistration) {
        return (
             <div className="h-full w-full bg-gray-100 opacity-50 filter blur-sm pointer-events-none">
                <DashboardHeader 
                    userName="Visitante"
                    pantryStatus={0}
                    notificationCount={0}
                    onNotificationClick={() => {}}
                />
                <div className="p-8 text-center text-gray-500 mt-10">
                    <p>Carregando dados...</p>
                </div>
            </div>
        );
    }

    switch(activeTab) {
      case 'home':
        return (
          <>
            <DashboardHeader 
                userName={userProfile?.name.split(' ')[0] || 'Usuário'}
                pantryStatus={80}
                notificationCount={unreadNotificationCount}
                onNotificationClick={() => setActiveTab('notifications')}
            />
            <IntelligenceCarousel 
                spendingData={dashboardData.spending}
                alertData={dashboardData.alerts}
                economyData={dashboardData.economy}
            />
            <QuickAccess 
                items={quickAccessItems}
                onItemClick={handleQuickAccessClick}
            />
            <SuggestionsSection
              products={dashboardData.suggestions}
              shoppingCart={shoppingCart}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onConsumeItem={handleConsumeItem}
            />
          </>
        );
      case 'categories':
        return <CategoriesScreen products={products} />;
      case 'list':
        return <ShoppingListScreen 
                  shoppingCart={shoppingCart}
                  products={products}
                  onUpdateQuantity={handleUpdateQuantity}
                  onClearCart={() => setShoppingCart(new Map())}
                />;
      case 'more':
        return <MoreScreen onNavigate={setActiveTab} />;
      case 'profile':
        return <ProfileScreen 
            userProfile={userProfile} 
            onUpdateProfile={handleProfileUpdate}
            onBack={() => setActiveTab('more')}
        />;
      case 'notifications':
        return <NotificationsScreen 
                  notifications={notifications} 
                  onNotificationAction={(productId) => {
                    handleAddToCart(productId);
                    setActiveTab('list');
                  }}
                  onClearNotifications={() => setNotifications([])}
                />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
       {showRegistration && (
        <RegistrationModal onComplete={handleRegistrationComplete} />
       )}

       {/* Conditional header rendering can be adjusted based on final navigation */}
      <main className="flex-grow pb-24">
        {renderContent()}
      </main>

      {isAddingProduct && (
        <AddProductFlow 
          onClose={() => setIsAddingProduct(false)}
          onProductAdd={handleProductAdd}
        />
      )}
      
      {isNotesOpen && (
        <NotesModal
            initialNotes={userNotes}
            onSave={(notes) => setUserNotes(notes)}
            onClose={() => setIsNotesOpen(false)}
        />
      )}

      {/* Secondary FAB: Notes - Hidden during registration */}
      {activeTab !== 'profile' && !showRegistration && (
          <FloatingActionButton 
            onClick={() => setIsNotesOpen(true)} 
            icon={<PencilSquareIcon className="w-6 h-6" />}
            className="bottom-40 right-4 w-14 h-14 bg-white text-blue-600"
            ariaLabel="Anotações"
          />
      )}

      {/* Primary FAB: Scan/Add - Hidden during registration */}
      {activeTab !== 'profile' && !showRegistration && (
        <FloatingActionButton 
            onClick={() => setIsAddingProduct(true)} 
            icon={<QrCodeScannerIcon className="w-8 h-8" />}
            className="bottom-20 right-4 w-16 h-16 bg-blue-600 text-white"
            ariaLabel="Escanear produto"
        />
      )}

      {activeTab !== 'profile' && !showRegistration && (
        <BottomNav 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
        />
      )}
    </div>
  );
};

export default App;
