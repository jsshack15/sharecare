$(document).ready(function() {
	
	$('.quote_message_error').css('display', 'none');
	$('.contact_message_error').css('display', 'none');

	$('.dropdown-list li').click(function() {
		$('input#quote_hidden_budget').val($(this).text());
	});

	$('a.to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 700);
        return false;
    });
    
    
    
    $('.dropdown').click(function (e) {
    	e.preventDefault();
        $('.dropdown-list').slideToggle(200);
    });
    
    
    
    $(document).bind('click', function(e) {
		var $clicked = $(e.target);
		if (! $clicked.parents().hasClass('dropdown-holder'))
			$('.dropdown-list').slideUp(200);
	});
	
	
	
	$('.dropdown-list li a').click(function(e) {
		e.preventDefault();
		var text = $(this).text();
		
		$('.value').text(text);
		$('.dropdown-list').slideUp(200);
	});
	
	
	
    $(".fancybox").fancybox({
    	'padding'		: 0,
		'autoSize'		: false,
		'width'			: '580',
		'height'		: 'auto',
		'scrolling'		: 'yes',
		'titleShow'		: false,
		'helpers'		: {
				overlay		: {
					locked: true
				}
		}
	});

    $(window).bind('resize', positionBranding);
	positionBranding();

	$("form").submit(function(event) {

		var form_name = $(this).attr('id');
		
		event.preventDefault();

		//$('.quote_message_error').show();
		var hasError = false;
		
		if ((form_name == "frm_quote") || (form_name == "frm_quote_fr")) {
			var quote_name = $('input#quote_name').val();
			if (quote_name == "") {
		  		hasError = true;
				$('#quote_name').attr("class", "input required");
			}

			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			var quote_email = $('input#quote_email').val();
			if (quote_email == "") {
		  		hasError = true;
				$('#quote_email').attr("class", "input required");
			}
			else if(!emailReg.test(quote_email)) {
		  		hasError = true;
				if (form_name == "frm_quote")
					$('.quote_message_error').html('Hm, something’s not right... Email is not valid');
				else
					$('.quote_message_error').html('Mm, quelque chose cloche... Le courriel n\'est pas valide');
				$('#quote_email').attr("class", "input required");
				$('input#quote_email').focus();
			}
		
			var quote_url = $('input#quote_url').val();
			if (quote_url != '') {
				var urlregex = new RegExp('^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)');
				var quote_url = $('input#quote_url').val();
				if(!urlregex.test(quote_url)) {
			  		hasError = true;
					if (form_name == "frm_quote")
						$('.quote_message_error').html('Hm, something’s not right... URL is not valid');
					else
						$('.quote_message_error').html('Mm, quelque chose cloche... L\'URL n\'est pas valide');
					$('#quote_url').attr("class", "input required");
					$('input#quote_url').focus();
				}
			}
		
			var quote_budget = $('input#quote_hidden_budget').val();
		
			var quote_interest  = "No interest has been selected.";
		
			if ($('input:radio[name=quote_interest]').is(':checked')) {
				quote_interest  = $('input:radio[name=quote_interest]:checked').val();
			}
		
			var quote_message = $('#quote_message').val();
		
		  	if (hasError == false) {
				var dataString = 'quote_name=' + quote_name + '&quote_email=' + quote_email + '&quote_url=' + quote_url + '&quote_budget=' + quote_budget + '&quote_interest=' + quote_interest + '&quote_message=' + quote_message;
				//alert (dataString); return false;
			
				$.ajax({
			  		type: "POST",
			  		url: "../inc/send_quote_info.php",
			  		data: dataString,
			  		success: function() {
						$('html,body').animate({ scrollTop: 0 }, 'slow');
						$('.quote_message_error').show();
						if (form_name == "frm_quote")
							$('.quote_message_error').html('Thank you for contacting us, we will be in touch within the next 24 hours.');
						else
							$('.quote_message_error').html('Merci, nous allons rentrer en contact avec vous d\'ici les prochaines 24 heure.');
						$('.quote_message_error').css('background', '#5a8203');
						$('input#quote_name').val('');
						$('input#quote_email').val('');
						$('input#quote_url').val('');
						$('#quote_message').val('');
						$('#sbt_quote').attr("disabled", "disabled");
						setTimeout('$.fancybox.close();', 2000);
					
			  		},
					error: function(xhr,err){
					    alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
					    alert("responseText: "+xhr.responseText);
					}	 	
				});
			}
			else {
				$('.quote_message_error').show();
				$('input#quote_name').focus();
				return false;
			}
		}
		else {
			var contact_name = $('input#contact_name').val();
			if (contact_name == "") {
		  		hasError = true;
				$('#contact_name').attr("class", "input required");
			}

			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			var contact_email = $('input#contact_email').val();
			if (contact_email == "") {
		  		hasError = true;
				$('#contact_email').attr("class", "input required");
			}
			else if(!emailReg.test(contact_email)) {
		  		hasError = true;
				if (form_name == "frm_contact")
					$('.contact_message_error').html('Hm, something’s not right... Email is not valid');
				else
					$('.contact_message_error').html('Mm, quelque chose cloche... Le courriel n\'est pas valide');
				$('#contact_email').attr("class", "input required");
				$('input#contact_email').focus();
			}

			var contact_url = $('input#contact_url').val();
			if (contact_url != '') {
				var urlregex = new RegExp('^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)');
				var contact_url = $('input#contact_url').val();
				if(!urlregex.test(contact_url)) {
			  		hasError = true;
					if (form_name == "frm_contact")
						$('.contact_message_error').html('Hm, something’s not right... URL is not valid');
					else
						$('.contact_message_error').html('Mm, quelque chose cloche... L\'URL n\'est pas valide');
					$('#contact_url').attr("class", "input required");
					$('input#contact_url').focus();
				}
			}

			var contact_message = $('#contact_message').val();

		  	if (hasError == false) {
				var dataString = 'contact_name=' + contact_name + '&contact_email=' + contact_email + '&contact_url=' + contact_url + '&contact_message=' + contact_message;
				//alert (dataString); return false;

				$.ajax({
			  		type: 'POST',
			  		url: '../inc/send_contact_info.php',
			  		data: dataString,
			  		success: function() {
						$('.contact_message_error').show();
						if (form_name == "frm_contact")
							$('.contact_message_error').html('Thank you for contacting us, we will be in touch shortly.');
						else
							$('.contact_message_error').html('Merci, nous allons rentrer en contact avec vous d\'ici les prochaines 24 heures.');
						$('.contact_message_error').css('background', '#5a8203');
						$('input#contact_name').val('');
						$('input#contact_email').val('');
						$('input#contact_url').val('');
						$('#contact_message').val('');
			  		},
					error: function(xhr,err){
					    alert('readyState: '+xhr.readyState+'\nstatus: '+xhr.status);
					    alert('responseText: '+xhr.responseText);
					}	 
				});
			}
			else {
				$('.contact_message_error').show();
				$('input#contact_name').focus();
				return false;
			}
		}
	});

    $(window).on('scroll', function(){
        if ( $(window).scrollTop() > 700 ) {
                $('.to-top').fadeIn();
        } else {
                $('.to-top').fadeOut();
        }
    });

});

function positionBranding () {
	var pageWidth = 980;
	var windowWidth = $(window).width();
	var space = (windowWidth - pageWidth) / 2;
	
	$('.get-a-quote').css({right: (space)+'px'});
}











