## MMM-ATM

Another Trivia Module? Really?

## How it works

There are multiple choice questions and "True or False" questions. You can choose NOT to
have multiple choice answers displayed. That's a bit more challenging. You see the questions
for 20 seconds and then the answer for 10 seconds, then it's on to the next question.
There are many categories. See Category List below.

* Annotated .css file included for aligning and coloring text and header.

## Installation

* `git clone https://github.com/mykle1/MMM-ATM` into the `~/MagicMirror/modules` directory.

* No API key needed! No dependenices needed! No kidding!


## Config.js entry and options

    {
        module: 'MMM-ATM',
        position: 'top_left',              // Works well anywhere
        config: {
			multipleChoice: "Yes",        // No = just the ? then the answer
		    useHeader: true,              // true if you want a header
            header: "Not another trivia module!",   // Any text you want
		    maxWidth: "250px",             // Stretch or constrain according to region
        }
    },
	
## Categories

* General Knowledge
* Books
* Film
* Music
* Musicals
* Television
* Theatre
* Boards Games
* Video Games
* Computers
* Science
* Nature
* Mathematics
* Mythology
* Sports
* Geography
* History
* Politics
* Art
* Celebrities
* Animals
* Vehicles
* Comics
* Gadgets
* Anime
* Manga
* Cartoons
* Aimation