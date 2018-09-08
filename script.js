function grid() {
  //Remove Context Menu default behavior (right click)
  document.body.addEventListener('contextmenu', function(e) {
    e.preventDefault()
    return false
  })

  //Grid size
  var gridLines = 9
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
  var input = document.getElementById('c(0,0)')
  input.classList.add('input')
  var output = document.getElementById('c(' + (gridLines - 1) + ',' + (gridCols - 1) + ')')
  output.classList.add('output')
}

function cellClick(e) {
  var grid = document.getElementById('grid')
  var focus = document.getElementsByClassName('focus')
  var cell = document.getElementById(e.target.id)
  var cp = document.getElementById('cp')
  var i
  var empty = true
  if(localStorage.cont) {
    for (i = 0; i < localStorage.cont.length; i++) {
      if (localStorage.cont[i].id = e.target.id) {
        empty = false
        break
      }
    }
  }
  if (cp != null) {
    switch (e.button) {
      case 0:
        if (empty) {
          // TODO: paste
        }
        break;
      case 1:
      case 2:
      grid.removeChild(cp)
        break;
    }
  }
  else if (empty) {
    switch (e.button) {
      case 1:
      break;
      case 2:
        var menu = document.createElement('table')
        menu.id = 'menu'
        // TODO: Position absolute use e.client X/Y
        grid.appendChild(menu)
        console.log(e)
        fmenu(0)
      case 0:
      default:
      if (focus.length == 1) {
        focus[0].classList.remove('focus')
      }
      cell.classList.add('focus')
    }
  }
  else {
    switch (e.button) {
      case 0:
      case 2:
        break;
      case 1:
        // TODO: copy
        break;
    }
  }
}

function fmenu(level) {

  switch (level) {
    case 0:

      break;
    default:

  }

}

grid()
