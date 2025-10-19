import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import PrintShareButtons from '../common/PrintShareButtons';
import { DispatchedItem, InventoryItem, Product, PurchasedGood, RawHide, SentMaterial } from '../../types';

type ReportType = 'inventory' | 'dispatched' | 'rawhides' | 'purchased' | 'sent';

const Category6View: React.FC = () => {
    const { 
        t, 
        language,
        products,
        inventory, 
        dispatchedItems,
        rawHides,
        purchasedGoods,
        sentMaterials
    } = useAppContext();

    const [reportType, setReportType] = useState<ReportType>('inventory');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const getProductByCode = (code: string): Product | undefined => products.find(p => p.code === code);

    const filteredData = useMemo(() => {
        const start = startDate ? new Date(startDate) : null;
        if(start) start.setHours(0, 0, 0, 0);

        const end = endDate ? new Date(endDate) : null;
        if(end) end.setHours(23, 59, 59, 999);

        const filterByDate = (item: { date: string }) => {
            if (!start && !end) return true;
            const itemDate = new Date(item.date);
            if (start && itemDate < start) return false;
            if (end && itemDate > end) return false;
            return true;
        };
        
        switch (reportType) {
            case 'inventory':
                return inventory; // Inventory doesn't have a date, so we show all
            case 'dispatched':
                return dispatchedItems.filter(filterByDate);
            case 'rawhides':
                return rawHides.filter(filterByDate);
            case 'purchased':
                return purchasedGoods.filter(filterByDate);
            case 'sent':
                return sentMaterials.filter(filterByDate);
            default:
                return [];
        }
    }, [reportType, startDate, endDate, inventory, dispatchedItems, rawHides, purchasedGoods, sentMaterials]);

    const reportTitle = {
        inventory: t('currentInventory'),
        dispatched: t('dispatchHistory'),
        rawhides: t('rawHides'),
        purchased: t('purchasedGoods'),
        sent: t('sentMaterials'),
    }[reportType];
    
    const generatePlainTextData = () => {
        let text = `${reportTitle}\n`;
        text += `Date Range: ${startDate || 'Start'} to ${endDate || 'End'}\n\n`;

        text += JSON.stringify(filteredData, null, 2);
        return text;
    };


    const renderTable = () => {
        switch (reportType) {
            case 'inventory':
                return (
                    <table className="w-full text-left">
                        <thead className="bg-shark-gray text-white">
                            <tr>
                                <th className="p-3">{t('productCode')}</th>
                                <th className="p-3">{t('productName')}</th>
                                <th className="p-3">{t('dozen')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(filteredData as InventoryItem[]).map((item, index) => {
                                const product = getProductByCode(item.productCode);
                                return (
                                <tr key={index} className="border-b hover:bg-shark-light-gray">
                                    <td className="p-3">{product?.code}</td>
                                    <td className="p-3">{product ? (language === 'am' ? product.amharicName : product.name) : 'N/A'}</td>
                                    <td className="p-3 font-semibold">{item.dozen}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                );
            case 'dispatched':
                return (
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
                            {(filteredData as DispatchedItem[]).map((item) => {
                                const product = getProductByCode(item.productCode);
                                return (
                                <tr key={item.id} className="border-b hover:bg-shark-light-gray">
                                    <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
                                    <td className="p-3">{product?.code}</td>
                                    <td className="p-3">{product ? (language === 'am' ? product.amharicName : product.name) : 'N/A'}</td>
                                    <td className="p-3">{item.dozen}</td>
                                    <td className="p-3">{item.dispatchedBy}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                );
            case 'rawhides':
                 return (
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
                            {(filteredData as RawHide[]).map(item => (
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
                 );
            case 'purchased':
                return (
                    <table className="w-full text-left">
                        <thead className="bg-shark-gray text-white">
                            <tr>
                                <th className="p-3">{t('date')}</th>
                                <th className="p-3">{t('itemName')}</th>
                                <th className="p-3">{t('type')}</th>
                                <th className="p-3">{t('quantity')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(filteredData as PurchasedGood[]).map(item => (
                                <tr key={item.id} className="border-b hover:bg-shark-light-gray">
                                    <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">{item.type}</td>
                                    <td className="p-3">{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'sent':
                return (
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
                            {(filteredData as SentMaterial[]).map(item => (
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
                );
            default:
                return null;
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-shark-blue mb-4">{t('reports')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-shark-gray mb-1">{t('reportType')}</label>
                        <select
                            value={reportType}
                            onChange={e => setReportType(e.target.value as ReportType)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="inventory">{t('currentInventory')}</option>
                            <option value="dispatched">{t('dispatchHistory')}</option>
                            <option value="rawhides">{t('rawHides')}</option>
                            <option value="purchased">{t('purchasedGoods')}</option>
                            <option value="sent">{t('sentMaterials')}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-shark-gray mb-1">{t('startDate')}</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={reportType === 'inventory'}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-shark-gray mb-1">{t('endDate')}</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={reportType === 'inventory'}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md" id="report-section">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-shark-blue">{reportTitle}</h3>
                    <PrintShareButtons dataToCopy={generatePlainTextData()} pageTitle={reportTitle} />
                </div>
                 <div className="overflow-x-auto">
                    {renderTable()}
                    {filteredData.length === 0 && <p className="text-center p-4 text-shark-gray">{t('noItemsFound')}</p>}
                 </div>
            </div>
        </div>
    );
};

export default Category6View;
