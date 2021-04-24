import React from 'react';
import './App.css';
import Articles from './components/ArticleSection/Articles';
import Layout from './components/layouts';
import { useState, useEffect } from 'react'
import { ArticlesContext, UserContext } from './contexts'
import axios from 'axios'
function App() {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = React.useState(null)
  useEffect(() => {
    axios.get('http://localhost:3001/articles').then(res => {
      console.log(res.data)
      setArticles(res.data)
    })
  }, [])
  return (
    <div className="app">
      <ArticlesContext.Provider value={{ articles, setArticles }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Layout>
            <Articles />
          </Layout>
        </UserContext.Provider>
      </ArticlesContext.Provider>

    </div>
  );
}

export default App;
