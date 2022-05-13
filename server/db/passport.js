const passport = require("passport");
const { Strategy } = require("passport-jwt");
const pool = require("./dbconnect");

require("dotenv").config();

const cookieExtractor = function (request) {
  let token = null;
  if (request && request.cookies) token = request.cookies["token"];
  return token;
};

const opts = {
  secretOrKey: process.env.SECRET_JWT_PHRASE,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ email }, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT user_id, email FROM users WHERE email = $1",
        [email]
      );
      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = { id: rows[0].user_id, email: rows[0].email };
      return await done(null, user);
    } catch (e) {
      console.log(e.message);
      done(null, false);
    }
  })
);
