<?php
if (stristr($_SERVER['HTTP_USER_AGENT'], 'chrome') != false) {
	header('Location: HONEYCOMB.html') ;
}else{
	echo "This demo works in chrome only";
}
?>