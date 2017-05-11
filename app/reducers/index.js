import { combineReducers } from 'redux';

import currentTicketTier from './currentTicketTier';
import eventInfo from './eventInfo';

const reactApp = combineReducers({
	currentTicketTier,
	eventInfo,
})

export default reactApp;

