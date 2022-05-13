const { response } = require("express");
const passport = require("passport");
const pool = require("./dbconnect");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const loginCheck = async (request, response) => {
  try {
    console.log("logging in");
    const { email, password } = request.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows == 0) {
      response.json({
        success: false,
        status: "error",
        error: "Invalid login",
      });
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
          process.env.SECRET_JWT_PHRASE
        );

        response
          .status(200)
          .cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: "Lax",
          })
          .json({
            success: true,
            message: "Logged in successfully",
          });
      } else {
        response.json({
          success: false,
          status: "error",
          error: "Invalid login",
        });
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

const userAuth = passport.authenticate("jwt", { session: false });

module.exports = {
  loginCheck,
  logOut,
  userAuth,
};
