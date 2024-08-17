const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hjxwn6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const productCollection = client.db("productHouse").collection("products");
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    app.get("/products", async (req, res) => {
      const brand = req.query.brand;
      const category = req.query.category;
      const priceRange = req.query.price;
      const sortOption = req.query.sort;
      const search = req.query.search;
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 5; 
      let query = {};

      if (brand) {
        query = { brandName: brand };
      }
      if (category) {
        query.categoryName = category;
      }
      if (priceRange && priceRange !== "price") {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);

        if (maxPrice === "infinity") {
          query.price = { $gte: minPrice };
        } else {
          query.price = { $gte: minPrice, $lte: maxPrice };
        }
      }

      let sortQuery = {};

      if (sortOption) {
        if (sortOption === "Low to High") {
          sortQuery.price = 1; 
        } else if (sortOption === "High to Low") {
          sortQuery.price = -1; 
        } else if (sortOption === "Newest first") {
          sortQuery.creationDate = -1; 
        }
      }
      if (search) {
        query.productName = {
          $regex: search,
          $options: "i",
        };
      }

      
      const skip = (page - 1) * limit;

      
      const cursor = productCollection
        .find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit);

      const result = await cursor.toArray();
      const totalItems = await productCollection.countDocuments(query); 
      const totalPages = Math.ceil(totalItems / limit); 

      res.send({
        products: result,
        totalItems,
        totalPages,
        currentPage: page,
      });
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running ..... :) ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
