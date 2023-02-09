const { Component ,mount, xml} = owl;
const computersOptions = ["Rock", "Paper", "Scissor"];

class ComputerComponent extends Component{
    static template = xml `
        <div class="score">
            <h3><t t-esc="props.user" /></h3>
            <div class="playersDiv">
                <t t-set="playerSpan" t-value="props.playerSpan"/>
                <span id="computerChoiceSpan"></span>
                <span id="computerChoiceIcon"></span>
            </div>
        </div>
    `
    static props = ["user"];

}
class PlayerComponent extends Component{
    static template = xml `
        <div class="score"> 
            <h3><t t-esc="props.user" /></h3>
            <div class="playersDiv">
                <span id="humanChoiceSpan"></span>
                <span id="humanChoiceIcon"></span>
            </div>
        </div>
    `
    static props = ["user"]
}
class Score extends Component{
    static template = xml`
        <div class="d-flex container">
            <div>
                Player <span id="humanScore">0</span> :
                <span id="computerScore">0</span> Computer
                <div class="resultDiv">
                    Result: <span id="result"></span>
                </div>
            </div>
        </div>
    `;
}
class Buttons extends Component{
    static template = xml`
        <div class="innerDiv">
            <button value="Rock" t-on-click="rockBtn">Rock</button>
            <button value="Paper" t-on-click="paperBtn">Paper</button>
            <button value="Scissor" t-on-click="scissorBtn">Scissor</button>
        </div>
    `
    
    rockBtn(){
        let computerChoice = Math.floor(Math.random() * 3);
        computerChoiceSpan.innerText = computersOptions[computerChoice];
        humanChoiceIcon.innerHTML =
            '<i class="fa-solid fa-hand-back-fist fa-5x"></i>';
        humanChoiceSpan.innerText = "Rock";
        if (computerChoice === 0) {
            result.innerText = "Draw";
            computerChoiceIcon.innerHTML =
                '<i class="fa-solid fa-hand-back-fist fa-5x"></i>';
        } else if (computerChoice === 1) {
            result.innerText = "Computer Won!!!";
            computerChoiceIcon.innerHTML =
                '<i class="fa-solid fa-hand fa-5x"></i>';
            computerScore.innerText++;
        } else {
            result.innerText = "You Won!!!";
            computerChoiceIcon.innerHTML =
                '<i class="fa-solid fa-hand-scissors fa-5x"></i>';
            humanScore.innerText++;
        }
    }
    paperBtn(){
        let computerChoice = Math.floor(Math.random() * 3);
        computerChoiceSpan.innerText = computersOptions[computerChoice];
        humanChoiceIcon.innerHTML = '<i class="fa-solid fa-hand fa-5x"></i>';
        humanChoiceSpan.innerText = "Paper";
        if (computerChoice === 0) {
            result.innerText = "You Won!!!";
            computerChoiceIcon.innerHTML =
                '<i class="fa-solid fa-hand-back-fist fa-5x"></i>';
            humanScore.innerText++;
        } else if (computerChoice === 1) {
            computerChoiceIcon.innerHTML =
                '<i class="fa-solid fa-hand fa-5x"></i>';
            result.innerText = "Draw";
        } else {
            result.innerText = "Computer Won!!!";
            computerChoiceIcon.innerHTML =
                '<i class="fa-solid fa-hand-scissors fa-5x"></i>';
            computerScore.innerText++;
        }
    }
    scissorBtn(){
        let computerChoice = Math.floor(Math.random() * 3);
        computerChoiceSpan.innerText = computersOptions[computerChoice];
        humanChoiceIcon.innerHTML =
            '<i class="fa-solid fa-hand-scissors fa-5x"></i>';
        humanChoiceSpan.innerText = "Scissor";
        if (computerChoice === 0) {
            result.innerText = "Computer Won!!!";
            computerChoiceIcon.innerHTML =
                '<i class="fa-solid fa-hand-back-fist fa-5x"></i>';

            computerScore.innerText++;
        } else if (computerChoice === 1) {
            result.innerText = "You Won!!!";
            computerChoiceIcon.innerHTML =
                '<i class="fa-solid fa-hand fa-5x"></i>';
            humanScore.innerText++;
        } else {
            result.innerText = "Draw";
            computerChoiceIcon.innerHTML =
                '<i class="fa-solid fa-hand-scissors fa-5x"></i>';
        }
    }
}
class App extends Component{
    static template = xml `
        <h1>Rock Paper Scissor</h1>
        <div>
            <div class="outerDiv">
                <ComputerComponent user="'Computer'"/>
                <Score count="abc"/>
                <PlayerComponent user="'Player'"/>
                <Buttons />
            </div>
            <button t-on-click="resetBtn" id="resetBtn">Reset</button>
        </div>
    `
    resetBtn(){
        humanChoiceSpan.innerText = "";
        computerChoiceSpan.innerText = "";
        humanScore.innerText = 0;
        computerScore.innerText = 0;
        result.innerText = "";
        humanChoiceIcon.innerHTML = "";
        computerChoiceIcon.innerHTML = "";
    }
    static components = {Buttons, Score, ComputerComponent, PlayerComponent};
}


mount (App, document.body)
