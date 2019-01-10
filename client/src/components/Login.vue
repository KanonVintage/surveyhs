<template>
  <div class="login">
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      :top=true
      color= 'red'
    >
      Usuario o Contraseña Incorrectos.
    </v-snackbar>
    <v-snackbar
      v-model="snackbar2"
      :timeout="5000"
      :top=true
      color= 'red'
    >
      No se le ha asignado una encuesta a este usuario. Contactarse con el administrador del sistema para que se le pueda asignar una.
    </v-snackbar>
  <v-container align-center>
    
    <v-layout row wrap>
      <v-flex xs3></v-flex>
      <v-flex xs6>
        <v-flex offset-xs2 class="hidden-md-and-up">
        <v-img src="http://www.espol.edu.ec/sites/default/files/espol%20simbolo.png" max-width="300" aspect-ration=0.5></v-img>
        </v-flex>
        <v-flex offset-xs2 class="hidden-sm-and-down">
        <v-img src="http://www.espol.edu.ec/sites/default/files/espol%20simbolo.png" max-width="370" aspect-ration=0.5></v-img>
        </v-flex>
       </br>
       </br>
      <v-form v-model="valid">
        <v-text-field 
          v-model="name"
          :rules="nameRules"
          :counter="10"
          label="Nombre de usuario"
          required
          v-on:keyup.enter="realizarLogin()"
        ></v-text-field>
        <v-text-field
        v-model='password'
          :append-icon="show1 ? 'visibility_off' : 'visibility'"
          :rules="passwordRules"
          label="Contraseña"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          hint="Necesita mínimo 8 caracteres"
          counter
          @click:append="show1 = !show1"
          v-on:keyup.enter="realizarLogin()"
          ></v-text-field>
          
      </v-form>
    </v-flex>
  </v-layout>
  </v-container>
  <div class="text-xs-center">
        <v-btn v-on:click="realizarLogin()">Iniciar Sesión</v-btn>
          </div>

  </div>
</template>

<script>
import LoginService from '@/services/LoginService'
export default {
  data: () => ({
    valid: false,
    name: "",
    show1: false,
    nameRules: [
      v => !!v || "Nombre de usuario requerido",
      v => v.length <= 10 || "Nombre de usuario no debe tener mas de 10 caracteres"
    ],
    email: "",
    passwordRules: [
      v => !!v || "Contraseña requerida",
      v => v.length >= 8 || "Minimo 8 caracteres"
    ],
    password: '',
    snackbar: false,
    snackbar2: false
  }),
  name: 'login',
  methods: {
    async realizarLogin() {
      try{
        let response = await LoginService.realizarLogin({
            user: this.name,
            password: this.password
        });

        if (response.status == 200 && response.data.datos.matched){
          let survey = await LoginService.obtenerSurvey(response.data.datos.experto);
          this.$session.start();
          this.$session.set('jwt', response.data.datos);
          this.$http.headers.common['Authorization'] = 'Bearer ' + response.data.datos.experto;
          if(survey.data.datos != null && survey.status == 200){
            this.$router.push('/survey/'+response.data.datos.experto+'/'+ survey.data.datos.survey);
          } else{
            this.snackbar2= true;
          }
          
        } else{
          this.snackbar= true;
        }
      } catch(err){
        if (err.response.status== 404){
          this.snackbar= true;
        }
      }
      
    }
  }
};
</script>