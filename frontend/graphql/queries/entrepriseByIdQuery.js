export const entrepriseByIdQuery =(id) => {return{
  query:`query{
    entreprise(id:"${id}"){
      id
      nom
      adresse
      contact
      pdpEnCours:plan_de_preventions(where:{Archiver:false}){
        id
        donneur_dordre{
          nom
          prenom
          email
          service_soitec{nomService}
        }
        beginDate
        endDate
        status_pdp{
          text
          color
          id
        }
        descriptifIntervention
        commentaires
        urlDossierStockage
        urlPdf     
      }
      pdpArchive:plan_de_preventions(where:{Archiver: true}){
        beginDate
        urlPdf
        urlDossierStockage
      }   
    }
    statusPdps{
      id
      text
      color
    }
  }`
}

}