const { response } = require("express");
const passport = require("passport");
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

        //CORS requires access-control-allow-origin... for fetch this needs an exact host match
        // CORS also needs access-control-allow-credentials if it is a fetch call with credentials: 'include'
        response.set("Access-Control-Allow-Origin", request.headers.origin); //req.headers.origin
        response.set("Access-Control-Allow-Credentials", "true");
        // access-control-expose-headers allows JS in the browser to see headers other than the default 7
        response.set(
          "Access-Control-Expose-Headers",
          "date, etag, access-control-allow-origin, access-control-allow-credentials"
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

const userAuth = passport.authenticate("jwt", { session: false });

module.exports = {
  loginCheck,
  logOut,
  userAuth,
};
