
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import AdminModal from '../common/AdminModal';
import { Product } from '../../types';

const SettingsView: React.FC = () => {
    const { t, adminPassword, setAdminPassword, products, setProducts } = useAppContext();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);

    const [newProductName, setNewProductName] = useState('');
    const [newProductAmharicName, setNewProductAmharicName] = useState('');
    const [newProductCode, setNewProductCode] = useState('');

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (oldPassword !== adminPassword) {
            alert(t('incorrectOldPassword'));
            return;
        }
        if (newPassword !== confirmPassword) {
            alert(t('passwordsDoNotMatch'));
            return;
        }
        setAdminPassword(newPassword);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        alert(t('passwordUpdated'));
    };

    const handleAddProduct = () => {
        if(newProductName && newProductAmharicName && newProductCode){
            setShowProductModal(true);
        } else {
            alert('Please fill all product fields.');
        }
    }

    const executeAddProduct = () => {
        const newProduct: Product = {
            name: newProductName,
            amharicName: newProductAmharicName,
            code: newProductCode,
        };
        setProducts(prev => [...prev, newProduct]);
        setNewProductName('');
        setNewProductAmharicName('');
        setNewProductCode('');
        setShowProductModal(false);
        alert(t('productAdded'));
    }

    return (
        <div className="space-y-8">
            {showProductModal && <AdminModal onClose={() => setShowProductModal(false)} onSuccess={executeAddProduct} />}
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-shark-blue mb-6">{t('settings')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Change Password Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-shark-gray mb-4">{t('changeAdminPassword')}</h3>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-shark-gray mb-1">{t('oldPassword')}</label>
                                <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-shark-gray mb-1">{t('newPassword')}</label>
                                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-shark-gray mb-1">{t('confirmNewPassword')}</label>
                                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <button type="submit" className="w-full bg-shark-blue text-white p-2 rounded-md hover:bg-shark-light-blue transition duration-200 font-semibold">{t('updatePassword')}</button>
                        </form>
                    </div>

                    {/* Add New Product Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-shark-gray mb-4">{t('addNewProduct')}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-shark-gray mb-1">{t('productName')}</label>
                                <input type="text" value={newProductName} onChange={e => setNewProductName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-shark-gray mb-1">{t('amharicName')}</label>
                                <input type="text" value={newProductAmharicName} onChange={e => setNewProductAmharicName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-shark-gray mb-1">{t('productCode')}</label>
                                <input type="text" value={newProductCode} onChange={e => setNewProductCode(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <button onClick={handleAddProduct} className="w-full bg-shark-blue text-white p-2 rounded-md hover:bg-shark-light-blue transition duration-200 font-semibold">{t('addProduct')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
