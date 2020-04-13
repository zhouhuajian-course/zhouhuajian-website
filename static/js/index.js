/**
 * 首页JS
 *
 * @link    http://zhouhuajian.website
 * @package zhouhuajian.website
 * @author  zhouhuajian
 * @version v1.0
 */
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
        $('#nav').show().addClass('animated bounce-in-right');
    }, 1300)
    setTimeout(function () {
        $('.share-wrap').show().addClass('animated fade-in-up fast');
        $('.foot-wrap').show().addClass('animated fade-in-up fast');
    }, 1500)

    $('.nav-btn').click(function () {
        var page = $(this).attr('page');
        $('.main-wrap').hide();
        // $('.foot-wrap').hide();
        $('.' + page + '-wrap').show().addClass('animated fade-in-up fast');
        // $('.foot-wrap').show().addClass('animated fadeInUp');
    });
    $('.head .link').click(function () {
        location.reload();
    });
});