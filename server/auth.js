const { response } = require("express");
const db = require("./dbconnect");
const jwt = require("jsonwebtoken");

const loginCheck = async (request, response) => {
  const { email, password } = request.body;
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
