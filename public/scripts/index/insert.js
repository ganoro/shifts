function getSelected(options) {
	for ( var i = 0; i < options.length; i++) {
		var e = options[i];
		if (e.selected) {
			return e.value;
		}
	}
}

$(document)
		.ready(
				function() {
					$(document).bind("mobileinit", function() {
						$.mobile.ajaxEnabled = false;
					});

					var d = new Date();
					$('#select-choice-month').children()[d.getMonth() + 1].selected = true;
					$('#select-choice-day').children()[d.getDate()].selected = true;
					$('#select-choice-year').children()[d.getFullYear() - 2011].selected = true;
					$('#select-choice-month').selectmenu('refresh');
					$('#select-choice-day').selectmenu('refresh');
					$('#select-choice-year').selectmenu('refresh');

					$("#save-btn").bind(
							"click",
							function(event, ui) {
								datay = getSelected($('#select-choice-year')
										.children());
								datam = getSelected($('#select-choice-month')
										.children());
								datad = getSelected($('#select-choice-day')
										.children());
								datac = $('#comments')[0].value;

								if ($("#radio-choice-1")[0].checked == true) {
									// Shift
									$.ajax({
										url : require.toUrl(
												'index/reportshift/.').slice(0,
												-2),
										type : "POST",
										data : ({
											y : datay,
											m : datam,
											d : datad,
											u : uid,
											c : datac
										}),
										async : false,
										success : function(msg) {
											// alert(msg);
										},
										error : function(jxhr, m, c) {
											// alert(jxhr);
										}

									});
								} else {
									$.ajax({
										url : require.toUrl(
												'index/reportsession/.').slice(
												0, -2),
										type : "POST",
										data : ({
											y : datay,
											m : datam,
											d : datad,
											u : uid,
											c : datac
										}),
										async : false,
										success : function(msg) {
											// alert(msg);
										},
										error : function(jxhr, m, c) {
											// alert(jxhr);
										}

									});
								}
								return true;
							});
				});

// Load the SDK Asynchronously
(function() {
	var e = document.createElement('script');
	e.async = true;
	e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
	document.getElementById('fb-root').appendChild(e);
}());

window.fbAsyncInit = function() {
	var url = $.url();
	FB.init({
		appId : '329484390424505',
		channelUrl : url.attr('protocol') + '://' + url.attr('host')
				+ require.toUrl("channel.php"),
		status : true,
		cookie : true,
		xfbml : true,
		oauth : true
	});

	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			uid = response.authResponse.userID;
			accessToken = response.authResponse.accessToken;
		} else if (response.status === 'not_authorized') {
			alert("not auth");
			// the user is logged in to Facebook,
			// but not connected to the app
		} else {
			alert("not logged");
			FB.login(function(response) {
				alert(response);
			}, {
				scope : 'email'
			});
			// the user isn't even logged in to Facebook.
		}
	});
};
