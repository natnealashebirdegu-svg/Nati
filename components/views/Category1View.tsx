import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { InventoryItem, Product } from '../../types';
import AdminModal from '../common/AdminModal';

const Category1View: React.FC = () => {
    const { t, products, inventory, setInventory, language } = useAppContext();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [dozen, setDozen] = useState<number | ''>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        return products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.amharicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.code.includes(searchTerm)
        );
    }, [searchTerm, products]);

    const handlePost = () => {
        // Fix: Cast `dozen` to a number before comparison to avoid type error.
        if (selectedProduct && Number(dozen) > 0) {
            setShowAdminModal(true);
        } else {
            alert('Please select a product and enter a valid dozen count.');
        }
    };

    const executePost = () => {
        if (!selectedProduct || !dozen) return;

        setInventory(prev => {
            const existingItemIndex = prev.findIndex(item => item.productCode === selectedProduct.code);
            if (existingItemIndex > -1) {
                const updatedInventory = [...prev];
                updatedInventory[existingItemIndex] = {
                    ...updatedInventory[existingItemIndex],
                    dozen: updatedInventory[existingItemIndex].dozen + Number(dozen)
                };
                return updatedInventory;
            } else {
                return [...prev, { productCode: selectedProduct.code, dozen: Number(dozen) }];
            }
        });

        setSelectedProduct(null);
        setDozen('');
        setSearchTerm('');
        setShowAdminModal(false);
    };

    const getProductByCode = (code: string) => products.find(p => p.code === code);

    return (
        <div className="space-y-6">
            {showAdminModal && <AdminModal onClose={() => setShowAdminModal(false)} onSuccess={executePost} />}
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-shark-blue mb-4">{t('category1')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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
                        {isDropdownOpen && (
                            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                                {filteredProducts.length > 0 ? filteredProducts.map(p => (
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
                                )) : <div className="p-2 text-shark-gray">{t('noItemsFound')}</div>}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="dozen" className="block text-sm font-medium text-shark-gray mb-1">{t('dozen')}</label>
                        <input
                            id="dozen"
                            type="number"
                            value={dozen}
                            onChange={(e) => setDozen(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            min="1"
                        />
                    </div>
                    <div className="md:col-start-3">
                         <button onClick={handlePost} className="w-full bg-shark-blue text-white p-2 rounded-md hover:bg-shark-light-blue transition duration-200 font-semibold">
                            {t('post')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
                 <h3 className="text-2xl font-bold text-shark-blue mb-4">{t('currentInventory')}</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-shark-gray text-white">
                            <tr>
                                <th className="p-3">{t('productCode')}</th>
                                <th className="p-3">{t('productName')}</th>
                                <th className="p-3">{t('dozen')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((item: InventoryItem, index: number) => {
                                const product = getProductByCode(item.productCode);
                                if (!product) return null;
                                return (
                                    <tr key={index} className="border-b hover:bg-shark-light-gray">
                                        <td className="p-3">{product.code}</td>
                                        <td className="p-3">{language === 'am' ? product.amharicName : product.name}</td>
                                        <td className="p-3 font-semibold">{item.dozen}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                     {inventory.length === 0 && <p className="text-center p-4 text-shark-gray">{t('noItemsFound')}</p>}
                 </div>
            </div>
        </div>
    );
};

export default Category1View;