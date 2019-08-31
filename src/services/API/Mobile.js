import axios from 'axios'

export default {
    async tryCreate(data){
        const response = await axios.post('/mobile', data);
        return response.data;
    },
    async tryUpdate(data){
        let id =data.id;
        const response = await axios.post('/mobile/'+id, data);
        return response.data;
    },
    async tryDelete(id){
        const response = await axios.delete('/mobile/'+id);
        return response.data;
    },
    async tryget(){
        const response = await axios.get('/mobile/');
        return response.data;
    },
    async trygetQuantity(){
        const response = await axios.get('/mobile/quantity');
        return response.data;
    },
    async tryfind($id){
        const response = await axios.get('/mobile/'+$id);
        return response.data;
    },
    async tryCreateHistoric($id){
        const response = await axios.get('/mobile/'+$id);
        return response.data;
    }
}