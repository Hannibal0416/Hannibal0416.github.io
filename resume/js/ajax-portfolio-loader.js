var galleryImgNo = 1;

function loadJCarousel () {
	$(".gallery").jCarouselLite({
	btnNext: ".next",
	btnPrev: ".prev",
	visible: 1,
	btnGo:
	[".button0", ".button1",
	".button2", ".button3", ".button4"],
	beforeStart: function(a) {	
	},
	afterEnd: function(a) {
		galleryImgNo = a.attr('class');
		galleryImgNo = galleryImgNo.split("_")[1];
		$(".button").removeClass('selected');
		$(".button"+galleryImgNo).addClass('selected');
	}
	});
}

function loadPortfolio (portfolio) {
	$("#section-gallery").html('<p id="ajax-large"><img src="images/ajax-loader-large.gif" width="434" height="315" /></p>');
	$("#work-description").html('<p id="ajax-small"><img src="images/ajax-loader-small.gif" width="350" height="159" /></p>');
	var desc = $.parseJSON($("#"+ portfolio + "_description_tmpl").tmpl().text());
	//$("#section-gallery").get(0).innerHTML =  $("#"+ portfolio + "_carousel_tmpl").tmpl().get(0).innerHTML;
	$("#section-gallery").empty();
	$("#section-gallery").append($("#"+ portfolio + "_carousel_tmpl").tmpl());
	postLoadPortfolio();
	loadDesc(desc);

}

function loadDesc(desc) {

	for ( first in desc) {
		$("#work-description").empty();
		$("#work-description").append($(desc[first][0]));
		$('#section-gallery span.highlight').empty().append(desc[first][1]);
		break;
	}

	for ( id in desc) {
		$("#section-gallery .gallery-controls a[id=" + id + "]").click(
			function() {
				$("#work-description").empty();
				$("#work-description").append($(desc[$(this).attr('id')][0]));
				$('#section-gallery span.highlight').empty().append(desc[$(this).attr('id')][1]);
			}
		);
	}
	/*
	$(".gallery-controls a.prev").bindLast('click',function() {
				//get select
				var id = $(".gallery-controls a.selected").attr('id');
				$("#work-description").get(0).innerHTML = desc[id];
			});
	
	$(".gallery-controls a.prev").click(
			function() {
				//get select
				var id = $(".gallery-controls a.selected").attr('id');
				$("#work-description").get(0).innerHTML = desc[id];
			}
		);*/
	

}


function postLoadPortfolio(){
	$(loadJCarousel());
	$("a.fancybox").fancybox({
							"zoomSpeedIn":		300, 
							"zoomSpeedOut":	300, 
							"overlayShow":		false
						});				

}


$(document).ready(function() {				   
	$(".portfolio li a").removeAttr("href");
		   
	$(".portfolio li a").click(function () { 
      loadPortfolio($(this).attr('rel'));
	  $(".portfolio li a").removeClass("selected");
	  $(this).addClass("selected");
    });
	$(".portfolio li a:first").addClass("selected");
	
	


});
