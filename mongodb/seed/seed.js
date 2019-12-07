db.users.insertOne({
    "isActive": true,
    "role": 1,
    "birthDate": ISODate("2019-12-11T00:00:00.000Z"),
    "email": "user@user.user",
    "firstName": "user",
    "lastName": "user",
    "phone": "123456789",
    "activeToken": "6db324e85e6f1d9527320604e9ad39c1e9b5c6ea6f368d0069c22d57d3b3db4752ddc32caec4c2400d6935cb00b4766b",
    "password": "$argon2i$v=19$m=4096,t=3,p=1$ZZxFnJR+8wtW1ugvjBPmYg$OeH45tHMXqq6G8Z6EhUsGlrJ4CkHnLOT8Rchac73xuA",
});

db.users.insertOne({
    "isActive": true,
    "role": 0,
    "birthDate": ISODate("2019-12-11T00:00:00.000Z"),
    "email": "admin@admin.admin",
    "firstName": "admin",
    "lastName": "admin",
    "phone": "123456789",
    "activeToken": "6db324e85e6f1d9527320604e9ad39c1e9b5c6ea6f368d0069c22d57d3b3db4752ddc32caec4c2400d6935cb00b4766b",
    "password": "$argon2i$v=19$m=4096,t=3,p=1$ZZxFnJR+8wtW1ugvjBPmYg$OeH45tHMXqq6G8Z6EhUsGlrJ4CkHnLOT8Rchac73xuA",
});