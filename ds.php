<?php
// The following three lines decide which instance of the Dynamic Sources API in the current WP installation is the most recent,
// in order to use that.
$ds_loader = require_once __DIR__ . '/vendor/toolset/dynamic-sources/server/ds-instance.php';
ts_dynamic_sources_adjust_ds_instance( __DIR__, $ds_loader['version'], $ds_loader['path'] );
