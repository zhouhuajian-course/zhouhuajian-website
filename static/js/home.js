/**
 * 首页JS
 *
 * @link    http://zhouhuajian.website
 * @package zhouhuajian.website
 * @author  zhouhuajian
 * @version v1.0
 */
$(function() {
    $(window).resize(function () {
        bannerResize();
    });
});


bannerResize();

// banner调整大小 背景图片也调整大小
function bannerResize() {
    var headWrapHeight = $('#head-wrap').height() + 15 * 2;
    var $banner = $('#banner');
    var bannerWidth = $banner.width();
    var bannerHeight = Math.min(
        $(window).height() - headWrapHeight,
        1080
    );
    // 调整高度 沾满窗口
    $banner.height(bannerHeight + 'px');
    // 调整背景图片大小
    if ((bannerWidth / bannerHeight) > (1920 / 1080)) {
        $banner.css('background-size', '100% auto');
    } else {
        $banner.css('background-size', 'auto 100%');
    }
}