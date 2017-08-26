import { call, put } from 'redux-saga/effects';
import { SearchResults } from '../types';
import {
  SearchRequest,
  SearchFailure,
  searchFailure,
  searchSuccess,
  SearchSuccess
} from '../actions/search';
import {
  FetchTOpticonRequest,
  fetchTOpticonRequest
} from '../actions/turkopticon';
import { batchFetchHits } from '../utils/fetchHits';
import { generateSearchToast } from '../utils/toastr';

export function* fetchSearch(action: SearchRequest) {
  try {
    const hitData: SearchResults = yield call(batchFetchHits, action.options);

    const empty = hitData.isEmpty();
    generateSearchToast(!empty);
    empty
      ? yield put<SearchFailure>(searchFailure())
      : yield put<SearchSuccess>(searchSuccess(hitData));

    if (!empty) {
      yield put<FetchTOpticonRequest>(fetchTOpticonRequest(hitData));
    }
  } catch (e) {
    yield put<SearchFailure>(searchFailure());
  }
}