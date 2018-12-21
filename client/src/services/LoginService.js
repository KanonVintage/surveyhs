import Api from '@/services/Api'

export default {
    realizarLogin(experto){
        return Api().post('/api/experto/login', experto);
    }
}