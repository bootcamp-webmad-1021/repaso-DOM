const stackList = document.getElementById('stack-list');
const stackInput = document.getElementById('stack-input');
const container = document.getElementById('container');
const warningTopStack = document.querySelector('#stack-container .warning-top');
const warningBottomStack = document.querySelector(
  '#stack-container .warning-bottom'
);
const addStackBtn = document.getElementById('add-stack');
const takeStackBtn = document.getElementById('take-stack');

const newStack = new Stack();

const generateContainers = () => {
  //generar un nodo de html
  for (let i = 0; i < 10; i++) {
    const li = document.createElement("li")
    li.classList.add("empty")
    stackList.appendChild(li)
  }
}

const clearStackInput = () => {
  //vaciar el valor del input
  stackInput.value = ""
};

const renderListStack = () => {
  const lis = stackList.querySelectorAll("li")
  const stack = newStack.display()

  //recorrer todas las cajas para elegir si pintarlas o no
  for (let i = 0; i < lis.length; i++) {
    if (stack[i] !== undefined) {
      //si hay elemento para rellenar
      //mete el texto
      lis[i].innerHTML = stack[i]
      //cambia las clases
      lis[i].classList.add("filled")
      lis[i].classList.remove("empty")
    } else {
      //si no tengo elemento para rellenar vacia la caja
      lis[i].innerHTML = ""
      lis[i].classList.add("empty")
      lis[i].classList.remove("filled")
    }
  }

};

renderListStack();

const generateWarningStack = (type) => {
  if (type === 'underflow') {
    //darle visibilidad y texto al bloque de error
    warningBottomStack.innerHTML = "STACK_UNDERFLOW"
    warningBottomStack.style.display = "block"

  } else if (type === 'overflow') {

    //si quisieramos evitar lanzar este código cuando el bloque ya se muestra:
    // if(warningTopStack.style.display === "block") return

    warningTopStack.innerHTML = "STACK_OVERFLOW"
    warningTopStack.style.display = "block"
  }
};

const addToStack = () => {
  try {
    //texto escrito por el usuario
    const value = stackInput.value
    newStack.push(value)
    clearStackInput()
    renderListStack()
  } catch (error) {

    generateWarningStack("overflow")
  }
};

const removeFromStack = () => {
  try {
    newStack.pop()
    renderListStack()
  } catch (error) {
    // there was an underflow error, handle it
    generateWarningStack("underflow")

  }
};

//generamos las cajas vacías
generateContainers()

addStackBtn.addEventListener('click', addToStack);
takeStackBtn.addEventListener('click', removeFromStack);
