export const entreprisesQuery = {
    query:`query{
        entreprises(sort:"nom:asc"){
          id
          nom
          adresse
          contact
          principal_activity
          pdpEnCours: plan_de_preventions(where:{Archiver:false}){
            id
          }
        }
      }`
}