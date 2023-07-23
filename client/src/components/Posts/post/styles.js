import { makeStyles } from '@mui/styles';


export default makeStyles({
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },
    border: {
        border: 'solid',
        borderRadius: '5px'
    },
    fullHeightCard: {
        height: '100%',
    },

    divHover: {
        // // Add transitions for a smooth hover effect
        // transition: 'transform 0.2s, box-shadow 0.2s',
        // '&:hover': {
        //     // Increase the elevation and add a scale effect when hovering
        //     transform: 'scale(1.05)',
        //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        // },
        // // Change the cursor to a pointer when hovering

        // Add styles for the overlay div (divHover)
       
            // Your styles for the div when not hovered
            // ...

            // Add transitions for a smooth hover effect
            transition: 'background-color 0.2s',
            cursor: 'pointer',   
            '&:hover': {
                // Your styles for the div when hovered
                backgroundColor: '#f0f0f0',
        
        },
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
    },
    overlay2: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
    },
    grid: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
    },
    title: {
        padding: '0 16px',
    },
    cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
    },
});