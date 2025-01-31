const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

// Start server (Response is on the command line using nodemon)
app.listen(PORT, () => console.log('Server running on port 3000'));

app.get('/', (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;
  let response = 'AQ Alert root route is working';
  res.send(response);
});

// app.post('/ussd', (req, res) => {
//     const { sessionId, phoneNumber, text } = req.body;
//     let response = 'ussd route is working';
//   // Process USSD input and generate response
//     res.send(response);
// });




