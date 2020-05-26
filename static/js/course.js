/**
 * 课程JS
 *
 * @link    http://zhouhuajian.website
 * @package zhouhuajian.website
 * @author  zhouhuajian
 * @version v1.0
 */
$(function() {
    $(window).resize(function () {
        courseWrapResize();
    });
});

courseWrapResize();

// 视频分享页调整大小
function courseWrapResize() {
    var windowWidth = $(window).width();
    var width = Math.min(
        1000,
        windowWidth
    );
    var $courseShareWrap = $('#course-wrap');
    $courseShareWrap.width(width + 'px');
    if (width === 1000) {
        var marginLeft = (windowWidth - 1000) / 2;
        $courseShareWrap.css('margin-left', marginLeft + 'px');
    } else  {
        $courseShareWrap.css('margin-left', '0');
    }
}