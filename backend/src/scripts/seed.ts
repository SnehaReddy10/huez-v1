import { dbConfig } from '../config/db/db.config';
import dotenv from 'dotenv';
import { MenuItem } from '../models/menu-item.model';
import { Restaurant } from '../models/restaurant.model';
import { User } from '../models/user.model';
import { AuthProvider } from '../constants/enums/auth-provider';

dotenv.config({ path: `.env.development.local` });
dbConfig.init();

const menuItems = [
  {
    name: 'Butter Chicken',
    description:
      'A rich and creamy tomato-based curry with tender chicken pieces.',
    price: 12.99,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurant: '67a0c1a8ad3a145aa404e128',
    category: 'MainCourse',
    cuisine: 'indian',
    isVeg: false,
    isVegan: false,
    inStock: 15,
    calories: 600,
  },
  {
    name: 'Spring Rolls',
    description:
      'Crispy fried rolls filled with vegetables and served with sweet chili sauce.',
    price: 6.99,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurant: '67a0c1a8ad3a145aa404e128',
    category: 'Appetizer',
    cuisine: 'chinese',
    isVeg: true,
    isVegan: true,
    inStock: 20,
    calories: 250,
  },
  {
    name: 'Margherita Pizza',
    description:
      'Classic Italian pizza with tomato sauce, mozzarella cheese, and fresh basil.',
    price: 10.99,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurant: '67a0c1a8ad3a145aa404e128',
    category: 'MainCourse',
    cuisine: 'italian',
    isVeg: true,
    isVegan: false,
    inStock: 12,
    calories: 550,
  },
  {
    name: 'Sushi Platter',
    description:
      'An assortment of fresh sushi rolls and sashimi, served with soy sauce.',
    price: 15.99,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurant: '67a0c1a8ad3a145aa404e128',
    category: 'MainCourse',
    cuisine: 'japanese',
    isVeg: false,
    isVegan: false,
    inStock: 10,
    calories: 400,
  },
  {
    name: 'Cheeseburger',
    description:
      'Juicy beef patty with melted cheese, lettuce, tomato, and special sauce.',
    price: 8.99,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurant: '67a0c1a8ad3a145aa404e128',
    category: 'MainCourse',
    cuisine: 'american',
    isVeg: false,
    isVegan: false,
    inStock: 18,
    calories: 700,
  },
  {
    name: 'Gulab Jamun',
    description: 'Soft, deep-fried dumplings soaked in fragrant sugar syrup.',
    price: 5.99,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurant: '67a0c1a8ad3a145aa404e128',
    category: 'Dessert',
    cuisine: 'indian',
    isVeg: true,
    isVegan: false,
    inStock: 25,
    calories: 300,
  },
  {
    name: 'Kung Pao Chicken',
    description:
      'Stir-fried chicken with peanuts, vegetables, and chili peppers in a spicy sauce.',
    price: 13.99,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurant: '67a0c1a8ad3a145aa404e128',
    category: 'MainCourse',
    cuisine: 'chinese',
    isVeg: false,
    isVegan: false,
    inStock: 14,
    calories: 500,
  },
  {
    name: 'Tiramisu',
    description:
      'Classic Italian dessert made with coffee-soaked ladyfingers and mascarpone cream.',
    price: 7.99,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurant: '67a0c1a8ad3a145aa404e128',
    category: 'Dessert',
    cuisine: 'italian',
    isVeg: true,
    isVegan: false,
    inStock: 10,
    calories: 450,
  },
  {
    name: 'Matcha Latte',
    description:
      'Creamy latte made with Japanese matcha green tea and steamed milk.',
    price: 4.99,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurant: '67a0c1a8ad3a145aa404e128',
    category: 'Beverage',
    cuisine: 'japanese',
    isVeg: true,
    isVegan: false,
    inStock: 30,
    calories: 200,
  },
  {
    name: 'French Fries',
    description: 'Crispy golden fries served with ketchup and mayo.',
    price: 3.99,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurant: '67a0c1a8ad3a145aa404e128',
    category: 'SideDish',
    cuisine: 'american',
    isVeg: true,
    isVegan: true,
    inStock: 50,
    calories: 320,
  },
];

const restaurantData = {
  name: 'test',
  address: 'test',
  coordinates: [12.22, 14.898],
  cuisine: ['indian'],
};

const merchant = {
  name: 'test',
  username: 'test',
  email: 'test1@gmail.com',
  password: 'testtest',
  role: 'MERCHANT',
};

async function seedData() {
  await User.deleteMany({});
  const user = new User({ ...merchant, authProvider: AuthProvider.EMAIL });
  await user.save();

  await Restaurant.deleteMany({});
  const restaurant = new Restaurant({
    name: restaurantData.name,
    address: restaurantData.address,
    location: {
      type: 'Point',
      coordinates: restaurantData.coordinates,
    },
    merchant: user._id,
    cuisine: restaurantData.cuisine || [],
  });
  await restaurant.save();

  await MenuItem.deleteMany({});
  menuItems.map(async (x) => {
    const menuItem = new MenuItem({
      ...x,
      restaurant: restaurant._id,
    });
    await menuItem.save();
  });
}

seedData();
