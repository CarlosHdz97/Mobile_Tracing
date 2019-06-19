import axios from 'axios'

export default {
    async tryCreate(data){
        const response = await axios.post('/accesory', data);
        return response.data;
    },
    async tryUpdate(data){
        const response = await axios.post('/accesory/'+data.id, data);
        return response.data;
    },
    async tryDelete(id){
        const response = await axios.delete('/accesory/'+id);
        return response.data;
    },
    async tryget(){
        const response = await axios.get('/accesory/');
        return response.data;
    },
    async tryfind($id){
        const response = await axios.get('/accesory/'+$id);
        return response.data;
    }
}