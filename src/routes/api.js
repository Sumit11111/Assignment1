const express = require("express");
const members = require("../Members");
const route = express();
const uuid = require("uuid");

//Gets single member
route.get("/:id", (req, res) => {
  const found = members.some(members => members.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(members => members.id === parseInt(req.params.id)));
  } else {
    res.status(400).json(`Member with id ${req.params.id} not found`);
  }
});

//Gets all members
route.get("/", (req, res) => {
  res.json(members);
});

//create members
route.post("/", (req, res) => {
  const newmember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email
  };
  if (!newmember.name) {
    return res
      .status(400)
      .json({ msg: "please enter the name and email value" });
  }
  members.push(newmember);
  // res.json(members);
  res.redirect("/");
});

//update member
route.put("/:id", (req, res) => {
  const found = members.some(members => members.id === parseInt(req.params.id));
  if (found) {
    const updmember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updmember.name ? updmember.name : member.name;
        member.email = updmember.email ? updmember.email : member.email;
        res.json({ msg: "member updates", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id ${req.params.id}` });
  }
});

//delete member
route.delete("/:id", (req, res) => {
  const found = members.some(members => members.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: `member with id ${req.params.id} deleted`,
      members: members.filter(members => members.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with id od ${req.params.id}` });
  }
});

module.exports = route;
