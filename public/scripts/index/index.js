$(document)
		.ready(
				function() {
					$
							.getJSON(
									require.toUrl('index/list/.').slice(0, -2),
									{
										tags : "cat",
										tagmode : "any",
										format : "json"
									},

									function(data) {
										var items = [];
										$
												.each(
														data,
														function(key, val) {
															d = new moment(
																	[
																			val.date
																					.substr(
																							0,
																							4),
																			val.date
																					.substr(
																							5,
																							2),
																			val.date
																					.substr(
																							8,
																							2) ]);

															if (val.type != "session") {
																items
																		.push('<li data-theme="b"><a href="index.html" >'
																				+ d
																						.format('dddd, MMMM Do YYYY')
																				+ '</a></li>');
															} else {
																items
																		.push('<li data-theme="c"><a href="index.html" >'
																				+ d
																						.format('dddd, MMMM Do YYYY')
																				+ '</a></li>');
															}
														});
										$("#mainList").append(items.join(''));
										$('#mainList').listview('refresh');
									});
				});