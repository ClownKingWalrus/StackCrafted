import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import cookieParser from "cookie-parser";
import crypto from "crypto";

dotenv.config()

const app = express()

const { Pool } = pg
const PORT = 3001

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json())
app.use(cookieParser());

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
});

app.get("/api/health", async (req, res,) => {
    try {
        const result = await pool.query("SELECT NOW()")
        res.json({ok: true, time: result.rows[0]})
    } catch (err) {
        console.log(err)
        res.status(500).json({ ok: false, error: "Database Error"})
    }
})

app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, username, email 
      FROM "StackCraftedSchema"."User"
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/api/usersCheck", async (req, res) => {
  try { //check if the username or email exist in the pg db
    const { username, email, password } = req.body;

    const result = await pool.query(`
      SELECT ID
      FROM "StackCraftedSchema"."User"
      WHERE username = $1 OR email = $2`,
    [username, email]);

    const exists = result.rows.length > 0

    console.log(exists)

    if (exists) {
      return res.json({exists})
    } else { //does not exist in postgres DB make account
      const noAdmin = false
      await pool.query (`
        Insert INTO "StackCraftedSchema"."User" 
        (username, email, userpassword, isadmin) 
        VALUES ($1, $2, $3, $4)`,
        [username, email, password, noAdmin]
      );
    }

    //route user to attempt login
    const tryCheck = true;
    return res.json({exists: false, created: true})
  } catch (err) {
    console.error(err);
    res.status(500).json({ exists: false });
  }
});

app.get("/api/visitors", async (req, res) => {
  try {
    const result = await pool.query(`SELECT id, visitortype, visitorcount 
      FROM "StackCraftedSchema"."WebsiteVisitors" 
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Vistors" });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, eventName, eventDescription, eventDate 
      FROM "StackCraftedSchema"."Club_Events" 
      WHERE eventDate >= NOW() - INTERVAL '1 day' 
      ORDER BY eventDate ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Vistors" });
  }
});

app.post("/api/createEvent", async (req, res) => {
  const { event_name, event_decription, date } = req.body;

  try {
    await pool.query (`
        Insert INTO "StackCraftedSchema"."Club_Events" 
        (eventname, eventdescription, eventdate) 
        VALUES ($1, $2, $3)`,
        [event_name, event_decription, date]
      );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Vistors" });
  }
});

app.get("/api/getLogin", async (req, res) => {
  try {
    const session = req.cookies[`session`]

    if (!session) {
      return res.status(401).json({error: "Not logged in"})
    }

    const result = await pool.query(
        `SELECT u.id, u.username, u.isadmin
        FROM "StackCraftedSchema"."Sessions" s
        JOIN "StackCraftedSchema"."User" u
        ON s.userid = u.id
        WHERE s.sessiontoken = $1 AND s.expiresat > NOW()`,
        [session]
    );

    if ( result.rows.length === 0 ) {
      return res.status(401).json({error: "Session Expired Or Invalid"})
    }

    return res.json({ user: result.rows[0] });

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to check login" });
  }
});

app.get("/api/admin/users", async (req, res) => {
  try {
    const sessionUserID = req[`session`][`userid`]

    if (!sessionUserID) {
      return res.status(401).json({error: "Not Admin"})
    }

    const result = await pool.query(
        `SELECT isadmin 
        FROM "StackCraftedSchema"."User"
        WHERE id = $1`,
        [sessionUserID]
    );

    if ( result.rows.length === 0 ) {
      return res.status(401).json({error: "Invalid Data"})
    }

    if ( !result.rows[0].isadmin ) {
      return res.status(401).json({error: "Admin only"})
    }

    return res.json({ isadmin: result.rows[0].isadmin });

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to check login" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password} = req.body;

    const result = await pool.query(`
      SELECT ID, username
      FROM "StackCraftedSchema"."User"
      WHERE username = $1 AND userpassword = $2`,
    [username, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({error: "Invalid username or password"})
    }

    // User and Pass succuess
    const SessionToken = crypto.randomUUID();
    const user = result.rows[0]

    await pool.query (`
      Insert INTO "StackCraftedSchema"."Sessions" 
      (sessiontoken, userid, expiresat) 
      VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
      [SessionToken, user.id]
    );

    res.cookie("session", SessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({ message: "Login successful"});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Vistors" });
  }
});

app.post("/api/logOut", async (req, res) => {
  try {
   const session = req.cookies[`session`]

   if (session) {
    await pool.query(
      `DELETE FROM "StackCraftedSchema"."Sessions" WHERE sessiontoken = $1`,
      [session]
      )
   }

   res.clearCookie("session", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json( {message: "Logged out"} )

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Vistors" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});