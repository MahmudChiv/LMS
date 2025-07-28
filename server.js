const express = require('express');
const app = express();
const signupRouter = require('./routes/signup');


app.use(express.json());
app.use("/api/signup", signupRouter);


app.listen(3000, () => console.log('Server running on port http://localhost:3000'));
