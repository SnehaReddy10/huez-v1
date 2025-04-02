import { dbConfig } from '../config/db/db.config';
import dotenv from 'dotenv';
import { MenuItem } from '../models/menu-item.model';
import { Restaurant } from '../models/restaurant.model';
import { User } from '../models/user.model';
import { AuthProvider } from '../constants/enums/auth-provider';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

dotenv.config({ path: `.env.development.local` });
dbConfig.init();

const menuImages = [
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb2R8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZvb2R8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2R8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb2R8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1669150849080-241bf2ec9b4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGZvb2R8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGZvb2R8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGZvb2R8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGZvb2R8ZW58MHx8MHx8fDA%3D',
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

const generateMenuItems = async () => {
  const menuItems = [];
  const numOfItems = 1000;

  for (let i = 0; i < numOfItems; i++) {
    menuItems.push({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price({ min: 5, max: 50 }),
      imageUrl: menuImages[Math.floor(Math.random() * menuImages.length)],
      restaurant: new mongoose.Types.ObjectId(),
      category: faker.helpers.arrayElement([
        'MainCourse',
        'SideDish',
        'Dessert',
      ]),
      cuisine: faker.helpers.arrayElement(['indian', 'italian', 'american']),
      isVeg: faker.datatype.boolean(),
      isVegan: faker.datatype.boolean(),
      inStock: faker.number.int({ min: 5, max: 100 }),
      calories: faker.number.int({ min: 200, max: 1000 }),
    });
  }
  await MenuItem.insertMany(menuItems);
  console.log(`Inserted ${numOfItems} menu items!`);
};

async function seedData() {
  await User.deleteMany({});
  const user = new User({ ...merchant, authProvider: AuthProvider.EMAIL });
  await user.save();

  await Restaurant.deleteMany({});
  const restaurant = new Restaurant({
    name: restaurantData.name,
    description: 'Royal Biryani House',
    address: restaurantData.address,
    location: {
      type: 'Point',
      coordinates: restaurantData.coordinates,
    },
    merchant: user._id,
    cuisine: restaurantData.cuisine || [],
  });
  await restaurant.save();
  generateMenuItems();
}

seedData();
