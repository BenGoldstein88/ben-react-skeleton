import 'whatwg-fetch';

import {
  SET_CURRENT_TICKET_TIER,
  REQUEST_EVENT_INFO,
  RECEIVE_EVENT_INFO,
} from './types';

const baseApiUrl = __API_URL__;

export const setCurrentTicketTier = (currentTicketTier) => {
	return {
		type: SET_CURRENT_TICKET_TIER,
		currentTicketTier
	}
}

const requestEventInfo = (eventName) => {
  return {
    type: REQUEST_EVENT_INFO,
    eventName
  }
}

const receiveEventInfo = (eventName, json) => {
  return {
    type: RECEIVE_EVENT_INFO,
    eventName,
    id: json.event.id,
    name: json.event.name,
    receivedAt: Date.now()
  }
}

const fetchEventInfo = (eventName) => {
  return dispatch => {
    dispatch(requestEventInfo(eventName))
    return fetch(`${baseApiUrl}/events/${eventName}`)
      .then(response => response.json())
      .then(json => dispatch(receiveEventInfo(eventName, json)))
  }
}

const shouldFetchEventInfo = (state, eventName) => {
  const eventInfo = state.eventInfo.priceTiers;
  if (eventInfo.length < 1) {
    return true
  } else if (eventInfo.isFetching) {
    return false
  } else {
    return eventInfo.didInvalidate
  }
}

export const fetchEventInfoIfNeeded = (eventName) => {
  return (dispatch, getState) => {
    if (shouldFetchEventInfo(getState(), eventName)) {
      return dispatch(fetchEventInfo(eventName))
    }
  }
}