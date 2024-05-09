const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { users } = require('../data/users.json')
const jwt = require('jsonwebtoken');

const authenticateToken = require('../middleware/authenticateToken')

router.get('/', authenticateToken , async (req, res) => { //this one has the middleware in order to protect it, since we cant have the token before login

  try {
    if (!users) {
      return res.status(404).json({error:"users not found!"})
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error)
    return res.status(500).json({error:"internal server error"})
  }
});


router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {

    bcrypt.hash(password, 10, function(err, hashedPassword) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        let newUser =  { username, password: hashedPassword }
        users.push(newUser);

        return res.status(201).json({message:"created successfully" , user: newUser});
      });

  } catch (error) {

    console.log(error)
    return res.status(500).json({error:"internal server error"})

  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {

    const user = users.find(user => user.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) { //basically checking if the passwords match :)
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '2 days' });
    return res.status(200).json({ token: token });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error : "internal server issue!" });
  }

});

module.exports = router