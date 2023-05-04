import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';

type DispatchFunc = () => AppDispatch;
export const useTypedDispatch: DispatchFunc = useDispatch;
