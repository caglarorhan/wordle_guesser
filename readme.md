**What is [Wordle Guesser](https://chromewebstore.google.com/detail/guesser-for-wordle-turkis/aoaghflbehgmllepccofeghnafnfmkab?hl=en)?**

It is a browser attachment (extension) that trying to solve wordle game's Turkish version by guessing the word.
Wordle Game Turkish version is authored by [Fatih Kadir Akın](https://github.com/f)  and it is available on [Bundle.app](https://wordleturkce.bundle.app/)

**How it works?**

The Chrome Extension is written with javascript. The main working logic is to guess the hidden word with the help of the given information from the game's board. While doing this it tries to use different approaches to narrowing the word list with information collected from the game's board. Although the game keeps all its data and solutions on the localStorage we tried to solve the game as a real person by clicking the screen keyboard given.


**How to Use?**

You need to install (load) the extension by downloading all files to your local machine. After that, you should open developer mode (chrome://extensions/) on a browser (right top corner) and load the extension files (Load unpacked button -on top left corner).

After installing start that day's game by clicking the extensions icon. Open extension by clicking on the extension icon in the top right corner of the browser. You should pin it from extensions menu on top right corner (extensions icon is a puzzle piece shape)

Choose a beginning word by writing it on to extension's input field and press ENTER, repeat.
Or you can let the extension picks a popular Turkish word for you. Choose a guess method and click the checkbox (Auto-guess (starts guessing immediately)).

After a couple of days, the extension would be on extension markets.

**Guessing Methods**

There are 3 methods we used to make a "narrowed word list" to pick our guess from. Firstly, we create a position-letter frequency calculation to get the most used letters positioned in their proper places on such words. To do so, and taking sum of the frequencies, we are accumulating points for every word. If we reorder the words according to these numbers from bigger to smaller, every letter in every word has the most used position than the bottom side words letters positions in general. 

**Methods**
- Letter Frequency Sum (LFS)
- LFS & Letter Uniqueness (LU)
- Consecutive Letter Uniqueness (CLU)

**Detail Notes** 

Every time to guess a new word, all older guessed words are excluded from the list. Obtained new word list reordered by their letter-position sum number in place.
After every guess clues (letter-position and existence information) are collected from the game board. These clues are like "absent", "correct", "present" and given for every letter on the word.
 - absent means this letter is not in the current guessed word
 - correct means this letter is presence and positioning correct
 - present means this letter is presence but positioning is incorrect




 **Letter Frequency Sum (LFS)**

This method uses the list we mention above. Every guess narrows the word list. 

**LFS & Letter Uniqueness (LU)**

This method uses letter singularity in every word combined with first method. Combined means LU uses narrowed word list from guessed words (method#1: LFS) letter's clues.

**Consecutive Letter Uniqueness (CLU)**

This method has a special guessing limit because of the Turkish language letter positioning on words and the 5-letter words amount. If you choose a word that has all unique letters and choose the next words by taking into account the previous word's letters namely not picking up the word which has a letter from these words, there are only 3 words that may be picked from the method firsts narrowed list. Thus, if you increase word amount to be guessed with this method over 3, next 3 word (if needed) would be selected by method #1


**Processing In Technical Detail**

coming soon...

- Functions in detail
- Business logic in detail
- DOM search in detail
- Messaging structure between popup and content side



**Support**

If you find this project helpful or enjoyable, you can support its development by [buying me a coffee](https://www.buymeacoffee.com/caglarorhan) ☕️ or donating through [PayPal](https://paypal.me/caglarorhan?country.x=US&locale.x=en_US) .

[<img src="./img/paypal-mark-color.svg" alt="Donating through PayPal" width="20" height="20" />](https://paypal.me/caglarorhan?country.x=US&locale.x=en_US "PayPal")

[<img src="./img/bmc-icon.svg" alt="Donating through BuyMeACoffee" width="20" height="20" />](https://www.buymeacoffee.com/caglarorhan "Buy Me A Coffee")

## Feedback
For any questions, issues, or feedback, please [open an issue](../../issues) on GitHub. Your input is valuable and helps improve the attachment for everyone!
