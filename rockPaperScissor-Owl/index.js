const { Component ,mount, xml, props, useState, useEnv, reactive} = owl;
const computersOptions = ["Rock", "Paper", "Scissor"];

const connector = () =>{
    const env = useEnv();
    return useState(env.store)
}

class updates{
    playerScore = 0;
    computerScore = 0;
    computerChoiceSpan = ""
    humanChoiceSpan = ""
    result = ""
    updatePlayerScore(){
        this.playerScore++;
    }
    getPlayerScore(){
        return this.playerScore;
    }
    updateComputerScore(){
        this.computerScore++;
    }
    getComputerScore(){
        return this.computerScore;
    }
    getComputerChoiceSpan(){
        return this.computerChoiceSpan;
    }
    getHumanChoiceSpan(){
        return this.humanChoiceSpan;
    }
    getResult(){
        return this.result;
    }
}

const updateGame = () => {
    return reactive(new updates);
}

class ComputerComponent extends Component{
    static template = xml `
        <div class="score">
            <h3><t t-esc="props.user" /></h3>
            <div class="playersDiv">
                <span id="computerChoiceSpan"><t t-esc="this.changes.getComputerChoiceSpan()" /></span>
            </div>
        </div>
    `
    setup(){
        this.changes = connector();
    }
    static props = ["user"];
}
class PlayerComponent extends Component{
    static template = xml `
        <div class="score"> 
            <h3><t t-esc="props.user" /></h3>
            <div class="playersDiv">
                <span id="humanChoiceSpan"><t t-esc="this.changes.getHumanChoiceSpan()" /></span>
            </div>
        </div>
    `
    setup(){
        this.changes = connector();
    }
    static props = ["user"]
}
class Score extends Component{
    static template = xml`
        <div class="d-flex container">
            <div>
                Player <span id="humanScore"><t t-esc="this.changes.getPlayerScore()" /></span> :
                <span id="computerScore"><t t-esc="this.changes.getComputerScore()" /></span> Computer
                <div class="resultDiv">
                    Result: <span id="result"><t t-esc="this.changes.getResult()" /></span>
                </div>
            </div>
        </div>
    `;

    setup(){
        this.changes = connector();
    }
}
class Buttons extends Component{
    static template = xml`
        <div class="innerDiv">
            <button value="Rock" t-on-click="rockBtn">Rock</button>
            <button value="Paper" t-on-click="paperBtn">Paper</button>
            <button value="Scissor" t-on-click="scissorBtn">Scissor</button>
        </div>
    `
    setup(){
        this.changes = connector();
    }
    rockBtn(){
        let computerChoice = Math.floor(Math.random() * 3);
        this.changes.computerChoiceSpan = computersOptions[computerChoice];
        this.changes.humanChoiceSpan = "Rock";
        if (computerChoice === 0) {
            this.changes.result = "Draw";
        } else if (computerChoice === 1) {
            this.changes.result = "Computer Won!!!";
            this.changes.updateComputerScore();
        } else {
            this.changes.result = "You Won!!!";
            this.changes.updatePlayerScore();
        }
    }
    paperBtn(){
        let computerChoice = Math.floor(Math.random() * 3);
        this.changes.computerChoiceSpan = computersOptions[computerChoice];
        this.changes.humanChoiceSpan = "Paper";
        if (computerChoice === 0) {
            this.changes.result = "You Won!!!";
            this.changes.updatePlayerScore();
        } else if (computerChoice === 1) {
            this.changes.result = "Draw";
        } else {
            this.changes.result = "Computer Won!!!";
            this.changes.updateComputerScore();
        }
    }
    scissorBtn(){
        let computerChoice = Math.floor(Math.random() * 3);
        this.changes.computerChoiceSpan = computersOptions[computerChoice];
        this.changes.humanChoiceSpan = "Scissor";
        if (computerChoice === 0) {
            this.changes.result = "Computer Won!!!";
            this.changes.updateComputerScore();
        } else if (computerChoice === 1) {
            this.changes.result = "You Won!!!";
            this.changes.updatePlayerScore();
        } else {
            this.changes.result = "Draw";
        }
    }
}
class App extends Component{
    static template = xml `
        <h1>Rock Paper Scissor</h1>
        <div>
            <div class="outerDiv">
                <ComputerComponent user="'Computer'"/>
                <Score/>
                <PlayerComponent user="'Player'"/>
                <Buttons />
            </div>
            <button t-on-click="resetBtn" id="resetBtn">Reset</button>
        </div>
    `
    setup(){
        this.changes = connector();
    }

    resetBtn(){
        this.changes.humanChoiceSpan = "";
        this.changes.computerChoiceSpan = "";
        this.changes.playerScore = 0;
        this.changes.computerScore = 0;
        this.changes.result = "";
    }
    static components = {Buttons, Score, ComputerComponent, PlayerComponent};
}

const env = {store: updateGame()};

mount (App, document.body, {dev: true, env})