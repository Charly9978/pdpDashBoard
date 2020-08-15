export const entrepriseByIdQuery =(id) => {return{
  query:`query{
    entreprise(id:"${id}"){
      id
      nom
      adresse
      contact
      principal_activity
    	donneur_dordre{
        id
        nom
        prenom
        email
        service_soitec{
          id
          nomService
        }
      }
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
      pdpArchive:plan_de_preventions(where:{Archiver: true},sort:"beginDate:asc"){
      	id
        beginDate
        urlPdf
        urlDossierStockage
      	donneur_dordre{
          nom
          service_soitec{nomService}
        }
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