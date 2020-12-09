<?php
// Define PostgreSQL database server connect parameters.
define('PG_HOST', 'ec2-34-239-241-25.compute-1.amazonaws.com');
define('PG_PORT', 5432);
define('PG_DATABASE', 'd59j9elq9i87mg');
define('PG_USER', 'ffamdxfyddlgzy');
define('PG_PASSWORD', 'aaeaaf3e950193cbe91bad4b48bf8cb0c8354a7d48977da681746dab57e1e9da');
define('ERROR_ON_CONNECT_FAILED', 'Connection failed!');

// Merge connect string and connect db server with default parameters.
function getDB() {
    return pg_pconnect (' host=' . PG_HOST .
                        ' port=' . PG_PORT .
                        ' dbname=' . PG_DATABASE .
                        ' user=' . PG_USER .
                        ' password=' . PG_PASSWORD
                       ) or die (ERROR_ON_CONNECT_FAILED);
}
?>