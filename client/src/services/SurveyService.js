
import Api from '@/services/Api'

export default {
  fetchInfo () {
    return Api().get('survey', id_survey)
  }
}