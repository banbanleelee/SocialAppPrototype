const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName } = require('./data');
const texts = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users, thoughts and reactions
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create empty array to hold the users
  const users = [];
  const thoughts = [];

  for (let i = 0; i < 10; i++) {
    // Get some random text objects using a helper function that we imported from ./data
    const username = getRandomName();
    const email = `${username}123@gmail.com`;
    
    users.push({
      username,
      email,
      texts,
    });
  }

  for (let i = 0; i < 10; i++) {
    thoughts.push({
      texts,
    });
  }

  // Add users and thoughts to the collection and await the results
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);

  console.info('Seeding complete! 🌱');
  process.exit(0);
});
