// User schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the function first
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

const userSchema = new Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role:{ type: String, default:"user"}
});

const User = mongoose.model('User', userSchema);

// Graph schema

const graphSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, default: "Random Graph" }, // Add 'name' field with default value
    description: { type: String, default: "Random data for temperature and humidity" }, // Add 'description' field with default value
    date:{type:String},
    options: {
        colors: { type: [String], default: ["#E91E63", "#FF9800"] },
        chart: { id: { type: String, default: "basic-bar" } },
        xaxis: {
            categories: { type: [String], default: generateCategories() } // Use the generateCategories function
        }
    },
    series: [
        {
            name: { type: String, required: true },
            data: { type: [Number], default: [] }
        }
    ]
});


// Example usage
// const categories = generateCategories();
// console.log(categories); // Output: ["00:00", "01:00", ..., "23:00"]

const Graph = mongoose.model('Graph', graphSchema);

module.exports = { User, Graph };   
