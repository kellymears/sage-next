<?php
/**
 * Sage Next.
 */
$uri = str_replace('/', '', $_SERVER['REQUEST_URI']);
require_once $uri ? __DIR__."/out/{$uri}.html" : __DIR__.'/out/index.html';
