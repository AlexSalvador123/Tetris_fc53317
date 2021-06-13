document.addEventListener('DOMContentLoaded',() =>{
    const width = 10
    const grid2 = document.querySelector('.grid2')
    const grid = document.querySelector('.grid')
    let squares2 = Array.from(document.querySelectorAll('.grid2 div'))
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay2 = document.querySelector('#score2')
    const ScoreDisplay = document.querySelector('#score')
    var modal = document.getElementById("myModal");
    var modal2 = document.getElementById("myModal2");
    var modal3 = document.getElementById("myModal3");
    const StartBtn = document.querySelector('#start-button')
    const StartBtn2 = document.querySelector('#start-button2')
    let timerId
    let score = 0;
    let score2 = 0;

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
    let currentPosition2 = 4
    let currentRotation2 = 0

    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current= theTetrominoes[random][currentRotation]
    let random2 = Math.floor(Math.random()*theTetrominoes.length)
    let current2= theTetrominoes[random2][currentRotation2]

    function draw(cor,cor2){
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('tetromino'+cor)
        })
        current2.forEach(index =>{
          squares2[currentPosition2 + index].classList.add('tetromino'+cor2)
      })
    }

    function undraw(cor,cor2){
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('tetromino'+cor)
        })
        current2.forEach(index =>{
          squares2[currentPosition2 + index].classList.remove('tetromino'+cor2)
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
    StartBtn2.addEventListener('click',()=>{
      modal.style.display = "block";
        if(timerId){
            clearInterval(timerId)
            timerId = null
        }
  })

    function control(e){
        if (e.key === "a"){
            moveLeft(2)
        }else if (e.key === "d"){
           moveRight(2)
        }else if (e.key === "w"){
            rotate(2)
        }else if (e.key === "s"){
            moveDown(2)
        }else if (e.key === "ArrowLeft"){
            moveLeft(1)
        }else if (e.key === "ArrowRight"){
          moveRight(1) 
        }else if (e.key === "ArrowUp"){
            rotate(1)
        }else if (e.key === "ArrowDown"){
            moveDown(1)
        }
    }
    document.addEventListener('keyup',control)

    function moveDown(n){
      if (n==1){
        undraw(random,random2)
        currentPosition+=width
        draw(random,random2)
        freeze(n)
      }else if (n==2){
        undraw(random,random2)
        currentPosition2+=width
        draw(random,random2)
        freeze(n)
      }else{
        undraw(random,random2)
        currentPosition+=width
        currentPosition2+=width
        draw(random,random2)
        freeze(1)
        freeze(2)
      }
    }

    function freeze(n){
      if (n==2){
        if(current2.some(index => squares2[currentPosition2+index+width].classList.contains('taken'))){
          current2.forEach(index => squares2[currentPosition2+index].classList.add('taken'))
          random2 = Math.floor(Math.random()*theTetrominoes.length)
          current2= theTetrominoes[random2][currentRotation2]
          currentPosition2 = 4
          draw(random,random2)
          addScore2()
          gameOver2()
      }
      }else{
        if(current.some(index => squares[currentPosition+index+width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition+index].classList.add('taken'))
            random = Math.floor(Math.random()*theTetrominoes.length)
            current= theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw(random,random2)
            addScore()
            gameOver()
        }
      }
    }

    function moveLeft(n) {
      if (n==1){
        undraw(random,random2)
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if(!isAtLeftEdge) currentPosition -=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          currentPosition +=1
        }
        draw(random,random2)
      }else{
        undraw(random,random2)
        const isAtLeftEdge = current2.some(index => (currentPosition2 + index) % width === 0)
        if(!isAtLeftEdge) currentPosition2 -=1
        if(current2.some(index => squares2[currentPosition2 + index].classList.contains('taken'))) {
          currentPosition2 +=1
        }
        draw(random,random2)
      }
    }

    function moveRight(n) {
      if (n==1){
        undraw(random,random2)
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
        if(!isAtRightEdge) currentPosition +=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }
        draw(random,random2)
    }else{
        undraw(random,random2)
        const isAtRightEdge = current2.some(index => (currentPosition2 + index) % width === width -1)
        if(!isAtRightEdge) currentPosition2 +=1
        if(current2.some(index => squares2[currentPosition2 + index].classList.contains('taken'))) {
            currentPosition2 -=1
        }
        draw(random,random2)
    }
  }

      function isAtRight() {
        return current.some(index=> (currentPosition + index + 1) % width === 0)  
      }
      
      function isAtLeft() {
        return current.some(index=> (currentPosition + index) % width === 0)
      }
      function isAtRight2() {
        return current2.some(index=> (currentPosition2 + index + 1) % width === 0)  
      }
      
      function isAtLeft2() {
        return current2.some(index=> (currentPosition2 + index) % width === 0)
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

      function checkRotatedPosition2(P){
        P = P || currentPosition2       //get current position.  Then, check if the piece is near the left side.
        if ((P+1) % width < 4) {         //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
          if (isAtRight2()){            //use actual position to check if it's flipped over to right side
            currentPosition2 += 1    //if so, add one to wrap it back around
            checkRotatedPosition2(P) //check again.  Pass position from start, since long block might need to move more.
            }
        }
        else if (P % width > 5) {
          if (isAtLeft2()){
            currentPosition2 -= 1
          checkRotatedPosition2(P)
          }
        }
      }
      
      //rotate the tetromino
      function rotate(n) {
        if(n==1){
        undraw(random,random2)
        currentRotation ++
        if(currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
          currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        checkRotatedPosition()
        draw(random,random2)
    }else{
      undraw(random,random2)
        currentRotation2 ++
        if(currentRotation2 === current2.length) { //if the current rotation gets to 4, make it go back to 0
          currentRotation2 = 0
        }
        current2 = theTetrominoes[random2][currentRotation2]
        checkRotatedPosition2()
        draw(random,random2)
    }
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

      function addScore2() {
        for (let i = 0; i < 199; i +=width) {
          const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
    
          if(row.every(index => squares2[index].classList.contains('taken'))) {
            score2 +=10
            ScoreDisplay2.innerHTML = score2
            let name = ""
            row.forEach(index => {
              squares2[index].classList.remove('taken')
              squares2[index].classList.remove('tetromino0','tetromino1','tetromino2','tetromino3','tetromino4','tetromino5','tetromino6')
              squares2[index].style.backgroundColor = ''
            })
            const squaresRemoved2 = squares2.splice(i, width)
            squares2 = squaresRemoved2.concat(squares2)
            squares2.forEach(cell => grid2.appendChild(cell))
          }
        }
      }
    
      //game over
      function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          ScoreDisplay.innerHTML = 'End'
          clearInterval(timerId)
          modal3.style.display = "block";
        }
      }

      function gameOver2() {
        if(current2.some(index => squares2[currentPosition2 + index].classList.contains('taken'))) {
          ScoreDisplay2.innerHTML = 'End'
          clearInterval(timerId)
          modal2.style.display = "block";
        }
      }
      var myspan = document.getElementsByClassName("close1")[0];
      myspan.onclick = function() {
        console.log("entrei")
        modal.style.display = "none";
        draw(random)
        timerId = setInterval(moveDown,1000)
      }

      var myspan2 = document.getElementsByClassName("close2")[0];
      myspan2.onclick = function() {
        window.location.href=""
      }
      var myspan3 = document.getElementsByClassName("close3")[0];
      myspan3.onclick = function() {
        window.location.href=""
      }
    })