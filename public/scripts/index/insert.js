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
								y = getSelected($('#select-choice-year')
										.children());
								m = getSelected($('#select-choice-month')
										.children());
								d = getSelected($('#select-choice-day')
										.children());
								c = $('#comments').value;

								if ($("#radio-choice-1").checked == "checked") {
									// Shift
									$.ajax({
										type : 'POST',
										url: require.baseUrl + 'index/reportshift',
										data : {
											'm' : m,
											'd' : d,
											'y' : y,
											'c' : c
										},
										success : function(m) {
											alert(m);
										},
										error : function(jqXHR, textStatus,
												errorThrown) {
											alert(textStatus);
										}

									});
								} else {
									// Sessions
									$.ajax({
										type : 'POST',
										url: require.baseUrl + '/index/reportsession',
										data : {
											'm' : m,
											'd' : d,
											'y' : y,
											'c' : c
										},
										success : function(m) {
										},
										error : function(jqXHR, textStatus,
												errorThrown) {
										}
									});
								}
								return true;
							});
				});
