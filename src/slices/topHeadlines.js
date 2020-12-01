import { createSlice } from "@reduxjs/toolkit"
import BuildUrl from "build-url"
import { Categories } from "../helpers/categories"
import { Country } from "../helpers/countries"
import { apiKey } from '../helpers/apiKey'

const initialState = {
    topHeadlines:[],
    status:{},
    loading: false,
    hasErrors: false
}

const topHeadlinesSlice = createSlice(
    {
        name: 'topHeadlines',
        initialState,
        reducers: {
            getHeadlines: (state) => {
                state.loading = true
            },

            getHeadlinesSuccess: (state, { payload }) => {
                state.topHeadlines = payload.articles
                state.loading = false
                state.hasErrors = false
                state.status = {
                    status: payload.status,
                    totalResults: payload.totalResults
                }
            },

            getHeadlinesFailure: (state, { payload }) => {
                state.loading = false
                state.hasErrors = true
                state.status = payload
            }
        }
    }
)

// Actions
export const { getHeadlines, getHeadlinesSuccess, getHeadlinesFailure } = topHeadlinesSlice.actions

// The reducer
export default topHeadlinesSlice.reducer

// Thunk
export const fetchTopHeadlines = () => {
    return async ( dispatch ) => {
        dispatch(getHeadlines())

        const baseUrl = 'https://newsapi.org/v2/top-headlines'
        const url = BuildUrl(
            baseUrl,
            {
                queryParams: {
                    country: Country.UNITED_STATES,
                    category: Categories.ENTERTAINMENT
                }
            }
        )
        console.log(url)
        try {
            const response = await fetch(
                url,
                {
                    headers: {
                        'X-Api-Key': `${apiKey}`
                    }
                }
                )
            
            const responseStatus = response.status
            const data = await response.json()

            if (responseStatus === 200)
            {
                dispatch(getHeadlinesSuccess(data))
            }else
            {
                dispatch(getHeadlinesFailure(data))
            }
        }
        catch(error){
            console.log(error)
            dispatch(getHeadlinesFailure(
                {
                    status: 'error',
                    code: '',
                    message: 'Unknown error'
                }
            ))
        }
    }
}