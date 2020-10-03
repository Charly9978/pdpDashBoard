export const usersQuery = {
    query:`query {
        users {
          id
          username
          email
          nom
          prenom
          service_soitec {
            id
            nomService
          }
        }
      }`
}