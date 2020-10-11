export const entreprisesQuery = {
    query:`query {
      entreprises {
        id
        nom
        adresse
        contact
        principal_activity
        plan_de_preventions {
          id
          Archiver
        }
      }
    }`
}