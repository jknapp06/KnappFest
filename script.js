$.getJSON('https://spreadsheets.google.com/feeds/list/1_yOQokl_bl9lp2c-tp7jYUgkgvq5uROToi4S4ZndQN8/od6/public/values?alt=json',
	function (data) {
		var d = data.feed.entry;
		var first = true;
		var s = '';
		// Set today to be the 12 to get rid of empty
		// place-holder rows.
		var today = new Date();
		var past = true;
		var badges = '';
		var names = ["Mother", "Father", "Joey", "Elizabeth", "Patrick", "Timothy"];
		$.each(d, function () {
			if(past){
				var sDate = this['gsx$date']['$t'];
				var aDate = sDate.split(' ');
				var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				var day = Number(aDate[0]);
				var month = months.indexOf(aDate[1]);
				var year = Number(aDate[2]);
				var date = new Date(year, month, day);
				console.log(date);
				if(date.getMonth() > today.getMonth() || (date.getMonth() == today.getMonth() && date.getDate() >= today.getDate())){
					past = false;
				}
			}

			if (this['gsx$day']['$t'] === "Sunday" || first){
				s += '<div class="row">';
				first = false;
			}
			if(past){
				s += '<div class="card past ' + this['gsx$tags']['$t'] + '">';
			}
			else{
				s += '<div class="card ' + this['gsx$tags']['$t'] + '">';
			}
			
			// Availability badges
			badges = '';
			var col = '';
			for(var i = 0; i < names.length; i++){
				col = 'gsx$'+names[i].toLowerCase();
				console.log(col);
				console.log(this[col]);
				if (this[col]['$t'] == "TRUE"){ 
					badges += '<span class="badge badge-success">' + names[i] + '</span> ';
				}
			}
			
			// Put together string for the record.
			s += '<div class="card-body"><h5 class="card-title">' 
				+ this['gsx$date']['$t'] + '</h5>' 
				+ '<p>' + this['gsx$headline']['$t'] + '</p>'
				+ '<p>' + this['gsx$notes']['$t'] + '</p>'
				+ badges + '</div>'
				+ '<div class="vertical">' + this['gsx$day']['$t'] + '</div>'
				+ '</div>';
			if (this['gsx$day']['$t'] === "Saturday"){
				s += '</div>'
			}
			
		})
		s += '</div>'
		$('#schedule').append(s);
	})
