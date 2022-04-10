const router = require("express").Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");

router.post("/create_user", async (req, res) => {
  const user_name = req.body.user_name;
  const email = req.body.email;
  const password = req.body.password;
  const yanai = req.body.yanai;
  const sedot = req.body.sedot;
  const kinneret = req.body.kinneret;
  const eilat = req.body.eilat;
  const poleg = req.body.poleg;
  const kshatot = req.body.kshatot;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    user_name: user_name,
    email: email,
    password: hashedPassword,
    spots: [yanai, sedot, kinneret, eilat, poleg, kshatot],
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  UserModel.find(
    {
      email: email,
    },
    async (error, result) => {
      if (result.length > 0) {
        const hashedLoginPassword = result[0].password;
        if (await bcrypt.compare(password, hashedLoginPassword)) {
          res.send(result[0]);
        }
      } else {
        res.send("Wrong");
      }
    }
  );
});

module.exports = router;
