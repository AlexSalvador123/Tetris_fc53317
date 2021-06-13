document.addEventListener('DOMContentLoaded',() =>{
    const width = 10
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.getElementById('score')
    const StartBtn = document.querySelector('#start-button')
    var modal = document.getElementById("myModal");
    var modal2 = document.getElementById("myModal2");
    let timerId
    let score = 0;

    const lTetromino = [
      [1, width+1, width*2+1, 2],
      [width, width+1, width+2, width*2+2],
      [1, width+1, width*2+1, width*2],
      [width, width*2, width*2+1, width*2+2]
    ]

    const l1Tetromino = [
      [1, width+1, width*2+1, width*2+2 ],
      [width, width+1, width+2, 2],
      [0, 1, width+1, width*2+1],
      [width, width*2, width+1, width+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const z1Tetromino = [
      [1,width,width+1,width*2],
      [0, 1,width+1,width+2],
      [1,width,width+1,width*2],
      [0, 1,width+1,width+2],
    ]

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino,z1Tetromino,l1Tetromino]

    let currentPosition = 4
    let currentRotation = 0

    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current= theTetrominoes[random][currentRotation]

    function draw(cor){
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('tetromino'+cor)
        })
    }

    function undraw(cor){
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('tetromino'+cor)
        })
    }

    timerId=setInterval(moveDown,1000)

    StartBtn.addEventListener('click',()=>{
        modal.style.display = "block";
        if(timerId){
            clearInterval(timerId)
            timerId = null
        }
    })

    function control(e){
        if (e.key === "ArrowLeft"){
            moveLeft()
        }else if (e.key === "ArrowRight"){
           moveRight() 
        }else if (e.key === "ArrowUp"){
            rotate()
        }else if (e.key === "ArrowDown"){
            moveDown()
        }
    }
    document.addEventListener('keyup',control)

    function moveDown(){
        undraw(random)
        currentPosition+=width
        draw(random)
        freeze()
    }

    function freeze(){
        if(current.some(index => squares[currentPosition+index+width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition+index].classList.add('taken'))
            random = Math.floor(Math.random()*theTetrominoes.length)
            current= theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw(random)
            addScore()
            gameOver()
        }
    }

    function moveLeft() {
        undraw(random)
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if(!isAtLeftEdge) currentPosition -=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          currentPosition +=1
        }
        draw(random)
      }

    function moveRight() {
        undraw(random)
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
        if(!isAtRightEdge) currentPosition +=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }
        draw(random)
    }

    function isAtRight() {
        return current.some(index=> (currentPosition + index + 1) % width === 0)  
      }
      
      function isAtLeft() {
        return current.some(index=> (currentPosition + index) % width === 0)
      }
      
      function checkRotatedPosition(P){
        P = P || currentPosition       //get current position.  Then, check if the piece is near the left side.
        if ((P+1) % width < 4) {         //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
          if (isAtRight()){            //use actual position to check if it's flipped over to right side
            currentPosition += 1    //if so, add one to wrap it back around
            checkRotatedPosition(P) //check again.  Pass position from start, since long block might need to move more.
            }
        }
        else if (P % width > 5) {
          if (isAtLeft()){
            currentPosition -= 1
          checkRotatedPosition(P)
          }
        }
      }
      
      //rotate the tetromino
      function rotate() {
        undraw(random)
        currentRotation ++
        if(currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
          currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        checkRotatedPosition()
        draw(random)
      }

      function addScore() {
        for (let i = 0; i < 199; i +=width) {
          const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
    
          if(row.every(index => squares[index].classList.contains('taken'))) {
            score +=10
            ScoreDisplay.innerHTML = score
            let name = ""
            row.forEach(index => {
              squares[index].classList.remove('taken')
              squares[index].classList.remove('tetromino0','tetromino1','tetromino2','tetromino3','tetromino4','tetromino5','tetromino6')
              squares[index].style.backgroundColor = ''
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
          }
        }
      }
    
      //game over
      function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          ScoreDisplay.innerHTML = 'End'
          clearInterval(timerId)
          modal2.style.display = "block";

        }
      }

      var myspan = document.getElementsByClassName("close1")[0];
      myspan.onclick = function() {
        modal.style.display = "none";
        draw(random)
        timerId = setInterval(moveDown,1000)
      }

      var myspan2 = document.getElementsByClassName("close2")[0];
      myspan2.onclick = function() {
        modal2.style.display = "none";
        for (let i = 0; i < 200; i +=1) {
          squares[i].classList.remove('tetromino0','tetromino1','tetromino2','tetromino3','tetromino4','tetromino5','tetromino6','taken')
        }
        ScoreDisplay.innerHTML = 0
        timerId = setInterval(moveDown,1000)
      }


    })