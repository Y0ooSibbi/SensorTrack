const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Graph, User } = require('./mongo/models');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const port = 3001;
app.use(cors());

// Connect to MongoDB 
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define route to get graph data for a specific user
app.get('/api/graphs/:userId', async (req, res) => {
  try {
    console.log(req.params);
    const userId = req.params.userId;
    console.log(userId);
    console.log(userId);
    // Query MongoDB to find graphs for the given user ID
    const graphs = await Graph.find({ userId: userId });
    // console.log(graphs);
    res.json(graphs);
  } catch (error) {
    console.error('Error fetching graph data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/randomGraphData/:userId', async (req, res) => {
  try {
      // Extract userId from request parameterss
      console.log(req.params);
      const { userId } = req.params;
      console.log(userId);

      // Fetch random graph data from MongoDB based on userId
      const randomGraphData = await Graph.find({ userId :userId});
      res.json(randomGraphData);
      if (!randomGraphData) {
          return res.status(404).json({ error: 'Graph data not found for this user' });
      }

      res.json(randomGraphData);
  } catch (error) {
      console.error('Error fetching random graph data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/register', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword,userId:'random' });
  await user.save();
  res.json({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  console.log(req.body);
  const {username,password,userType} = req.body;
  const user = await User.findOne({ username ,userType});
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  const token = jwt.sign({ username: user.username }, 'secret_key');
  res.json({ token , userId:user.userId,username:user.username});
});

// Define route to insert graph data
app.post('/api/insertGraphData/:userId', async (req, res) => {
  try {
    // Extract userId from request parameters
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    // Extract graph data from request body
    const { name, description,date, options, series } = req.body;
    console.log(date);

    // Create a new graph object
    const graph = new Graph({
      userId: new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId
      name,
      description,
      date:date,
      options,
      series
    });
    console.log(graph);

    // Save the graph data to MongoDB
    await graph.save();

    // Send response indicating successful insertion
    res.status(200).json({ message: 'Graph data inserted successfully' });
  } catch (error) {
    console.error('Error inserting graph data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
