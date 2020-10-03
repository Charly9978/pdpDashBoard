export const plansDePreventionsQuery = {
  query: `query Plandepreventions{
    planDePreventions(where:{Archiver:false}){
      id
      entreprise{ 
      nom
      id
    }
      donneur_dordre{
        nom
        prenom
      }
      endDate
      status_pdp{
        color
        text  
      }
      descriptifIntervention
      commentaires
      urlPdf
    }
    }`
}
