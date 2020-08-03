export const updateEntrepriseMutation = (data)=>{

    return{
        query:`mutation{
          updateEntreprise(input:{
            where:{
              id:"${data.id}"
            }
            data:{
              principal_activity:"${data.principal_activity}"
              nom:"${data.nom}"
              adresse:"${data.adresse}"
              contact:"${data.contact}"
            }
          })
          {
            entreprise{
              id
              nom
              adresse
              contact
              principal_activity
            }
          }
        }`
    }
} 