import './style.css'
// Importer useParams, qui est un hook qui me permet d'accéder aux paramètre d'un chemin ou d'une route
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core'


const ArticlesDetails = (params) => {
    // Destructurer le parametre du chemin ou de la route depuis le hook useParams() : {id: "labozzj"}
    const { id } = useParams()

    // Hook pour contenir mon article
    const [article, setArticle] = useState(null);
    const [err, setErr] = useState(false);

    useEffect(() => {
        // Requête pour fetcher l'article avec l'id recupéré depuis l'url
        axios.get(`http://localhost:3001/articles/${id}`).then(res => {
            if (res.data) {
                setArticle(res.data)
                setErr(false)
            } else {
                setErr(true)
            }

        }).catch(err => setErr(true))
    }, [])

    return <div className="article-details-wrapper">
        {

            // Si l'aritlce existe , j'affiche l'article , sinon j'affiche un Progress 
            article && !err ? <> <img src="https://cityexpresslivraison.com/wp-content/uploads/2020/05/Soummam-Yago-Banane-1L.jpg" height="500" width="500" />
                <h1>{article.titre}</h1>
                <p> {article.contenu} </p>
                <div className="meta">
                    <p>Date de publication : {article.createdAt}</p>
                    <p>Ecrit par : {article.auteur?.name}</p>
                </div>
            </>
                : !article && err ? <h1>Une erreur s'est produite</h1> : <CircularProgress />
        }


    </div>
}
export default ArticlesDetails;


