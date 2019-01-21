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

        <v-toolbar>
      <v-toolbar-title>{{this.$session.get('jwt').nombre}} - {{nombre}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="logout()">Cerrar Sesión</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-up">
        <v-btn flat @click="logout()">Cerrar Sesión</v-btn>
      </v-toolbar-items>
    </v-toolbar>


      <v-dialog
        v-model="dialog"
        max-width="500"
      >
        <v-card>
          <v-card-title class="headline">Encuesta Terminada</v-card-title>
  
          <v-card-text>
           Usted ha completado satisfactoriamente la encuesta sobre granos de cacao, por favor cierre sesión. Gracias por su colaboración.
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialog = false"
            >
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

   


  <v-tabs v-model="active" dark color="cyan" show-arrows>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab v-for="(pepa, index) in pepas"  :key="index">
        {{pepa.pepa.nombre}}
      </v-tab>
  
      <v-tabs-items>
        <v-tab-item lazy=true v-for="(pepa, index) in pepas" :key="index">
          <v-card flat>

<div style="margin: 50px;">
            <v-container grid-list-md text-xs-center>
              <h3>Región: {{pepa.pepa.region}}</h3>
              <div v-viewer class="images clearfix">

                <img class="hidden-md-and-up" v-bind:src="pepa.pepa.fotoURL" width="300" style="width: 60%;height: auto;">
              
              </div>
              </br class="hidden-md-and-up">
              </br class="hidden-md-and-up">
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
        
        <v-flex xs6 class="hidden-sm-and-down">
            <div v-viewer class="images clearfix">

              <img class="hidden-sm-and-down" v-bind:src="pepa.pepa.fotoURL" style="width: 60%;height: auto;">

            </div>
        </v-flex>   
              </v-layout>
            </v-container>

        <div class="text-xs-center">
                <v-btn @click="enviarRespuesta(pepa.pepa._id, pepa.pepa.fermentacion, pepa.pepa.tipo)">Enviar Respuesta</v-btn>
          </div>
            
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
        active: null,
        dialog: false
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  methods: {
    next () {
        const active = parseInt(this.active)
        this.active = (active < this.pepas.length-1 ? active + 1 : active)
        if (active==this.pepas.length-1){
          this.dialog = true;
        }
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
         this.next();
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


