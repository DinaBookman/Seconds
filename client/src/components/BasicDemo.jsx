import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
 function BasicDemo() {
    const items = [
        { label: 'Connect', icon: 'pi pi-home' },
        { label: 'Transactions', icon: 'pi pi-chart-line' },
        { label: 'Products', icon: 'pi pi-list' },
        { label: 'Messages', icon: 'pi pi-inbox' }
    ];

    return (
        <div > 
            <TabMenu model={items} />
            </div>
     
       
    )
    
};export default BasicDemo
