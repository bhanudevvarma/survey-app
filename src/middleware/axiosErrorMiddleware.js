import { setError } from '../redux/errorReducer';

const axiosErrorMiddleware = () => (next) => (action) => {
  if (action.payload instanceof Error && action.payload.isAxiosError) {
    next(setError(action.payload.message));
  } else {
    next(action);
  }
};

export default axiosErrorMiddleware;