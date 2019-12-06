<?php

function random_pic($dir = 'all_content_layout_fonts')
{
    $files = glob($dir.'/*.*');
    $file = array_rand($files);
    return "./".$files[$file];
}

$title = "Music.al";
$header_content = "Music.al Как же Корнелюк хорош, душу рвёт.";
$all_content_layout_font = random_pic();
$footer_image = "./pics/minimalist-flat-music.jpg";
$previous = "./pics/previous.png";
$repeat = "./pics/repeat.png";
$play = "./pics/play.png";
$next = "./pics/next.png";
$shuffle = "./pics/shuffle.png";
$sound = "./pics/sound.png";
$footer_span1 =
"<a href='suslegs.php'>
	Некоторая очень полезная информация
</a>";
$footer_span2 = "Запрещено (ну пожалуйста) копирование без разрешение.
Или разрешено.
Мне всё равно.";



 

$musical = file_get_contents("layout.php");
$musical = str_replace('{title}', $title, $musical);
$musical = str_replace('{header_content}', $header_content, $musical);
$musical = str_replace('{all_content_layout_font}', $all_content_layout_font, $musical);
$musical = str_replace('{footer_image}', $footer_image, $musical);
$musical = str_replace('{footer_span1}', $footer_span1, $musical);
$musical = str_replace('{footer_span2}', $footer_span2, $musical);
$musical = str_replace('{repeat_tool}', $repeat, $musical);
$musical = str_replace('{previous_tool}', $previous, $musical);
$musical = str_replace('{play_tool}', $play, $musical);
$musical = str_replace('{next_tool}', $next, $musical);
$musical = str_replace('{shuffle_tool}', $shuffle, $musical);
$musical = str_replace('{sound_tool}', $sound, $musical);
echo $musical;
