import { FaShoppingCart, FaSearch, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { Context } from "../../context/StatContext";
import LoginPopup from "../popup/LoginPopup";
import SignupPopup from "../popup/SignupPopup";
import { useAllBrands } from "../../utils/Api/BrandEndPoint";
import { useAllProducts } from "../../utils/Api/ApiEndPoint";

const SearchBar = () => {
  const navigation = useNavigate();
  const { userData, isLogin } = useContext(Context);
  const { data: brands = [] } = useAllBrands();
  const { data: products = [] } = useAllProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);

  // Memoize the search function to prevent unnecessary recreations
  const performSearch = useCallback((term) => {
    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    const lowerCaseTerm = term.toLowerCase();
    
    const productMatches = products.filter(product => 
      product.title?.toLowerCase().includes(lowerCaseTerm) ||
      product.description?.toLowerCase().includes(lowerCaseTerm)
    ).slice(0, 5);
    
    const brandMatches = brands.filter(brand => 
      brand.name?.toLowerCase().includes(lowerCaseTerm)
    ).slice(0, 3);

    setSearchResults([
      ...brandMatches.map(brand => ({ ...brand, type: 'brand' })),
      ...productMatches.map(product => ({ ...product, type: 'product' }))
    ]);
  }, [brands, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // This useEffect now only runs when searchTerm changes
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchTerm);
    }, 300); // Add slight debounce

    return () => clearTimeout(timer);
  }, [searchTerm, performSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };

  const navigateToItem = (item) => {
    if (item.type === 'product') {
      navigation(`/products/${item._id}`);
    } else if (item.type === 'brand') {
      navigation(`/products?brand=${item._id}`);
    }
    setShowResults(false);
  };

  const handleLoginSuccess = () => {
    setIsLoginPopupOpen(false);
  };

  const handleSignupSuccess = () => {
    setIsSignupPopupOpen(false);
  };

  const HandleLogin = () => {
    if (!isLogin) {
      setIsLoginPopupOpen(true);
      return;
    }
    navigation('/profile');
  };

  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Profile Icon */}
      <button 
        onClick={HandleLogin}
        className="text-gray-400 hover:text-primary transition-colors"
        aria-label="Profile"
      >
        <CgProfile className="text-2xl md:text-3xl" />
      </button>
      
      {/* Search Input */}
      <div className="relative flex-1 max-w-2xl" ref={searchRef}>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            placeholder="ابحث عن منتجك أو ماركة"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setShowResults(true)}
            className="w-full outline-none border-2 border-gray-200 text-gray-700 h-10 pl-10 pr-10 py-1.5 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
        
        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto">
            <div className="divide-y divide-gray-100">
              {searchResults.filter(item => item.type === 'brand').length > 0 && (
                <div className="p-2">
                  <h3 className="text-sm font-medium text-gray-500 px-2 py-1">الماركات</h3>
                  {searchResults.filter(item => item.type === 'brand').map(brand => (
                    <button
                      key={`brand-${brand._id}`}
                      onClick={() => navigateToItem(brand)}
                      className="w-full flex items-center p-2 hover:bg-gray-50 cursor-pointer text-right"
                    >
                      <img 
                        src={brand.image} 
                        alt={brand.name} 
                        className="w-8 h-8 object-contain ml-3 rounded-md"
                      />
                      <span className="text-sm text-gray-700">{brand.name}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {searchResults.filter(item => item.type === 'product').length > 0 && (
                <div className="p-2">
                  <h3 className="text-sm font-medium text-gray-500 px-2 py-1">المنتجات</h3>
                  {searchResults.filter(item => item.type === 'product').map(product => (
                    <button
                      key={`product-${product._id}`}
                      onClick={() => navigateToItem(product)}
                      className="w-full flex items-center p-2 hover:bg-gray-50 cursor-pointer text-right"
                    >
                      <img 
                        src={product.imageCover} 
                        alt={product.title} 
                        className="w-8 h-8 object-contain ml-3 rounded-md"
                      />
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-700">{product.title}</span>
                        <span className="text-xs text-gray-500 line-clamp-1">{product.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Shopping Cart */}
      <button
        onClick={() => navigation("/cart")}
        className="text-gray-400 hover:text-primary transition-colors relative"
        aria-label="Shopping cart"
      >
        <FaShoppingCart className="text-xl md:text-2xl" />
      </button>
      
      {/* Auth Popups */}
      {isLoginPopupOpen && (
        <LoginPopup
          onClose={() => setIsLoginPopupOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onSignupClick={() => {
            setIsLoginPopupOpen(false);
            setIsSignupPopupOpen(true);
          }}
        />
      )}

      {isSignupPopupOpen && (
        <SignupPopup
          onClose={() => setIsSignupPopupOpen(false)}
          onSignupSuccess={handleSignupSuccess}
          onLoginClick={() => {
            setIsSignupPopupOpen(false);
            setIsLoginPopupOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;