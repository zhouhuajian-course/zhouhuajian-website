/**
 * 关于页JS
 *
 * @link    http://zhouhuajian.website
 * @package zhouhuajian.website
 * @author  zhouhuajian
 * @version v1.0
 */
$(function() {
    $(window).resize(function () {
        aboutWrapResize();
    });
});

aboutWrapResize();

// 关于页调整大小
function aboutWrapResize() {
    var maxWidth = 600;
    var windowWidth = $(window).width();
    var width = Math.min(
        maxWidth,
        windowWidth
    );
    var $aboutWrap = $('#about-wrap');
    $aboutWrap.width(width + 'px');
    if (width === maxWidth) {
        var marginLeft = (windowWidth - maxWidth) / 2;
        $aboutWrap.css('margin-left', marginLeft + 'px');
    } else  {
        $aboutWrap.css('margin-left', '0');
    }
}