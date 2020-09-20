var zip_code;

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.866, lng: 151.196 },
        zoom: 15
    });


    var place_id;
    var zip_code = localStorage.getItem('zipcode');


    const request1 = {
        query: "US " + zip_code,
        fields: ["name", "geometry", "place_id"]
    };
    console.log(request1);
    const service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request1, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {

                place_id = results[i].place_id;


                var long = (results[i].geometry.viewport.Va.i + results[i].geometry.viewport.Va.j) / 2;
                var latt = (results[i].geometry.viewport.ab.i + results[i].geometry.viewport.ab.j) / 2;
                /*console.log(results[i].geometry.viewport);
                 */
                //console.log(latt);
                //console.log(long);


                const request2 = {
                    location: myLatLng = new google.maps.LatLng({ lat: latt, lng: long }),
                    keyword: "covid-19 testing facility",
                    radius: 10000,
                    fields: ["name"],
                    //rankBy: google.maps.places.RankBy.DISTANCE
                };

                var str = `<table class= "pure-table pure-table-horizontal" style = "margin-left: auto;
                margin-right: auto;">
                <thead>
                    <tr>
                        <th align="left" bgcolor="#7a4b3c" style="color:#fef5d9">Name</th>
                        <th align="center" bgcolor="#7a4b3c" style="color:#fef5d9">Address</th>
                        <th align="right" bgcolor="#7a4b3c" style="color:#fef5d9">Phone Number</th>
                    </tr>
                </thead>
                <tbody>`;





                service.nearbySearch(request2, (results2, status2) => {
                    if (status2 === google.maps.places.PlacesServiceStatus.OK) {
                        
                        //console.log("hello");
                        for (let i = 0; i < results2.length; i++) {

                            var place_id = results2[i].place_id;
                            //console.log(place_id)
                                //console.log(place_id); 
                            const request3 = {
                                    fields: ["name", "formatted_address", "formatted_phone_number"],
                                    placeId: place_id
                                }
                                
                            var counter = 0;
                            service.getDetails(request3, (results3, status) => {
                                str += "<tr>"
                                if (status === google.maps.places.PlacesServiceStatus.OK) {
                                    var name = results3.name;
                                    var address = results3.formatted_address;
                                    var phone = results3.formatted_phone_number;
                                    if (phone !== undefined) {
                                        str += '<td align="left">' + name + '</td>';
                                        str += '<td align="center">' + address + '</td>';
                                        str += '<td align="right">' + phone + '</td>';
                                        counter += 1;
                                    }


                                }

                                str += '</tr>';
                                //console.log(str);
                                document.getElementById("title_text").innerHTML =  String(counter) + " COVID-19 testing facilities within 10 km:";
                                document.getElementById("slideContainer").innerHTML = str;
                            })


                        }
                    }
                })


                /*const request2 = {
                    fields: ['name','geometry'],
                    placeId: 'ChIJPY_CiAK4t4kR4upU_9CKH4U'
                };
                service.getDetails(request2, (results2, status) => {
                    
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log(results2);
                        for (let i = 0; i < results2.length; i++) {
                            console.log(results2[i]);
                        }
                    }
                })*/
            }
        }
    })
}