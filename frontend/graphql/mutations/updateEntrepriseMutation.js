export const updateEntrepriseMutation = (data)=>{

    return{
        query:`
        mutation {
            updateEntreprise(
              input: {
                where: { id: "${data.id}" }
                data: {
                  nom: "${data.nom}"
                  adresse:"${data.adresse}"
                  contact:"${data.contact}"
                }
              }
            ){
              entreprise{
                nom
                contact
                adresse
                
              }
            }
          }`
    }
} 