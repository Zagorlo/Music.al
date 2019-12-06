"use strict"
$('.main_player_timer input').val(0);
var i = 0;
var playing = 0;
var COUNT = 4;

$(document).ready(function()
{
	$.ajax
	({
    	type: "GET",
    	url: "audio.php",
    	async: false,
		data: 
		{
			index: i,
			counter: COUNT
		},
    	success: function(response)
    	{
    		$('.music_layout').append(response);
			while($('.song_image_cover[data-index=' + i + ']').length)
			{
				var tmp ='url(' + $('.song_image_cover[data-index=' + i + ']').attr('data-back-img') + ')';
				$('.song_image_cover[data-index=' + i + ']').css('background-image', tmp);
				i = i + 1;
			}
			shuffledArr = shuffle([...Array(i).keys()]);
			mainAudio.attr('src', $('.song_image_cover[data-index=0]').attr('data-audio-path'));
			mainAudio[0].volume = 0.5;
			$('.song_image_cover[data-index=0]').css('box-shadow', '0px 0px 8px 0px #000000');
			$('.main_player_song span').text($('.song_image_cover[data-index=0]').attr('data-audio-name'));
			$('.main_player_pic').css('background-image', $('.song_image_cover[data-index=0]').css('background-image'));
		}
    });
});

$('.load_moar_button').on('click', function()
{
	$.ajax
	({
    	type: "GET",
    	url: "audio.php",
    	async: false,
		data: 
		{
			index: i,
			counter: COUNT
		},
    	success: function(response)
    	{
			$('.music_layout').append(response);
    		while($('.song_image_cover[data-index=' + i + ']').length)
			{
				var tmp ='url(' + $('.song_image_cover[data-index=' + i + ']').attr('data-back-img') + ')';
				$('.song_image_cover[data-index=' + i + ']').css('background-image', tmp);
				i = i + 1;
			}
			shuffledArr = shuffle([...Array(i).keys()]);
    	}
    });
});

$('.volume input').on('input', function()
{
	mainAudio[0].volume = $('.volume input')[0].value / 100;
});

$('#volume').on('mouseover', function()
{
	$('.volume').fadeIn("fast");
	$('.volume').css('display', 'flex');
});

$('#volume input').on('mouseout', function()
{
	$('.volume').fadeOut("fast");
});

$('#volume').on('mouseleave', function()
{
	$('.volume').fadeOut("fast");
});

var mainAudio = $('#main_audio');

mainAudio.on('timeupdate', function()
{
	if(isNaN(mainAudio[0].duration))
	{
		return;
	}
	var curMins = Math.floor(mainAudio[0].currentTime / 60);
	var curSecs = Math.floor(mainAudio[0].currentTime % 60);
	$('.current_time').text((curMins < 10 ? '0' + curMins : curMins) + ':' + (curSecs < 10 ? '0' + curSecs : curSecs));
	var durMins = Math.floor(mainAudio[0].duration / 60);
	var durSecs = Math.floor(mainAudio[0].duration % 60);
	$('.song_duration').text((durMins < 10 ? '0' + durMins : durMins) + ':' + (durSecs < 10 ? '0' + durSecs : durSecs));
	if(input_change == false)
	{
		$('.main_player_timer input').val(mainAudio[0].currentTime + 0);
		$('.main_player_timer input').val(mainAudio[0].currentTime / mainAudio[0].duration * 100);	
	}
	if(mainAudio[0].currentTime == mainAudio[0].duration)
	{
		playAnotherSong(1);
	}
});

var input_change = false;

$('.music_layout').on('click', function(event)
{
	event.preventDefault();
	var elem = $(event.target);
	if(elem[0].className != 'song_image_cover')
	{
		event.stopPropagation();
		return;
	}
	var newSong = elem.attr('data-index');
	if(playing == newSong)
	{
		if(mainAudio[0].paused == false)
		{
			mainAudio[0].pause();
			$('.play_pause_tool').css('background-image', 'url(./pics/play.png)');
		}
		else
		{
			mainAudio[0].play();
			$('.play_pause_tool').css('background-image', 'url(./pics/pause.png)');
		}
	}
	else
	{
		$('.song_image_cover[data-index=' + playing + ']').css('box-shadow', '0px 0px 0px 0px #000000');
		playing = newSong;
		mainAudio.attr('src', elem.attr('data-audio-path'));
		mainAudio[0].play();
		$('.play_pause_tool').css('background-image', 'url(./pics/pause.png)');
		elem.css('box-shadow', '0px 0px 8px 0px #000000');
		$('.main_player_pic').css('background-image', $('.song_image_cover[data-index=' + newSong + ']').css('background-image'));
		$('.main_player_song span').text($('.song_image_cover[data-index=' + newSong + ']').attr('data-audio-name'));		
	}
	event.stopPropagation();
});

var prevent_input = false
$('.main_player_timer input').on('input', function(event)
{
	event.preventDefault();
	if(prevent_input == false)
	{
		input_change = true;
	}
	else
	{
		prevent_input = false;
	}
	event.stopPropagation();
	
});

$('.main_player_timer input').on('change', function(event)
{
	event.preventDefault();
	var elem = $(event.target);
	mainAudio[0].currentTime = elem[0].value / 100 * mainAudio[0].duration;
	prevent_input = true;
	input_change = false;
	event.stopPropagation();
	
});

$('#play').on('click', function(event)
{
	if(mainAudio.attr('src') === "")
	{
		return;
	}
	if(mainAudio[0].paused == false)
	{
		mainAudio[0].pause();
		$('.play_pause_tool').css('background-image', 'url(./pics/play.png)');
	}
	else
	{
		mainAudio[0].play();
		$('.play_pause_tool').css('background-image', 'url(./pics/pause.png)');
	}
});

function shuffle(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

var shuffledArr = [];
var shuffled = false;
function getNewIndex(index, d)
{
	if(shuffled == false)
	{
		return d == 1 ? (index + 1 == i  ? 0 : index + 1) : (index - 1 == -1 ? i - 1  : index - 1);
	}
	return d == 1 ? (shuffledArr.indexOf(index) + 1 == shuffledArr.length ? shuffledArr[0] : shuffledArr[shuffledArr.indexOf(index) + 1])
	: (shuffledArr.indexOf(index) - 1 == -1 ? shuffledArr[i - 1] : shuffledArr[shuffledArr.indexOf(index) - 1])
}

$('#shuffle').on('click', function()
{	
	if(shuffled == false)
	{
		shuffledArr = shuffle([...Array(i).keys()]);
		shuffled = true;
		$('.shuffle_tool').toggleClass("filter");
	}
	else
	{
		shuffled = false;
		$('.shuffle_tool').toggleClass("filter");
	}
});

var repeatable = false;
$('#repeat').on('click', function()
{
	if(repeatable == false)
	{
		repeatable = true;
		$('.repeat_tool').toggleClass("filter");
	}
	else
	{
		repeatable = false;
		$('.repeat_tool').toggleClass("filter");
	}
});

function playAnotherSong(index)
{
	if(mainAudio.attr('src') == "")
	{
		return;
	}
	if(repeatable == true)
	{
		mainAudio[0].currentTime = 0;
		mainAudio[0].play();
		return;
	}
	$('.song_image_cover[data-index=' + playing + ']').css('box-shadow', '0px 0px 0px 0px #000000');
	playing = getNewIndex(parseInt(playing), index);
	var elem = $('.song_image_cover[data-index=' + playing + ']');
	elem.css('box-shadow', '0px 0px 8px 0px #000000');
	mainAudio.attr('src', elem.attr('data-audio-path'));
	mainAudio[0].currentTime = 0;
	mainAudio[0].play();
	$('.main_player_pic').css('background-image', $('.song_image_cover[data-index=' + playing + ']').css('background-image'));
	$('.main_player_song span').text($('.song_image_cover[data-index=' + playing + ']').attr('data-audio-name'));
}

$("#next").on("click", function()
{
	playAnotherSong(1);
	$('.play_pause_tool').css('background-image', 'url(./pics/pause.png)');
});

$("#previous").on("click", function()
{
	playAnotherSong(-1);
	$('.play_pause_tool').css('background-image', 'url(./pics/pause.png)');
});
