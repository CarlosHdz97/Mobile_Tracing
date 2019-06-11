import axios from 'axios'

export default {
    async tryCreate(data){
        const response = await axios.post('/mobile', data);
        return response.data;
    },
    async tryUpdate(data){
        const response = await axios.post('/mobile/'+data.id, data);
        return response.data;
    },
    async tryUpdate(id){
        const response = await axios.delete('/mobile/'+id);
        return response.data;
    },
    async tryget(){
        const response = await axios.get('/mobile/');
        return response.data;
    }
}