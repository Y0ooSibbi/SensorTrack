// Import required modules
const mongoose = require('mongoose');
const { Graph } = require('./models'); // Import the Graph model

// Connect to MongoDB
mongoose.connect('mongodb+srv://yorsibbu:12345678910@cluster0.wrycp28.mongodb.net/sensor-track', { useNewUrlParser: true, useUnifiedTopology: true });

// Function to generate random data for temperature and humidity
const generateRandomData = (userId) => {
    const options = {
        colors: ["#E91E63", "#FF9800"],
        chart: { id: "basic-bar" },
        xaxis: {
            categories: generateHourlyTimestamps()
        }
    };

    const series = [
        {
            name: "Temperature",
            data: generateRandomNumbers(24, 0, 100) // Generate 24 random numbers between 0 and 100 for temperature
        },
        {
            name: "Humidity",
            data: generateRandomNumbers(24, 0, 100) // Generate 24 random numbers between 0 and 100 for humidity
        }
    ];

    return {
        userId,
        name: "Random Graph", // Add a default name for the graph
        summary: "Random data for temperature and humidity", // Add a default summary for the graph
        options,
        series
    };
};

// Function to generate hourly timestamps
const generateHourlyTimestamps = () => {
    const timestamps = [];
    for (let i = 0; i < 24; i++) {
        timestamps.push(`${i < 10 ? '0' + i : i}:00`);
    }
    return timestamps;
};

// Function to generate random numbers
const generateRandomNumbers = (count, min, max) => {
    const numbers = [];
    for (let i = 0; i < count; i++) {
        const randomNumber = (Math.random() * (max - min) + min).toFixed(2); // Round to two decimal places
        numbers.push(parseFloat(randomNumber)); // Parse as float and push to array
    }
    return numbers;
};

// Insert random graph data into MongoDB
const insertRandomGraphData = async () => {
    try {
        // Generate random graph data with userId
        const userId = "6074fb3275a63e1cc8a8e2ef"; // Example userId
        const randomData = generateRandomData(userId);

        // Create a new graph document
        const graph = new Graph(randomData);

        // Save the graph document to the database
        await graph.save();
        console.log('Random graph data added successfully!');
    } catch (error) {
        console.error('Error adding random graph data:', error);
    }
};

// Call the function to insert random graph data
insertRandomGraphData();
