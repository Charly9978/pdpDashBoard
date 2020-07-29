<template>
<v-col cols="3">
<v-card color="teal lighten-4">
    <v-card-title >
       <span class="success--text">{{planDePrevention.entreprise.nom}}</span> 
    </v-card-title>
    <v-card-text>
        <div class="my-2">
            <strong>Status: </strong><span :style={color:planDePrevention.status_pdp.color}>{{planDePrevention.status_pdp.text}}</span>
        </div>
        <div class="my-2">
           <strong>Descriptif:</strong> {{planDePrevention.descriptifIntervention}}
        </div>
        <div class="my-2">
            <strong>Donneur d'ordre:</strong> {{planDePrevention.donneur_dordre.prenom}} {{planDePrevention.donneur_dordre.nom}}
        </div>
        <div class="my-2">
           <strong>Date de Validité:</strong> {{planDePrevention.endDate}}
        </div>
    </v-card-text>
    <v-card-actions>
              <v-spacer></v-spacer>
                  <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
              <v-btn 
              icon
              v-on="on"
              v-bind="attrs">
                <v-icon>mdi-file-document-outline</v-icon>
              </v-btn>
      </template>
      <span>Ouvrir le doc pdf</span>
    </v-tooltip>
                      <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
              <v-btn 
              icon
              v-on="on"
              v-bind="attrs">
                <v-icon>mdi-folder-google-drive</v-icon>
              </v-btn>
      </template>
      <span>Ouvrir le dossier de stockage</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
              <v-btn 
              icon
              v-on="on"
              v-bind="attrs"
              nuxt
              :to="`entreprise/${planDePrevention.entreprise.id}`">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
      </template>
      <span>Modifier l'enregistrement</span>
      ou enregistrer un nouveau plan
    </v-tooltip>
    </v-card-actions>
    <v-card-text>
        <strong>Commentaires:</strong><br/>
        {{planDePrevention.commentaires}}
    </v-card-text>
</v-card>   
</v-col>
  
</template>

<script>
export default {
    props:{
        planDePrevention:{
            required: true,
            type: Object
        }
    }

}
</script>

<style>

</style>