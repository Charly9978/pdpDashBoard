'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */
const fs = require('fs')

module.exports = () => {

    //mettre les fichiers json dans un dossier data dans app. 
    //les noms des fichiers doivent correspondre au nom des collections
    //modifier la variable d'environnement IMPORTDATA = "true" type string
    //redemarrer le docker
    //une fois l'importation réussi arreté le docker, changer la variable à "false" et redémarrer le docker

    const importDatas = () => {
     
        const files =  fs.readdirSync('./data')
    
        files.forEach( file => {
             const data = require(`../../data/${file}`)
             const fileWithoutJson = file.split('.json')[0]
             data.forEach( async (item,index) => {
                 try {
                     await strapi.services[fileWithoutJson].create(item)
                 } catch (error) {
                     console.log(`error from item ${index}`,item,error)
                 }
                 })
             })
    }

};
