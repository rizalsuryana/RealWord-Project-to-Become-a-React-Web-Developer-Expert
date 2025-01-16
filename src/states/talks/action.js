/**
 * @TODO: Define all the actions (creator) for the talks state
 */
import api from '../../utils/api';

const ActionType = {
  RECEIVE_TALKS: 'RECEIVE_TALKS',
  ADD_TALK: 'ADD_TALK',
  TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK',
};

const receiveTalksActionCreator = (talks) => {
  return {
    type: ActionType.RECEIVE_TALKS,
    payload: {
      talks,
    }
  };
};

const addTalkActionCreator = (talk) => {
  return {
    type: ActionType.ADD_TALK,
    payload: {
      talk,
    }
  };
};

const toggleLikeTalkActionCreator = ({ talkId, userId }) => {
  return {
    type: ActionType.TOGGLE_LIKE_TALK,
    payload: {
      talkId,
      userId,
    }
  };
};

const asyncAddTalk = ({ text, replyTo = '' }) => {
  return async (dispatch) => {
    try {
      const talk = await api.createTalk({ text, replyTo });
      dispatch(addTalkActionCreator(talk));
    } catch (error) {
      alert(error.message);
    }
  };
};

const asyncToggleLikeTalk = (talkId) => {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));

    try {
      await api.toggleLikeTalk(talkId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
    }
  };
};



export {
  ActionType,
  receiveTalksActionCreator,
  addTalkActionCreator,
  toggleLikeTalkActionCreator,
  asyncAddTalk,
  asyncToggleLikeTalk,
};