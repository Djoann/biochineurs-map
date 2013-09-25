


$("#addNewbtn").click( function () {
    
    $(".listCategories").css("height","0px");
    $(".tabbable").css({
          "height": "500px",
          "display": "block"
    })
})





$("#submitlabo").click( function () {
        
        var laboEntry = $(".add-labo").val();
        alert(laboEntry);
        
        
        
        //saved(laboEntry);
        // save addNode in database
        function saved(laboEntry) {
            
            //serialiser le json
            var json = { "name" : laboEntry };


            
            //envoyer vers le server
//            $.post("/graphdb", json, function (c) {
//                alert("Saved" + JSON.stringify(c));
//                console.log(JSON.stringify(c));
                //savegarder
//            });
            
        
        }  // end function saved
        

});



$("#submituser").click( function () {
        
        var userName = $(".user-name").val();
        
        
        
        var adressUser = $(".user-address").val();
        
        
        
        
        var xy = $(".latlngform")
        var usrlat = xy.data("lat");
        var usrlng = xy.data("lng");
        
        //console.log(userName,"useradress:",adressUser, usrlat, usrlng);
        
        
        saved(userName,adressUser, usrlat,usrlng)
        
        
        // save addNode in database
        function saved(userName,adressUser, usrlat,usrlng) {
                        
            //serialiser le json
            var json = { "name" : userName, "adress" : adressUser, "coordinates" : { 
            "lat" : usrlat, "lng" : usrlng } };
            
            console.log("savedjson:",json);
            //name
            //cordinates   "coordinates": [lat, lng]}
            //facebook page :
             
        
            
            
            
            //envoyer vers le server
            $.post("/graphdb", json, function (c) {
                alert("Saved" + JSON.stringify(c));
                console.log(JSON.stringify(c));
                
            });
            
        
        }  // end function saved
        

});




$("#SubmitTolist").click( function () {
    alert("back");
    
    $(".listCategories").children().remove();
    
    
    loader();
    $(".listCategories").css("height", "500px");
    
    $(".tabbable").css({
          "height": "0px",
          "display": "none"
    })
});



//get database nodes and links
$("#backTolist").click( function () {
    
    //loader();
    $(".cybertaupeslist").children().remove();
    
    $(".infofixed").css({
          "height": "0px",
          "display": "none"
    })
});



function loader () {
    //c = resultats
    $(".listCategories").css("height", "500px");
                
                
    $.get("/graphdb?dirty=true", function (dbdata) {
            console.log("dbdata:",dbdata);
            pullmaplab(dbdata);        
    
    })
}








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
   
   $(".toplistCategory").click( function () {
   
       //hellofixed();
       //labocybertaupes(dbdata);
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
//           
//           circle.on('dragend', function(e) {
//               var layer = leafletPip.pointInLayer(this.getLatLng(), true);
//               
//               console.log(leafletPip);
               //alert("hello");
//               
//           });
//           
//           
//           circle.on("click", function () { marker.openPopup()})
           
       }
       
   }); 
    

}


function hellofixed () {
    console.log("hello detail");
        $(".infofixed").css({
          "height": "500px",
          "display": "block"
    });
    
    
    
}









function labocybertaupes(dbdata) {
    var datalength = dbdata.length;
    //console.log(datalength);
    var web = [0] 

    var texts = [0]
    var latLng = [0]

    var members = [0]
    var country = [0]
    var email = [0]
    var cyberusers = [];
    
    for (var x = 0; x < datalength; x++) {
        var labolenght = dbdata[x].properties.name.length;
        
        

        if (labolenght > 10) {
        } else {
                
                var cybername = dbdata[x].properties.name
                var cyberlatLng = dbdata[x].geometry.coordinates
                var cyberlat = cyberlatLng[1]
                var cyberlng = cyberlatLng[0]


                var user = { name : cybername, lat : cyberlat, lng : cyberlng }
                

                
                //console.log("users finded :",dbdata[x].properties.name);
                
                cyberusers.push(user);
                console.log("pushed", user);

                
                
                
        } //end if
        
    
    } //end for
    
    console.log("userlists", cyberusers);
    listusers(cyberusers);
    
    
    
    
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