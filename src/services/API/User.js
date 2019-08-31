import axios from 'axios'

export default {
    async tryCreate(data){
        const response = await axios.post('/user', data);
        return response.data;
    },
    async tryUpdate(data){
        let id =data.id;
        const response = await axios.post('/user/'+id, data);
        return response.data;
    },
    async tryDelete(id){
        const response = await axios.delete('/user/'+id);
        return response.data;
    },
    async trygetAll(){
        const response = await axios.get('/user/');
        return response.data;
    },
    async trygetAvailable(){
        const response = await axios.get('/user/available');
        return response.data;
    },
    async tryfind($id){
        const response = await axios.get('/user/'+$id);
        return response.data;
    },
}