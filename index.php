<?php

error_reporting(E_ALL);
include_once __DIR__ . '/library/smarty-3.1.34/libs/Smarty.class.php';
$smarty = new Smarty();
$smarty->setTemplateDir(__DIR__ . '/template');
$smarty->setCompileDir(__DIR__ . '/data/template/compile');
$index_htm = $smarty->fetch('index.htm');

file_put_contents(__DIR__ . '/release/index.html', $index_htm);
echo $index_htm;