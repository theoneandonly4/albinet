function init() {
  //Remove Context Menu default behavior (right click)
  document.body.addEventListener('contextmenu', function(e) {
    e.preventDefault()
    return false
  })

  //Grid size
  var gridLines = 1
  var gridCols = 9

  //Update body and cell size depending on window size
  var width = window.innerWidth
  var height = window.innerHeight

  cellSide = 50
  document.body.style.width = cellSide * gridCols + 'px'
  document.body.style.height = cellSide * gridLines + 'px'

  //Generate Grid
  var grid = document.createElement('table')
  grid.id = 'grid'

  grid.style.padding = cellSide / 2 + 'px'

  var i, j
  for (i = 0; i < gridLines; i++) {
    var row = document.createElement('tr')
    row.style.width = cellSide * gridCols  + 'px'
    row.style.height = cellSide + 'px'

    for (j = 0; j < gridCols; j++) {
      var cell = document.createElement('td')
      cell.id = 'c(' + i + ',' + j + ')'
      cell.style.width = cellSide + 'px'
      cell.style.height = cellSide + 'px'
      cell.addEventListener('mouseup', cellClick)
      row.appendChild(cell)
    }

    grid.appendChild(row)
  }

  document.body.appendChild(grid)
}

function cellClick(e) {
  console.log(e.button)
  console.log(e.target.id)
}

init()
