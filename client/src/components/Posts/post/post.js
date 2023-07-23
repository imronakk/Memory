import React,{useState} from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography , ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import { FaThumbsUp } from 'react-icons/fa';
import { FaRegThumbsUp } from "react-icons/fa";

import { useDispatch } from 'react-redux'

import useStyle from './styles'
import { deletePost, likepost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom'; 


const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyle();
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('profile'));

    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedPost = post?.likes?.find((like) => like === userId);    
    const [likes, setLikes] = useState(post?.likes)

    const handleLikeClick = async () => { 

        dispatch(likepost(post._id)) 

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    };
    
    const openPost = () => navigate(`/posts/${post._id}`)


    const Likes = () => {
        // console.log(user?.result?.googleId || user?.result?._id)
        if (likes.length > 0) {
            return likes.find((like) => like === userId) ? (
                <>
                    <FaThumbsUp />
                    &nbsp;{post.likes.length > 2 ? `You and ${  post.likes.length - 1} others` : `${ post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
                </>
            ) : (
                <>
                    <FaRegThumbsUp />   
                    &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                </>
            );
        }

        return (
            <>
                <FaRegThumbsUp />
                &nbsp;Like
            </>
        );
    };



    return (
        <Card className={classes.card} raised elevation={6}  >
            {/* <ButtonBase className={classes.cardActions} onClick={openPost}> */}
                {/* <div  className={classes.divHover}> */}
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(post._id) }}><MoreHorizIcon fontSize="medium" /></Button>
            </div> )}
            <div  className={classes.divHover} onClick={openPost} >

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            {/* </ButtonBase>  */}
                </div>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLikeClick}>
                    <Likes />
                </Button>
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => { dispatch(deletePost(post._id)) }}>
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}

            </CardActions>
            
        </Card>

    )
};

export default Post;