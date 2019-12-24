<?php



//K0XA's SERVER CONF FILE

//нужно только для ограничений предпросмотра на сервере

//если вас смущает, можете убрать

if (file_exists('/local/php/local_conf.php')) {

	include_once('/local/php/local_conf.php');
	include_once('/local/php/rtools_security.php');

}



$d = '.__route';

$assert['head']=file_exists("$d/head.txt")?file_get_contents("$d/head.txt"):'';

$assert['begin']=file_exists("$d/begin.txt")?file_get_contents("$d/begin.txt"):'';

$assert['end']=file_exists("$d/end.txt")?file_get_contents("$d/end.txt"):'';



$p = $_SERVER['QUERY_STRING'];



if (!$p) $p = 'index.html';

if (preg_match('#^(\/|\.\./)#', $p)||preg_match('#\./\.#',$p)) die_not_found($p);



if (!file_exists($p)  || is_dir($p)) {



	$routes = file_get_contents("$d/route.txt");

	$regex  = preg_quote($p).'\s*=>\s*(.*)';

//die($regex);

	if (preg_match("#\s/$regex#", $routes, $matches)) {

		$routed_file = trim($matches[1]);

		//sdie($routed_file);

		if (file_exists($routed_file)) {

			$page = file_get_contents($routed_file);

		} else {

			 die_not_found($p);

		}

	} else { 

		die_not_found($p);

	}

} else {



	$page = file_get_contents($p);



}







if ($assert['head']) $page = preg_replace('#</head>#i', $assert['head'].'</head>', $page, 1);

//if ($assert['begin']) $page = preg_replace('#<body>#i','<body>'.$assert['begin'], $page);
if ($assert['begin']) $page = preg_replace('#(<body(.*?)>)#i','${1}'.$assert['begin'], $page, 1);

if ($assert['end']) $page = preg_replace('#</body>#i', $assert['end'].'</body>', $page, 1);







//SAPE на сервере k0xa'и нельзя подключить в целях безопасности :)

//у вас же все будет работать ОК

if (!defined('K0XA_SERVER')) {



	if (file_exists($d.'/sape.php') && file_exists($d.'/sape_conf.php')) {

		include_once($d.'/sape_conf.php');

		include_once($d.'/sape.php');
//              $sape = new SAPE_client(array('charset'=>'utf-8', 'force_show_code' => true));
                $sape = new SAPE_client(array('charset'=>'utf-8'));

		$page = preg_replace('#\{SAPE\((\d+)\)\}#e', '$sape->return_links($1)', $page);

	}



}











echo $page;





function die_not_found($page) {

header("HTTP/1.1 404 Not Found");

$text = <<< EOH

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">

<html><head>

<title>404 Not Found</title>

</head><body>

<h1>Not Found</h1>

<p>The requested URL /$page was not found on this server.</p>

<hr>

<address>Apache/2.2.13 (Ubuntu) Server at $_SERVER[HTTP_HOST] Port 80</address>

</body></html>

EOH

;

die($text);

}

?>

