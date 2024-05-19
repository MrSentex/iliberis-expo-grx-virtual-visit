var map = null;

function showMap() {
    $(".loading-screen").fadeOut(1500);

    setTimeout(() => {
        $("#map").fadeIn(1000);
    }, 500);
}

$(function () {
    map = new maplibregl.Map({
        container: "map",
        style: {
            version: 8,
            sources: {},
            layers: []
        },
        center: [-91.63, 28.66],
        zoom: 5.8,
        minZoom: 5.1
    });

    map.on("load", function () {
        map.addSource("overlay", {
            type: "image",
            url: "img/map.png",
            coordinates: [
                [-100, 33],
                [-84, 33],
                [-84, 24],
                [-100, 24]
            ]
        });

        map.addLayer({
            id: "overlay",
            source: "overlay",
            type: "raster",
            paint: {
                "raster-opacity": 0.85
            }
        });


        fetch("data/markers.json").then(response => response.json()).then((markers => {
            markers.forEach(marker => {
                let div = document.createElement("div");

                div.classList.add("text-marker");
                div.innerText = marker.label;

                if (marker.targetModal) {
                    div.setAttribute("clickable", true);

                    div.addEventListener("click", e => {
                        $(`#${marker.targetModal}`).modal("show");
                    });
                }
                

                new maplibregl.Marker({
                    element: div,
                    anchor: "center"
                })
                    .setLngLat(marker.coords)
                    .addTo(map);
            });

            showMap();
        }));

        
    });

    map.addControl(new maplibregl.NavigationControl());    
});
