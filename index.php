<?php
/**
 * 首页页面
 *
 * smarty模板引擎、网页内容压缩、生产发布页面
 *
 * @link    http://zhouhuajian.website
 * @package zhouhuajian.website
 * @author  zhouhuajian
 * @version v1.0
 */
error_reporting(E_ALL);
include_once __DIR__ . '/library/smarty-3.1.34/libs/Smarty.class.php';
$smarty = new Smarty();
$smarty->setTemplateDir(__DIR__ . '/template');
$smarty->setCompileDir(__DIR__ . '/data/template/compile');
$index_html = $smarty->fetch('index.htm');

// 默认整合压缩 CSS JS IMG HTML
if (!isset($_GET['origin']))
{
    // 整合压缩CSS
    combine_compress_css($index_html);
    // 整合压缩JS
    combine_compress_js($index_html);
    // 整合IMG
    combine_img($index_html);
    // 压缩html
    compress_html($index_html);
}
//
//// 处理CSS文件
//preg_match_all("#<link .* href='(/static/css/.*.css)'\s?/>#", $index_htm, $matches);
//
//$css_files_content = '';
//
//foreach ($matches[0] as $key => $link_css)
//{
//    $css_filepath = realpath(__DIR__ . $matches[1][$key]);
//    $css_file_content = file_get_contents($css_filepath);
//    $css_files_content .= $css_file_content;
//    $replace = ($key == 0) ? '__PLACEHOLDER__' : '';
//    $index_htm = str_replace($link_css, $replace, $index_htm);
//
//}
//
//$css_files_content = "<style>{$css_files_content}</style>";
//$index_htm = str_replace('__PLACEHOLDER__', $css_files_content, $index_htm);
//
//// 处理JS文件
//preg_match_all("#<script src='(/static/js/.*.js)'></script>#", $index_htm, $matches);
//
//$js_files_content = '';
//
//foreach ($matches[0] as $key => $script_js)
//{
//    $js_filepath = realpath(__DIR__ . $matches[1][$key]);
//    $js_file_content = file_get_contents($js_filepath);
//    $js_files_content .= $js_file_content;
//    $replace = ($key == 0) ? '__PLACEHOLDER__' : '';
//    $index_htm = str_replace($script_js, $replace, $index_htm);
//}
//// 去掉单行注释
//$js_files_content = preg_replace('#// .*$#m', '', $js_files_content);
//$js_files_content = "<script>{$js_files_content}</script>";
//
//$index_htm = str_replace('__PLACEHOLDER__', $js_files_content, $index_htm);
//$index_htm = str_replace(
//    array("\n", "\r"), '', $index_htm
//);
//$index_htm = preg_replace('/\s+/', ' ', $index_htm);
//// 去掉多行注释
//$index_htm = preg_replace('#/\*.*?\*/#', '', $index_htm);

// 生成发布用的html文件
file_put_contents(__DIR__ . '/index.html', $index_html);
echo $index_html;

/**
 * 整合和压缩CSS
 *
 * @param string $index_html    首页的HTML
 * @return void
 */
function combine_compress_css(&$index_html) {
    // 匹配CSS资源文件标签
    $pattern = "#<link .* href='(/static/css/.*.css)'\s?/>#";
    preg_match_all($pattern, $index_html, $matches);
    // CSS内容
    $css_content = '';
    // 替换用的占位符
    $css_placeholder = '__CSS_PLACEHOLDER__';

    // 遍历每个资源文件
    foreach ($matches[0] as $key => $css_link_tag)
    {
        $css_content .= file_get_contents(realpath(
            __DIR__ . $matches[1][$key]
        ));
        $index_html = str_replace(
            $css_link_tag,
            // 第一个CSS link标签调换成占位符，其他清空
            ($key == 0) ? $css_placeholder : '',
            $index_html
        );
    }

    // 去掉CSS注释 去掉换行符 去掉多余空格
    $css_content = preg_replace("#/\*.*?\*/#s", '', $css_content);
    $css_content = preg_replace("#[\n\r]#", '', $css_content);
    $css_content = preg_replace("#\s+#", ' ', $css_content);
    $css_content = preg_replace("# ?([{:,;}]) ?#", '$1', $css_content);

    // 生成CSS整合压缩后的html内容
    $index_html = str_replace(
        $css_placeholder,
        "<style>\n{$css_content}\n</style>",
        $index_html
    );
}

/**
 * 整合和压缩JS
 *
 * @param string $index_html    首页的HTML
 * @return void
 */
function combine_compress_js(&$index_html) {
    // 匹配JS资源文件标签
    $pattern = "#<script src='(/static/js/.*.js)'></script>#";
    preg_match_all($pattern, $index_html, $matches);
    // JS内容
    $js_content = '';
    // 替换用的占位符
    $js_placeholder = '__JS_PLACEHOLDER__';

    // 遍历每个资源文件
    foreach ($matches[0] as $key => $js_script_tag)
    {
        $js_content .= file_get_contents(realpath(
            __DIR__ . $matches[1][$key]
        ));
        $index_html = str_replace(
            $js_script_tag,
            // 第一个JS script标签调换成占位符，其他清空
            ($key == 0) ? $js_placeholder : '',
            $index_html
        );
    }

    // 去掉JS多行注释单行注释 去掉换行符 去掉多余空格
    $js_content = preg_replace("#/\*.*?\*/#s", '', $js_content);
    $js_content = preg_replace("#^\s*//.*$#m", '', $js_content);
    $js_content = preg_replace("#[\n\r]#", '', $js_content);
    $js_content = preg_replace("#\s+#", ' ', $js_content);
    $js_content = preg_replace("# ?([\[\]=+\(\){:,;}]) ?#", '$1', $js_content);

    // 生成CSS整合压缩后的html内容
    $index_html = str_replace(
        $js_placeholder,
        "<script>\n{$js_content}\n</script>",
        $index_html
    );
}

/**
 * 整合图片
 *
 * @param string $index_html    首页的HTML
 * @return void
 */
function combine_img(&$index_html) {
    // 匹配IMG资源文件
    $pattern = "#src='(/static/image/.*?)'#";
    preg_match_all($pattern, $index_html, $matches);
    // JS内容

    
    $js_content = '';
    // 替换用的占位符
    $js_placeholder = '__JS_PLACEHOLDER__';

    // 遍历每个资源文件
    foreach ($matches[0] as $key => $js_script_tag)
    {
        $js_content .= file_get_contents(realpath(
            __DIR__ . $matches[1][$key]
        ));
        $index_html = str_replace(
            $js_script_tag,
            // 第一个JS script标签调换成占位符，其他清空
            ($key == 0) ? $js_placeholder : '',
            $index_html
        );
    }

    // 去掉JS多行注释单行注释 去掉换行符 去掉多余空格
    $js_content = preg_replace("#/\*.*?\*/#s", '', $js_content);
    $js_content = preg_replace("#^\s*//.*$#m", '', $js_content);
    $js_content = preg_replace("#[\n\r]#", '', $js_content);
    $js_content = preg_replace("#\s+#", ' ', $js_content);
    $js_content = preg_replace("# ?([\[\]=+\(\){:,;}]) ?#", '$1', $js_content);

    // 生成CSS整合压缩后的html内容
    $index_html = str_replace(
        $js_placeholder,
        "<script>\n{$js_content}\n</script>",
        $index_html
    );
}

/**
 * 压缩html
 *
 * @param string $index_html    首页的HTML
 * @return void
 */
function compress_html(&$index_html) {

}