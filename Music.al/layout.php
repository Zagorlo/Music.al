<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<link rel="stylesheet" href="style.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0 shrink-to-fit=no" charset="utf-8">
	<title>
		{title}
	</title>
	<script src="jquery.js" defer>
	</script>
	<script src="main.js" defer>
	</script>
</head>

<body>
	<div class="all_content_layout" style="background-image: url({all_content_layout_font})">
		<div class="left_vertical_layout">
			<header class="header_content content_element">
				<span>
					{header_content}
				</span>
			</header>
			<div class="main_content content_element">
				<div class="main_audio_player">
					<audio id="main_audio" type="audio/mp3" src="">
					</audio>
					<div class="main_player_pic">
					</div>
					<div class="main_player_song">
						<span>
						</span>
					</div>
					<div class="main_player_tools">
						<div class="main_tools">
							<div class="repeat_tool tool" style="background-image: url({repeat_tool})">
								<div class="tool_cover" id="repeat">
								</div>
							</div>
							<div class="previous_tool tool" style="background-image: url({previous_tool})">
								<div class="tool_cover" id="previous">
								</div>
							</div>
							<div class="play_pause_tool tool" style="background-image: url({play_tool})">
								<div class="tool_cover" id="play">
								</div>
							</div>
							<div class="next_tool tool" style="background-image: url({next_tool})">
								<div class="tool_cover" id="next">
								</div>
							</div>
							<div class="shuffle_tool tool" style="background-image: url({shuffle_tool})">
								<div class="tool_cover" id="shuffle">
								</div>
							</div>
						</div>
						<div class="volume_tool tool" style="background-image: url({sound_tool})">
							<div class="tool_cover" id="volume">
								<div class="volume">
									<input type="range" min="0" max="100" step="0.1" value="50">
								</div>
							</div>
						</div>
					</div>
					
					<div class="main_player_timer">
						<span class="current_time time">
							00:00
						</span>
						<input type="range" min="0" max="100" value="0" step="0.01">
						<span class="song_duration time">
							00:00
						</span>
					</div>
				</div>
				<ul class="music_layout">
					
				</ul>
				<div class="load_moar">
					<div class="load_moar_button">
						<span>
							ЗАГРУЗИТЬ ЕЩЁ
						</span>
					</div>
				</div>
			</div>
			<footer class="footer_layout content_element">
				<div>
					<span>
						{footer_span1}
					</span>
					<span>
						{footer_span2}
					</span>
				</div>
				<img src="{footer_image}">
			</footer>
		</div>
		<div class="right_vertical_layout">
		</div>
	</div>
</body>
</html>