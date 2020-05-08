/**
 * 打赏页JS
 *
 * @link    http://zhouhuajian.website
 * @package zhouhuajian.website
 * @author  zhouhuajian
 * @version v1.0
 */
$(function() {
    $('.donate-btn').click(function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var money = $(this).attr('money');
        $('.qrcode').hide();
        $('#qrcode-' + money + '-yuan').fadeIn(1000);
    });
});