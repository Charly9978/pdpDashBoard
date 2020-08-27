'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */


module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
   '10 3 * * *': async () => {
    try {
      console.log('lancement de la tache de vérification')
      let needMofication = false
      const response = await strapi.services['plan-de-prevention'].find({'Archiver':false})
       response.forEach((element) => {
         const endDate = element.endDate
         const oldStatusId = element.status_pdp.id
         const newStatusId = strapi.services.moment.getStatusId(endDate)
         if(oldStatusId != newStatusId){
          needMofication = true
          strapi.services['plan-de-prevention'].update(
            {id: element.id},
            {status_pdp: newStatusId}
            )
          .then(()=>{
            console.log(`modification du status du pdp ${element.id} réussi`)
          })
          .catch((e)=>{
            console.log(`problème lors de la modification du pdp ${element.id}`, e)
            throw e
          })
         }
      });
      if (!needMofication) console.log('pas de mise à jour nécessaire')
      
    } catch (error) {
      console.log("erreur", error)
    }
   }
};
