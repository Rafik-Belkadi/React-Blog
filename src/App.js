import React from 'react';
import './App.css';
import Articles from './components/ArticleSection/Articles';
import Layout from './components/layouts';
import { useState, useEffect } from 'react'
import { ArticlesContext, UserContext } from './contexts'
import axios from 'axios'
//  Importer Switch et Router
import { Switch,Route } from 'react-router-dom'
import ArticlesDetails from './components/ArticleDetailsSection';
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
            {/* On entoure le contenu ou les composant qu'on veut changer par un composant Switch */}
            {/* Switch agit comme un switch case; Les conditions sont faite par le composant Route */}
            <Switch>
              {/* pour chaque Route, on utilise la prop path="" pour afficher un composant pour un certain chemin  */}
              <Route exact path="/">
                <Articles />
              </Route>
              
              <Route path="/:id">
                <ArticlesDetails />
              </Route>


            </Switch>
          </Layout>
        </UserContext.Provider>
      </ArticlesContext.Provider>

    </div>
  );
}

export default App;
