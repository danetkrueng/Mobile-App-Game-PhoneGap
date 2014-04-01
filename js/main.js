var click = 1;
var score = 0;

$(document).ready(function() {
	var $categories = $('.categories option:selected');
	$('#game_area').html(setGameArea($categories.val()));
	var $imgItem = $('.image-item');
	
	for (var i=0; i<$imgItem.length; i++) {
		$($($imgItem[i]).children('img')[1]).hide();
	}
	$('#start').click(function() {
		toggleImage($imgItem);
		setTimeout(function() {
			toggleImage($imgItem);
			$imgItem.click(function() {
				var $this = $(this);
				if ($this.hasClass('true')) return;

				$($this.children('img')).toggle().flippy();
				if ($this.hasClass('open'))$this.removeClass('open');
				else $this.addClass('open');
				countOpen();
				$('#click').val(click++);
			});
		}, 3000);
	});

	// Button Restart
	$('#restart').click(function(){
		var $categories = $('.categories option:selected');
		$('#game_area').html(setGameArea($categories.val()));
		var $imgItem = $('.image-item');
		for (var i=0; i<$imgItem.length; i++) {
			$($($imgItem[i]).children('img')[1]).hide();
		}
		$('#start').click(function() {
			toggleImage($imgItem);
			setTimeout(function() {
				toggleImage($imgItem);
				$imgItem.click(function() {
					var $this = $(this);
					if ($this.hasClass('true')) return;

					$($this.children('img')).toggle().flippy();
					if ($this.hasClass('open'))$this.removeClass('open');
					else $this.addClass('open');
					countOpen();
					$('#click').val(click++);
				});
			}, 3000);
		});
	});
});

var toggleImage = function ($imgItem) {
	for (var i=0; i<$imgItem.length; i++) {
		$item = $($imgItem[i]);
		$($item.children('img')).toggle().flippy();
	}
}

var countOpen = function() {
	var $openClass = $('.image-item.open');
	if ($openClass.length == 2) {
		if (setTrue($openClass)) return;
		setTimeout(function() {
			for(var i=0; i<2; i++) {
				$($openClass[i]).children('img').toggle().flippy();
				$($openClass[i]).removeClass('open');
			}
		}, 800);
	}
	return;
}

var setTrue = function($openClass) {
	var $name1 = $($openClass[0]);
	var $name2 = $($openClass[1]);
	if ($name1.attr('data-img') == $name2.attr('data-img')) {
		$name1.removeClass('open').addClass('true');
		$name2.removeClass('open').addClass('true');
		$('#score').val(score += 500);
		return true;
	}
};

var setGameArea = function(directoryName) {
	extension = $('.categories option:selected').attr('data-extionsion');
	var allImage = shuffle(Array(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8));
	var html ='<div class="row">';
	for (var i=0; i<16; i++) {
			html +=' <div class="col-sm-3 image-item"  data-img="'+allImage[i]+'">' +
						'<img src="img/cover.jpg" alt="">' +
						'<img src="img/'+directoryName+'/'+allImage[i]+'.'+extension+'" alt="">' +
					'</div>'
	}
	html += '</div>';
	return html;
}

var shuffle = function (array) {
	var currentIndex = array.length
		, temporaryValue
		, randomIndex
		;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}