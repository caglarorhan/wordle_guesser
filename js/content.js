window.addEventListener('load',async ()=>{
    console.log('WORDLE GUESSER IS UP & RUNNING...');
    chrome.runtime.onMessage.addListener(  async (request)=>{
        WG[request.type](request.payload);
        // insertNewWordToBoard
        // printToConsole
        // resetData
        // gameModalAutoClose
        // gameModalAutoClose_switch
        // giveGameBoardStatus
        console.log(localStorage)
    })
    let sT = setTimeout(()=>{
    WG.gameModalAutoClose_status();
    },100)

})
const WG ={
    gameHomeUrl: 'https://www.bundle.app/wordle-tr',
    sendMessageToPopup:function (messageObject){chrome.runtime.sendMessage(messageObject)},
    getBoardState: function (){
        let wordList =[];
        let evalList = []
        document.querySelector('game-app').shadowRoot.querySelectorAll('#board>game-row').forEach((row,rowIndex)=>{
            wordList.push(row.getAttribute('letters'));
            wordList = wordList.filter(word=>word !== '');
            let evaluation =[];
            row.shadowRoot.querySelectorAll('game-tile').forEach((tile,tileIndex)=>{
                evaluation.push(tile.getAttribute('evaluation'))
            })
            if(evaluation[0]){evalList.push(evaluation)};
        })
        console.log(evalList);
        return {
            wordList,
            evalList
        }
    },
    printToConsole:function(payload){console.log(payload.message)},
    insertNewWordToBoard:  function (payload){
        let newWord = payload.word;
        let gameAppKeyBoard = document.querySelector('game-app').shadowRoot.querySelector('game-keyboard')
            newWord.split('').forEach( (letter)=>{
                gameAppKeyBoard.shadowRoot.querySelector("button[data-key='"+letter+"']").click();
            })
            gameAppKeyBoard.shadowRoot.querySelector("button[data-key='↵']").click();
    setTimeout(()=>{
        WG.sendMessageToPopup({type: "gameStatus", payload:{boardStatus:WG.getBoardState()}})
    },2000)
    },
    gameModalAutoClose_switch:(payload)=>{
        console.log('gameModalAutoClose_switch config checking...')
        console.log(`Gelen payload: ${JSON.stringify(payload)}`)
        localStorage.setItem('gameModalAutoClose_switch',""+payload.gameModalAutoClose+"");
        WG.gameModalAutoClose_status();
    },
    gameModalAutoClose_status: ()=>{
            if(localStorage.getItem('gameModalAutoClose_switch')==="true"){
                if(document.querySelector('game-app').shadowRoot.querySelector('game-modal').shadowRoot.querySelector('.close-icon')){
                    document.querySelector('game-app').shadowRoot.querySelector('game-modal').shadowRoot.querySelector('.close-icon').click()
                }
            }
            WG.sendMessageToPopup({type:'gameModalAutoClose_status',payload:{gameModalAutoClose:localStorage.getItem('gameModalAutoClose_switch')}})

    },
    resetData: async (payload)=>{
        let gameModalAtoClose_switch = localStorage.getItem('gameModalAutoClose_switch');
    await localStorage.clear();
        localStorage.setItem('gameModalAutoClose_switch',gameModalAtoClose_switch);
    WG.printToConsole(payload)
    WG.sendMessageToPopup({type:'noteIt', payload: {message:"Local Storage data is cleared!"}})
        window.location.replace(WG.gameHomeUrl);
    },
    giveStatistics:()=>{
        WG.sendMessageToPopup({type:"getStatistics", payload:{statistics:window.localStorage.getItem("statistics")}});
        // '{"currentStreak":100,"maxStreak":100,"guesses":{"1":100,"2":0,"3":0,"4":0,"5":0,"6":0,"fail":0},"winPercentage":100,"gamesPlayed":100,"gamesWon":100,"averageGuesses":1}'
    },
}



