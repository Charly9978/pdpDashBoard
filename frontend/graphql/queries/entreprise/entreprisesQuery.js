export const entreprisesQuery = {
    query:`query {
      entreprises(sort:"nom:asc") {
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