import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UploadButton from './UploadButton';
import { UserContext, ArticlesContext } from '../../contexts'

import axios from 'axios'


export default function AddArticleModal() {
    const [open, setOpen] = React.useState(false);
    const { user, setUser } = React.useContext(UserContext)
    const { articles, setArticles } = React.useContext(ArticlesContext)
    const [articleForm, setArticleFrom] = React.useState({
        titre: "",
        contenu: "",
        coverPicture: null,
        auteur: user?.user?._id
    });

    const handleFormChange = (e, fieldName) => {
        setArticleFrom({ ...articleForm, [fieldName]: e.target.value })
    }

    const handlePhotoChange = (e) => {
        setArticleFrom({ ...articleForm, coverPicture: e.target.files[0] })
    }

    const handlePostArticle = (e) => {
        // FormData , object special permettant de poster du JSON avec des images
        var data = new FormData()
        // Ajouter les champs du body de la requête à l'objet FormData
        data.append('coverPicture', articleForm.coverPicture)
        data.append('titre', articleForm.titre)
        data.append('contenu', articleForm.contenu)
        data.append('auteur', articleForm.auteur)
        // Envoyer la requête Post
        axios.post("http://localhost:3001/articles", data).then(res => {
            // Mettre à jour l'état de tout les articles
            setArticles([...articles, res.data])
        }).catch(err => console.log(err))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" style={{ background: "green", color: "white" }} onClick={handleClickOpen}>
                Ajouter un article
      </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Titre de l'article"
                        type="Text"
                        fullWidth
                        onChange={(e) => handleFormChange(e, "titre")}
                        style={{ marginBottom: 20 }}
                    />
                    <br />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Contenu"
                        type="text"
                        fullWidth
                        onChange={(e) => handleFormChange(e, "contenu")}
                    />
                    <UploadButton handlePhotoChange={handlePhotoChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
          </Button>
                    <Button onClick={handlePostArticle} color="primary">
                        Poster
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
