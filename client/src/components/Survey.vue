<template>
  <div class="survey">
    <h1>{{nombre}}</h1>
    </br>
    </br>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
      <h3 style="text-align:left;">Nivel de fermentación</h3>
      <v-radio-group v-model="fermentacion" :mandatory="false">
        <v-radio label="Buena Fermentación" value="buena"></v-radio>
        <v-radio label="Ligera Fermentación" value="ligera"></v-radio>
        <v-radio label="Violeta" value="violeta"></v-radio>
        <v-radio label="Pizarro" value="pizarro"></v-radio>
        <v-radio label="Moho" value="moho"></v-radio>
      </v-radio-group>
      <h3 style="text-align:left;">Tipo</h3>
      <v-radio-group v-model="tipo" :mandatory="false">
        <v-radio label="Nacional/ Cacao Fino" value="fino"></v-radio>
        <v-radio label="CCN51" value="ccn51"></v-radio>
      </v-radio-group>
        </v-flex>
        
<v-flex xs6 >
    <div>
      <v-img v-bind:src="url" aspect-ratio="1.5"></v-img>

    </div>
</v-flex>   
      </v-layout>
    </v-container>

<v-container fluid>
  <v-layout align-end justify-space-between fill-height>
      <v-flex xs4>
        <v-btn>Anterior</v-btn>
      </v-flex>
      <v-flex xs4>
        <v-btn>Siguiente</v-btn>
      </v-flex>
  </v-layout>
</v-container>
  </div>
</template>

<script>
import SurveyService from '@/services/SurveyService'
export default {
  name: 'survey',
  data () {
    return {
        nombre: 'Encuesta sobre pepas de cacao',
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


