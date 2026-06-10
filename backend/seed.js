import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./model/ProductModel.js";
import Cart from "./model/CartModel.js";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/amazon";

const sampleProducts = [
  {
    productname: "Drip Coffee Maker with Glass Carafe",
    modelnumber: "CM-2026",
    modelyear: 2025,
    productphoto: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop"
    ],
    brandname: "BrewMaster",
    categoryname: "Home & Kitchen",
    color: "Black & Silver",
    weight: "1.8 kg",
    includedcomponent: "Glass Carafe, Reusable Filter, Measuring Spoon",
    warranty: "1 Year Limited Warranty",
    price: 3499
  },
  {
    productname: "Precision Espresso Machine",
    modelnumber: "EM-X3",
    modelyear: 2026,
    productphoto: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop"
    ],
    brandname: "EspressoPro",
    categoryname: "Home & Kitchen",
    color: "Stainless Steel",
    weight: "4.5 kg",
    includedcomponent: "Portafilter, Tamper, Milk Frothing Pitcher",
    warranty: "2 Years Extended Warranty",
    price: 12999
  },
  {
    productname: "Sony WH-1000XM4 Headphones",
    modelnumber: "WH-1000XM4",
    modelyear: 2024,
    productphoto: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop"
    ],
    brandname: "Sony",
    categoryname: "Electronics",
    color: "Matte Black",
    weight: "254 g",
    includedcomponent: "Case, USB-C Cable, Audio Cable, Adapter",
    warranty: "1 Year Manufacturer Warranty",
    price: 22990
  },
  {
    productname: "Apple MacBook Pro 14 M3",
    modelnumber: "MBP14-M3",
    modelyear: 2024,
    productphoto: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop"
    ],
    brandname: "Apple",
    categoryname: "Electronics",
    color: "Space Grey",
    weight: "1.55 kg",
    includedcomponent: "70W Charger, MagSafe 3 Cable",
    warranty: "1 Year Apple Care Warranty",
    price: 169900
  },
  {
    productname: "Classic Brown Leather Jacket",
    modelnumber: "LJ-CLASSIC",
    modelyear: 2025,
    productphoto: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop"
    ],
    brandname: "UrbanHide",
    categoryname: "Fashion",
    color: "Vintage Brown",
    weight: "1.2 kg",
    includedcomponent: "Jacket, Extra Buttons",
    warranty: "6 Months Stitching Warranty",
    price: 4999
  },
  {
    productname: "Nike Air Max Sport Shoes",
    modelnumber: "AM-2025",
    modelyear: 2025,
    productphoto: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop"
    ],
    brandname: "Nike",
    categoryname: "Fashion",
    color: "Crimson Red / Black",
    weight: "680 g",
    includedcomponent: "1 Pair of Shoes",
    warranty: "3 Months Sole Warranty",
    price: 8995
  },
  {
    productname: "iPhone 15 Pro Max",
    modelnumber: "A3106",
    modelyear: 2023,
    productphoto: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop"
    ],
    brandname: "Apple",
    categoryname: "phone",
    color: "Natural Titanium",
    weight: "221 g",
    includedcomponent: "USB-C Charge Cable (1m)",
    warranty: "1 Year International Warranty",
    price: 159900
  },
  {
    productname: "Samsung Galaxy S24 Ultra",
    modelnumber: "SM-S928B",
    modelyear: 2024,
    productphoto: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop"
    ],
    brandname: "Samsung",
    categoryname: "phone",
    color: "Titanium Yellow",
    weight: "232 g",
    includedcomponent: "S-Pen, USB-C Cable, Sim Pin",
    warranty: "1 Year Brand Warranty",
    price: 129999
  },
  {
    productname: "Atomic Habits by James Clear",
    modelnumber: "ISBN-9781847941",
    modelyear: 2018,
    productphoto: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop"
    ],
    brandname: "Penguin Random House",
    categoryname: "Books",
    color: "Paperback Edition",
    weight: "250 g",
    includedcomponent: "1 Paperback Book",
    warranty: "No Warranty",
    price: 499
  },
  {
    productname: "The Hobbit (Illustrated)",
    modelnumber: "ISBN-9780008376",
    modelyear: 2020,
    productphoto: [
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=600&auto=format&fit=crop"
    ],
    brandname: "HarperCollins",
    categoryname: "Books",
    color: "Hardcover",
    weight: "450 g",
    includedcomponent: "1 Hardcover Book with Maps",
    warranty: "No Warranty",
    price: 999
  },
  {
    productname: "Hydrating Facial Serum",
    modelnumber: "HS-50ML",
    modelyear: 2025,
    productphoto: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop"
    ],
    brandname: "GlowLab",
    categoryname: "Beauty",
    color: "Transparent Liquid",
    weight: "50 ml",
    includedcomponent: "Glass Bottle with Dropper",
    warranty: "12 Months Period After Opening",
    price: 899
  },
  {
    productname: "Matte Liquid Red Lipstick",
    modelnumber: "LS-MATTE-RED",
    modelyear: 2025,
    productphoto: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop"
    ],
    brandname: "VelvetTouch",
    categoryname: "Beauty",
    color: "Ruby Red",
    weight: "4.5 ml",
    includedcomponent: "Liquid Lipstick with Wand",
    warranty: "24 Months Period After Opening",
    price: 650
  }
];

async function seed() {
  try {
    console.log("Connecting to database at:", MONGO_URL);
    await mongoose.connect(MONGO_URL);
    console.log("Connected successfully!");

    // 1. Delete all existing products
    console.log("Deleting all products...");
    const deleteProductsResult = await Product.deleteMany({});
    console.log(`Deleted ${deleteProductsResult.deletedCount} products.`);

    // 2. Delete all existing cart items to prevent crashes/orphaned references
    console.log("Deleting all cart items...");
    const deleteCartResult = await Cart.deleteMany({});
    console.log(`Deleted ${deleteCartResult.deletedCount} cart items.`);

    // 3. Insert new sample products
    console.log("Inserting new relatable products...");
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${insertedProducts.length} products!`);

    await mongoose.disconnect();
    console.log("Disconnected from database.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
}

seed();
