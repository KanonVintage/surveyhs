<template>
  <div class="survey">
    <h1>{{nombre}}</h1>
    </br>
    </br>
    
  <v-tabs dark color="cyan" show-arrows>
      <v-tabs-slider color="yellow"></v-tabs-slider>
  
      <v-tab v-for="i in 30" :href="'#tab-' + i" :key="i">
        Item {{ i }}
      </v-tab>
  
      <v-tabs-items>
        <v-tab-item v-for="i in 30" :id="'tab-' + i" :key="i">
          <v-card flat>


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
                <v-btn @click="prev">Anterior</v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn @click="next">Siguiente</v-btn>
              </v-flex>
          </v-layout>
        </v-container>
            


          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>




    






  </div>
</template>

<script>
import SurveyService from '@/services/SurveyService'
export default {
  created: function(){
    this.obtenerDatosSurvey();
  },
  name: 'survey',
  data () {
    return {
        nombre: '',
        fermentacion: '',
        tipo:  '',
        pepas: []
    }
  },
  mounted () {
    this.getSurvey()
  },
  methods: {
    next () {
        this.onboarding = this.onboarding + 1 === length
          ? 0
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 < 0
          ? this.length - 1
          : this.onboarding - 1
      },
      obtenerDatosSurvey: function(){
        var id_survey = window.location.href.toString().split('/')[4];
        this.$http.get(`/api/survey/${id_survey}`).then(res => {
        this.pepas = JSON.parse(JSON.stringify(res.body.datos.pepas))
        this.nombre = JSON.parse(JSON.stringify(res.body.datos.nombre))
      });
      }
  }
}
</script>


