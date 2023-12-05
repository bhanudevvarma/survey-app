// SurveyResults.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyResults = () => {
  const [surveyResults, setSurveyResults] = useState([]);

  useEffect(() => {
    const fetchSurveyResults = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/surveys/user/1/answers');
        setSurveyResults(response.data);
      } catch (error) {
        console.error('Failed to fetch survey results:', error);
      }
    };

    fetchSurveyResults();
  }, []);

  return (
    <div>
      <h2 style={{color:'dimgray'}}>Survey Results</h2>
      <ul>
        {surveyResults.map((result) => (
          <li key={result.id}>
            <p>{result.question.text}</p>
            {/* <p>User: {result.user.username}</p> */}
            <p style={{color:'dimgray'}}>Selected Option: {result.selectedOption.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyResults;
