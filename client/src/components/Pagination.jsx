/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const {numberofpages} = useSelector((state) => state.posts)

  useEffect(() => {
    if(page) dispatch(getPosts(page))
  }, [])

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberofpages}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
};

export default Paginate;