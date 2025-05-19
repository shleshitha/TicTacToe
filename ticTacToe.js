let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newbtn=document.querySelector("#new_game");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let cnt=0;
boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            box.style.color="red"
            turnO=false;
        }
        else{
            box.innerText="X";
             box.style.color="green"
            turnO=true;
        }
        box.disabled=true;
        cnt++;
        let isWinner=checkwinner();
        if(cnt==9&&!isWinner){
            gameDraw();
        }
    });
});


const gameDraw=()=>{
    msg.innerText="Game is a draw";
    msgcontainer.classList.remove("hide");
    resetbtn.disabled=true;
    disableBoxes();
}
const resetGame=()=>{
    turnO=true;
    cnt=0;
    enableBoxes();
    msgcontainer.classList.add("hide");
    resetbtn.disabled=false;
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}.`;
    msgcontainer.classList.remove("hide");
    resetbtn.disabled=true;
    disableBoxes();
}

const checkwinner=()=>{
    for(let pattern of winPatterns){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1!=""&&pos2!=""&&pos3!=""){
            if(pos1===pos2&&pos2===pos3)
            {
                showWinner(pos1);
                return true;
            }
        }
    }
}

newbtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);