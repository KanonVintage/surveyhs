
import Api from '@/services/Api'

export default {
  fetchInfo (id_survey) {
    return Api().get('api/survey/'+id_survey)
  },
  enviarRespuesta(respuesta){
    return Api().post('/api/respuesta/', respuesta);
  }
}