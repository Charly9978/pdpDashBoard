export const updatePdpMutation = (data) => {
console.log('data', data)

    return {
        query: `mutation {
            updatePlanDePrevention(
              input: {
                where: { id: "${data.id}" }
                data: {
                  beginDate: "${data.beginDate}"
                  endDate: "${data.endDate}"
                  status_pdp: "${data.status_pdp.id}"
                  descriptifIntervention: "${data.descriptifIntervention}"
                  commentaires: "${data.commentaires}"
                  urlDossierStockage: "${data.urlDossierStockage}"
                  urlPdf: "${data.urlPdf}"
                  user: "${data.user}"
                }
              }
            ) {
              planDePrevention {
                id
                beginDate
                endDate
                Archiver
                descriptifIntervention
                urlDossierStockage
                entreprise {
                  id
                  nom
                  principal_activity
                }
                status_pdp {
                  id
                  text
                  color
                }
                commentaires
                user {
                  id
                  email
                  prenom
                  nom
                  service_soitec {
                    nomService
                  }
                  role {
                    name
                  }
                }
              }
            }
          }`
    }
}