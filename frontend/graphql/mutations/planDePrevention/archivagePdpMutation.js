export const archivagePdpMutation = ({id,archivage}) => {
    return{
        query:`mutation {
            updatePlanDePrevention(
              input: {
                where: { id: "${id}" }
                data: { Archiver: ${archivage} }
              }
            ) {
              planDePrevention {
                id
                beginDate
                urlPdf
                urlDossierStockage
                user {
                  nom
                  service_soitec {
                    nomService
                  }
                }
                status_pdp{
                  id
                  text
                  color
                }
                endDate
                commentaires
                descriptifIntervention
              }
            }
          }`
    }
}