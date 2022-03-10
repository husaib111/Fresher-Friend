const passport = require("passport");
const { Strategy } = require("passport-jwt");
const pool = require("./dbconnect");

const cookieExtractor = function (request) {
  let token = null;
  if (request && request.cookies) token = request.cookies["token"];
  console.log("test1");
  return token;
};

const opts = {
  secretOrKey: "fresherFriend",
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ email }, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT user_id, email FROM users WHERE email = $1",
        [email]
      );
      console.log("test2");
      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = { id: rows[0].user_id, email: rows[0].email };
      console.log("test3");
      return await done(null, user);
    } catch (e) {
      console.log(e.message);
      done(null, false);
    }
  })
);
