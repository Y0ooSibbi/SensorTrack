
const mongoose = require('mongoose');
const { User, Graph,generateCategories,generateRandomData } = require('./models'); // Import the user and graph models

// Connect to MongoDB
mongoose.connect('mongodb+srv://yorsibbu:12345678910@cluster0.wrycp28.mongodb.net/sensor-track_duplicate', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Initialize test data
        initializeTestData();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Function to generate random graph data
const generateRandomGraphData = async () => {
    // Generate random options and series data
    const sensors = ['Temperature', 'Humidity', 'Pressure', 'Voltage', 'Current', 'Speed', 'Flow', 'Level', 'Frequency', 'Power'];
    const graphData = sensors.map((sensor) => {
        return {
            options: {
                colors: ['#E91E63', '#FF9800'],
                chart: { id: 'basic-bar' },
                xaxis: { categories: generateCategories() } // Use the generateCategories function
            },
            series: [
                { name: sensor, data: generateRandomData() } // Assuming you have a function to generate random data
            ]
        };
    });

    return graphData;
};

// Function to generate categories for x-axis
const generateCategories = () => {
    const categories = [];
    const startDate = new Date(); // Get current date and time
    startDate.setHours(0, 0, 0, 0); // Set time to midnight
    
    // Loop to add hourly intervals to categories array
    for (let i = 0; i < 24; i++) {
        const hour = startDate.getHours() + i;
        const timeString = `${hour < 10 ? '0' + hour : hour}:00`; // Format hour as HH:00
        categories.push(timeString);
    }
    
    return categories;
};

// Function to create test users
const createTestUsers = async () => {
    try {
        // Create test users
        const testUsers = [
            { username: 'admin1', password: 'admin1password', role: 'admin' },
            { username: 'admin2', password: 'admin2password', role: 'admin' },
            { username: 'user1', password: 'user1password', role: 'user' },
            { username: 'user2', password: 'user2password', role: 'user' },
            { username: 'user3', password: 'user3password', role: 'user' }
        ];
        // Insert test users into the database
        await User.insertMany(testUsers);
        console.log('Test users created successfully');
    } catch (error) {
        console.error('Error creating test users:', error);
    }
};

// Function to add random graph data for a user
const addRandomGraphForUser = async (userId) => {
    try {
        // Generate random graph data
        const graphData = await generateRandomGraphData();
        // Create a new graph document
        const graph = new Graph({ userId: userId, graphData });
        // Save the graph document to the database
        await graph.save();
        console.log('Random graph data added for user:', userId);
    } catch (error) {
        console.error('Error adding random graph data:', error);
    }
};

// Main function to create test users and add random graph data
const initializeTestData = async () => {
    // Create test users
    await createTestUsers();
    // Get all users
    const users = await User.find();
    // Add random graph data for each user
    users.forEach(async (user) => {
        await addRandomGraphForUser(user._id);
    });
};


initializeTestData();

// Function to generate random graph data
// const generateRandomGraphData = () => {
//     // Generate random options and series data
//     const options = {
//       colors: ['#E91E63', '#FF9800'],
//       chart: { id: 'basic-bar' },
//       xaxis: { categories: ['Category 1', 'Category 2', 'Category 3'] }
//     };
//     const series = [
//       { name: 'Temperature', data: [Math.random() * 100, Math.random() * 100, Math.random() * 100] },
//       { name: 'Humidity', data: [Math.random() * 100, Math.random() * 100, Math.random() * 100] }
//     ];
  
//     return { options, series };
//   };
  
  // Function to create test users
//   const createTestUsers = async () => {
//     try {
//       // Create test users
//       const testUsers = [
//         { username: 'admin1', password: 'admin1password', role: 'admin' },
//         { username: 'admin2', password: 'admin2password', role: 'admin' },
//         { username: 'user1', password: 'user1password', role: 'user' },
//         { username: 'user2', password: 'user2password', role: 'user' },
//         { username: 'user3', password: 'user3password', role: 'user' }
//       ];
//       // Insert test users into the database
//       await User.insertMany(testUsers);
//       console.log('Test users created successfully');
//     } catch (error) {
//       console.error('Error creating test users:', error);
//     }
//   };
  
//   // Function to add random graph data for a user
//   const addRandomGraphForUser = async (userId) => {
//     try {
//       // Generate random graph data
//       const graphData = generateRandomGraphData();
//       // Create a new graph document
//       const graph = new Graph({ user: userId, ...graphData });
//       // Save the graph document to the database
//       await graph.save();
//       console.log('Random graph data added for user:', userId);
//     } catch (error) {
//       console.error('Error adding random graph data:', error);
//     }
//   };
  
//   // Main function to create test users and add random graph data
//   const initializeTestData = async () => {
//     // Create test users
//     await createTestUsers();
//     // Get all users
//     const users = await User.find();
//     // Add random graph data for each user
//     users.forEach(async (user) => {
//       await addRandomGraphForUser(user._id);
//     });
//   };
  
//   const generateRandomGraphData1 =  async () => {
//     // Generate random options and series data for each sensor
//     const sensors = ['Temperature', 'Humidity', 'Pressure', 'Voltage', 'Current', 'Speed', 'Flow', 'Level', 'Frequency', 'Power'];
//     const graphData = sensors.map((sensor) => {
//       return {
//         options: {
//           colors: ['#E91E63', '#FF9800'],
//           chart: { id: 'basic-bar' },
//           xaxis: { categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7', 'Category 8', 'Category 9', 'Category 10'] }
//         },
//         series: [
//           { name: sensor, data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100] }
//         ]
//       };
//     });
//     console.log(graphData);
//     var i =0 ;
//     while(i<11){
//       saveRandomGraphData("6074fb3275a63e1cc8a8e2ef",graphData[i]);
//       i++;
//     }
//     return graphData;
//   };

//   const saveRandomGraphData = async (userId, graphData) => {
//     try {
//       const graph = new Graph({ userId, ...graphData });
//       await graph.save();
//       console.log('Random graph data saved to database');
//     } catch (error) {
//       console.error('Error saving random graph data:', error);
//     }
//   };
  

//   const generateGraphData = (userId) => {
//     // Generate random options and series data
//     const sensors = ['Temperature', 'Humidity', 'Pressure', 'Voltage', 'Current', 'Speed', 'Flow', 'Level', 'Frequency', 'Power'];
//     const graphData = sensors.map((sensor) => {
//         return {
//             userId: userId,
//             options: {
//                 colors: ['#E91E63', '#FF9800'],
//                 chart: { id: 'basic-bar' },
//                 xaxis: { categories: generateCategories() } // Use the generateCategories function
//             },
//             series: [
//                 { name: sensor, data: generateRandomData() } // Assuming you have a function to generate random data
//             ]
//         };
//     });

//     return graphData;
// };

  
//   // generateRandomGraphData1();

  
//   // Example usage: Initialize test data
//   // initializeTestData();


//   const generateCategories = () => {
//     const categories = [];
//     const startDate = new Date(); // Get current date and time
//     startDate.setHours(0, 0, 0, 0); // Set time to midnight
    
//     // Loop to add hourly intervals to categories array
//     for (let i = 0; i < 24; i++) {
//       const hour = startDate.getHours() + i;
//       const timeString = `${hour < 10 ? '0' + hour : hour}:00`; // Format hour as HH:00
//       categories.push(timeString);
//     }
    
//     return categories;
//   };
  
//   // Example usage
//   const categories = generateCategories();
//   console.log(categories); // Output: ["00:00", "01:00", ..., "23:00"]
  
  