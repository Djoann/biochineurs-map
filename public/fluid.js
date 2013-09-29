





//$(".toplistCategory").hover( function () {
//    alert("hover");
//});



// ADD NEW NODE BUTTON = Db FORM DISPLAY
$("#addNewbtn").click( function () {
    
    $(".listCategories").addClass("boxopened")
    $( ".boxopened" ).animate({ "height": "-=500px" }, "slow" );
    
    //$(".listCategories").css("height","0px");
    
    
})



//SEARCH SLIDER 
//$(element).show('slide', { direction: 'left' }, 1000);



// SIDEBAR USERS = DEFAULT
function loader () {
    //c = resultats
    $(".listCategories").css("height", "500px");
                
                
    $.get("/graphdb/users", function (dbdata) {
            console.log("dbdata:",dbdata);
            pullmaplab(dbdata);        
    
    })
}


//SIDEBAR USERS = Click button
$("#peopledbfind").click( function () {
        
        $(".navRightTop").animate({ "height": "+=800px" }, "slow" );
        $(".listCategories").children().remove();
        $(".navRightTop").animate({ "height": "-=800px" }, "slow" );
        $.get("/graphdb/users", function (dbdata) {
                console.log("dbdata:",dbdata);
                setTimeout(function () {
                    pullmaplab(dbdata); 
                }, 500); 
        })
});



// SIDEBAR LABOS  click bar and select type of data display on sidebar
$("#labosdbfind").click( function () {

        
        $(".navRightTop").animate({ "height": "+=500px" }, "slow" );
        $(".listCategories").children().remove();
        $(".navRightTop").animate({ "height": "-=500px" }, "slow" );
        $.get("/graphdb/labos", function (dbdata) {
                console.log("dbdata:",dbdata);
                setTimeout(function () {
                    pullmaplab(dbdata); 
                }, 500);
                
                //labocybertaupes(dbdata)        
        })
        
});





// FORM SUBMIT DB LABO
$("#submitlabo").click( function () {
        
        var laboName = $(".labo-name").val();

        var adressLabo = $(".labo-address").val();
        
        var laboxy = $(".latlngform")
        
        var labolat = laboxy.data("lat");
        var labolng = laboxy.data("lng");
        
        
        savedLabo(laboName, adressLabo, laboxy);
        
        // save addNode in database
        function savedLabo(laboName, adressLabo, laboxy) {
            
            //serialiser le json

            var labjson = { "name" : laboName, "adress" : adressLabo, "coordinates" : { 
            "lat" : labolat, "lng" : labolng } };

            
            console.log("savedjson:",labjson);
            
            
            //envoyer labo vers le server
            $.post("/graphdb/labos", labjson, function (c) {
                alert("Saved" + JSON.stringify(c));
                console.log(JSON.stringify(c));
                
            });
            
        
        }  // end function saved
});




// FORM SUBMIT DB USER
$("#submituser").click( function () {
        
        var userName = $(".user-name").val();

        var adressUser = $(".user-address").val();
        
        var xy = $(".latlngform")
        var usrlat = xy.data("lat");
        var usrlng = xy.data("lng");
        
        
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
            $.post("/graphdb/users", json, function (c) {
                alert("Saved" + JSON.stringify(c));
                console.log(JSON.stringify(c));
                
            });
        }  // end function saved
});



// FORM TO LIST BUTTON 
$("#SubmitTolist").click( function () {
    
    $(".listCategories").children().remove();
    $( ".boxopened" ).animate({ "height": "+=500px" }, "slow" );
    $(".boxopened").removeClass("boxopened");
    
    
    loader();
//    $( ".tabbable" ).animate({ "height": "-=500px" }, "slow" );
    
    
//    $(".tabbable").css({
//          "height": "0px",
//          "display": "none"
//    })
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















// TEST EXTERNAL

//var Point = (function() {
//
//  function Point(lat, lng) {
//    this.lat = x;
//    this.lng = y;
//  }
//
//  return Point;
//
//})();
//
//
//var Circle = (function() {
//
//  function Circle(center, r) {
//    this.center = center;
//    this.r = r;
//  }
//
//  Circle.prototype.isPointInside = function(someGivenPoint) {
//    if (Math.pow(someGivenPoint.x - this.center.x, 2) + Math.pow(someGivenPoint.y - this.center.y, 2) < Math.pow(this.r, 2)) {
//      return true;
//    } else {
//      return false;
//    }
//  };
//
//  return Circle;
//
//})();
//
//var c = new Circle(new Point(0, 0), 10);
//
//console.log(c.isPointInside(new Point(5, 5)));  // return true
//console.log(c.isPointInside(new Point(10, 5))); // false


//END TEST EXTERNAL


