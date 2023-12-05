import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Survey from './components/Survey';
import QuestionsComponent from './components/QuestionsComponent';
import SuccessPage from './components/SuccessPage'
import SurveyResults from './components/SurveyResults';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from './components/ErrorFallBack';
import { clearError } from './redux/errorReducer';
import GoogleLoginButton from './components/GoogleLoginButton'

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = true; 
  const { surveyId } = useParams();
  if (isAuthenticated) {
    console.log('in private route surveyId:',surveyId)
    return children({ surveyId });
  } else {
    return <Navigate to="/login" />;
  }
};

const App = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const globalError = useSelector((state) => state.error.errormessage);
  const dispatch = useDispatch();

  const handleErrorReset = () => {
    dispatch(clearError());
  };

  return (
    // <ErrorBoundary
    // // onError={() => console.log("Error happened!")}
    // FallbackComponent= {ErrorFallBack}
    // >
    // <ErrorBoundary
    //   onError={() => console.log('Error happened!')}
    //   FallbackComponent={({ error }) => (
    //     <div>
    //       <p>{error.message}</p>
    //       <button onClick={handleErrorReset}>Dismiss</button>
    //     </div>
    //   )}
    //   onReset={handleErrorReset}
    // >
    <Router>
      <div>
        <nav>
          <ul style={{  listStyle: 'none', display : 'flex'}}>
            <li style={{padding: '10px'}}><a href="/register">Register</a></li>
            <li style={{padding: '10px'}}><a href="/login">Login</a></li>
            <li style={{padding: '10px'}}><Link to="/survey">Survey</Link></li>
            {isAuthenticated && <li><Link to="/survey">Survey</Link></li>}
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Survey" element={<Survey></Survey>}></Route>
          <Route
          path="/error"
          element={<ErrorFallBack error={globalError} />}
        />
          {/* <PrivateRoute path="/survey" element={<Survey />} /> */}
          <Route
          path="/survey"
          element={
            <PrivateRoute>
              <Survey />
            </PrivateRoute>
          }
        />
        <Route
            path="/surveys/:surveyId/questions"
            element={
              <PrivateRoute>
                {({ surveyId }) => <QuestionsComponent surveyId={surveyId} />}
              </PrivateRoute>
            }
          />

        <Route path="/surveys/SuccessPage" element={<SuccessPage></SuccessPage>}></Route>
        <Route path="/surveys/survey-result" element={<SurveyResults></SurveyResults>}></Route>
        
        </Routes>
      </div>
    </Router>
    // </ErrorBoundary>
  );
};

export default App;

// const App = () => {
//   const handleGoogleLoginSuccess = (response) => {
//     // Implement logic for successful Google login
//     console.log('response i app:', response)

//   };

//   const handleGoogleLoginFailure = (error) => {
//     console.log('error i app:', error)
//     // Implement logic for failed Google login
//   };

//   return (
//     <div>
//       <h1>Your React App</h1>
//       <GoogleLoginButton onSuccess={handleGoogleLoginSuccess} onFailure={handleGoogleLoginFailure} />
//     </div>
//   );
// };

// export default App;

// import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';

// function App() {
//     const responseMessage = (response) => {
//         console.log(response);
//     };
//     const errorMessage = (error) => {
//         console.log(error);
//     };
//     return (
//         <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
//         </div>
//     )
// }
// export default App;