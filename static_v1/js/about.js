/**
 * 关于页JS
 *
 * @link    http://zhouhuajian.website
 * @package zhouhuajian.website
 * @author  zhouhuajian
 * @version v1.0
 */
$(function() {
    $('.about-wrap span').hover(function() {
        var text = $(this).attr('hover-text');
        $(this).html(text);
    }, function () {
        var text = $(this).attr('default-text');
        $(this).html(text);
    });
});