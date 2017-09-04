$(document).ready(function(){

   $.ajax({ 
   type : "GET", 
   url : "https://iapi.bot.or.th/Stat/Stat-ReferenceRate/DAILY_REF_RATE_V1/?start_period=2002-01-12&end_period=2002-01-15", 
   beforeSend: function(xhr){xhr.setRequestHeader('api-key', 'U9G1L457H6DCugT7VmBaEacbHV9RX0PySO05cYaGsm');},
   success : function(result) { 
       $("#div1").html(JSON.stringify(result));
       console.log(JSON.stringify(result));
       
   }, 
   error : function(result) { 
     //handle the error 
   } 
 });  

});