var topYloc = null;

$(window).scroll(function () { 
	var scrollTop = $(document).scrollTop();
	scrollTop = parseInt(scrollTop);
	
	var offset = topYloc+scrollTop+"px";  
	$("#toplink").animate({top:offset},{duration:500,queue:false});
});

$(document).ready(function(){
						   
	$('#contact-form').submit(function(){

			var action = $(this).attr('action');
	 
			$('#submit')
				.before('<img src="images/ajax-loader.gif" width="16" height="16" class="loader" />')
				.attr('disabled','disabled');
	 
			$.post(action, { 
				your_name: $('#your_name').val(),
				your_email: $('#your_email').val(),
				your_message: $('#your_message').val()
			},
				function(data){
					$('#contact-form #submit').attr('disabled','');
					$('.response').remove();
					$('#contact-form').before('<div class="response">'+data+'</div>');
					$('.response').slideDown();
					$('#contact-form img.loader').fadeOut(500,function(){$(this).remove()});
					if(data=='Message sent!') $('#contact-form').slideUp();
				}
			);
	 
		return false;
	});
						   
	//back to top scroll function. Any link with a hash (#) will scroll to that id on the page
	$('a[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				targetOffset = targetOffset - 35;
				$('html,body').animate({scrollTop: targetOffset}, 500);
				return false;
			}
		}
	});
	
	topYloc = parseInt($("#toplink").css("top").substring(0,$("#toplink").css("top").indexOf("px")));
	
	$.fancybox($('#popup'));
	
	$('body').on('click', '.close-popup', function() {
		$.fancybox.close();
	});

});