import axios from 'axios'

export default {
    async tryLogIn(data){
        const response = await axios.post('/logIn', data);
        return response.data;
    },
}