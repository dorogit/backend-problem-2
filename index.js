const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config(); //load constants

app.use(cors()) //just because, in case we deploy on the web later. A practice I follow everywhere
app.use(express.json()) //setting up json
app.use(express.urlencoded({ extended: true })); //for req.body destructuring 

const router = require('./routes/users')

app.use('/users', router)

//First Path
app.get("/", async (req, res) => {
    return res.json({ message: "Hello, Neel!" });
});
  
const start = async () => {
    try {
        app.listen(3000, () => console.log("Server started on port 3000"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
  
start();