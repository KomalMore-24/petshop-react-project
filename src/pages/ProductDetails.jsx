import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';
import { formatPrice } from '../utils/priceUtils';
import { getStarRating } from '../utils/helpers';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
        showError('Product not found');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, showError]);

  const handleAddToCart = () => {
    if (product && product.inStock) {
      addToCart(product, quantity);
      showSuccess(`${quantity} ${product.name} added to cart!`);
    }
  };

  const handleQuantityChange = (value) => {
    const newValue = parseInt(value);
    if (newValue >= 1 && newValue <= 99) {
      setQuantity(newValue);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading product details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h2>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const stars = getStarRating(product.rating);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Home
              </Link>
            </li>
            <li className="text-gray-500 dark:text-gray-400">/</li>
            <li>
              <Link to="/products" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Products
              </Link>
            </li>
            <li className="text-gray-500 dark:text-gray-400">/</li>
            <li className="text-gray-900 dark:text-white font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {[product.image].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-blue-500 dark:border-blue-400'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {product.category}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {stars.map((star, index) => (
                  <span key={index} className="text-yellow-400 text-lg">
                    {star.type === 'full' ? '★' : star.type === 'half' ? '☆' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                ({product.rating} rating)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.inStock ? (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  In Stock
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  min="1"
                  max="99"
                  className="w-20 text-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= 99}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                product.inStock
                  ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Product Features */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Product Features
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  High quality product
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fast and secure delivery
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  30-day return policy
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  24/7 customer support
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            You May Also Like
          </h2>
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              View More Products
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
