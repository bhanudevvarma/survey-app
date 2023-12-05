import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSurveys, setSelectedSurvey } from '../redux/surveyReducers';
import { setError, clearError} from '../redux/errorReducer';
import useErrorHandling from '../customH/useErrorHandling';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom'; 


const Survey = () => {
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const surveys = useSelector((state) => state.survey.surveys);
  const selectedSurvey = useSelector((state) => state.survey.selectedSurvey);
  console.log('bha selectedSurvey:',selectedSurvey);
  const navigate = useNavigate();
  const { errorMessage, clearErrorMessage } = useErrorHandling();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/surveys/all');
        dispatch(setSurveys(response.data));

      } catch (error) {
        dispatch(setError(error))
      }
    };

    fetchSurveys();
  }, [dispatch]);

  const handleSelectSurvey = async (survey) => {
    try {
      dispatch(setSelectedSurvey(survey));
      navigate(`/surveys/${survey.id}/questions`);
    } catch (error) {
      console.log('my error')
      dispatch(setError(error.message));
      navigate('/error');
    }
  };

  // if (!isAuthenticated) {
  //   return <div>Please log in to view this page.</div>;
  // }

  return (
    <div>
      <h2>Survey List</h2>
      <div>
        <ul style={{ width: 'max-content', listStyleType: 'none' }}>
          {surveys && surveys.map((survey) => (
            <li key={survey.id} onClick={() => handleSelectSurvey(survey)} style={{ boxShadow: 'rgba(0.1, 0.1, 0.1, 0.1) 4px 4px 4px 4px', cursor: 'pointer', color: 'blue', padding: '5px', paddingTop: '10px', margin: '15px' }}>
              {survey.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Survey;
