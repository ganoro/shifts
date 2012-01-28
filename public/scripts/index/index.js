$(document).ready(
		function() {
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
							+ '"><a href="' + updateURL + '" >'
							+ d.format('dddd, MMMM Do YYYY') + '</a></li>');
				});
				$("#mainList").append(items.join(''));
				$('#mainList').listview('refresh');
			});
		});