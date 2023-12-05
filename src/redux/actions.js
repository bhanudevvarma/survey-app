export const loadSurveys = (surveys) => ({
    type: 'LOAD_SURVEYS',
    payload: { surveys },
})

export const loadSurveyDetails = (surveyDetails) => ({
    type: 'LOAD_SURVEY_DETAILS',
    payload: { surveyDetails },
  });
  
  export const loadSurveyQuestions = (surveyQuestions) => ({
    type: 'LOAD_SURVEY_QUESTIONS',
    payload: { surveyQuestions },
  });
  
  export const submitSurvey = (surveyId, responses) => ({
    type: 'SUBMIT_SURVEY',
    payload: { surveyId, responses },
  });
