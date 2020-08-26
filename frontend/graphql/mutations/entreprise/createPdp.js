export const createPdp = (data)=>{
  console.log("data",data)
    return {
        query:`mutation{
            createPlanDePrevention(
              input:{
                data:{
                  beginDate:"${data.beginDate}",
                  endDate:"${data.endDate}",
                  Archiver:${data.Archiver},
                  descriptifIntervention:"${data.descriptifIntervention}",
                  urlDossierStockage:"${data.urlDossierStockage}",
                  entreprise:"${data.entreprise}",
                  status_pdp:"${data.status_pdp.id}",
                  commentaires:"${data.commentaires}",
                  urlPdf:"${data.urlPdf}",
                  donneur_dordre:"${data.donneur_dordre}"
                }
              }
            ){
              planDePrevention{
                id
                beginDate
                endDate
                Archiver
                descriptifIntervention
                urlDossierStockage
                status_pdp{
                  id
                  text
                  color
                }
                commentaires
                urlPdf
                donneur_dordre{
                  id
                  email
                  nom
                  prenom
                  service_soitec{
                    nomService
                  }
                }
              }
            }
          }`
    }
}