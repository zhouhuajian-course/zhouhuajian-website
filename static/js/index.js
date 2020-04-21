/**
 * 首页JS
 *
 * @link    http://zhouhuajian.website
 * @package zhouhuajian.website
 * @author  zhouhuajian
 * @version v1.0
 */
$(function() {
    var webNames = [
        '未来不是梦',
        '读书方知学识浅',
        '梅花香自苦寒来',
        '书山有路勤为径',
        '学海无涯苦作舟',
        '十年寒窗无人问',
    ];
    var index = Math.floor(Math.random() * webNames.length);
    $('#web-name').html(webNames[index]);
    $('#title').html(webNames[index] + ' | 周华健');
    // 开场动画
    setTimeout(function () {
        $('#web-name-cover').animate({
            left: '170px',
            width: '0px'
        }, 1500);
    }, 500);
    setTimeout(function () {
        $('#nav').show().addClass('animated bounce-in-right');
    }, 1300);
    setTimeout(function () {
        // $('.share-wrap').show().addClass('animated fade-in-up fast');
        $('.share-wrap').fadeIn();
        // $('.foot-wrap').show().addClass('animated fade-in-up fast');
        $('.foot-wrap').fadeIn();
    }, 1500);

    // 导航按钮 鼠标click 鼠标hover
    $('.nav-btn').click(function () {
        $(this).removeClass('animated bounce slow infinite');
        var page = $(this).attr('page');
        $('.main-wrap').hide();
        // $('.foot-wrap').hide();
        // $('.' + page + '-wrap').show().addClass('animated fade-in-up fast');
        $('.' + page + '-wrap').fadeIn();
        // $('.foot-wrap').show().addClass('animated fadeInUp');
    });
    $('.nav-btn').hover(function () {
        $(this).siblings().removeClass('animated bounce slow infinite');
        $(this).addClass('animated bounce slow infinite active');
    }, function () {
        $(this).removeClass('animated bounce slow infinite');
    });

    $('.head .link').click(function () {
        location.reload();
    });
});