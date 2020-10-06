export const createEntrepriseMutation = ({nom,contact,adresse,principal_activity})=>{

    return{
        query:`mutation {
            createEntreprise(input: { data: {
                nom:"${nom}",
                contact:"${contact}",
                adresse: "${adresse}",
                principal_activity:"${principal_activity}"
            } }) {
              entreprise {
                id
                nom
                contact
                adresse
                principal_activity
              }
            }
          }`
    } 
}