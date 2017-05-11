const currentTicketTier = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_TICKET_TIER':
      return action.currentTicketTier
    default:
      return state
  }
}

export default currentTicketTier