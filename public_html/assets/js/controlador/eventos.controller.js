var botonesDeSeleccionDePiel = $('.piel');
var botonDeComenzar = $('#start-button');
var botonSiguienteDelModal = $('#boton-jugar');
var modal = $('#modal');

iniciarJuego = function () {
    app.estado.playerName = $('#input-nombre').val();
    modal.modal('hide');
    app.__init();
}

abrirModalDeInicio = function () {
    modal.modal('show');
};

allowDrop = function (ev) {
    ev.preventDefault();
}

dragPieza = function (ev) {
    ev.dataTransfer.setData("object", $(this).data("object"));
};

dropAvatar = function (ev) {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("object"));
    if (app.estado.avatar[data.tipo].puesta === true) {
        document.getElementById(app.estado.avatar[data.tipo].object.id).setAttribute('id', data.id);
        document.getElementById(data.id).setAttribute('src', data.src);
    } else {
        var imagen = factoryImagen(data);
        $(ev.target.parentNode).prepend(imagen);
    }
    app.estado.avatar[data.tipo] = {object: data, puesta: true};
}

factoryImagen = function (data) {
    var imagen = document.createElement('img');
    $(imagen).prop('tipo', data.tipo);
    imagen.src = data.src;
    imagen.setAttribute('id', data.id);
    $(imagen).addClass('avatar');
    return imagen;
};

cambiarPiel = function () {
    
    var self = this;
    
    var getNumeroDePielSeleccionadaByClassName = function () {
        return self.className.split("piel__suntan-")[1].split(" ")[0];
    };

    var cabezaDelAvatar = $('.avatar__cabeza');
    var pielSeleccionada = getNumeroDePielSeleccionadaByClassName();
    var botonDePielSeleccionada = getBotonPielByNumeroPiel(pielSeleccionada);
    botonesDeSeleccionDePiel.removeClass('piel--active');
    botonDePielSeleccionada.addClass('piel--active');
    var newSrcCabeza = getSrcImagenCabezaByNumeroPiel(pielSeleccionada);
    var nuevaCabeza = new Pieza(true, "cabeza-" + app.estado.genero + "-" + pielSeleccionada, newSrcCabeza, "cabeza");
    app.estado.avatar.cabeza = nuevaCabeza;
    cabezaDelAvatar.prop('src', nuevaCabeza.object.src);


};

getSrcImagenCabezaByNumeroPiel = function (numeroPiel) {
    var cabezaDelAvatar = $('.avatar__cabeza');
    var srcCabezaEnAvatar = cabezaDelAvatar.attr('src');
    var pathDeImagenes = srcCabezaEnAvatar.split("cabeza-" + app.estado.genero + "-")[0];
    var archivoImagenCabeza = "cabeza-" + app.estado.genero + "-" + numeroPiel + ".png";
    var newSrcCabeza = pathDeImagenes + archivoImagenCabeza;
    return newSrcCabeza;
}

getBotonPielByNumeroPiel = function (numeroPiel) {
    return $('.piel__suntan-' + numeroPiel);
};

botonesDeSeleccionDePiel.on('click', cambiarPiel);
botonDeComenzar.on('click', abrirModalDeInicio);
botonSiguienteDelModal.on('click', iniciarJuego);

