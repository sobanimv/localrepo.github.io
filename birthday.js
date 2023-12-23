const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment'); // For date and time formatting

const app = express();
app.use(bodyParser.json());

// 1) Calculate API
app.post('/calculate', (req, res) => {
  const { operand1, operand2, operator } = req.body;

  let result;
  switch (operator) {
    case 'add':
      result = parseFloat(operand1) + parseFloat(operand2);
      break;
    case 'subtract':
      result = parseFloat(operand1) - parseFloat(operand2);
      break;
    case 'multiply':
      result = parseFloat(operand1) * parseFloat(operand2);
      break;
    case 'divide':
      if (parseFloat(operand2) === 0) {
        res.status(400).json({ error: 'Cannot divide by zero' });
        return;
      }
      result = parseFloat(operand1) / parseFloat(operand2);
      break;
    default:
      res.status(400).json({ error: 'Invalid operator' });
      return;
  }

  res.json({ result });
});

// 2) Get Current Date and Time API
app.get('/getCurrentDateAndTime', (req, res) => {
  const now = moment();
  const formattedDateTime = now.format('D MMMM YYYY, h:mm A');
  res.json({ dateTime: formattedDateTime });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
