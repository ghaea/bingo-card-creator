var app = angular.module("bingoCardApp", [])

app.controller("CardController", function($scope){

  $scope.board = [
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ]
  ]

  $scope.cardRule = "line"

  $scope.clickSquare = function(squareRow, squareColumn) {
    $scope.board[squareRow][squareColumn] = 1

    switch($scope.cardRule) {
      case "line":
        straightLine()
        break;
      case "fullCard":
        fullCard()
        break;
      case "corners":
        fourCorners()
        break;
      case "outline":
        outline()
        break;
      case "hashtag":
        hashtag()
        break;
      
    }
  }

  var straightLine = function() {
    var cols = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])

    var matchInColumns = _.some(cols)

    var matchInRows = _.some($scope.board, function(row){
      return _.every(row)
    })

    var leftDiagonalMatch = 1
    _.times(5, function(i){
      if (leftDiagonalMatch === 0) {
        return 0
      }
      leftDiagonalMatch = $scope.board[i][i]
    })

    var rightDiagonalMatch = 1
    _.times(5, function(i){
      if (rightDiagonalMatch === 0) {
        return 0
      }
      rightDiagonalMatch = $scope.board[i][4 - i]
    })

    var matchInDiagonal = (leftDiagonalMatch || rightDiagonalMatch)

    if (matchInColumns && matchInRows) {
      $scope.winner = true
    }

    if (matchInColumns || matchInRows || matchInDiagonal) {
      $scope.winner = true
    }
  }

  var fullCard = function() {
    var cols = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])
    console.log(cols)

    var matchFullCard = _.every($scope.board, function(row){
      return _.every(row)
    })

    if (matchFullCard) {
      $scope.winner = true
    }
  }

  var fourCorners = function() {
    // if the first index and last index of first row === true &&
    // first index and last indext of last row === true, win game
    var topLeft = _.first( _.first($scope.board) )
    var bottomLeft = _.last( _.first($scope.board) )
    var topRight = _.first( _.last($scope.board) )
    var bottomRight = _.last( _.last($scope.board) )

    if (topLeft && bottomLeft && topRight && bottomRight) {
      $scope.winner = true
    } 
  }

  var outline = function() {
    // if the top and bottom column === true &&
    // first and last row === true, win game 
    var leftColumn = _.first($scope.board)
    var rightColumn = _.last($scope.board)
    console.log(rightColumn)
    var topRow = _.every($scope.board, function(row){
      return _.first(row)
    })
    var bottomRow = _.every($scope.board, function(row){
      return _.last(row)
    })
    
    if (leftColumn && rightColumn && topRow && bottomRow) {
      $scope.winner = true
    }
  }

  var hashtag = function() {
    // if the 2nd and 4th column === true &&
    // 2nd and 4th row === true, win game
    var secondColumn = $scope.board[1] 
    var forthColumn = $scope.board[3]
    var secondRow = _.every($scope.board, function(row){
      return row[1]
    })
    var forthRow = _.every($scope.board, function(row){
      return row[3]
    })

    if(secondColumn && forthColumn && secondRow && forthRow) {
      $scope.winner = true
    }
  }

})