import Api from '@/services/Api'

export default {
    realizarLogin(experto){
        return Api().post('/api/experto/login', experto);
    },
    obtenerSurvey(id_experto){
        return Api().get('/api/surveyExperto/'+id_experto);
    }
}