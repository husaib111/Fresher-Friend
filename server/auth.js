const { response } = require("express");
const pool = require("./dbconnect");
const jwt = require("jsonwebtoken");

const loginCheck = async (request, response) => {
  try {
    console.log("logging in");
    const { email, password } = request.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows == 0) {
      response.json({ status: "error", error: "Invalid login" });
    } else {
      const userId = user.rows[0].user_id;

      const dbPassword = await pool.query(
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

        response.status(200).cookie("token", token, { httpOnly: true }).json({
          success: true,
          message: "Logged in successfully",
        });
      } else {
        response.json({ status: "error", success: false });
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};

const logOut = async (request, response) => {
  try {
    response.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  loginCheck,
  logOut,
};
