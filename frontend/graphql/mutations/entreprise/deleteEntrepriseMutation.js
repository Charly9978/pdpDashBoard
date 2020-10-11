export const deleteEntrepriseMutation = (entrepriseId) => {
    return {
        query: `mutation {
            deleteEntreprise(input: { where: { id: "${entrepriseId}" } }) {
              entreprise {
                id
              }
            }
          }`
    }
}