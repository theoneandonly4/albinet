//Object Constructors
function Element(prt,id,typ,ttl) {
  this.prt = prt
  this.id = id
  this.typ = typ
  this.ttl = ttl
}

//Execution
main()

//Main function
function main() {
  init()
  grid()
  disp()
}

//Environment Variables initialization function
function init() {
  if (!localStorage.env) {
    env = {prt: 'main'}
    localStorage.env = JSON.stringify(env)
  }
  if (!localStorage.cont) {
    cont = []
    localStorage.cont = JSON.stringify(cont)
  }
}

//Grid creation function
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
      if(j == 0) {
        cell.classList.add('input')
      }
      if (j == gridCols - 1) {
        cell.classList.add('output')
      }
      cell.addEventListener('mouseup', cellClick)
      row.appendChild(cell)
    }

    grid.appendChild(row)
  }
  document.body.appendChild(grid)
}

//Display existing Elements from localStorage function
function disp() {
  var cont = JSON.parse(localStorage.cont)
  var i
  for (i = 0; i < cont.length; i++) {
    disEl(cont[i])
  }
}

//Clicks in Grid function
function cellClick(e) {
  var cont = JSON.parse(localStorage.cont)
  var grid = document.getElementById('grid')
  var focus = document.getElementsByClassName('focus')

  if (e.target.localName == 'td'){
    var cell = document.getElementById(e.target.id)
  }
  else {
    return false
  }

  var cp = document.getElementById('cp')

  var i
  var empty = true
  for (i = 0; i < cont.length; i++) {
    if (cont[i].id == e.target.id) {
      empty = false
      break
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
      case 0:
        creEl(e.target.id)
      case 2:
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

//Item Creation in localStorage function
function creEl(elId) {
  var env = JSON.parse(localStorage.env)
  var cont = JSON.parse(localStorage.cont)
  elItm = new Element(env.prt, elId, 'none', 'New El')
  cont.push(elItm)
  localStorage.cont = JSON.stringify(cont)
  //Item Display
  disEl(elItm)
}

//Element display in Cell function
function disEl(elItm) {
  var el = document.getElementById(elItm.id)
  var p = document.createElement('p')
  var img = document.createElement('img')
  var imgFile
  var inp = document.createElement('img')
  var out = document.createElement('img')
  if (elItm.typ == 'none') {
    imgFile = 'Knob-Help.ico'
  }
  p.id = 'title'
  p.innerHTML = elItm.ttl
  p.addEventListener('mouseup', ttl)
  el.appendChild(p)
  inp.setAttribute('src', './src/img/Knob-Green.ico')
  inp.style.width = '8px'
  inp.style.height = '8px'
  el.appendChild(inp)
  img.setAttribute('src', './src/img/' + imgFile)
  el.appendChild(img)
  out.setAttribute('src', './src/img/Knob-Red.ico')
  out.style.width = '8px'
  out.style.height = '8px'
  el.appendChild(out)
}

function ttl() {
  console.log('ok')
}
