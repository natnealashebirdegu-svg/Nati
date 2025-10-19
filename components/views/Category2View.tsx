import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Product, DispatchedItem } from '../../types';
import AdminModal from '../common/AdminModal';

const Category2View: React.FC = () => {
    const { t, products, inventory, setInventory, dispatchedItems, setDispatchedItems, language } = useAppContext();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [dozen, setDozen] = useState<number | ''>('');
    const [dispatchedBy, setDispatchedBy] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const availableProducts = useMemo(() => {
        return products.filter(p => inventory.some(i => i.productCode === p.code && i.dozen > 0));
    }, [products, inventory]);

    const filteredProducts = useMemo(() => {
        if (!searchTerm) return availableProducts;
        return availableProducts.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.amharicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.code.includes(searchTerm)
        );
    }, [searchTerm, availableProducts]);

    const currentStock = selectedProduct ? inventory.find(i => i.productCode === selectedProduct.code)?.dozen || 0 : 0;

    const handlePost = () => {
        if (!selectedProduct || !dozen || dozen <= 0 || !dispatchedBy) {
            alert('Please fill all fields correctly.');
            return;
        }
        if (dozen > currentStock) {
            alert(t('insufficientStock'));
            return;
        }
        setShowAdminModal(true);
    };

    const executePost = () => {
        if (!selectedProduct || !dozen || !dispatchedBy) return;

        // Decrease inventory
        setInventory(prev => {
            const updatedInventory = [...prev];
            const itemIndex = updatedInventory.findIndex(item => item.productCode === selectedProduct.code);
            if (itemIndex > -1) {
                updatedInventory[itemIndex].dozen -= Number(dozen);
            }
            return updatedInventory.filter(item => item.dozen > 0);
        });

        // Add to dispatched items
        const newDispatch: DispatchedItem = {
            id: new Date().toISOString(),
            productCode: selectedProduct.code,
            dozen: Number(dozen),
            dispatchedBy,
            date: new Date().toISOString(),
        };
        setDispatchedItems(prev => [newDispatch, ...prev]);

        // Reset form
        setSelectedProduct(null);
        setDozen('');
        setDispatchedBy('');
        setSearchTerm('');
        setShowAdminModal(false);
    };

    const getProductByCode = (code: string) => products.find(p => p.code === code);

    return (
        <div className="space-y-6">
            {showAdminModal && <AdminModal onClose={() => setShowAdminModal(false)} onSuccess={executePost} />}
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-shark-blue mb-4">{t('category2')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="relative col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-shark-gray mb-1">{t('productName')}</label>
                        <input
                            type="text"
                            placeholder={t('searchProduct')}
                            value={searchTerm}
                            onFocus={() => setIsDropdownOpen(true)}
                            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setSelectedProduct(null);
                                if (!isDropdownOpen) setIsDropdownOpen(true);
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                         {currentStock > 0 && <span className="text-sm text-green-600">{t('available')}: {currentStock}</span>}
                        {isDropdownOpen && (
                            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                                {filteredProducts.map(p => (
                                    <div
                                        key={p.code}
                                        className="p-2 hover:bg-shark-light-gray cursor-pointer"
                                        onClick={() => {
                                            setSelectedProduct(p);
                                            setSearchTerm(language === 'am' ? p.amharicName : p.name);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        ({p.code}) {language === 'am' ? p.amharicName : p.name}
                                    </div>
                                ))}
                                {filteredProducts.length === 0 && <div className="p-2 text-shark-gray">{t('noItemsFound')}</div>}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="dozen" className="block text-sm font-medium text-shark-gray mb-1">{t('dozen')}</label>
                        <input id="dozen" type="number" value={dozen} onChange={(e) => setDozen(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md" min="1" max={currentStock > 0 ? currentStock : undefined}/>
                    </div>
                     <div>
                        <label htmlFor="dispatchedBy" className="block text-sm font-medium text-shark-gray mb-1">{t('dispatchedBy')}</label>
                        <input id="dispatchedBy" type="text" value={dispatchedBy} onChange={(e) => setDispatchedBy(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md"/>
                    </div>
                    <div className="md:col-start-4">
                         <button onClick={handlePost} className="w-full bg-shark-blue text-white p-2 rounded-md hover:bg-shark-light-blue transition duration-200 font-semibold">
                            {t('post')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
                 <h3 className="text-2xl font-bold text-shark-blue mb-4">{t('dispatchHistory')}</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-shark-gray text-white">
                            <tr>
                                <th className="p-3">{t('date')}</th>
                                <th className="p-3">{t('productCode')}</th>
                                <th className="p-3">{t('productName')}</th>
                                <th className="p-3">{t('dozen')}</th>
                                <th className="p-3">{t('dispatchedBy')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dispatchedItems.map((item) => {
                                const product = getProductByCode(item.productCode);
                                if (!product) return null;
                                return (
                                    <tr key={item.id} className="border-b hover:bg-shark-light-gray">
                                        <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="p-3">{product.code}</td>
                                        <td className="p-3">{language === 'am' ? product.amharicName : product.name}</td>
                                        <td className="p-3">{item.dozen}</td>
                                        <td className="p-3">{item.dispatchedBy}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                     {dispatchedItems.length === 0 && <p className="text-center p-4 text-shark-gray">{t('noItemsFound')}</p>}
                 </div>
            </div>
        </div>
    );
};

export default Category2View;