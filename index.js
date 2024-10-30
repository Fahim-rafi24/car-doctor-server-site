// set express in file
const express = require('express')
// set cors in file
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { ObjectID } = require('mongode');
// set port
const port = process.env.PORT || 3000;
// make a server app 
const app = express()
require('dotenv').config()


// use cors in app
app.use(cors())
// use express json for import/export client side data
app.use(express.json())



const uri = process.env.mon_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Connect to the "insertDB" database and access its "car_info" collection
        const database = client.db("Car_Doctor");
        const car_info = database.collection("car-info");


        // get All data from ADD New Service
        app.get('/', async (req, res) => {
            try {
                const cursor = car_info.find();
                const results = await cursor.toArray();
                res.send(results);
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Error fetching data' });
            }
        });
        // get each data from ADD New Service
        app.get('/get/addNewService/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await car_info.findOne(query);
            res.send(result);
        })
        // post each data in ADD New Service
        app.post('/update/addNewService', async (req, res) => {
            const data = req.body;
            const result = await car_info.insertOne(data);
            // res.send(result);
        })





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(error=>console.log(error));

// app.get('/', (req, res) => {
//     res.send('...')
// })

app.listen(port, () => {
    console.log(`server run by ${port}`)
})