const express = require("express");
const app = express();
const router = express.Router();

router.post("/", (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, studentId } = req.body;

  if (!firstName || !lastName || !dateOfBirth || !gender || !studentId)
    return res.status(400).json({ error: "All fields are required" });

  res.status(200).json({ message: "Signup successful" });
});

module.exports = router;
