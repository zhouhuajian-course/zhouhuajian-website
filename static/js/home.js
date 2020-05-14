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
    $(window).scroll(function () {
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

    var backgroundPositionY;

    // 调整背景图片大小和垂直位置
    if ((bannerWidth / bannerHeight) > (1920 / 1080)) {
        $banner.css('background-size', '100% auto');
        backgroundPositionY = - ((bannerWidth * 1080 / 1920) - bannerHeight) / 2;
    } else {
        $banner.css('background-size', 'auto 100%');
        backgroundPositionY = 0;
    }

    // 滚动条滚动像素
    var scrollTop = $('html')[0].scrollTop;
    backgroundPositionY += scrollTop / 2;
    $banner.css('background-position-y', backgroundPositionY + 'px');
}