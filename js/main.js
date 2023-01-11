import '../css/style.css'

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a')

  const hidePage = () => {
    const selected = document.querySelector('main section.selected')
    selected.classList.remove("selected")
  }
  const showPage = (className) => {
    const current = document.querySelector('main section.' + className.replace("#",""))
    current.classList.add("selected")
  }

  const clickFn = (ev) => {
    ev.preventDefault()
    hidePage()
    showPage(ev.target.getAttribute('href'))
  }

  links.forEach((link) => {
    link.removeEventListener('click', clickFn)
    link.addEventListener('click', clickFn)
  })
})
