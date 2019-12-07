db.createUser({
  user: "user1",
  pwd: "pass1",
  roles: [
    {
      role: "readWrite",
      db: "smart_reach_tech"
    }
  ]
});
load("./seed/seed.js");
