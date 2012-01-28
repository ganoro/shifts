function getSelected(options) {
	for ( var i = 0; i < options.length; i++) {
		var e = options[i];
		if (e.selected) {
			return e.value;
		}
	}
}

$(document).ready(
		function() {
			$(document).bind("mobileinit", function() {
				$.mobile.ajaxEnabled = false;
			});

			var url = $.url(); // parse the current page URL
			datad = url.segment(2);
			datam = url.segment(4);
			datay = url.segment(6);

			var infoUrl = require.toUrl('index/info/.').slice(0, -1) + "d/"
					+ datad + "/m/" + datam + "/y/" + datay;
			$.getJSON(infoUrl, function(data) {
				$('#comments').value = data.comments;
			});

			$("#delete-btn").bind("click", function(event, ui) {
				$.ajax({
					url : require.toUrl('index/deletereport/.').slice(0, -2),
					type : "POST",
					data : ({
						y : datay,
						m : datam,
						d : datad,
					}),
					async : false,
					success : function(msg) {
						// alert(msg);
					},
					error : function(jxhr, m, c) {
						// alert(jxhr);
					}
				});
			});

			$("#save-btn").bind("click", function(event, ui) {
				datac = $('#comments').value;

				$.ajax({
					url : require.toUrl('index/updatereport/.').slice(0, -2),
					type : "POST",
					data : ({
						y : datay,
						m : datam,
						d : datad,
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
				return true;
			});
		});
