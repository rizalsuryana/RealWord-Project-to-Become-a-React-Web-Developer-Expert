/**
* test scenario for talksReducer
*
* - talkReducers function
*  - should return the initial state when given by unknown action
*  - should return the talks when given by RECEIVE_TALKS action
*  - should return the talks with the new talk when given by ADD_TALK action
*  - should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action
*
*/

import { describe, it } from 'vitest';
import talksReducer from './reducer';

describe('talkReducer function', () => {
  it('should return the initial state when give by unkown action', () => {

  });
});