/**
 * 视频分享JS
 *
 * @link    http://zhouhuajian.website
 * @package zhouhuajian.website
 * @author  zhouhuajian
 * @version v1.0
 */
$(function() {
    $(window).resize(function () {
        videoWrapResize();
    });
});

videoWrapResize();

// 视频分享页调整大小
function videoWrapResize() {
    var windowWidth = $(window).width();
    var width = Math.min(
        1000,
        windowWidth
    );
    var $videoShareWrap = $('#video-share-wrap');
    $videoShareWrap.width(width + 'px');
    if (width === 1000) {
        var marginLeft = (windowWidth - 1000) / 2;
        $videoShareWrap.css('margin-left', marginLeft + 'px');
    } else  {
        $videoShareWrap.css('margin-left', '0');
    }
}