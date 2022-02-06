window.addEventListener('load',()=>{
    console.log('WORDLE GUESSER IS UP & RUNNING...');
    chrome.runtime.onMessage.addListener(  async (request)=>{
        switch(request.type){
            case 'newWord':
                if(request.payload.word){
                   WG.insertNewWordToBoard(request.payload.word)
                       .then(()=>{
                       WG.requestNewWord(WG.queryBuilder())
                   })
                       .catch(err=>{
                           console.log(err);
                       })
                }
                break;
            case 'plainMessageFromPopup':
                console.log(`POPUP:${request.payload.message}`);
                break;
            default:
                break;
        }
    })
})

const WG ={
    boardHeight:6,
    lowerCaseLetters:[
        "a",
        "b",
        "c",
        "ç",
        "d",
        "e",
        "f",
        "g",
        "ğ",
        "h",
        "ı",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "ö",
        "p",
        "r",
        "s",
        "ş",
        "t",
        "u",
        "ü",
        "v",
        "y",
        "z"
    ],
    upperCaseLetters:[
        "A",
        "B",
        "C",
        "Ç",
        "D",
        "E",
        "F",
        "G",
        "Ğ",
        "H",
        "I",
        "İ",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "Ö",
        "P",
        "R",
        "S",
        "Ş",
        "T",
        "U",
        "Ü",
        "V",
        "Y",
        "Z"],
    getBoardState: function (){
        let wordList =[];
        let evalList = []
        document.querySelector('game-app').shadowRoot.querySelectorAll('#board>game-row').forEach((row,rowIndex)=>{
            wordList.push(row.getAttribute('letters'));
            let eval =[];
            row.shadowRoot.querySelectorAll('game-tile').forEach((tile,tileIndex)=>{eval.push(tile.getAttribute('evaluation'))})
            evalList.push(eval);

        })
        return {
            wordList,
            evalList
        }
    },
    queryBuilder:function (){
        let queries = [];
        let boardState = WG.getBoardState();
        let evaluations = boardState.evalList;
        let words = boardState.wordList;
        words.forEach((word,wordIndex)=>{
            if(word === ''){return;}
            word.split('').forEach((letter,letterIndex)=>{
                let lettersWithClueMap = {}

                let queryObject =Object.create(null);
                        queryObject.status = evaluations[wordIndex][letterIndex];
                        if(['correct','present'].includes(queryObject.status)){
                            if(lettersWithClueMap[letter] === undefined){
                                lettersWithClueMap[letter] = 1;
                        }else{
                            lettersWithClueMap[letter]++;
                        }
                        }
                        queryObject.letter = this.upperCaseLetters[this.lowerCaseLetters.indexOf(letter)];
                        queryObject.position = letterIndex;
                        queryObject.isMultiple = lettersWithClueMap[letter] > 1;
                        queries.push(queryObject);
            })
        })
        return queries;
    },
    requestNewWord:function (queries){
        let wordsOnBoard = WG.getBoardState().wordList.filter(word=>word !== '');
        if(wordsOnBoard.length === WG.boardHeight){
            return;
        }
        this.sendMessageToPopup({type:'getNewWord',payload:{queries:queries, wordsOnBoard:wordsOnBoard}});
    },
    insertNewWordToBoard:function (newWord){
        return new Promise((resolve,reject)=>{
            let gameApp = document.querySelector('game-app')
            newWord.split('').forEach(letter=>{
                let lowerCaseLetter = this.lowerCaseLetters[this.upperCaseLetters.indexOf(letter)];
                gameApp.shadowRoot.querySelector('game-keyboard').shadowRoot.querySelector("button[data-key='"+lowerCaseLetter+"']").click()
            })
            gameApp.shadowRoot.querySelector('game-keyboard').shadowRoot.querySelector("button[data-key='↵']").click();
            resolve();
        })
    },
    sendMessageToPopup:function (messageObject){
        chrome.runtime.sendMessage(messageObject);
    },
}



