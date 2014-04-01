
$(document).ready(function() {
	$('#game_area').html(setGameArea('rabbit'));
	var $imgItem = $('.image-item');
	for (var i=0; i<$imgItem.length; i++) {
		$($($imgItem[i]).children('img')[1]).hide();
	}
	toggleImage($imgItem);
	setTimeout(function() {
		toggleImage($imgItem)
		$imgItem.click(function() {
			var $this = $(this);
			if ($this.hasClass('true')) return;

			$($this.children('img')).toggle();
			if ($this.hasClass('open'))$this.removeClass('open');
			else $this.addClass('open');
			countOpen();
		});
	}, 5000);

	// Button Restart
	$('#restart').click(function(){
		window.location.reload();
	});
});

var toggleImage = function ($imgItem) {
	console.log($imgItem.length);
	for (var i=0; i<$imgItem.length; i++) {
		$item = $($imgItem[i]);
		$($item.children('img')).toggle();
	}
}

var countOpen = function() {
	var $openClass = $('.image-item.open');
	if ($openClass.length == 2) {
		if (setTrue($openClass)) return;
		setTimeout(function() {
			for(var i=0; i<2; i++) {
				$($openClass[i]).children('img').toggle();
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
		return true;
	}
};

var setGameArea = function(directoryName) {
	var allImage = shuffle(Array(1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8));
	var html ='<div class="row">';
	for (var i=0; i<16; i++) {
			html +=' <div class="col-sm-3 image-item"  data-img="'+allImage[i]+'">' +
						'<img src="img/cover.jpg" alt="">' +
						'<img src="img/'+directoryName+'/'+allImage[i]+'.jpg" alt="">' +
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