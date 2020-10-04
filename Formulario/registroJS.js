var departamentos = [];
$(document).ready(function() {
    $.ajax({
        url: "https://www.datos.gov.co/resource/xdk5-pm3f.json",
        type: "GET",
        dataType: "json",
        success: function(datos) {
            var cargaDptos = []; // arreglo para obtener los departamentos

            $(datos).each(function(index, element) { //recorre el json

                if (cargaDptos[element.c_digo_dane_del_departamento] == null) { //mira si ya existe el codigo del departamento
                    var dep = new Object(); // crea un departamento
                    dep.nombre = element.departamento; //atributo nombre a dep y coge el nombre del json
                    dep.municipio = []; // crea array de municipios de ese departamento
                    dep.municipio.push(element.municipio); //ingresa el municipio del departamento al array
                    cargaDptos[element.c_digo_dane_del_departamento] = dep; // en el index del codigo del dane se guarda el departamento
                } else {
                    cargaDptos[element.c_digo_dane_del_departamento].municipio.push(element.municipio);
                    // al array municipio del departamento se ingresa el departamento que llega del json
                }
            });

            $(cargaDptos).each(function(index, element) {
                // recorre los departamentos almacenados con sus municipios y los ingresa al array departamentos
                if (cargaDptos[index] != null) { // verifica que este el departamento y no sea null
                    departamentos.push(cargaDptos[index]); // lo ingresa
                }
            });

            departamentos.sort(function(a, b) { // ordena los departamentos
                if (a.nombre > b.nombre) {
                    return 1;
                }
                if (a.nombre < b.nombre) {
                    return -1;
                }
                return 0;
            });

            $(departamentos).each(function(index, element) {
                $("#departamento").append('<option>' + departamentos[index].nombre + '</option>');
                //genera el codigo para cargarlos en el select
            });
        }
    });
    $("#departamento").click(function() { // al seleccionar departamento
        $("#municipio").empty(); // vacía el contenido del select municipio
        $(departamentos).each(function(index, element) { //recorre departamentos
            if ($("#departamento").val() == element.nombre) { // si encuentra el departamento seleccionado
                $(element.municipio.sort()).each(function(index, element) { // ordena municipios y los recorre
                    $("#municipio").append('<option>' + element + '</option>'); //genera el codigo
                });
            }
        });
    });
});