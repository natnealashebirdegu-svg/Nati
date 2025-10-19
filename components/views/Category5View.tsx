
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { SentMaterial } from '../../types';
import AdminModal from '../common/AdminModal';

const Category5View: React.FC = () => {
    const { t, sentMaterials, setSentMaterials } = useAppContext();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState<number | ''>('');
    const [roll, setRoll] = useState<number | ''>('');
    const [meter, setMeter] = useState<number | ''>('');
    const [showAdminModal, setShowAdminModal] = useState(false);

    const handlePost = () => {
        if (name && quantity && roll && meter) {
            setShowAdminModal(true);
        } else {
            alert('Please fill all fields.');
        }
    };

    const executePost = () => {
        const newMaterial: SentMaterial = {
            id: new Date().toISOString(),
            name,
            quantity: Number(quantity),
            roll: Number(roll),
            meter: Number(meter),
            date: new Date().toISOString(),
        };
        setSentMaterials(prev => [newMaterial, ...prev]);
        setName('');
        setQuantity('');
        setRoll('');
        setMeter('');
        setShowAdminModal(false);
    };

    return (
        <div className="space-y-6">
            {showAdminModal && <AdminModal onClose={() => setShowAdminModal(false)} onSuccess={executePost} />}
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-shark-blue mb-4">{t('category5')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-shark-gray mb-1">{t('sentItemName')}</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-shark-gray mb-1">{t('quantity')}</label>
                        <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-shark-gray mb-1">{t('roll')}</label>
                        <input type="number" value={roll} onChange={e => setRoll(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-shark-gray mb-1">{t('meter')}</label>
                        <input type="number" value={meter} onChange={e => setMeter(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <button onClick={handlePost} className="w-full bg-shark-blue text-white p-2 rounded-md hover:bg-shark-light-blue transition duration-200 font-semibold">{t('post')}</button>
                    </div>
                </div>
            </div>

            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
                 <h3 className="text-2xl font-bold text-shark-blue mb-4">{t('sentMaterials')}</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-shark-gray text-white">
                            <tr>
                                <th className="p-3">{t('date')}</th>
                                <th className="p-3">{t('sentItemName')}</th>
                                <th className="p-3">{t('quantity')}</th>
                                <th className="p-3">{t('roll')}</th>
                                <th className="p-3">{t('meter')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sentMaterials.map(item => (
                                <tr key={item.id} className="border-b hover:bg-shark-light-gray">
                                    <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">{item.quantity}</td>
                                    <td className="p-3">{item.roll}</td>
                                    <td className="p-3">{item.meter}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {sentMaterials.length === 0 && <p className="text-center p-4 text-shark-gray">{t('noItemsFound')}</p>}
                 </div>
            </div>
        </div>
    );
};

export default Category5View;
