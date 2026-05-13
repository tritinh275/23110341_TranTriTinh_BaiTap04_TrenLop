const mongoose = require("mongoose");
const { Product } = require("../models/Product");
const { User } = require("../models/User");
const { PRODUCTS } = require("../data/products");

const DEFAULT_MONGODB_URI = "mongodb://127.0.0.1:27017/baitap04_shop";

async function seedDatabaseIfEmpty() {
  const normalizedProducts = PRODUCTS.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt)
  }));

  await Product.bulkWrite(
    normalizedProducts.map((item) => ({
      updateOne: {
        filter: { id: item.id },
        update: { $set: item },
        upsert: true
      }
    }))
  );

  await User.updateOne(
    { username: "member01" },
    {
      $set: {
        username: "member01",
        password: "123456",
        fullName: "Nguyễn Văn Member",
        role: "member"
      }
    },
    { upsert: true }
  );
}

async function connectMongo() {
  const mongoUri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;
  await mongoose.connect(mongoUri);
  await seedDatabaseIfEmpty();
  return mongoUri;
}

module.exports = { connectMongo, DEFAULT_MONGODB_URI };
