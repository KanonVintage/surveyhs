<template>
  <div class="survey">
    <h1>Encuesta sobre pepas de cacao.</h1>

    <v-flex xs4>
    <div>
    <v-container fluid>
      <v-radio-group v-model="fermentacion" :mandatory="false">
        <v-radio label="Buena Fermentación" value="buena"></v-radio>
        <v-radio label="Ligera Fermentación" value="ligera"></v-radio>
        <v-radio label="Violeta" value="violeta"></v-radio>
        <v-radio label="Pizarro" value="pizarro"></v-radio>
        <v-radio label="Moho" value="moho"></v-radio>
      </v-radio-group>
    </v-container>
    </div>
</v-flex>
<v-flex xs4>
    <div>
    <v-container fluid>
      <v-radio-group v-model="tipo" :mandatory="false">
        <v-radio label="Nacional/ Cacao Fino" value="fino"></v-radio>
        <v-radio label="CCN51" value="ccn51"></v-radio>
      </v-radio-group>
    </v-container>
    </div>
</v-flex>
<v-flex xs15 >
    <div>
      <img v-bind:src="url" style="height:300px;width:500px;">

    </div>
</v-flex>
    <div v-for="survey in surveys">
      <p>
        <span><b>{{ survey.title }}</b></span><br />
        <span>{{ survey.description }}</span>
      </p>
    </div>

  </div>
</template>

<script>
import SurveyService from '@/services/SurveyService'
export default {
  name: 'survey',
  data () {
    return {
        surveys: [],
        fermentacion: '',
        tipo:  '',
        url: 'http://cacaomovil.com/media/uploads/2015/09/03/volteo-granos-asegura.jpg'
    }
  },
  mounted () {
    this.getSurvey()
  },
  methods: {
    async getSurvey () {
      const response = await SurveyService.fetchInfo()
      this.surveys = response.data
    }
  }
}
</script>


