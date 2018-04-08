/**
 * Scripts para actualizar dinámicamente la página de consulta.
 */

$(function() {

    /**
     * Actualiza los campos del formulario según la fuente seleccionada.
     */
    var fuente = $("#select_fuente");
    var columna = $("#select_columna");
    var mostrar = $("#select_mostrar");
    var comparador = $("#select_comparador");
    var valor = $("#select_valor");

    function actualizaComparador() {
        if (columna.val() == "Todas") {
            // Desactiva el comparador
            comparador.attr("disabled", true);
            valor.attr("disabled", true);
        } else {
            // Activa el comparador
            comparador.removeAttr("disabled");
            valor.removeAttr("disabled");
        }
    }

    // Actualiza las columnas al seleccionar una fuente
    function actualizaColumnas(selector) {
        // Limpia las columnas
        selector.attr("disabled", true);
        selector.empty();

        // Envía la fuente y recibe las columnas de esta fuente
        $.getJSON("/api/actualiza_columnas/" + fuente.val(), function(data) {
            data.forEach(function(item) {
                selector.append(
                    $("<option>", {
                        value: item,
                        text: item
                    })
                );
            });
            selector.removeAttr("disabled");
            actualizaComparador();
        });
    }

    // Llama primero al cargar la página
    actualizaColumnas(columna);
    actualizaColumnas(mostrar);

    // Actualiza cada vez que cambie el valor de fuente
    fuente.on("change", function() {
        actualizaColumnas(columna);
        actualizaColumnas(mostrar);
    });

    columna.on("change", function() {
        actualizaComparador();
    });

});