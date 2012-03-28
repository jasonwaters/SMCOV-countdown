var Waters = {};
(function() {
	Waters.CountDown = new Class({
		timer: null,

		Binds: ['handleUpdate'],
		Implements: [Options,Events],
		options: {
			targetDate: new Date(new Date().getTime() + 10000), //30 days from now
			updateFrequency: 1000 //100ms
		},

		initialize: function(options) {
			this.setOptions(options);
			this.start();
		},

		start: function() {
			this.timer = setInterval(this.handleUpdate, this.options.updateFrequency);
		},

		stop: function() {
			clearInterval(this.timer);
		},

		handleUpdate: function () {
			var now = new Date();

			var amount = this.options.targetDate.getTime() - now.getTime() + 5;
			if (amount < 0) {
				this.fireEvent('complete');
				this.stop();
			} else {
				amount = Math.floor(amount / 1000);
				var days = Math.floor(amount / 86400);
				var amount = amount % 86400;
				var hours = Math.floor(amount / 3600);
				amount = amount % 3600;
				var mins = Math.floor(amount / 60);
				amount = amount % 60;
				var secs = Math.floor(amount);

				this.fireEvent('change', {
					'days': days,
					'hours': hours,
					'mins': mins,
					'secs': secs
				});
			}
		}
	});
})();