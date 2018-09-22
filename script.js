//Object Constructors
function Element(prt,id,typ,shTtl,lgTtl) {
  this.prt = prt
  this.id =  id
  this.typ = typ
  this.shTtl = shTtl
  this.lgTtl = lgTtl
}

//Execution
main()

//Main function
function main() {
  //Remove Context Menu default behavior (right click)
  document.body.addEventListener('contextmenu', function(e) {
    e.preventDefault()
    return false
  })

  init()
  grid()
  disp()
  save()
}

//Environment Variables initialization function
function init() {
  var env
  var cont
  var typList
  if (!localStorage.env) {
    env = {
      prt: 'main',
      lines: 3,
      cols: 5,
      cell: 50
    }
    localStorage.env = JSON.stringify(env)
  }
  if (!localStorage.cont) {
    cont = []
    localStorage.cont = JSON.stringify(cont)
  }
  typList = {
// TODO: define default element types
// TODO: change list to fetch from DataBase
  }

}

//Grid creation function
function grid() {
  var env = JSON.parse(localStorage.env)

  //Grid size
  var gridLines = env.lines
  var gridCols = env.cols
  var cellSide = env.cell
  var halfCellSide = Math.floor(cellSide / 2)
  document.body.style.width =  cellSide * gridCols + 'px'
  document.body.style.height = cellSide * gridLines + 'px'

  //Generate Grid
  var grid = document.createElement('table')
  grid.id = 'grid'

  var i, j
  for (i = 0; i < gridLines + 2; i++) {
    var row = document.createElement('tr')
    row.style.width =  cellSide * gridCols  + 'px'
    row.style.height = cellSide + 'px'

    for (j = 0; j < gridCols + 2; j++) {
      var cell = document.createElement('td')
      cell.style.width =  cellSide + 'px'
      cell.style.height = cellSide + 'px'

      switch (i) {
        case 0:
          switch (j) {
            case 0:
              cell.id = 'topleft'
              cell.classList.add('corner')
              break

            default:
              cell.id = 'col(' + j + ')'
              cell.classList.add('colrow')
              break

            case gridCols + 1:
              cell.id = 'topright'
              cell.classList.add('corner')
              break
          }
          break

        default:
          switch (j) {
            case 0:
              cell.id = 'row(' + i + ')'
              cell.classList.add('colrow')
              break

            case 1:
            cell.classList.add('input')
              cell.id = 'c(' + i + ',' + j + ')'
              cell.addEventListener('mouseup', cellClick)
              break

            default:
              cell.id = 'c(' + i + ',' + j + ')'
              cell.addEventListener('mouseup', cellClick)
              break

            case gridCols:
              cell.classList.add('output')
              cell.id = 'c(' + i + ',' + j + ')'
              cell.addEventListener('mouseup', cellClick)
              break

            case gridCols + 1:
              cell.id = 'row(' + i + ')'
              cell.classList.add('colrow')
              break

          }
          break

        case gridLines + 1:
          switch (j) {
            case 0:
              cell.id = 'botleft'
              cell.classList.add('corner')
              break

            default:
              cell.id = 'col(' + j + ')'
              cell.classList.add('colrow')
              break

            case gridCols + 1:
              cell.id = 'botright'
              cell.classList.add('corner')
              break
          }
          break

      }
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

function save() {
  // TODO: Implement save functionality to local JSON File > https://codepen.io/davidelrizzo/pen/cxsGb
  // TODO: Implement save functionality to DB
  // TODO: Display save status in topleft corner
}

function cons() {
  // TODO: Display botleft alerts from UI + Server + AI
  // TODO: Make cell float if it is outside of viewport
}

function plan() {
  // TODO: Display topright time, work and calendar
  // TODO: Work elements and events creation
  // TODO: Make cell float if it is outside of viewport
}

function comm() {
  // TODO: Display Announcements
  // TODO: Make cell float if it is outside of viewport
}

function addRow() {

}

function delRow() {

}

function addCol() {

}

function delCol() {

}

//Clicks in Grid function
function cellClick(e) {
  var cont =  JSON.parse(localStorage.cont)
  var grid =  document.getElementById('grid')
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
      case 2:
        creEl(e.target.id)
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

//Item Creation in localStorage function
function creEl(elId) {
  var env =   JSON.parse(localStorage.env)
  var cont =  JSON.parse(localStorage.cont)
  var elItm = new Element(env.prt, elId, 'none', 'New El','New Element')

  cont.push(elItm)
  localStorage.cont = JSON.stringify(cont)

  env.currItm = elItm
  localStorage.env = JSON.stringify(env)

  //Item Display
  disEl(elItm)
}

function delEl() {
  
}

//Element display in Cell function
function disEl(elItm) {
  var el =  document.getElementById(elItm.id)
  var p =   document.createElement('p')
  var typ = document.createElement('img')
  var imgFile
  var inp = document.createElement('img')
  var out = document.createElement('img')
  if (elItm.typ == 'none') {
    imgFile = 'Knob-Help.ico'
  }

  p.classList.add('title')
  p.innerHTML = elItm.shTtl
  p.addEventListener('mouseup', ttl)

  inp.setAttribute('src', './src/img/Knob-Blue.ico')
  inp.style.width =  '8px'
  inp.style.height = '8px'

  typ.classList.add('typ')
  typ.setAttribute('src', './src/img/' + imgFile)
  typ.addEventListener('mouseup', typ)

  out.setAttribute('src', './src/img/Knob-Green.ico')
  out.style.width =  '8px'
  out.style.height = '8px'

  el.appendChild(p)
  el.appendChild(inp)
  el.appendChild(typ)
  el.appendChild(out)
}

//Change Short and Long titles
function ttl(e) {

  var focus = document.getElementsByClassName('focus')
  var grid = document.getElementById('grid')
  var el =          document.getElementById(e.target.parentNode.id)
  var rect =        el.getBoundingClientRect()
  var ttlWin =      document.createElement('div')
  var lblShTtl =    document.createElement('label')
  var lblShTtlTxt = document.createTextNode('Short Desc')
  var shTtl =       document.createElement('input')
  var lblLgTtl =    document.createElement('label')
  var ok =          document.createElement('img')
  var ccl =         document.createElement('img')
  var br =          document.createElement('br')
  var lblLgTtlTxt = document.createTextNode('Desc')
  var lgTtl =       document.createElement('input')
  var cont =        JSON.parse(localStorage.cont)
  var env =         JSON.parse(localStorage.env)
  var elItm
  var i

  //Set Focus
  if (focus.length == 1) {
    focus[0].classList.remove('focus')
  }
  el.classList.add('focus')

  //Remove existing title edition window if it already exists
  var prevTtlWin = document.getElementById('ttlWin')
  if (prevTtlWin != null) {
    grid.removeChild(prevTtlWin)
  }

  //Get Element from localStorage
  for (i = 0; i < cont.length; i++) {
    if (cont[i].id == el.id) {
      elItm = cont[i]
    }
  }

  //Set Environment Current Item
  env.currItm = elItm
  localStorage.env = JSON.stringify(env)

  //Check Right Click before display title Window
  if (e.button != 2) {
    return false
  }

  ttlWin.id =             'ttlWin'
  ttlWin.style.position = 'absolute'
  ttlWin.style.top =      rect.top + 'px'
  ttlWin.style.left =     rect.left + 'px'

  lblShTtl.setAttribute('for', 'shTtl')

  shTtl.id =         'shTtl'
  shTtl.setAttribute('type', 'text')
  shTtl.setAttribute('name', 'shTtl')
  shTtl.setAttribute('value', elItm.shTtl)
  shTtl.setAttribute('size', '6')
  shTtl.setAttribute('maxlength', '6')
  shTtl.addEventListener('keypress', formTtl)

  ok.setAttribute('src', './src/img/Knob-Valid-Green.ico')
  ok.style.width =  '20px'
  ok.style.height = '20px'
  ok.addEventListener('click', chgTtl)

  ccl.setAttribute('src', './src/img/Knob-Cancel.ico')
  ccl.style.width =  '20px'
  ccl.style.height = '20px'
  ccl.addEventListener('click', hideParent)

  lblLgTtl.setAttribute('for', 'lgTtl')

  lgTtl.id =         'lgTtl'
  lgTtl.setAttribute('type', 'text')
  lgTtl.setAttribute('name', 'lgTtl')
  lgTtl.setAttribute('value', elItm.lgTtl)
  lgTtl.setAttribute('size', '20')
  lgTtl.setAttribute('maxlength', '20')
  lgTtl.addEventListener('keypress', formTtl)

  lblShTtl.appendChild(lblShTtlTxt)
  ttlWin.appendChild(lblShTtl)
  ttlWin.appendChild(shTtl)
  ttlWin.appendChild(ok)
  ttlWin.appendChild(ccl)
  ttlWin.appendChild(br)
  lblLgTtl.appendChild(lblLgTtlTxt)
  ttlWin.appendChild(lblLgTtl)
  ttlWin.appendChild(lgTtl)

  grid.appendChild(ttlWin)
}

function formTtl(e) {
  if (e.key == 'Enter') {
    chgTtl()
  }
}

function chgTtl() {
  var cont =  JSON.parse(localStorage.cont)
  var env =   JSON.parse(localStorage.env)
  var shTtl = document.getElementById('shTtl')
  var lgTtl = document.getElementById('lgTtl')
  var i

  for (i = 0; i < cont.length; i++) {
    if (cont[i].id == env.currItm.id) {
      cont[i].shTtl = shTtl.value
      cont[i].lgTtl = lgTtl.value
      chgEl(cont[i])
      break
    }
  }
  localStorage.cont = JSON.stringify(cont)
}

function hideParent(e) {
  parent = document.getElementById(e.target.parentNode.id)
  parent.parentNode.removeChild(parent)
}

function chgEl(elItm) {
  var grid = document.getElementById('grid')
  //Remove existing title edition window if it already exists
  var prevTtlWin = document.getElementById('ttlWin')
  if (prevTtlWin != null) {
    grid.removeChild(prevTtlWin)
  }

  var el = document.getElementById(elItm.id)
  var shTtl = el.getElementsByClassName('title')[0]
  // var typ =
  var imgFile
  if (elItm.typ == 'none') {
    imgFile = 'Knob-Help.ico'
  shTtl.innerHTML = elItm.shTtl
  }
}

//Change type
function typ(e) {

  var focus = document.getElementsByClassName('focus')
  var grid = document.getElementById('grid')
  var el =          document.getElementById(e.target.parentNode.id)
  var rect =        el.getBoundingClientRect()
  var typWin =      document.createElement('div')
  var br =          document.createElement('br')
  var cont =        JSON.parse(localStorage.cont)
  var env =         JSON.parse(localStorage.env)
  var elItm
  var i

  //Set Focus
  if (focus.length == 1) {
    focus[0].classList.remove('focus')
  }
  el.classList.add('focus')

  //Remove existing title edition window if it already exists
  var prevTyplWin = document.getElementById('typWin')
  if (prevTtlWin != null) {
    grid.removeChild(prevTypWin)
  }

  //Get Element from localStorage
  for (i = 0; i < cont.length; i++) {
    if (cont[i].id == el.id) {
      elItm = cont[i]
    }
  }

  //Set Environment Current Item
  env.currItm = elItm
  localStorage.env = JSON.stringify(env)

  //Check Right Click before display title Window
  if (e.button != 2) {
    return false
  }
}
