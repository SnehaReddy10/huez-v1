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
  let menuItems = [];
  const numOfItems = 10000;

  for (let i = 0; i < numOfItems; i++) {
    menuItems.push({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price({ min: 5, max: 50 }),
      imageUrl:
        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
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
