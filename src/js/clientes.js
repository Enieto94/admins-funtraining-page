$('#btn-cerrar-popup').click(function () {
    $('.modal-container').css('display', 'flex');
    $('.modal-fade').removeClass('active');
    $("#btn-cerrar-popup").css('display', 'none');
});

$("#btn-agregar").click(function () {
    $('.modal-container').css('display', 'flex');
    $("#modal-agregar").addClass('active');
    $("#btn-cerrar-popup").css('display', 'block');
});
$(".btn-editar").click(function () {
    $('.modal-container').css('display', 'flex');
    $("#modal-editar").addClass('active');
    $("#btn-cerrar-popup").css('display', 'block');
});