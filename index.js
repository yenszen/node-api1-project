const express = require("express");
const shortid = require("shortid");

const server = express();
server.use(express.json());

let usersArr = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane"
  }
];

// GET
server.get("/", (req, res) => {
  res.json({ message: "welcome to node users project" });
});

server.get("/api/users", (req, res) => {
  if (usersArr) {
    res.status(200).json(usersArr);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved" });
  }
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = usersArr.find(user => user.id === id);

  if (user) {
    res.status(200).json(user);
  } else {
    res
      .status(404)
      .json({ errorMessage: "The user with the specified ID does not exist." });
  }
});

// POST
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  console.log("userInfo", userInfo);

  userInfo.id = shortid.generate();

  if (!userInfo.bio || !userInfo.name) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    usersArr.push(userInfo);
    res.status(201).json(userInfo);
  }
});

// DELETE
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const userToDel = usersArr.find(user => user.id === id);

  if (userToDel) {
    usersArr = usersArr.filter(user => user.id !== id);
    res.status(200).json(userToDel);
  } else {
    res
      .status(404)
      .json({ errorMessage: "The user with the specified ID does not exist." });
  }
});

// Listen to PORT
const port = 5000;

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
