// let nG = this.wordle.bundle.GameApp
// nG.prototype
//
// addLetter: ƒ (e)
// addToast: ƒ (e,a)
// connectedCallback: ƒ ()
// constructor: ƒ t()
// debugTools: ƒ ()
// disconnectedCallback: ƒ ()
// evaluateRow: ƒ ()
// removeLetter: ƒ ()
// showHelpModal: ƒ ()
// showStatsModal: ƒ ()
// sizeBoard: ƒ ()
// submitGuess: ƒ ()
// visitBundle: ƒ ()
function t() {
    var e;
    s(this, t), n(p(e = a.call(this)), "tileIndex", 0), n(p(e), "rowIndex", 0), n(p(e), "solution", void 0), n(p(e), "boardState", void 0), n(p(e), "evaluations", void 0), n(p(e), "canInput", !0), n(p(e), "gameStatus", Za), n(p(e), "letterEvaluations", {}), n(p(e), "$board", void 0), n(p(e), "$keyboard", void 0), n(p(e), "$game", void 0), n(p(e), "today", void 0), n(p(e), "lastPlayedTs", void 0), n(p(e), "lastCompletedTs", void 0), n(p(e), "hardMode", void 0), n(p(e), "dayOffset", void 0), e.attachShadow({mode: "open"}), e.today = new Date;
    var o = za();
    return e.lastPlayedTs = o.lastPlayedTs, !e.lastPlayedTs || Na(new Date(e.lastPlayedTs), e.today) >= 1 ? (e.boardState = new Array(6).fill(""), e.evaluations = new Array(6).fill(null), e.solution = Da(e.today), e.dayOffset = Ga(e.today), e.lastCompletedTs = o.lastCompletedTs, e.hardMode = o.hardMode, e.restoringFromLocalStorage = !1, ja({
        rowIndex: e.rowIndex,
        boardState: e.boardState,
        evaluations: e.evaluations,
        solution: e.solution,
        gameStatus: e.gameStatus
    }), Ca("event", "level_start", {level_name: Wa(e.solution)})) : (e.boardState = o.boardState, e.evaluations = o.evaluations, e.rowIndex = o.rowIndex, e.solution = o.solution, e.dayOffset = Ga(e.today), e.letterEvaluations = $a(e.boardState, e.evaluations), e.gameStatus = o.gameStatus, e.lastCompletedTs = o.lastCompletedTs, e.hardMode = o.hardMode, e.gameStatus !== Za && (e.canInput = !1), e.restoringFromLocalStorage = !0), e
}
