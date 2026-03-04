import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/priceUtils';
import { getStarRating } from '../utils/helpers';
import { useToast } from '../hooks/useToast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showSuccess } = useToast();
  const [imageError, setImageError] = useState(false);
  const stars = getStarRating(product.rating);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showSuccess(`${product.name} added to cart!`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Fallback image URL
  const fallbackImage = `https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300&h=300`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={imageError ? fallbackImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            onError={handleImageError}
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
          {product.rating >= 4.5 && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
              ⭐ Best Seller
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Product Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {stars.map((star, index) => (
                <span key={index} className="text-yellow-400">
                  {star.type === 'full' ? '★' : star.type === 'half' ? '☆' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              ({product.rating})
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                product.inStock
                  ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
