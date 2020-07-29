export const updatePdpMutation = (data)=>{

    return{
        query:`
        mutation{
          updatePlanDePrevention(
            input:{
              where:{id : "${data.id}"}
              data:{
                beginDate:"${data.beginDate}",
                endDate:"${data.endDate}",
                status_pdp:"${data.status_pdp.id}",
                descriptifIntervention:"${data.descriptifIntervention}",
                urlDossierStockage:"${data.urlDossierStockage}",
                commentaires:"${data.commentaires}",
                urlPdf:"${data.urlPdf}"
              }
            }
          ){
            planDePrevention{
              id
              beginDate
              endDate
              descriptifIntervention
              urlDossierStockage
              status_pdp{
                id
                text
                color
              }
              commentaires
              urlPdf      
            }
          }
        }`
    }
} 