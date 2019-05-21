<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>KNX Project</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn color="white" @click="dialog = true">connection</v-btn>
        <v-btn color="white" @click="sedeconnecter()">déconnection</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    
    <v-dialog v-model="dialog" persistent max-width="490">
      <v-card>
        <v-card-title class="headline">A quelle maquette souhaitez-vous vous connecter ?</v-card-title>
        <v-container grid-list-md text-xs-center>
           <v-combobox
             v-model="selected"
             :items="items"
             :rules="[rules.required]"
             label="Maquettes"
             required
           ></v-combobox>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="green" flat @click="seconnecter()" v-if="selected!=null">Se connecter</v-btn>
          <v-btn color="red" flat @click="dialog = false">Annuler</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 

    <v-content v-if="connecter">
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import axios from "axios";

export default {
  name: "App",
  components: {
    HelloWorld
  },

  data() {
    return {
      selected: null,
      dialog: false,
      connecter: false,
      items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 1 || 'Min 1 characters',
      },
      
    };
  },

  methods: {
    
    seconnecter: function() {
     console.log(this.selected);
     axios({
          method: "POST",
          url: "http://localhost:3030/connection",
          data: this.selected,
        });
        this.connecter = true;
        this.dialog = false;
    },

    sedeconnecter: function() {
     axios({
          method: "POST",
          url: "http://localhost:3030/deconnection",
        });
        this.connecter = false;
    },


    



  }
};
</script>
