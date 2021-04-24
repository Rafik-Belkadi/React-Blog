import ArticleCard from './ArticleComponents/ArticleCard'
import './index.css'
import { useContext } from 'react'
import { ArticlesContext } from '../../contexts'

const Articles = (params) => {
    const { articles } = useContext(ArticlesContext)
    return <div className="articles-wrapper">
        {
           articles && articles.map((el,index) => <ArticleCard key={index} article={el} />) 
        }

    </div>
}

export default Articles