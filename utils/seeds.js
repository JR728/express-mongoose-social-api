// utils/seeds.js
const mongoose = require('mongoose');
const User = require('../models/user');
const Thought = require('../models/thought');

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const usersData = [
  { username: 'user1', email: 'user1@example.com' },
  { username: 'user2', email: 'user2@example.com' },
];

const thoughtsData = [
  { thoughtText: 'This is a sample thought.', username: 'user1' },
  { thoughtText: 'Another thought for testing.', username: 'user2' },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Create new users
    const users = await User.create(usersData);

    // Create thoughts associated with users
    const thoughts = thoughtsData.map((thought, index) => ({
      ...thought,
      userId: users[index]._id,
    }));
    await Thought.create(thoughts);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Call the seed function
seedDatabase();
