/**
 * 网站源码页面JS
 *
 * @link    http://zhouhuajian.website
 * @package zhouhuajian.website
 * @author  zhouhuajian
 * @version v1.0
 */
$(function () {
    $('#donate-btn').click(function () {
        $('#donate-dialog').show();
        $('#modal').show();
    });
    $('#modal').click(function () {
        hideDonateDialog()
    });
    $('#donate-dialog').click(function () {
        hideDonateDialog()
    });
});
// 隐藏打赏对话框
function hideDonateDialog() {
    $('#donate-dialog').hide();
    $('#modal').hide();
}