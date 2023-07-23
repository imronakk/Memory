import React, { useState, useEffect } from 'react'
import { Paper, Typography, TextField, Button } from '@mui/material';
import FileBase from 'react-file-base64';
import useStyle from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { createPosts, updatePost } from '../../actions/posts';

const Form = ({ setCurrentId, currentId }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : 0);

  // const posts = useSelector((state) => state.posts);

  // Check if currentId is valid before using find
  // const post = currentId ? posts.find((p) => p._id === currentId) : 0;

  const user = JSON.parse(localStorage.getItem('profile'))  

  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });

  useEffect(() => {
    if (post) return setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPosts({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
      clear()
    }

    clear()
  }

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' })
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} style={{ background: 'rgb(18 16 16)', margin: '3px 0px' }} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" style={{ background: '#625858d9' }} color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>

  )
}

export default Form
