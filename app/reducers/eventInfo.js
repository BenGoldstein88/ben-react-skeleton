const eventInfo = (state = { 
    isFetching: false,
    didInvalidate: false,
  	priceTiers: []
  	}, action) => {
  switch (action.type) {
    case 'REQUEST_EVENT_INFO':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case 'RECEIVE_EVENT_INFO':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        id: action.id,
        name: action.name,
      })    	
    default:
      return state
  }
}

export default eventInfo;