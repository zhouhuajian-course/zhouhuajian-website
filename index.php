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
$index_htm = $smarty->fetch('index.htm');

if (isset($_GET['origin']))
{
    echo $index_htm;
    exit;
}

// 处理CSS文件
preg_match_all("#<link .* href='(/static/css/.*.css)'\s?/>#", $index_htm, $matches);

$css_files_content = '';

foreach ($matches[0] as $key => $link_css)
{
    $css_filepath = realpath(__DIR__ . $matches[1][$key]);
    $css_file_content = file_get_contents($css_filepath);
    $css_files_content .= $css_file_content;
    $replace = ($key == 0) ? '__PLACEHOLDER__' : '';
    $index_htm = str_replace($link_css, $replace, $index_htm);

}

$css_files_content = "<style>{$css_files_content}</style>";
$index_htm = str_replace('__PLACEHOLDER__', $css_files_content, $index_htm);

// 处理JS文件
preg_match_all("#<script src='(/static/js/.*.js)'></script>#", $index_htm, $matches);

$js_files_content = '';

foreach ($matches[0] as $key => $script_js)
{
    $js_filepath = realpath(__DIR__ . $matches[1][$key]);
    $js_file_content = file_get_contents($js_filepath);
    $js_files_content .= $js_file_content;
    $replace = ($key == 0) ? '__PLACEHOLDER__' : '';
    $index_htm = str_replace($script_js, $replace, $index_htm);
}
// 去掉单行注释
$js_files_content = preg_replace('#// .*$#m', '', $js_files_content);
$js_files_content = "<script>{$js_files_content}</script>";

$index_htm = str_replace('__PLACEHOLDER__', $js_files_content, $index_htm);
$index_htm = str_replace(
    array("\n", "\r"), '', $index_htm
);
$index_htm = preg_replace('/\s+/', ' ', $index_htm);
// 去掉多行注释
$index_htm = preg_replace('#/\*.*?\*/#', '', $index_htm);

file_put_contents(__DIR__ . '/index.html', $index_htm);
echo $index_htm;