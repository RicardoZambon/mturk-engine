import { WatcherTimerMap, WatcherTimer } from '../types';
import { SetWatcherTimer, CancelWatcherTick } from '../actions/watcher';
import { SET_WATCHER_TIMER, CANCEL_NEXT_WATCHER_TICK } from '../constants';
import { Map } from 'immutable';
import { calculateTimeFromDelay } from '../utils/dates';

const initial: WatcherTimerMap = Map<string, WatcherTimer>();

type WatcherTimerAction = CancelWatcherTick | SetWatcherTimer;

export default (state = initial, action: WatcherTimerAction) => {
  switch (action.type) {
    case SET_WATCHER_TIMER:
      return state.set(action.id, {
        date: calculateTimeFromDelay(action.delayInSeconds),
        origin: action.origin
      });
    case CANCEL_NEXT_WATCHER_TICK:
      return state.delete(action.groupId);
    default:
      return state;
  }
};
