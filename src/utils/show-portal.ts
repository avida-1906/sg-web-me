export function toast(message: string) {
  const div = document.createElement('div')
  div.innerHTML = message
  div.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 5px;
    z-index: 9999;
  `
  document.body.appendChild(div)

  setTimeout(() => {
    document.body.removeChild(div)
  }, 1000)
}
