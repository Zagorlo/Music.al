<?php

$db = new SQLite3('./SQLite/music.al.db', SQLITE3_OPEN_READWRITE);

if($db)
{
	$i = $_GET["index"];
	$COUNT = $_GET["counter"];

	$rows = $db->query("SELECT COUNT(*) as count FROM songs");
	$row = $rows->fetchArray();
	$numRows = $row['count'];
	$return = "";
	$j = 0;
	$results = $db->query('SELECT * FROM songs limit'. $COUNT. 'offset'. $i);
	$j = $i;
	$x = 0;
	while($row = $results->fetchArray())
	{
		if($i >= $numRows)
		{
			break;
		}
		if($x < $j)
		{
			$x = $x + 1;
			continue;
		}
		
		if($i >= $numRows)
		{
			break;
		}
		$return = $return.
		'<li class="song">
			<div class="song_image_cover" data-back-img='. $row["song_img"]. ' data-index="'. $i.'" data-audio-path="'.$row["song_path"].'"data-audio-name="'.$row["song_name"].'">
			</div>
			<span class="song_name">'
				.$row["song_name"]
			.'</span>
		</li>';
		$i = $i + 1;
		if($i >= $j + $COUNT)
		{
			break;
		}
	}
	echo $return;
}
else
{
	echo '';
}



