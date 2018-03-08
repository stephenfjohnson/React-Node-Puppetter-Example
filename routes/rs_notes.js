const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.json([
    {
      id: 1,
      title: 'First note',
      text: 'Sample text'
    },
    {
      id: 2,
      title: 'Second note',
      text: 'Sample text'
    }
  ]);
});

router.post('/', function(req, res) {
  res.send({
    code: 1
  });
});

module.exports = router;
