/* Magic Mirror
 * Module: MMM-ATM
 *
 * By Mykle1
 *
 */
Module.register("MMM-ATM", {

    // Module config defaults.
    defaults: {
        multipleChoice: "Yes", // No = no multiple choice answers appear
        useHeader: true, // false if you don't want a header
        header: "Not Another Trivia Module!", // Any text you want
        maxWidth: "250px",
        rotateInterval: 30 * 1000, // 20 secs to think then answer appears for 10 secs
        animationSpeed: 3000, // fade in and out speed
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 25 * 60 * 1000, // API limits 50 questions per call 

    },

    getStyles: function() {
        return ["MMM-ATM.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

            // Set locale.
            this.url = "https://opentdb.com/api.php?amount=50";
        this.ATM = [];
        this.activeItem = 0;
        this.rotateInterval = null;
        this.scheduleUpdate();
    },

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "Not Another Trivia Module!";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }


        var ATMKeys = Object.keys(this.ATM);
        if (ATMKeys.length > 0) {
            if (this.activeItem >= ATMKeys.length) {
                this.activeItem = 0;
            }
            var ATM = this.ATM[ATMKeys[this.activeItem]];


            var top = document.createElement("div");
            top.classList.add("list-row");


            var category = document.createElement("div");
            category.classList.add("xsmall", "bright", "category");
            category.innerHTML = "Category: &nbsp" + ATM.category; // ATM.category;
            wrapper.appendChild(category);


            var difficulty = document.createElement("div");
            var str = ATM.difficulty;
            var res = str.toUpperCase();
            difficulty.classList.add("xsmall", "bright", "difficulty");
            difficulty.innerHTML = "Difficulty: &nbsp" + res; // ATM.difficulty;
            wrapper.appendChild(difficulty);


            var question = document.createElement("div");
            question.classList.add("xsmall", "bright", "question");
            question.innerHTML = "Question: &nbsp" + ATM.question; // ATM.question;
            wrapper.appendChild(question);


            var multipleChoice = this.config.multipleChoice

            var answer1 = document.createElement("div");
            answer1.classList.add("xsmall", "bright", "answer1");
            if (ATM.type !== "multiple") {
                answer1.innerHTML = "True or False?";
                wrapper.appendChild(answer1);
            } else if (this.config.multipleChoice == "Yes") {
                answer1.innerHTML = "1: &nbsp" + ATM.incorrect_answers[0]; // ATM.answer1;	
                wrapper.appendChild(answer1);
            } else {
                answer1.innerHTML = ""; // No multiple choice
                wrapper.appendChild(answer1);
            }


            var answer2 = document.createElement("div");
            answer2.classList.add("xsmall", "bright", "answer2");
            if (ATM.type !== "multiple") {
                answer2.innerHTML = "";
                wrapper.appendChild(answer2);
            } else if (this.config.multipleChoice == "Yes") {
                answer2.innerHTML = "2: &nbsp" + ATM.incorrect_answers[1]; // ATM.answer2;
                wrapper.appendChild(answer2);
            } else {
                answer2.innerHTML = ""; // No multiple choice
                wrapper.appendChild(answer2);
            }


            var answer3 = document.createElement("div");
            answer3.classList.add("xsmall", "bright", "answer3");
            if (ATM.type !== "multiple") {
                answer3.innerHTML = "";
                wrapper.appendChild(answer3);
            } else if (this.config.multipleChoice == "Yes") {
                answer3.innerHTML = "3: &nbsp" + ATM.correct_answer; // ATM.answer3;
                wrapper.appendChild(answer3);
            } else {
                answer3.innerHTML = ""; // No multiple choice
                wrapper.appendChild(answer3);
            }


            var answer4 = document.createElement("div");
            answer4.classList.add("xsmall", "bright", "answer4");
            if (ATM.type !== "multiple") {
                answer4.innerHTML = "";
                wrapper.appendChild(answer4);
            } else if (this.config.multipleChoice == "Yes") {
                answer4.innerHTML = "4: &nbsp" + ATM.incorrect_answers[2]; // ATM.answer4;
                wrapper.appendChild(answer4);
            } else {
                answer4.innerHTML = ""; // No multiple choice
                wrapper.appendChild(answer4);
            }


            var correctAnswer = document.createElement("div");
            correctAnswer.classList.add("small", "bright", "correct");
            setTimeout(function() {
                correctAnswer.innerHTML = "Answer: " + ATM.correct_answer
            }, 20 * 1000);
            wrapper.appendChild(correctAnswer);
        }
        return wrapper;
    },


    processATM: function(data) {
        this.today = data.Today;
        this.ATM = data;
        //    console.log(this.ATM); // checking my data
        this.loaded = true;
    },

    scheduleCarousel: function() {
        console.log("Carousel of ATM fucktion!");
        this.rotateInterval = setInterval(() => {
            this.activeItem++;
            this.updateDom(this.config.animationSpeed);
        }, this.config.rotateInterval);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getATM();
        }, this.config.updateInterval);
        this.getATM(this.config.initialLoadDelay);
        var self = this;
    },

    getATM: function() {
        this.sendSocketNotification('GET_ATM', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "ATM_RESULT") {
            this.processATM(payload);
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});