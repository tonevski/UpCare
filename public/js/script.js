/* REGISTER */
const register = document.getElementById('register-form')

if (register) register.addEventListener('submit', registerUser)

async function registerUser(event) {
  event.preventDefault()

  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })

  let text = await response.text()
  let responseText = document.getElementById('response')
  responseText.innerText = text
}

/* LOG IN */
const login = document.getElementById('login-form')
if (login) login.addEventListener('submit', loginUser)

async function loginUser(event) {
  event.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  let text = await response.text()
  let responseText = document.getElementById('response')
  responseText.innerText = text
}

/* ADD MONITOR */
const monitor = document.getElementById('monitor-form')
if (monitor) monitor.addEventListener('submit', addMonitor)

async function addMonitor(event) {
  event.preventDefault()

  const name = document.getElementById('name').value
  const website = document.getElementById('website').value

  const response = await fetch('/monitors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      website,
    }),
  })

  let text = await response.text()
  let responseText = document.getElementById('response')
  responseText.innerText = text
}
