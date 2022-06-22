const express = require('express');

const app = express();


app.get('/', (req, res) => {
  res.json({
    Name : 'KK',
    Contact : 9711566660,
    Email_Id : 'kk@gmail.com'
});
});

app.listen(3000, () => {
  console.log(`[server]: Server is running at https://localhost:3000}`);
});