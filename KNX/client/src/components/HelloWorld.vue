<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-btn large color="success" @click="start()">Démarrer le chenillard</v-btn>
      <v-btn large color="error" @click="stop()">Arrêter le chenillard</v-btn>
      <v-btn large color="info" @click="inversement()">Inverse le sens du chenillard</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    boolean_marche : false
  }),

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


  }

};
</script>

<style>
</style>
