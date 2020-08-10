export const archivePdpMutation = (pdpId) => {
    return{
        query:`mutation {
            updatePlanDePrevention(
              input: {
                where: { id: "${pdpId}" }
                data: { Archiver: true }
              }
            ) {
              planDePrevention {
                id
                beginDate
                urlPdf
                urlDossierStockage
                donneur_dordre {
                  nom
                  service_soitec {
                    nomService
                  }
                }
              }
            }
          }`
    }
}