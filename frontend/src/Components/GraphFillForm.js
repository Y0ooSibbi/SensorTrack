  // GraphFillForm.js
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import './GraphFillForm.css';
import Navbar from './Navbar';

  const GraphFillForm = () => {

    const [newGraphName, setNewGraphName] = useState("");
    const [newGraphDescription, setNewGraphDescription] = useState("");
    const [formData, setFormData] = useState({
      id: "662232a85f44c5f1da23ba5e",
      userId: "6074fb3275a63e1cc8a8e2ef",
      name: newGraphName,
      description: newGraphDescription,
      date: "", // New state for the date
      options: {
        colors: ["#E91E63", "#FF9800"],
        chart: { id: "basic-bar" },
        xaxis: {
          categories: ["Category 1", "Category 2", "Category 3"]
        }
      },
      series: []
    });

    const [newSeriesName, setNewSeriesName] = useState("");
    const [newDataPoint, setNewDataPoint] = useState(""); // New state for data point input
    const [selectedSeriesIndex, setSelectedSeriesIndex] = useState(null);

    const handleNewSeriesNameChange = (event) => {
      setNewSeriesName(event.target.value);
    };

    const handleNewGraphNameChange = (event) => {
      setNewGraphName(event.target.value);
      console.log(newGraphName);
      setFormData({ ...formData, description: event.target.value });
    };

    const handleNewGraphDescriptionChange = (event) => {
      setNewGraphDescription(event.target.value);
      setFormData({ ...formData, name: event.target.value });
    };

    const handleNewDataPointChange = (event) => { // Handler for new data point input
      setNewDataPoint(event.target.value);
    };

    const handleAddSeries = () => {
      if (newSeriesName.trim() !== "") {
        setFormData({
          ...formData,
          series: [...formData.series, { 
            name: newSeriesName, 
            data: Array(24).fill(parseInt(newDataPoint)) // Add new data point to the series
          }]
        });
        setNewSeriesName("");
        setNewDataPoint(""); // Clear the new data point input field
      }
    };

    const handleSelectSeries = (event) => {
      setSelectedSeriesIndex(parseInt(event.target.value));
    };

    const handleInputChange = (index, value) => {
      if (selectedSeriesIndex !== null) {
        const newSeries = [...formData.series];
        newSeries[selectedSeriesIndex].data[index] = value;
        setFormData({ ...formData, series: newSeries });
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log(newGraphDescription)
        console.log(newGraphName)
        setFormData({ ...formData });
        // console.log(formData);
        const response = await axios.post(`http://localhost:3001/api/insertGraphData/${formData.userId}`, formData);
        console.log('Data saved successfully:', response.data);
        toast.success('Data saved successfully'); // Display success notification
      } catch (error) {
        console.error('Error saving data:', error);

      }
      console.log(formData);
    };

    useEffect(()=>{
      console.log(formData);
      


    },[formData])

    const handleDateChange = (event) => { // Handler for date input change
      setFormData({ ...formData, date: event.target.value });
    };

    return (
      <>
          <Navbar/>

      
      <div className="graph-fill-form-container">
        <ToastContainer />
        <h2 className="graph-fill-form-heading">Enter Data for Each Hour</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="graph-name">Graph Name:</label>
            <input
              type="text"
              id="graph-name"
              className='graph-input-field'
              value={newGraphName}
              onChange={handleNewGraphNameChange}
              placeholder="Enter graph name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="graph-description">Graph Description:</label>
            <input
              type="text"
              id="graph-description"
              value={newGraphDescription}
              onChange={handleNewGraphDescriptionChange}
              placeholder="Enter graph description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label> {/* Date input field */}
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-series-name">New Series Name:</label>
            <input
              type="text"
              id="new-series-name"
              value={newSeriesName}
              onChange={handleNewSeriesNameChange}
              placeholder="Enter new series name"
            />          
            <button className='btn btn-primary grediant-button' style={{marginLeft:10}} type="button" onClick={handleAddSeries}>Add Series</button>
          </div>
          <div className="form-group">
          <label for="formFile" class="form-label">Proof Of Data</label>
           <input class="form-control" type="file" id="formFile"/>
          </div>
          <div className="form-group">
            <label htmlFor="select-series">Select Series:</label>
            <select id="select-series" className='gradiant-button' onChange={handleSelectSeries}>
              <option value="">Select Series</option>
              {formData.series.map((serie, index) => (
                <option key={index} value={index}>
                  {serie.name}
                </option>
              ))}
            </select>
          </div>
          {/* Hourly input container remains the same */}
          {selectedSeriesIndex !== null && (
            <div className="hourly-input-container">
              {formData.series[selectedSeriesIndex].data.map((dataPoint, index) => (
                <div key={index} className="form-group">
                  <label htmlFor={`hour-${index}`}>{`${index}:00`}</label>
                  <input
                    type="number"
                    id={`hour-${index}`}
                    value={dataPoint}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}
          <button className='grediant-button' type="submit">Submit</button>
        </form>
      </div>
      </>
    );
  };

  export default GraphFillForm;
