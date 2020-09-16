const mymap = L.map('mapid').setView([-0.789275, 113.921327], 5);

const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWxhbXJ1bWFtYmkiLCJhIjoiY2tmNW02eGFyMG85ZjJ6b2dhYzE3c21uaSJ9.Aey-JvoqSY25WFNgGSZ24w'
});

// tiles.addTo(mymap);

let isCreateMode = false;
let isEditMode = false;

mymap.on('click', onMapClick);

function onMapClick(e) {
    // alert("You clicked the map at " + e.latlng);
    // console.log('latitude >> : ', e.latlng.lat);
    // console.log('longitude >> : ', e.latlng.lng);
    if (isCreateMode === true) {
        let lat = e.latlng.lat;
        let lng = e.latlng.lng;
        let zoom = e.sourceTarget._zoom < 13 ? 13 : e.sourceTarget._zoom;
        mymap.eachLayer((layer) => {
            layer.remove();
        });
        tiles.addTo(mymap);
        var marker = L.marker([lat, lng]).addTo(mymap);
        mymap.setView([lat, lng], zoom);
        $("#latitude").val(lat);
        $("#longitude").val(lng);
    }
}

$(document).ready(() => {
    if (localStorage.getItem("token")) {
        $("#loginForm").hide();
        fetchData();
    }
    $(".alert-danger").hide();
    $(".alert-success").hide();
    $("#loadingData").hide();
    $(".table").hide();
    $(".navbar").hide();
    $(".mapBox").hide();
    $(".line").hide();
    $(".infoBox").hide();
    $(".infoBoxInput").hide();
});

//login
$("#login-form").submit((e) => {
    e.preventDefault();
    $("loadingData").show();
    const username = $("#username").val();
    const password = $("#password").val();

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/login",
        data: { username, password }
    })
        .done((data) => {
            localStorage.setItem("token", data.token);
            $(".alert-danger").hide();
            $("#loginForm").hide();
            $("loadingData").hide();
            fetchData();
        })
        .fail((err) => {
            $(".alert-danger").text(err.responseJSON.message);
            $(".alert-danger").show();
        })
});

//fetch data
function fetchData() {
    $("loadingData").show();
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/nodes",
        headers: { token: localStorage.getItem("token") }
    })
        .done((data) => {
            $("loadingData").hide();
            mymap.setView([-0.789275, 113.921327], 5);
            mainFormShow(data);
        })
        .fail((err) => {
            console.log(err.message);
        });
}


//mainForm show
function mainFormShow(nodes) {
    $("#mainForm").show();
    $(".navbar").show();
    $(".mapBox").show();
    $(".line").show();
    if (isCreateMode === false && isEditMode === false) {
        $(".table").show();
        $(".infoBox").show();
        $(".infoBoxInput").hide();
    }
    else {
        $(".table").hide();
        $(".infoBox").hide();
        $(".infoBoxInput").show();
    }

    if (isCreateMode === false && isEditMode === false) {
        const table = $("#allNodes");
        let allNodes = ``;
        for (let i in nodes) {
            var marker = L.marker([nodes[i].latitude, nodes[i].longitude]).addTo(mymap);
            marker.on("click", onMarkerClick(nodes[i]));
            marker.bindPopup(`<b>${nodes[i].name}</b><br>${nodes[i].type}`).openPopup();
            const node = nodes[i];
            allNodes += `<tr>
                    <td>${nodes[i].name}</td>
                    <td>${nodes[i].type}</td>
                    <td>${nodes[i].latitude}</td>
                    <td>${nodes[i].longitude}</td>
                    <td>
                        <button type="button" onclick="showDetail(\'${nodes[i].id}\', \'${nodes[i].name}\', \'${nodes[i].type}\', \'${nodes[i].latitude}\', \'${nodes[i].longitude}\');" class="btn btn-primary">Show</button>
                    </td>
                    </tr>`
        }
        table.html(allNodes);
    }
    else {
        mymap.eachLayer((layer) => {
            layer.remove();
        });
        if (isEditMode === false) var marker = L.marker([-0.789275, 113.921327]).addTo(mymap);
        else {
            
        }
    }
    tiles.addTo(mymap);
}

const onMarkerClick = (data) => (e) => {
    let zoom = e.sourceTarget._map._zoom < 15 ? 15 : e.sourceTarget._map._zoom;
    mymap.setView([e.latlng.lat, e.latlng.lng], zoom);
    $("#nodeId").text(data.id);
    $("#nodeName").text(data.name);
    $("#nodeType").text(`Type: ${data.type}`);
    $("#nodeLat").text(`Latitude: ${data.latitude}`);
    $("#nodeLng").text(`Longitude: ${data.longitude}`);
    console.log(data);
}

function showDetail(id, name, type, latitude, longitude) {
    // console.log('sampai >>', name);
    $("#nodeId").text(id);
    $("#nodeName").text(name);
    $("#nodeType").text(`Type: ${type}`);
    $("#nodeLat").text(`Latitude: ${latitude}`);
    $("#nodeLng").text(`Longitude: ${longitude}`);
    mymap.setView([latitude, longitude], 17);
}

function signOut() {
    localStorage.removeItem("token");
    $("#mainForm").hide();
    $(".table").hide();
    $(".navbar").hide();
    $(".mapBox").hide();
    $("#loginForm").show();
    $(".line").hide();
}

function addNodes() {
    isCreateMode = true;
    fetchData();
}

function editNodes() {
    isEditMode = true;
    fetchData();
}

$("#input-data").submit((e) => {
    e.preventDefault();
    const titleForm = $("#form-input-title").text();
    const token = localStorage.getItem("token");
    const id = $("#id").val();
    const name = $("#name").val();
    const type = $("#type").val();
    const latitude = $("#latitude").val();
    const longitude = $("#longitude").val();


    //post data
    if (titleForm == 'Add New Node') {
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/nodes",
            headers: { token },
            data: { name, type, latitude, longitude }
        })
            .done(data => {
                $(".infoBoxInput").hide();
                $(".infoBox").show();
                $(".alert-danger").hide();
                isCreateMode = false;
                fetchData();
            })
            .fail(err => {
                $(".alert-danger").text(err.responseJSON.message);
                $(".alert-danger").show();
            })
    }
    else { //put data
        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/nodes/${id}`,
            headers: { token },
            data: { name, type, latitude, longitude }
        })
            .done(data => {
                $(".infoBoxInput").hide();
                $(".infoBox").show();
                $(".alert-danger").hide();
                isCreateMode = false;
                fetchData();
            })
            .fail(err => {
                $(".alert-danger").text(err.responseJSON.message);
                $(".alert-danger").show();
            })
    }
})