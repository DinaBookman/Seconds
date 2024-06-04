import React from "react";
import { useState, useEffect, useContext } from 'react'
import { useParams,useNavigation} from "react-router-dom";
function Products(){
    const [products,setProducts]=useState([]);
    const {category}=useParams()
    useEffect(() => {
       fetch(`http://localhost:8080/products?category=${category}`)
          .then((response) => response.json())
          .then((response) => {
            console.log(response.resultItem)
            setPosts(response.resultItem);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setError("Error fetching posts. Please try again.");
            setLoading(false);
          });
      }, [])
    return <>
    <h1>products</h1></>;
  };export default Products;