const router = require("express").Router();

const bcrypt = require("bcrypt");
const lodash = require("lodash");
const jwt = require("jsonwebtoken");

const users = require("../models/user-model");
const auth = require("../middlewares/authObject");

router.get("/profile", auth, async (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

router.post("/register", async (req, res) => {
  try {

  const { firstName, lastName, email, password, phoneNumber } = req.body;

  if (!(email && password && firstName && lastName && phoneNumber)) {
   return res.status(409).send("All input is required");
  }

  const oldUser = await users.findOne({ email });
  if (oldUser){
    return res.status(400).send("User already registered.");
  } 

  encryptedPassword = await bcrypt.hash(password, 10);

  const user = await users.create({
    firstName,
    lastName,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password: encryptedPassword,
    phoneNumber,
  });

  const token = jwt.sign(
    { user_id: user.id, email: user.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
    );
     user.token = token;

  res.header('x-auth-token',token).send(user);
} catch (err) {
  console.log(err);
}
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await users.findOne({ email });

  if (!(email && password)){
    return res.status(400).send("All input is required");
  }
  if (!user){
    return res.status(400).send("Invalid email!");
  }
  
  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    // user
    res.header('x-auth-token',token).json(user);
  }
});

module.exports = router;
