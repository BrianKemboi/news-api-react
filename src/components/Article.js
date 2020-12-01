import React from 'react'


export const Article = ({article}) => {
    const imageStyle = {
        backgroundImage: `url(${article.urlToImage})`
    }
    let content = ''
    if (article.content) {
        content = article.content.substring(0,190)+'...'
    }
    return(
        <div className='card'>
            <div className='card-content'>
                <div className='card-image'
                style={imageStyle}>

                </div>
            <h1>
                {article.title}
            </h1>
            <div className='subtitle'>
            {article.description}
            </div>
            <p>
                {content}
            </p>

            <div class="card-details">
              <div class="card-details-inner">
                <div class="read-more">
                  <a class="button" href={article.url}>Read Article</a>
                </div>
              </div>
            </div>

            </div>
        </div>
    )
}