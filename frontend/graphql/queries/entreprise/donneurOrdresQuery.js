export const donneurOrdresQuery = {
    query: `query{
      donneurDOrdres{
        id
        nom
        prenom
        email
        service_soitec{
          id
          nomService
        }
      }
      serviceSoitecs{
        id
        nomService
      }
    }`
  }