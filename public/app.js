











function pullmaplab(dbdata) {
    var datalength = dbdata.length;
    console.log(datalength);
    var web = [0] 
    var dbnames = [0]

    var dblat = [0]
    var dblng = [0]

    
    
    //console.log(dbdata[0].properties.name);
    
    for (i = 0; i < datalength; i++) {
        //web[i] = dbdata[i].web;
        
        dblat[i] = dbdata[i].node.coordinates.lat
        dblng[i] = dbdata[i].node.coordinates.lng
        dbnames[i] = dbdata[i].node.name;
        
        

        console.log(dbnames[i], dblat[i], dblng[i]);
        
        //console.log(names[i], lat[i], lng[i], web[i], country[i], email[i]);
    }
    
    
    for (var y = 0; y < dbnames.length; y++) {
    
      var dbList =  "<li class=\"toplistCategory\" data-lat="+ dblat[y] +" data-lng="+ dblng[y] +"><div class=\"listEntry-inner\">"
                            + dbnames[y] +
                        "</div></li>"
       $('.listCategories').append(dbList);
       
   };
   
   $(".toplistCategory").click( function () {
          
          $(".liopened").animate({ "height": "-=300px" }, "slow" );
          $(".liopened").removeClass("liopened");
          
          var selct = $(this);
          
          displayUser(selct)
          
          
          var lat = $(this).data("lat");
          var lng = $(this).data("lng");
          console.log("clicked:", lat , lng);
          map.setView([lat ,  lng], 12);
          if (lat && lng) {
          
          
              var marker = L.marker([lat, lng]).bindPopup().addTo(map);
          
              
   //           var circle = L.circle([lat, lng], 4000, {
   //               color: 'red',
   //               fillColor: '#f03',
   //               fillOpacity: 0.5
   //           }).addTo(map);
   //     
   //           circle.on("click", function () { marker.openPopup()})
              
          }
          
   }); 
   
   
   $(".toplistCategory").each( function () {
           //$(this).children().addClass("hello")
           var e = $(this);
           var lat = e.attr("data-lat");
           var lng = e.attr("data-lng");
           if (lat && lng) {
                 
                 
               var marker = L.marker([lat, lng]).bindPopup(e.html()).addTo(map);
               marker.on("click", function () { marker.openPopup()})
           }
   });
}






function displayUser(selct) {
       selct.animate({ "height": "+=300px" }, "slow" );
       selct.addClass("liopened");
       
};












function hellofixed () {
    console.log("hello detail");
        $(".infofixed").css({
          "height": "500px",
          "display": "block"
    }); 
}








//LABO-USERS =WHICH BIO CHINEURS AROUND LABO
function labocybertaupes(dbdata) {


    console.log("labocybertaupes");
    console.log(dbdata);
    
    
    var datalength = dbdata.length;
    console.log(datalength);
    console.log(dbdata[0].node.name);
    
    
    
    
    var texts = [0]
    var latLng = [0]

    var cyberusers = [];
    
    
    
    for (var x = 0; x < datalength; x++) {
    
        var labolenght = dbdata[x].node.name.length;

        if (labolenght > 10) {
        } else {
                
                var cybername = dbdata[x].node.name
                var cyberlatLng = dbdata[x].node.coordinates
                var cyberlat = cyberlatLng[1]
                var cyberlng = cyberlatLng[0]
                
                var user = { name : cybername, lat : cyberlat, lng : cyberlng }
                
                cyberusers.push(user);
                console.log("pushed", user);

        }

    } 
    
    
    //end for
    
    console.log("userlists", cyberusers);
    
    
    
    
    
    
    //listusers(cyberusers);
    
    
    
    
    function listusers(cyberusers) {
            for (i = 0; i < cyberusers.length; i++) {
  
                    var name = cyberusers[i].name;
                    var lat = cyberusers[i].lat;
                    var lng = cyberusers[i].lng;
                    
                    
                    var cybertaupes =  "<li class=\"cybertaupe\" data-lat="+ lat +" data-lng="+ lng +"><div class=\"listEntry-inner\">"
                                          + name +
                                      "</div></li>"
                     $('.cybertaupeslist').append(cybertaupes);
            
            
                } //end for
            
            
            $(".cybertaupe").click( function () {

                var userlat = $(this).data("lat");
                var userlng = $(this).data("lng");
                console.log("clicked:", userlat , userlng);
                map.setView([userlat ,  userlng], 13);
                if (lat && lng) {
                
                
                    var marker = L.marker([lat, lng]).bindPopup().addTo(map);
                    marker.on("click", function () { marker.openPopup()})
                    
                    

                    
                    
                }
                
            }); 
            
    }   //End Listusers
   
   
}