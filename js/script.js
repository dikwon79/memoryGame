//Partly I used chat gpt

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
  //for clickable later
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
  
    // create as many buttons as I type in the input box.
    for(let i = 1; i <= numButtons; i++){
      const button = new Button(i);
      button.element.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      this.buttons.push(button);
      document.getElementById('buttonContainer').appendChild(button.element);
    }
  }
  gameStart(){
    //to get data from input box
    const numButtons = document.getElementById('numinput').value;
    //find the dom which is the message div 
    const msg = document.getElementById("message");
    //find question label and input box
    const main = document.getElementById('main');

    //if input value is bewteen 3 and 7
    if(numButtons >=3 && numButtons <=7){
      
      //label and input box make invisible
      main.style.display = "none";

      // screen and all variables are initialized.  
      this.clearGame();

      //using button class, make the buttons
      this.createButtons(numButtons);
      
      //every 2 seconds, as much as maden buttons,
      //Call a function that scrambles after searching elements 
      //of the array. At the end, remove the number of the button 
      for (let i = 1; i <= numButtons; i++) {
        setTimeout(() => {
          this.buttons.forEach(button => {
            this.scrambleButtons(button);
            if (i==numButtons){
              button.addClickEvent(this);
              button.element.innerHTML ='';
            }
           
          });
        }, i * 2000);  
      }
      

    }
    //input value is error : less than 3 or more than 7
    else{

      msg.style.display = "block";
      msg.innerHTML = messages.error.condition;
 
      //after 3 seconds, close the message and comes out menu again.
      setTimeout(() => {
        msg.style.display = "none";
        main.style.display = "block";   
        this.clearGame();
      }, 3000);

    }
  }
  handleButtonClick(clickedNumber) {
  
    const msg = document.getElementById("message");
    const main = document.getElementById('main');
    msg.style.display = "none";

    //clicked button is saved in the click array
    this.clickedOrder.push(clickedNumber);
    
    // compare clicked number with created button array
    if (clickedNumber == this.buttons[this.clickedOrder.length-1].number){
      //if it is same, 
      msg.innerHTML = messages.error.correctOrder;
    }else{
      //else if it is wrong

      //show the message div
      msg.style.display = "block";
      // show the message(game over)
      msg.innerHTML = messages.gameover;
      
      //if I clicked wrong button, then show all the button order!
      for (let i=0; i < this.buttons.length; i++){
        
        this.buttons[i].element.innerHTML = this.buttons[i].number;

      }
      

      // after 3 seconds, message div dont show and first page label comes out
      setTimeout(() => {
        msg.style.display = "none";
        main.style.display = "block";   
        this.clearGame();
      }, 3000);

    }
    
    //  all buttons clicked in the situation
    if (this.clickedOrder.length === this.buttons.length) {
      // compare  buttons array and clickedOrder array 
      const isCorrectOrder = this.clickedOrder.every((value, index) => value === this.buttons[index].number);
      
      // if true, print exccelent on screen
      if (isCorrectOrder) {
        msg.innerHTML = messages.error.excellent;
        msg.style.display = "block";
        msg.style.zIndex = "1";  // z-index 속성 추가
        
        setTimeout(() => {
          msg.style.display = "none";
          main.style.display = "block";
          this.clearGame();
        }, 3000);



      } 
      //clicke order initailize
      this.clickedOrder = [];
    }
  }
  
  scrambleButtons(button){
    // Set the maximum X,Y-coordinate value to ensure that the button 
    // does not go beyond the right edge of the window.

    const maxX = window.innerWidth - button.element.clientWidth;
    const maxY = window.innerHeight - button.element.clientHeight;
    
    // Generate a random X,Y-coordinate within the valid range (0 to maxX).
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    // set the CSS property of the button 
    button.element.style.position = 'absolute';  
    button.element.style.left = `${randomX}px`;
    button.element.style.top = `${randomY}px`;
  }
  clearGame(){

    //delete screen old button and initialization
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
