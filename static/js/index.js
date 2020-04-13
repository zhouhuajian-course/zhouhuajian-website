$(function() {
    setTimeout(function () {
        $('#web-name').show().addClass('animated bounceInLeft');
    }, 500);
    setTimeout(function () {
        $('#nav').show().addClass('animated bounceInRight');
    }, 800)
    setTimeout(function () {
        $('.share-wrap').show().addClass('animated fadeInUp');
        $('.foot-wrap').show().addClass('animated fadeInUp');
    }, 1500)

   $('.nav-btn').click(function () {
        var page = $(this).attr('page');
        $('.main-wrap').hide();
        $('.foot-wrap').hide();
        $('.' + page + '-wrap').show().addClass('animated fadeInUp');
        $('.foot-wrap').show().addClass('animated fadeInUp');
   });
});