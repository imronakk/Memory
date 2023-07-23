import React from 'react'
import Post from './post/post'
import { useSelector } from 'react-redux';
import useStyle from './styles'
import { Grid, CircularProgress } from '@mui/material';

const Posts = ({ setCurrentId }) => {
  const classes = useStyle();
  // const user = JSON.parse(localStorage.getItem('profile'))
  const { posts, Isloading } = useSelector((state) => state.posts);

  if(!posts.length && !Isloading) return 'No Posts'

  return (
    Isloading
    ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} >
            <Post key={post._id} post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};


export default Posts
