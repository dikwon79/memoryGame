class Button{
  constructor(number){
    this.number = number;
    this.element = document.createElement('button');
    this.element.innerHTML = number;
  }
  onClick(game){
   
    this.element.innerHTML = this.number;
    game.handleButtonClick(this.number);
    
  }
  addClickEvent(game) {
    this.element.onclick = () => this.onClick(game);
  }
}

class Game{
  constructor(){
    this.buttons = [];
    this.clickedOrder = [];

  }
  createButtons(numButtons){
  
    for(let i = 1; i <= numButtons; i++){
      const button = new Button(i);
      button.element.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      this.buttons.push(button);
      document.getElementById('buttonContainer').appendChild(button.element);
    }
  }
  gameStart(){
    const numButtons = document.getElementById('numinput').value;

    if(numButtons >=3 && numButtons <=7){

      console.log(this.buttons);
      console.log(this.clickedOrder);
      const main = document.getElementById('main');
      main.style.display = "none";
      this.clearGame();
      this.createButtons(numButtons);

      for (let i = 1; i <= numButtons; i++) {
        setTimeout(() => {
          this.buttons.forEach(button => {
            this.scrambleButtons(button);
            if (i==numButtons){
              button.addClickEvent(this);
              button.element.innerHTML ='';
            }
           
          });
        }, i * 2000);  // 각 호출 간격을 2초로 설정
      }
      

    }
    console.log(this.buttons);
  }
  handleButtonClick(clickedNumber) {
    // 클릭된 버튼의 숫자를 배열에 추가
    
    let msg = document.getElementById("message");
    const main = document.getElementById('main');
    msg.style.display = "none";

    console.log(this.buttons);
    
    this.clickedOrder.push(clickedNumber);

    if (clickedNumber == this.buttons[this.clickedOrder.length-1].number){
      
      msg.innerHTML = messages.error.correctOrder;
    }else{
      //클릭시 틀릴경우.....
      msg.style.display = "block";
      msg.innerHTML = messages.gameover;
      
      for (let i=0; i < this.buttons.length; i++){
        console.log("1:"+this.buttons[i].number);
        this.buttons[i].element.innerHTML = this.buttons[i].number;

      }
      

      // 1초 후에 msg 요소의 스타일을 block으로 변경
      setTimeout(() => {
        msg.style.display = "none";
        main.style.display = "block";
        
        this.clearGame();
      }, 3000);

    }
    
    // 모든 버튼을 클릭한 경우
    if (this.clickedOrder.length === this.buttons.length) {
      // buttons 배열과 clickedOrder 배열을 비교하여 메시지 출력
      const isCorrectOrder = this.clickedOrder.every((value, index) => value === this.buttons[index].number);

      if (isCorrectOrder) {
        msg.innerHTML = messages.error.excellent;
        msg.style.display = "block";
        //msg.style.zIndex = "1";  // z-index 속성 추가
        msg.parentNode.insertBefore(msg, msg.parentNode.firstChild);
        
        // 1초 후에 msg 요소의 스타일을 block으로 변경
        setTimeout(() => {
          msg.style.display = "none";
          main.style.display = "block";
          this.clearGame();
        }, 3000);



      } 
      // 클릭 순서 초기화
      this.clickedOrder = [];
    }
  }
  
  scrambleButtons(button){
    const maxX = window.innerWidth - button.element.clientWidth;
    const maxY = window.innerHeight - button.element.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    button.element.style.position = 'absolute';  
    button.element.style.left = `${randomX}px`;
    button.element.style.top = `${randomY}px`;
  }
  clearGame(){
    const container = document.getElementById('buttonContainer');
    container.innerHTML = '';
    this.buttons = [];
    this.clickedOrder = [];
  }

}
const game = new Game();

function gameStart(){
  game.gameStart();
}
