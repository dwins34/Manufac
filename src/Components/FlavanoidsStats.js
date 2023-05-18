import React from "react";
import wineData from "../Wine-Data.json";

// Utility function to calculate the mean for a specific class
const calculateMean = (data, alcoholClass) => {
  const filteredData = data.filter((item) => item.Alcohol === alcoholClass);
  const sum = filteredData.reduce((acc, item) => acc + item.Flavanoids, 0);
  return (sum / filteredData.length).toFixed(3);
};

// Utility function to calculate the median for a specific class
const calculateMedian = (data, alcoholClass) => {
  const filteredData = data.filter((item) => item.Alcohol === alcoholClass);
  const sortedData = filteredData.sort((a, b) => a.Flavanoids - b.Flavanoids);
  const middleIndex = Math.floor(sortedData.length / 2);
  if (sortedData.length % 2 === 0) {
    return (
      (sortedData[middleIndex - 1].Flavanoids +
        sortedData[middleIndex].Flavanoids) /
      2
    ).toFixed(3);
  } else {
    return sortedData[middleIndex].Flavanoids.toFixed(3);
  }
};

// Utility function to calculate the mode for a specific class
const calculateMode = (data, alcoholClass) => {
  const filteredData = data.filter((item) => item.Alcohol === alcoholClass);
  const countMap = {};
  let maxCount = 0;
  let mode = null;

  filteredData.forEach((item) => {
    const count = (countMap[item.Flavanoids] || 0) + 1;
    countMap[item.Flavanoids] = count;
    if (count > maxCount) {
      maxCount = count;
      mode = item.Flavanoids;
    }
  });

  return mode.toFixed(3);
};

function FlavanoidsStats() {
  // Get unique classes of alcohol from the wineData
  const classes = Array.from(new Set(wineData.map((item) => item.Alcohol)));

  // Render the statistics in a tabular format
  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {classes.map((alcoholClass) => (
            <th key={alcoholClass}>Class {alcoholClass}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Flavanoids Mean</td>
          {classes.map((alcoholClass) => (
            <td key={alcoholClass}>{calculateMean(wineData, alcoholClass)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          {classes.map((alcoholClass) => (
            <td key={alcoholClass}>
              {calculateMedian(wineData, alcoholClass)}
            </td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Mode</td>
          {classes.map((alcoholClass) => (
            <td key={alcoholClass}>{calculateMode(wineData, alcoholClass)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default FlavanoidsStats;
