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
			datad = url.segment(5);
			datam = url.segment(7);
			datay = url.segment(9);

			var infoUrl = require.toUrl('index/info/.').slice(0, -1) + "d/"
					+ datad + "/m/" + datam + "/y/" + datay;
			$.getJSON(infoUrl, function(data) {
				if (data[0].comments != null) {
					$('#comments')[0].value = data[0].comments;
				}
			});

			$("#delete-btn").bind("click", function(event, ui) {
				$.ajax({
					url : require.toUrl('index/delete/.').slice(0, -2),
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
