<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex>
      <v-btn large color="success" @click="start()">Démarrer le chenillard</v-btn>
      <v-btn large color="error" @click="stop()">Arrêter le chenillard</v-btn>
      <v-btn large color="info" @click="inversement()">Inverse le sens du chenillard</v-btn>
      </v-flex>
    </v-layout>

    <v-card flat color="transparent">

     <v-card-text>
        <v-layout text-xs-center wrap>
        <v-slider
          v-model="vitesse"
          label="Vitesse du chenillard (ms)"
          :tick-labels="ticksLabels"
          :max="2500"
          :min="500"
          :color="color"
          :width="2"
          step="500"
        ></v-slider>
        <v-flex xs3>
        <v-btn 
        round 
        :color="color" 
        @click="vitesse_changement()">
        Changer la vitesse
        </v-btn>
        </v-flex>
        </v-layout>


      </v-card-text>

    </v-card>

    <v-layout text-xs-center wrap>
          <v-flex xs3 class="led-box">
            <div class="led-on" id="led1"></div>
            <p>LED 1</p>
          </v-flex>
          <v-flex xs3 class="led-box">
            <div class="led-off" id="led2"></div>
            <p>LED 2</p>
          </v-flex>
          <v-flex xs3 class="led-box">
            <div class="led-on" id="led3"></div>
            <p>LED 3</p>
          </v-flex>
          <v-flex xs3 class="led-box">
            <div class="led-off" id="led4"></div>
            <p>LED 4</p>
          </v-flex>
        </v-layout>
  </v-container>
    
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    boolean_marche : false,
    vitesse : 500,
        ticksLabels: [
          '500',
          '1000',
          '1500',
          '2000',
          '2500'
        ]
  }),

  computed: {
    color () {
      if (this.vitesse == 1000) return 'blue'
      if (this.vitesse == 1500) return 'green'
      if (this.vitesse == 2000) return 'lime'
      if (this.vitesse == 2500) return 'orange'
    }
  },

  methods: {
    start: function() {
      if(this.boolean_marche == false){
        this.boolean_marche = true
        axios({
          method: "POST",
          url: "http://localhost:3030/start",
        });
      }
    },

    stop: function() {
      if(this.boolean_marche == true){
        this.boolean_marche = false
        axios({
          method: "POST",
          url: "http://localhost:3030/stop",
        });
      }
    },

    inversement: function() {
      if(this.boolean_marche == true){
        axios({
          method: "POST",
          url: "http://localhost:3030/inverse",
        });
      }
    },

    vitesse_changement: function() {
      if(this.boolean_marche == true){
        console.log(this.vitesse)
        axios({
          method: "POST",
          url: "http://localhost:3030/vitesse",
          data: this.vitesse,
        });
      }
    },

  },

  retouretat() {
    this.$options.sockets.onmessage = (msg) => {
      let etat = JSON.parse(msg.data)
      console.log(etat)
    }


  }

};
</script>

<style scoped>
.led-box {
  height: 150px;
  width: 1000px;
  margin: 50px 0;
  text-align: center;
  float: left;
  background-color: #e5e3e3;
}

.led-on {
  margin: 20px auto; /*marge au-dessus*/
  width: 75px;
  height: 75px;
  background-color: #f38614;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
}

.led-off {
  margin: 20px auto;
  width: 75px;
  height: 75px;
  background-color: #a39e9e;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #743e06 0 -1px 9px,
    rgba(0, 0, 0, 0) 0 2px 12px;
}
</style>
