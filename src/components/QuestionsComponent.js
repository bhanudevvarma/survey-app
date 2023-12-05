// QuestionsComponent.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../redux/errorReducer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';

const QuestionsComponent = ({ surveyId }) => {
  const [questions, setQuestions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({})
  const [questionCompletion, setQuestionCompletion] = useState({})
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchQuestions = async () => {
      if (surveyId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/surveys/${surveyId}/questions`)
          // console.log('questions response:',response)
          setQuestions(response.data)
          // console.log('questions:',questions)
        } catch (error) {
          console.error('Failed to fetch questions:', error)
          dispatch(setError(error.message))
        }
      }
    };
    
    fetchQuestions()
  }, [surveyId])

  useEffect(() => {
    initializeCompletionStatus(questions)
  }, [questions])

  const initializeCompletionStatus = (questions) => {
    const initialCompletionStatus = {}
    questions.forEach((question) => {
      initialCompletionStatus[question.id] = false;
    })
    setQuestionCompletion(initialCompletionStatus)
  };

  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = { ...prevSelectedOptions }

      if (!updatedOptions[questionId]) {
        updatedOptions[questionId] = []
      }

      if (updatedOptions[questionId].includes(optionId)) {
        updatedOptions[questionId] = []
      } else {
        updatedOptions[questionId] = [optionId]
      }
      updateCompletionStatus(questionId);
      return updatedOptions;
    });
  };

  const updateCompletionStatus = (questionId) => {
    setQuestionCompletion((prevCompletionStatus) => {
      const updatedCompletionStatus = { ...prevCompletionStatus };
      const selectedOptionCount = selectedOptions[questionId]?.length || 0;

      updatedCompletionStatus[questionId] = selectedOptionCount > 0;
      return updatedCompletionStatus;
    });
  };

  const isSubmitDisabled = Object.values(questionCompletion).every((completed) => completed);

  const handleSubmit = async () => {
    try {
    //  const response =  await axios.post('http://localhost:8080/submit-answer', {
    //   user_id : 1,
    //   question_answers : selectedOptions  
    //  })

     Navigate('/surveys/SuccessPage');
    } catch(error) {
      dispatch(setError(error.message));
    }
  };

  const optionsPresent = (values) => {
    if(values.length> 0) {
      return true;
    } else {
      return false;
    }
  }

  const chekForQuestion3 = (info) => {
    if(isNestedFrozen.questionId == 3) ? true : false;
  }

return (
  <div>
    <h2>Survey Questions</h2>
    <ul>
        <li style={{ listStyleType: 'decimal'}} key={question.id}>
          <p style={{ marginBottom: '7px' }}>{question.text}</p>
          <ul style={{ marginLeft: '-35px'}}>
            {optionsPresent(question.options) ? (
              question.options.map((option) => (
                <li style={{ listStyleType: 'none' }} key={option.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedOptions[question.id]?.includes(option.id)}
                      onChange={() => handleOptionChange(question.id, option.id)}
                    />
                    {option.text}
                  </label>
                </li>
              ))
            ) : (
              <input
                type="text"
                onChange={(e) => handleOptionChange(question.id, e.target.value)}
              />
            )}
          </ul>
        </li>
    </ul>
    <span style={{ position: 'absolute', right: '50px'}}>
      <button
        style={{ width: '100px', cursor: 'pointer', background: 'blue', color: 'white', fontSize: 'large', fontWeight: '800'}}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
    </span>
  </div>
);
};

export default QuestionsComponent;
