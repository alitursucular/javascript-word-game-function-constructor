//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
//  My favorite color is blue.
//----------------------------------------------------------------------------------------------------------
//  Note: Instance creation of the WordGame constructor function and regarding method calls are available at the end of this file.
//----------------------------------------------------------------------------------------------------------

WordGame = function (baseString, path) {

    this.baseString = baseString;

    this.acceptedWords = fetch(path)
        .then(response => response.text())
        .then(data => { this.acceptedWords = data.split("\n") })
        .catch(error => console.warn(error));

    this.highScoreList = [];

    this.submitWord = function (word) {
        let check = 0;
        let baseClone = this.baseString;

        // The below loop checks for presence of the entered word in the given base string.
        // The operation alters the clone of the base string using the index of each letter of the entered word.
        for (let i = 0; i < word.length; i++) {
            if (baseClone.includes(word[i])) {
                let charIndex = baseClone.indexOf(word[i]);
                baseClone = baseClone.slice(0, charIndex) + baseClone.slice(charIndex + 1);
                check++;
            }
        }

        if (check === word.length) { // Check if all the letters in the entered word are present in the base string.
            if (this.acceptedWords.includes(word)) { // Check if the entered word is present in the word list.

                if (this.highScoreList.length === 0) { // This condition is only put to prevent the reduce method's potential error of no initial value.
                    this.highScoreList.push({ 'word': word, 'score': word.length });
                }

                const existence = this.highScoreList.some(el => el.word === word);

                const existingLowestScore = this.highScoreList.reduce(function (res, obj) {
                    return (obj.score < res.score) ? obj : res;
                });

                if (!existence) {
                    if (this.highScoreList.length < 10) {
                        this.highScoreList.push({ 'word': word, 'score': word.length });
                    } else {
                        if (existingLowestScore.score < word.length) {
                            this.highScoreList.splice(this.highScoreList.indexOf(existingLowestScore), 1);
                            this.highScoreList.push({ 'word': word, 'score': word.length });
                        }
                    }
                }
            } else { // Word is not present in the wordlist.txt file.
                console.log("Word is not present in the wordlist.txt file");
            }
        } else { // Not all letters can be found in the base string.
            console.log("Not all letters can be found in the base string");
        }
    };

    this.getWordEntryAtPosition = function (position) {
        if (this.highScoreList && position < this.highScoreList.length) { // Check if there is entry.
            this.highScoreList.sort((a, b) => (b.score - a.score)); // Let's sort saved words. 
            return this.highScoreList[position].word;

        } else { // There isn't any entry in the high score for the given position
            console.log("There isn't any entry in the high score for the given position");
            return null;
        }
    };

    this.getScoreAtPosition = function (position) {
        if (this.highScoreList && position < this.highScoreList.length) { // Check if there is entry.
            this.highScoreList.sort((a, b) => (b.score - a.score)); // Let's sort saved words. 
            return this.highScoreList[position].score;

        } else { // There isn't any entry in the high score for the given position
            console.log("There isn't any entry in the high score for the given position");
            return null;
        }
    };
};


/**
 *
 * @parameter1 : Base string,
 * @parameter2 : Absolute path to the external word list file.
 *
*/
// const game = new WordGame("areallylongword", "wordlist.txt");
// game.submitWord("really");
// game.getWordEntryAtPosition(0);
// game.getScoreAtPosition(0);