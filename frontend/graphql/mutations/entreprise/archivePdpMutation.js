export const archivePdpMutation = ({id,archivage}) => {
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
                donneur_dordre {
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