import { combineReducers } from 'redux'
import topHeadlinesReducer from './topHeadlines'

const rootReducer = combineReducers(
    {
        topHeadlines: topHeadlinesReducer
    }
)

export default rootReducer