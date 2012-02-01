$(document).ready(
		function() {
			$(document).bind("mobileinit", function() {
				$.mobile.ajaxEnabled = false;
			});

			$("#login-btn").bind(
					"click",
					function(event, ui) {
						FB.Event.subscribe('auth.authResponseChange',
								handleResponseChange);
						FB.login(function(response) {
							console.log(response);
						}, {
							scope : 'email'
						});
						return true;
					});

			// Load the SDK Asynchronously
			(function() {
				var e = document.createElement('script');
				e.async = true;
				e.src = document.location.protocol
						+ '//connect.facebook.net/en_US/all.js';
				document.getElementById('fb-root').appendChild(e);
			}());

			window.fbAsyncInit = function() {
				var url = $.url();
				FB.init({
					appId : '329484390424505',
					channelUrl : url.attr('protocol') + '://'
							+ url.attr('host') + require.toUrl("channel.php"),
					status : true,
					cookie : true,
					xfbml : true,
					oauth : true
				});
			};

			function handleResponseChange(response) {
				if (response.authResponse) {
					console.log(response);
				}
			}
		});
