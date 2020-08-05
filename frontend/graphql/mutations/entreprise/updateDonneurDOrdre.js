export const updateDonneurDOrdre = (data)=>{
    return{
        query:`mutation{
            updateEntreprise(input:{
              where:{id:"${data.entrepriseId}"}
              data:{
                donneur_dordre:"${data.donneurDOrdreId}"
              }
            }){
              entreprise{
                donneur_dordre{
                  id
                  nom
                  prenom
                  email
                  service_soitec{
                    nomService
                    id
                  }
                }
              }
            }
          }`
    }
}