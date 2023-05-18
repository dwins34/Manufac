import React from "react";
import wineData from "../Wine-Data.json";

// Calculate Gamma for each data point
const calculateGamma = (data) => {
  return data.map((item) => {
    const gamma = (item.Ash * item.Hue) / item.Magnesium;
    return { ...item, Gamma: gamma };
  });
};

// Utility function to calculate the mean for a specific class
const calculateMean = (data, alcoholClass) => {
  const filteredData = data.filter((item) => item.Alcohol === alcoholClass);
  const sum = filteredData.reduce((acc, item) => acc + item.Gamma, 0);
  return (sum / filteredData.length).toFixed(3);
};

// Utility function to calculate the median for a specific class
const calculateMedian = (data, alcoholClass) => {
  const filteredData = data.filter((item) => item.Alcohol === alcoholClass);
  const sortedData = filteredData.sort((a, b) => a.Gamma - b.Gamma);
  const middleIndex = Math.floor(sortedData.length / 2);
  if (sortedData.length % 2 === 0) {
    return (
      (sortedData[middleIndex - 1].Gamma + sortedData[middleIndex].Gamma) /
      2
    ).toFixed(3);
  } else {
    return sortedData[middleIndex].Gamma.toFixed(3);
  }
};

// Utility function to calculate the mode for a specific class
const calculateMode = (data, alcoholClass) => {
  const filteredData = data.filter((item) => item.Alcohol === alcoholClass);
  const countMap = {};
  let maxCount = 0;
  let mode = null;

  filteredData.forEach((item) => {
    const count = (countMap[item.Gamma] || 0) + 1;
    countMap[item.Gamma] = count;
    if (count > maxCount) {
      maxCount = count;
      mode = item.Gamma;
    }
  });

  return mode.toFixed(3);
};

const GammaStats = () => {
  // Calculate Gamma for each data point
  const updatedwineData = calculateGamma(wineData);

  // Get unique classes of alcohol from the wineData
  const classes = Array.from(
    new Set(updatedwineData.map((item) => item.Alcohol))
  );

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
          <td>Gamma Mean</td>
          {classes.map((alcoholClass) => (
            <td key={alcoholClass}>
              {calculateMean(updatedwineData, alcoholClass)}
            </td>
          ))}
        </tr>
        <tr>
          <td>Gamma Median</td>
          {classes.map((alcoholClass) => (
            <td key={alcoholClass}>
              {calculateMedian(updatedwineData, alcoholClass)}
            </td>
          ))}
        </tr>
        <tr>
          <td>Gamma Mode</td>
          {classes.map((alcoholClass) => (
            <td key={alcoholClass}>
              {calculateMode(updatedwineData, alcoholClass)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default GammaStats;
