const express = require('express');
const notes = require('./routes/rs_notes');
const screenshot = require('./routes/rs_screenshot');
const app = express();
const router = express.Router();

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/', (req, res) => {
  res.send({});
});

app.use('/api', router);
app.use('/api/notes', notes);
app.use('/api/screenshot', screenshot);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// const express = require('express');
// const notes = require('./routes/rs_notes');
// const app = express();

// const router = express.Router();

// router.use((req, res, next) => {
//   console.log((req.method, req.url));
//   next;
// });

// router.get('/', (req, res) => {
//   res.send('Home');
// });

// app.use('/api', router);
// app.use('/api/notes', notes);

// module.exports = app;

// const PORT = process.env.PORT || 9001;

// app.listen(PORT, () => {
//   console.log(`App listing on port ${PORT}`);
// });
