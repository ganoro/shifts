$(document).ready(
		function() {
			$(document).bind("mobileinit", function() {
				$.mobile.ajaxEnabled = false;
			});
			
			$.getJSON(require.toUrl('index/list/.').slice(0, -1) + "m/"
					+ $("#month").html() + "/y/" + $("#year").html(), function(
					data) {
				var items = [];
				$.each(data, function(key, val) {
					var d = moment(val.date, [ "YYYY-MM-DD" ]);
					var updateURL = require.toUrl('index/update/.')
							.slice(0, -1)
							+ "d/"
							+ d.format("DD")
							+ "/m/"
							+ d.format("MM")
							+ "/y/" + d.format("YYYY");

					items.push('<li data-theme="'
							+ (val.type != "session" ? 'b' : 'c')
							+ '"><a href="' + updateURL + '" rel="external">'
							+ d.format('dddd, MMMM Do YYYY') + '</a></li>');
				});
				$("#mainList").append(items.join(''));
				$('#mainList').listview('refresh');
			});
			
			$("#share-btn").bind("click", function(event, ui) {
				
				$.getJSON(require.toUrl('index/list/.').slice(0, -1) + "m/"
						+ $("#month").html() + "/y/" + $("#year").html(), function(
						data) {

					var doc = new jsPDF();
					doc.text(20, 20, 'My Schedule!');
					var i = 30;
					$.each(data, function(key, val) {
						var d = moment(val.date, [ "YYYY-MM-DD" ]);
						doc.text(20, i, d.format('dddd, MMMM Do YYYY') + " " + val.type + " " + val.comments);
						i += 10;
					});
										
					// Output as Data URI
					doc.output('datauri');
				});
				
				return true;
			});
			
			$("#login-btn").bind("click", function(event, ui) {
				FB.login(null, {scope:'email'});
				return false;
			});
			
			$("#logout-btn").bind("click", function(event, ui) {
				FB.logout();
				return false;
			});
			
		});