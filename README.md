# Designing a JavaScript constructor function of a Word Game

### Objectives:

* Submit a word on behalf of a player. A word is accepted if its letters are contained in the base string used to construct the game AND if it is in the word list provided: wordlist.txt.
* If the word is accepted and its score is high enough, the submission should be added to the high score list. If there are multiple submissions with the same score, all are accepted, BUT the first submission with that score should rank higher.
* A word can only appear ONCE in the high score list. If the word is already present in the high score list the submission should be rejected.
* Have a method that returns the word entry at given position in the high score list, 0 being the highest (best score) and 9 the lowest.
* Have a method that return the score at the given position in the high score list, 0 being the highest (best score) and 9 the lowest.