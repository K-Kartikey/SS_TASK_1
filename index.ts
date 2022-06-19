import * as express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.json({ Name : 'KK',
  Contact : 9711566660,
  Email_Id : 'kk@gmail.com'
});
});

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})