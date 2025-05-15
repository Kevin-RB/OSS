// config/db.js
const mongoose = require('mongoose');

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance; // Return the existing instance
    }

    this.isConnected = false;
    Database.instance = this;
  }

  async connect() {
    if (this.isConnected) {
      console.log('MongoDB already connected. Reusing the existing connection.');
      return;
    }

    try {
      await mongoose.connect(process.env.MONGO_URI);
      this.isConnected = true;
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    }
  }
}

const dbInstance = new Database();
module.exports = dbInstance;
