const moment =require('moment')

module.exports = {
    getStatusId: (endDate)=>{
         
         const valideId = "5f0f30bada4c59006c108de2"
         const twoMonthId = "5f0f30ceda4c59006c108de3"
         const onMonthId = "5f0f30deda4c59006c108de4"
         const invalidId = "5f0f3116d59c9e007cd7b7c7"
     
         const end = moment(endDate)
         const now = moment()
    
         const result = end.diff(now,"months",true)
    
         if( result>2){
             return valideId
         }else if(result>1){
             return twoMonthId
         }else if(result>0){
             return onMonthId
         }else{
             return invalidId
         } 
     }

};
