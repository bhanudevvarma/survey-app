import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../redux/errorReducer';

const useErrorHandling = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.error.message);

  const clearErrorMessage = () => {
    dispatch(clearError());
  };

  return { errorMessage, clearErrorMessage };
};

export default useErrorHandling;