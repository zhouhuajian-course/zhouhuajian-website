var webNames = [
    '未来不是梦',
    '有梦才会赢'
];
$(function() {
    var index = Math.floor(Math.random() * webNames.length);
    $('#web-name').html(webNames[index]);
    setTimeout(function () {
        $('#web-name-cover').animate({
            left: '170px'
        }, 800);
    }, 500);
    setTimeout(function () {
        $('#nav').show().addClass('animated bounceInRight');
    }, 1300)
    setTimeout(function () {
        $('.share-wrap').show().addClass('animated fadeInUp');
        $('.foot-wrap').show().addClass('animated fadeInUp');
    }, 1500)

   $('.nav-btn').click(function () {
        var page = $(this).attr('page');
        $('.main-wrap').hide();
        // $('.foot-wrap').hide();
        $('.' + page + '-wrap').show().addClass('animated fadeInUp');
        // $('.foot-wrap').show().addClass('animated fadeInUp');
   });
});