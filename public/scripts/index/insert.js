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
								datac = $('#comments').value;

								$.post('http://chayash.my.phpcloud.com/shifts/index/reportsession', {
									y : datay,
									m : datam,
									d : datad,
									c : datac
								});

								if ($("#radio-choice-1").checked == "checked") {
									// Shift
									$.post(require.toUrl('index/reportshift/.')
											.slice(0, -2), {
										y : datay,
										m : datam,
										d : datad,
										c : datac
									});
								} else {
									// Sessions
									$.post(require.toUrl(
											'index/reportsession/.').slice(0,
											-2), {
										y : datay,
										m : datam,
										d : datad,
										c : datac
									});
								}
								return true;
							});
				});
