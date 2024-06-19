
import React from "react";
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from "react-router-dom";
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
import FullProduct from "./FullProduct";
import SearchSlider from "./SearchSlider";
function Products() {

  const [products, setProducts] = useState([]);
  const [fullView, setFullView] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const { category } = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    setSearchQuery(`category=${category}`)
  },[navigate]);

  useEffect(() => {
    fetch(`http://localhost:8080/products?${searchQuery}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setProducts(response)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate,searchQuery])



  return <>
    <h1>products</h1>
    <SearchSlider setSearchQuery={setSearchQuery}/>
    <div>
      {products.map((product, i) => {
        //title,state,area,price,img
        return  <div onClick={() => setFullView(i)} key={i}>
          <img height={150} width={250} src={product.img} alt={product.title} />
          <span>{product.area}</span>
          <span>{product.price}</span>
          <span>{product.state}</span>
         
        {fullView == i && <FullProduct product={product} key={i} />}
        </div>
      }
      )}
    </div>
  </>
}
export default Products;




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from 'primereact/button';
// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Tag } from 'primereact/tag';
// import { classNames } from 'primereact/utils';
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import 'primeicons/primeicons.css';
// import './Products.css';

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [layout, setLayout] = useState('grid');
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
//   }, [navigate, category]);

//   const getSeverity = (product) => {
//     switch (product.state) {
//       case 1:
//         return 'danger';
//       case 2:
//         return 'warning';
//       case 3:
//         return 'info';
//       case 4:
//         return 'success';
//       default:
//         return null;
//     }
//   };

//   const listItem = (product, index) => {
//     return (
//       <div className="p-dataview-list" key={product.id}>
//         <img src={product.img} alt={product.title} />
//         <div className="product-info">
//           <div className="title">{product.title}</div>
//           <div className="details">
//             <span className="category">
//               <i className="pi pi-tag"></i>
//               {product.category}
//             </span>
//             <Tag className="tag" value={product.state} severity={getSeverity(product)} />
//             <span className="price">${product.price}</span>
//             <Button icon="pi pi-shopping-cart" className="p-button-rounded" />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const gridItem = (product) => {
//     return (
//       <div className="product-grid-item" key={product.id}>
//         <img src={product.img} alt={product.title} />
//         <div className="product-info">
//           <div className="title">{product.title}</div>
//           <div className="details">
//             <span className="category">
//               <i className="pi pi-tag"></i>
//               {product.category}
//             </span>
//             <Tag className="tag" value={product.state} severity={getSeverity(product)} />
//             <span className="price">${product.price}</span>
//             <Button icon="pi pi-shopping-cart" className="p-button-rounded" />
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

//   const header = () => {
//     return (
//       <div className="flex justify-content-end">
//         <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
//       </div>
//     );
//   };

//   return (
//     <div className="card">
//       <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />
//     </div>
//   );
// }
