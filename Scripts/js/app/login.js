// Login variables
const name = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

// Profile variables
const popup = document.getElementById('popup')

// Login Functions
form.addEventListener('submit', (e) => {
    let messages = []
    if (name.value === '' || name.value == null){
        messages.push('Name is required.')
    }
    if (password.value.length <= 3){
        messages.push("Password must be longer than 3 characters.")
    }
    if(name.value != 'admin' || password.value != 'admin'){
        messages.push("Username and password do not match.")
    }
    if (messages.length > 0){
        e.preventDefault()
        errorElement.innerText = messages.join(' ')
    }

})


// Profile Functions
function radarButtonFunction()
{
  var list = document.getElementById('radars')
  var selectedValue = list.options[list.selectedIndex].value
  if(selectedValue == "select")
  {
    alert("Please select an avaiable radar!")
  }
  else
  {
    popup.style.display='block'
  }
}

function shareFunction()
{
  var list = document.getElementById('users')
  var selectedValue = list.options[list.selectedIndex].value
  if(selectedValue == "select")
  {
    alert("Please select an user!")
  }
  else
  {
    alert("The radar was shared!")
    popup.style.display=''
  }
}
