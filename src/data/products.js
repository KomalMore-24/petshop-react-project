// Mock product data for Pet Shop E-commerce
export const products = [
  // Dogs Category
  {
    id: 1,
    name: "Golden Retriever Puppy",
    price: 899.99,
    category: "Dogs",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Beautiful and friendly Golden Retriever puppy, perfect family companion. Vaccinated and health certified.",
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "French Bulldog",
    price: 1299.99,
    category: "Dogs",
    image: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Adorable French Bulldog with champion bloodline. Great for apartment living.",
    rating: 4.7,
    inStock: true
  },
  {
    id: 3,
    name: "German Shepherd",
    price: 799.99,
    category: "Dogs",
    image: "https://images.pexels.com/photos/33053/dog-young-dog-small-dog-maltese.jpg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Loyal and intelligent German Shepherd, excellent guard dog and family protector.",
    rating: 4.9,
    inStock: true
  },
  
  // Cats Category
  {
    id: 4,
    name: "Persian Cat",
    price: 599.99,
    category: "Cats",
    image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Luxurious Persian cat with long fur and calm temperament. Perfect for indoor living.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 5,
    name: "Siamese Kitten",
    price: 449.99,
    category: "Cats",
    image: "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Playful Siamese kitten with striking blue eyes and social personality.",
    rating: 4.7,
    inStock: true
  },
  {
    id: 6,
    name: "Maine Coon",
    price: 899.99,
    category: "Cats",
    image: "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Gentle giant Maine Coon cat, friendly and great with children.",
    rating: 4.8,
    inStock: true
  },
  
  // Food Category
  {
    id: 7,
    name: "Premium Dog Food",
    price: 45.99,
    category: "Food",
    image: "https://images.pexels.com/photos/3622738/pexels-photo-3622738.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Nutritious premium dog food with real meat and vegetables. 20kg bag.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 8,
    name: "Organic Cat Food",
    price: 38.99,
    category: "Food",
    image: "https://images.pexels.com/photos/1114689/pexels-photo-1114689.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Organic cat food with salmon and sweet potato. Grain-free formula.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 9,
    name: "Pet Treats Bundle",
    price: 24.99,
    category: "Food",
    image: "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Assorted pet treats for dogs and cats. Training rewards and snacks.",
    rating: 4.4,
    inStock: true
  },
  
  // Toys Category
  {
    id: 10,
    name: "Interactive Dog Toys",
    price: 29.99,
    category: "Toys",
    image: "https://images.pexels.com/photos/374898/pexels-photo-374898.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Set of 5 interactive dog toys for mental stimulation and exercise.",
    rating: 4.7,
    inStock: true
  },
  {
    id: 11,
    name: "Cat Tower",
    price: 89.99,
    category: "Toys",
    image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Multi-level cat tower with scratching posts and comfortable perches.",
    rating: 4.8,
    inStock: true
  },
  {
    id: 12,
    name: "Pet Puzzle Feeder",
    price: 19.99,
    category: "Toys",
    image: "https://images.pexels.com/photos/209037/pexels-photo-209037.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Mental stimulation puzzle feeder for dogs and cats. Slow eating design.",
    rating: 4.5,
    inStock: true
  },
  
  // Accessories Category
  {
    id: 13,
    name: "Designer Pet Collar",
    price: 15.99,
    category: "Accessories",
    image: "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Stylish designer pet collar with matching leash. Adjustable sizes available.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 14,
    name: "Pet Bed Deluxe",
    price: 49.99,
    category: "Accessories",
    image: "https://images.pexels.com/photos/1170989/pexels-photo-1170989.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Luxury pet bed with memory foam and washable cover. Multiple colors.",
    rating: 4.7,
    inStock: true
  },
  {
    id: 15,
    name: "Pet Carrier",
    price: 79.99,
    category: "Accessories",
    image: "https://images.pexels.com/photos/6039753/pexels-photo-6039753.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    description: "Airline approved pet carrier with ventilation and comfort padding.",
    rating: 4.5,
    inStock: true
  }
];

// Categories for filtering
export const categories = ["All", "Dogs", "Cats", "Food", "Toys", "Accessories"];

// Simulate API call to fetch products
export const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000); // Simulate network delay
  });
};

// Get product by ID
export const getProductById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(p => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Product not found'));
      }
    }, 500);
  });
};
