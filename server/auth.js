const { check } = require("express-validator");
const db = require("./dbconnect");
const jwt = require("jsonwebtoken");

const loginFieldsCheck = check("email").custom(async (value, { req }) => {
  const user = await db.query("SELECT * from users WHERE email = $1", [value]);

  if (!user.rows.length) {
    return res;
  }

  const validPassword = await compare(req.body.password, user.rows[0].password);

  if (!validPassword) {
    throw new Error("Wrong password");
  }

  req.user = user.rows[0];
});

module.exports = {
  registerValidation: [email, password, emailExists],
  loginValidation: [loginFieldsCheck],
};

const loginCheck = async (request, response) => {
  const { email, password } = request.params;
  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const userId = user.rows[0].user_id;

  const dbPassword = await db.query(
    "SELECT * FROM passwords WHERE user_id = $1",
    [userId]
  );

  const isPasswordValid = password == dbPassword.rows[0].pass;

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        email: user.rows[0].email,
      },
      "fresherFriend"
    );

    return response.json({ status: "ok", user: token });
  } else {
    return response.json({ status: "error", user: false });
  }
};

module.exports = {
  loginCheck,
};
