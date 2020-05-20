/**
 * index JS
 *
 * @link    http://zhouhuajian.website
 * @package zhouhuajian.website
 * @author  zhouhuajian
 * @version v1.0
 */
$(function() {
});

// 路由系统
var pages = [
    'home',
    'video-share',
    'poetry',
    'about',
    'source-code'
];
function hashchange() {
    var re = /^#([a-z\-]+)(\/[a-z\-]+)?$/;
    var matches = location.hash.match(re);
    // 默认首页
    var page = 'home';
    // 找到匹配并且页面正确
    if (matches !== null
        && pages.indexOf(matches[1]) !== -1
    ) {
        page = matches[1];
    }

    // 访问页面
    $('.main-wrap').hide();
    var $footWrap = $('#foot-wrap');
    $footWrap.hide();

    if (page !== 'home') {
        $('#' + page + '-wrap').fadeIn(100);
    } else {
        $('#' + page + '-wrap').show();
        bannerResize();
    }

    // 首页和视频分享页面显示尾部
    if (['home', 'video-share'].indexOf(page) !== -1) {
        $footWrap.show();
    }

    // 视频分享页 处理锚点效果
    if (page === 'video-share' && matches[0].indexOf('/') !== -1) {
        $(document).scrollTop(function () {
            var elem = document.getElementById(matches[1] + matches[2]);
            return $(elem).offset().top;
        });
    }
}

// 绑定hashchange处理函数
// 页面第一次加载调用一次
window.onhashchange = hashchange;
hashchange();