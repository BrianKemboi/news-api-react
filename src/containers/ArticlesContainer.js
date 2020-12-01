import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Article } from '../components/Article'
import { topHeadlinesSelector } from '../selectors'
import { fetchTopHeadlines} from '../slices/topHeadlines'

const ArticlesContainer = () => {
    const dispatch = useDispatch()
    const { status, topHeadlines, loading, hasErrors } = useSelector(topHeadlinesSelector)

    // Test Query
    // {country, category, query}

    useEffect(
        () => {dispatch(fetchTopHeadlines())},
        [ dispatch]
    )

    const renderArticles = () => {
        if(loading) {
            return <p>Loading ...</p>
        }
        if (hasErrors) {
            return (
                <div>
                    <p>
                        Some errors occured
                    </p>
                    <div>
                        {status.code}
                    </div>
                    <div>
                        {status.message}
                    </div>
                </div>
            )
        }

        return topHeadlines.map(
            (article) => 
                <div className='container'>
                    <div className='flex-container'>
                    <Article article = { article }/>
                    </div>
                </div>
            
        )

    }

    return (
        <section>
            <h2>Top Headlines</h2>
            { renderArticles() }
        </section>
    )
}

export default ArticlesContainer