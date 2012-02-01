$(document).ready(
		function() {
			$(document).bind("mobileinit", function() {
				$.mobile.ajaxEnabled = false;
			});

			$("#share-btn").bind(
					"click",
					function(event, ui) {

						$.getJSON(require.toUrl('index/list/.').slice(0, -1) + "uid/" + uid
								+ "/m/" + $("#month").html() + "/y/"
								+ $("#year").html(), function(data) {

							var doc = new jsPDF();
							doc.text(20, 20, 'My Schedule!');
							var i = 30;
							$.each(data, function(key, val) {
								var d = moment(val.date, [ "YYYY-MM-DD" ]);
								doc.text(20, i, d.format('dddd, MMMM Do YYYY')
										+ " " + val.type + " " + val.comments);
								i += 10;
							});

							// Output as Data URI
							doc.output('datauri');
						});

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

			$.getJSON(require.toUrl('index/list/.').slice(0, -1) + "uid/" + uid
					+ "/m/" + $("#month").html() + "/y/" + $("#year").html(),
					function(data) {
						var items = [];
						$.each(data, function(key, val) {
							var d = moment(val.date, [ "YYYY-MM-DD" ]);
							var updateURL = require.toUrl('index/update/.')
									.slice(0, -1)
									+ "d/"
									+ d.format("DD")
									+ "/m/"
									+ d.format("MM")
									+ "/y/"
									+ d.format("YYYY")
									+ "/uid/" + uid;

							items.push('<li data-theme="'
									+ (val.type != "session" ? 'b' : 'c')
									+ '"><a href="' + updateURL
									+ '" rel="external">'
									+ d.format('dddd, MMMM Do YYYY')
									+ '</a></li>');
						});
						$("#mainList").append(items.join(''));
						$('#mainList').listview('refresh');
					});

		} else if (response.status === 'not_authorized') {
			alert("not auth");
		} else {
			alert("not logged");
			FB.login(function(response) {
				alert(response);
			}, {
				scope : 'email'
			});
		}
	});
};
