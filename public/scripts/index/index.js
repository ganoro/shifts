$(document).ready(
		function() {
			$.getJSON('index/list', function(data) {
				var items = [];

				$.each(data, function(key, val) {
					d = new Date();
					d.setDate(val.type.slice(7,1));
					d.setMonth(val.type.slice(5,1));
					d.setFullYear(val.type.slice(0,4));
					
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