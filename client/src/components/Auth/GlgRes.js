import jwt_decode from 'jwt-decode';

export const createOrGetUser = async (response) => {
    const token = response.credential; // Assuming response.credential contains the token string
    const decodedToken = jwt_decode(token);
    return decodedToken;
};
