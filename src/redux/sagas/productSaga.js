import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_PRODUCTS_REQUEST,
  fetchProductsSuccess,
  fetchProductsFailure,
} from '../actions/productActions';

function* fetchProductsWorker() {
  try {
    const response = yield call(() =>
      fetch('https://fakestoreapi.com/products').then(res => res.json())
    );
    yield put(fetchProductsSuccess(response));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export default function* productSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsWorker);
}
