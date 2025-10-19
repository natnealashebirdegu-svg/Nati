
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { RawHide } from '../../types';
import AdminModal from '../common/AdminModal';

const Category3View: React.FC = () => {
    const { t, rawHides, setRawHides } = useAppContext();
    const [type, setType] = useState('');
    const [squareFeet, setSquareFeet] = useState<number | ''>('');
    const [quantity, setQuantity] = useState<number | ''>('');
    const [meter, setMeter] = useState<number | ''>('');
    const [showAdminModal, setShowAdminModal] = useState(false);

    const handlePost = () => {
        if (type && squareFeet && quantity && meter) {
            setShowAdminModal(true);
        } else {
            alert('Please fill all fields.');
        }
    };

    const executePost = () => {
        const newRawHide: RawHide = {
            id: new Date().toISOString(),
            type,
            squareFeet: Number(squareFeet),
            quantity: Number(quantity),
            meter: Number(meter),
            date: new Date().toISOString(),
        };
        setRawHides(prev => [newRawHide, ...prev]);
        setType('');
        setSquareFeet('');
        setQuantity('');
        setMeter('');
        setShowAdminModal(false);
    };

    return (
        <div className="space-y-6">
            {showAdminModal && <AdminModal onClose={() => setShowAdminModal(false)} onSuccess={executePost} />}
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-shark-blue mb-4">{t('category3')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-shark-gray mb-1">{t('itemType')}</label>
                        <input type="text" value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-shark-gray mb-1">{t('squareFeet')}</label>
                        <input type="number" value={squareFeet} onChange={e => setSquareFeet(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-shark-gray mb-1">{t('quantity')}</label>
                        <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md" />
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
                 <h3 className="text-2xl font-bold text-shark-blue mb-4">{t('rawHides')}</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-shark-gray text-white">
                            <tr>
                                <th className="p-3">{t('date')}</th>
                                <th className="p-3">{t('itemType')}</th>
                                <th className="p-3">{t('squareFeet')}</th>
                                <th className="p-3">{t('quantity')}</th>
                                <th className="p-3">{t('meter')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rawHides.map(item => (
                                <tr key={item.id} className="border-b hover:bg-shark-light-gray">
                                    <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
                                    <td className="p-3">{item.type}</td>
                                    <td className="p-3">{item.squareFeet}</td>
                                    <td className="p-3">{item.quantity}</td>
                                    <td className="p-3">{item.meter}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {rawHides.length === 0 && <p className="text-center p-4 text-shark-gray">{t('noItemsFound')}</p>}
                 </div>
            </div>
        </div>
    );
};

export default Category3View;
