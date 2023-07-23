import React, { useEffect, useState } from 'react';
import Form from '../../components/Form/form'
import Posts from '../../components/Posts/posts'
import { useDispatch } from 'react-redux';
import { getPosts, fetchPostsBySearch } from '../../actions/posts';

import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material'

import Paginate from '../Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import useStyle from './styles';


const Home = () => {

    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyle();
    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery');

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

    const searchPost = () => {
        if (search.trim() || tags) {
            // Dispatch => Fetch posts             
            dispatch(fetchPostsBySearch({ search, tags: tags.join(',') }))
            // search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}
            navigate(`search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            navigate('/')
        }
    }

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            // logic for search
            searchPost()
        }
    }

    const handleAddChip = (tag) => setTags([...tags, tag])

    const handleDeleteChip = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))


    return (
        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">

                                <TextField
                                    name="search"
                                    variant="outlined"
                                    onKeyDown={handleKeyPress}
                                    label="Search Memories"
                                    fullWidth
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)} />

                                <ChipInput
                                    style={{ margin: '10px 0' }}
                                    value={tags}
                                    onAdd={handleAddChip}
                                    onDelete={handleDeleteChip}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button disabled={true} onClick={searchPost} style={{ background: 'rgba(98, 88, 88, 0.85)' }} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                            </AppBar>

                            <Form setCurrentId={setCurrentId} currentId={currentId} />
                            <Paper className={classes.paginateComp} elevation={6}>
                                <Paginate page={page} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    )
}

export default Home
