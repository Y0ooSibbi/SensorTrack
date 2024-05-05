import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartModel from "./ChartModel";
import "./GraphListPage.css"; // Import CSS file

function GraphListPage() {
  const [graphs, setGraphs] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState(null);

  useEffect(() => {
    const fetchGraphs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/graphs/6074fb3275a63e1cc8a8e2ef");
        setGraphs(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching graphs:", error);
      }
    };

    fetchGraphs();
  }, []);

  const handleGraphClick = (graph) => {
    console.log(graph);
    setSelectedGraph(graph);
  };

  const handleBackButtonClick = () => {
    setSelectedGraph(null); // Set selectedGraph to null to go back to table view
  };

  return (
    <div className="graph-list-container">
      {selectedGraph ? (
        <div>
          <ChartModel graphData={selectedGraph} />
          <button  className="back-to-table" onClick={handleBackButtonClick}>Go to Table</button>
        </div>
      ) : (
        <table className="graph-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Graph Name</th>
              <th>Graph description</th>
              <th>View Graph</th>
            </tr>
          </thead>
          <tbody>
            {graphs.map((graph, index) => (
              <tr key={graph._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{index + 1}</td>
                <td>{graph.name}</td>
                <td>{graph.description}</td>
                <td><button onClick={() => handleGraphClick(graph)}>View Graph</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GraphListPage;
