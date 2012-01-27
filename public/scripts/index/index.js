$(document).ready(
		function() {
			$.getJSON('index/list', function(data) {
				var items = [];

				$.each(data, function(key, val) {
					d = new Date();
					d.setDate(val.type.slice(8,2));
					d.setMonth(val.date.substr(5,2));
					d.setFullYear(val.date.substr(0,4));
					
					if (val.type != "session") {
						items.push('<li data-theme="b"><a href="index.html" >'
								+ d.toLocaleDateString() + '</a></li>');
					} else {
						items.push('<li data-theme="c"><a href="index.html" >'
								+ d.toLocaleDateString() + '</a></li>');
					}
				});
				$("#mainList").append(items.join(''));
				$('#mainList').listview('refresh');
			});
		});