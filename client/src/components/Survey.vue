<template>
  <div class="survey">
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      :top=true
      :color= 'color'
    >
      {{ mensaje }}
    </v-snackbar>
    <v-container fluid>
          <v-layout align-end>
            <v-flex offset-xs1>
            <h1>{{nombre}}</h1>
            </v-flex>
              <v-flex xs5 offset-xs6>
                <v-btn @click="logout()">Cerrar Sesión</v-btn>
          </v-flex>
          </v-layout>
        </v-container>
    
    </br>
    </br>
    
  <v-tabs dark color="cyan" show-arrows>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab v-for="pepa in pepas" :href="'#tab-' + pepa.pepa._id" :key="pepa.pepa._id">
        {{pepa.pepa.nombre}}
      </v-tab>
  
      <v-tabs-items>
        <v-tab-item v-for="pepa in pepas" :id="'tab-' + pepa.pepa._id" :key="pepa.pepa._id">
          <v-card flat>

<div style="margin: 50px;">
            <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
      <h3 style="text-align:left;">Nivel de fermentación</h3>
      <v-radio-group :id="'radiog-f-' + pepa.pepa._id" v-model="pepa.pepa.fermentacion" :mandatory="false">
        <v-radio label="Buena Fermentación" value="buena" ></v-radio>
        <v-radio label="Ligera Fermentación" value="ligera" ></v-radio>
        <v-radio label="Violeta" value="violeta"></v-radio>
        <v-radio label="Pizarro" value="pizarro" ></v-radio>
        <v-radio label="Moho" value="moho"></v-radio>
      </v-radio-group>
      <h3 style="text-align:left;">Tipo</h3>
      <v-radio-group v-model="pepa.pepa.tipo" :id="'radiog-t-' + pepa.pepa._id" :mandatory="false">
        <v-radio label="Nacional/ Cacao Fino" value="fino"></v-radio>
        <v-radio label="CCN51" value="ccn51"></v-radio>
      </v-radio-group>
        </v-flex>
        <v-flex xs6 >
            <div>
              <v-img v-bind:src="pepa.pepa.fotoURL" max-width="500" aspect-ratio="1.5"></v-img>

            </div>
        </v-flex>   
              </v-layout>
            </v-container>

        <v-container fluid>
          <v-layout align-end>
              <v-flex xs5 offset-xs6>
                <v-btn @click="enviarRespuesta(pepa.pepa._id, pepa.pepa.fermentacion, pepa.pepa.tipo)">Enviar Respuesta</v-btn>
              </v-flex>
          </v-layout>
        </v-container>
            
</div>
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
        pepas: [],
        experto: '',
        survey: '',
        mensaje: '',
        color: '',
        snackbar: false,
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
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
      async obtenerDatosSurvey(){
        var id_survey = window.location.href.toString().split('/')[6];

        try {
          const res= await SurveyService.fetchInfo(id_survey);
          this.experto= window.location.href.toString().split('/')[5];
          this.pepas = res.data.datos.pepas
          this.survey= res.data.datos._id
          this.nombre = res.data.datos.nombre
        } catch(err) {
          this.alertError("La encuesta no pudo ser cargada correctamente.");
        }
        
      },
      async enviarRespuesta(id_pepa, ferm, tipoPepa){
        try {
          let response = await SurveyService.enviarRespuesta({
            fermentacion: ferm,
            tipo: tipoPepa,
            pepa: id_pepa,
            experto: this.experto,
            survey: this.survey
        });
         this.alertSuccess("Respuesta enviada correctamente.");
        } catch(err) {
          this.alertError("Ocurrió un error enviando la respuesta.");
        }
  
      },
      alertSuccess: function(message){
        this.color= "green"
        this.mensaje= message;
        this.snackbar= true;
      },
      alertError: function(message){
        this.color= "red"
        this.mensaje= message;
        this.snackbar= true;
      },
      logout: function () {
        this.$session.destroy()
        this.$router.push('/')
      }

  }
}
</script>


