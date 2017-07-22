/* Magic Mirror
 * Module: MMM-ATM
 *
 * By Mykle1
 *
 */
const NodeHelper = require('node_helper');
const request = require('request');



module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getATM: function(url) {
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body).results; // Parsing an array
		//		console.log(response.statusCode + result);
                    this.sendSocketNotification('ATM_RESULT', result);
		
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_ATM') {
            this.getATM(payload);
        }
    }
});
