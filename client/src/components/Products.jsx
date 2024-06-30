import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import FullProduct from "./FullProduct";
import Searches from "./searches/Searches";
import "./Products.css"; // Import your CSS file for custom styles
import Product from "./Product";
import { FaArrowUp } from "react-icons/fa"; // Import FontAwesome icon for the scroll-to-top button

function Products() {
  const [products, setProducts] = useState([]);
  const [fullView, setFullView] = useState(-1); // State to track which product is in full view
  const [searchQuery, setSearchQuery] = useState("");
  const [address, setAddress] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false); // State to manage scroll button visibility
  const [filters,setFilters]=useState({})
  const { category } = useParams();
  const navigate = useNavigate();
  const limit = 20;

  useEffect(() => {
    const keys = Object.keys(filters);
    const queryString = keys.map((key) => `${key}=${filters[key]}`).join('&');
    setSearchQuery(queryString);
  }, [filters]);

  // Update search query based on category
  useEffect(() => {
    if (category) {
      setFilters((prevFilters)=>({...prevFilters,category:category}))
    }
  }, [category]);

  // Fetch data when searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      resetData();
      console.log(searchQuery)
    }
  }, [searchQuery]);

  // Function to reset data
  const resetData = () => {
    setProducts([]);
    setOffset(0);
    setHasMore(true);
    fetchData(0, true);
  };

  // Function to fetch data
  const fetchData = async (currentOffset, isReset = false) => {
    try {
      const response = await fetch(`http://localhost:8080/products?${searchQuery}&limit=${limit}&offset=${currentOffset}`);
      const result = await response.json();

      if (isReset) {
        setProducts(result);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...result]);
      }

      setOffset(currentOffset + limit);

      if (result.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle product click
  const handleProductClick = (productId) => {
    console.log("Navigating to product:", productId);
    navigate(`${productId}`);
  };

  // Function to handle scroll
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  // Effect to add scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="products-container">
      <div className="fixed-searches">
        <Searches address={address} setAddress={setAddress} setSearchQuery={setSearchQuery} setFilters={setFilters} />
      </div>
      <div className="products-list">
        <InfiniteScroll
          dataLength={products.length}
          next={() => fetchData(offset)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}><b>You have seen it all</b></p>}
        >
          {products.map((product, i) => (
            <div
              onClick={() => handleProductClick(product.id)}
              key={i}
              className={`product-item ${fullView !== -1 && fullView !== i ? 'grayed-out' : ''}`}
            >
              <Product product={product} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <Outlet />
      {/* Scroll to top button */}
      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp className="scroll-to-top-icon" />
        </button>
      )}
    </div>
  );
}

export default Products;


