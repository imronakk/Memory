import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: '#332762',
    },
    image: {
        marginLeft: '15px',
        width: '56px'
    },
    [theme.breakpoints.down('mobile')]: {
        mainContainer: {
            display:'flex',
            flexDirection: 'column-reverse'
        }
    }

}));