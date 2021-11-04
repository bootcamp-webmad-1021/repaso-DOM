const queueUL = document.querySelector('.list-queue');
const queueInput = document.querySelector('.queue-input');
const warningTopQueue = document.querySelector('#queue-container .warning-top');
const warningBottomQueue = document.querySelector(
  '#queue-container .warning-bottom'
);
const addQueue = document.querySelector('.btn-add-queue');
const dequeue = document.querySelector('.btn-take-dequeue');

const queue = new Queue();

const clearQueueInput = () => {
  queueInput.value = ""
}

const generateListQueue = () => {
  for (let i = 0; i < 10; i++) {
    const li = document.createElement("li")
    li.classList.add("empty")
    queueUL.appendChild(li)
  }
}

const renderListQueue = () => {
  const lis = queueUL.querySelectorAll("li")
  const queueElements = queue.display()

  for (let i = 0; i < lis.length; i++) {
    if (queueElements[i] !== undefined) {
      lis[i].innerHTML = queueElements[i]
      lis[i].classList.add("filled")
      lis[i].classList.remove("empty")
    } else {
      lis[i].innerHTML = ""
      lis[i].classList.add("empty")
      lis[i].classList.remove("filled")
    }
  }
}

const generateWarningQueue = (type) => {
  if (type === 'underflow') {
    warningBottomQueue.style.display = "block"
    warningBottomQueue.innerHTML = "QUEUE_UNDERFLOW"
  } else if (type === 'overflow') {
    warningTopQueue.style.display = "block"
    warningTopQueue.innerHTML = "QUEUE_OVERFLOW"
  }
};

const addToQueue = () => {
  try {
    const value = queueInput.value
    queue.enqueue(value)
    clearQueueInput()
    renderListQueue()
  } catch (error) {
    generateWarningQueue("overflow")
  }
};

const removeFromQueue = () => {
  try {
    queue.dequeue()
    renderListQueue()
  } catch (error) {
    generateWarningQueue("underflow")
  }
};

generateListQueue();

addQueue.addEventListener('click', addToQueue);
dequeue.addEventListener('click', removeFromQueue);
