
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from "react-router-dom";
// // import { ProductService } from './service/ProductService';
// import { Button } from 'primereact/button';
// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
// import { classNames } from 'primereact/utils';
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import 'primeicons/primeicons.css';

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [layout, setLayout] = useState('grid');

//   // useEffect(() => {
//   //     ProductService.getProducts().then((data) => setProducts(data.slice(0, 12)));
//   // }, []);
//   const { category } = useParams();
//   const navigate = useNavigate();
//   useEffect(() => {
//     fetch(`http://localhost:8080/products?category=${category}`)
//       .then((response) => response.json())
//       .then((response) => {
//         console.log(response)
//         setProducts(response)
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, [navigate])

//   const getSeverity = (product) => {
//     switch (product.state) {
//       case 1:
//         return 'bad conditoin';

//       case 2:
//         return 'not bad condition';

//       case '3':
//         return 'good condition';

//       case '4':
//         return 'exelent condition';

//       default:
//         return null;
//     }
//   };

//   const listItem = (product, index) => {
//     return (
//       <div className="p-dataview-list" key={product.id}>
//         <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
//           <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.img} alt={product.title} />
//           <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
//             <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//               <div className="text-2xl font-bold text-900">{product.title}</div>
//               {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
//               <div className="flex align-items-center gap-3">
//                 <span className="flex align-items-center gap-2">
//                   <i className="pi pi-tag"></i>
//                   <span className="font-semibold">{product.category}</span>
//                 </span>
//                 <Tag value={product.state} severity={getSeverity(product)}></Tag>
//               </div>
//             </div>
//             <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//               <span className="text-2xl font-semibold">${product.price}</span>
//               <Button icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const gridItem = (product) => {
//     return (
//       <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
//         <div className="p-4 border-1 surface-border surface-card border-round">
//           <div className="flex flex-wrap align-items-center justify-content-between gap-2">
//             <div className="flex align-items-center gap-2">
//               <i className="pi pi-tag"></i>
//               <span className="font-semibold">{product.category}</span>
//             </div>
//             <Tag value={product.state} severity={getSeverity(product)}></Tag>
//           </div>
//           <div className="flex flex-column align-items-center gap-3 py-5">
//             <img className="w-9 shadow-2 border-round" src={product.img} alt={product.title} />
//             <div className="text-2xl font-bold">{product.title}</div>
//             {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
//           </div>
//           <div className="flex align-items-center justify-content-between">
//             <span className="text-2xl font-semibold">${product.price}</span>
//             <Button icon="pi pi-shopping-cart" className="p-button-rounded" ></Button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const itemTemplate = (product, layout, index) => {
//     if (!product) {
//       return;
//     }

//     if (layout === 'list') return listItem(product, index);
//     else if (layout === 'grid') return gridItem(product);
//   };

//   const listTemplate = (products, layout) => {
//     return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
//   };

//   const header = () => {
//     return (
//       <div className="flex justify-content-end">
//         <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
//       </div>
//     );
//   };

//   return (
//     <div className="card">
//       <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
//     </div>
//   )
// }








import React from "react";
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate  } from "react-router-dom";
// import { useHistory } from 'react-router';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

// import { ProductService } from './service/ProductService';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
function Products() {

  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8080/products?category=${category}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setProducts(response)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate])



  return <>
    <h1>products</h1>
    <div>
      {products.map((product, i) => {
        //title,state,area,price,img
        return <div key={i}>
          <img style={{ width: 200, height: 150 }} src={product.img} alt={product.description} />
          <span>{product.price}</span>
          <span>{product.state}</span>
        </div>
      }
      )}
    </div>
  </>
}
export default Products;