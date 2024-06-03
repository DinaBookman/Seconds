import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';

export default function BasicDemo() {
    const items = [
        { label: 'Dashboard', icon: 'pi pi-home' },
        { label: 'Transactions', icon: 'pi pi-chart-line' },
        { label: 'Products', icon: 'pi pi-list' },
        { label: 'Messages', icon: 'pi pi-inbox' }
    ];

    return (
        <div className="card">
            <TabMenu model={items} />
        </div>
    )
}