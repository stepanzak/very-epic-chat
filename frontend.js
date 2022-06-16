const chatDiv = document.getElementById('chat')
const chatInput = document.getElementById('chat-input-text')
const chatButton = document.getElementById('chat-input-button')
let canBeJumpscared = true

const jumpscareFunction = () => {
    let audio = new Audio('https://www.fesliyanstudios.com/musicfiles/2021-09-24_-_Jump_Scare_A_-_www.FesliyanStudios.com/2021-09-24_-_Jump_Scare_A_-_www.FesliyanStudios.com.mp3')
    audio.play()
    console.log('hi, this is a jumpscare() function')
    canBeJumpscared = false
    let jumpscareDiv = document.createElement('div')
    jumpscareDiv.id = 'jumpscareDiv'
    jumpscareDiv.innerHTML = '<img src="https://www.icegif.com/wp-content/uploads/fnaf-jumpscare-icegif-5.gif" alt="jumpscare" style="position: fixed; top: 0%; right: -20%; width: 150%; height: 150%">'
    document.body.appendChild(jumpscareDiv)
    setTimeout(() => {
        document.body.removeChild(document.getElementById('jumpscareDiv'))
    }, 600)
    setTimeout(() => {
        canBeJumpscared = true
    }, 10000)
}

const fetchMessages = async () => {
    const messagesResponse = await fetch('/messages')
    const messagesAndJumscare = await messagesResponse.json()
    const messages = messagesAndJumscare.messages
    const jumpscare = messagesAndJumscare.jumpscare
    let htmlMessages = ''
    console.log(messages)
    if (jumpscare && canBeJumpscared) {setTimeout(() => {
        console.log('jumpscarying 😲')
        jumpscareFunction()
    }, 1000); console.log('jumpscare za vteřinu')}
    messages.forEach(message => {
        htmlMessages = `${htmlMessages}<p>${message}</p>`
    })
    chatDiv.innerHTML = htmlMessages
    console.log('updated chat')}

setInterval(fetchMessages, 1000);



chatButton.addEventListener('click', async () => {
    //fetch('/messages', {method : 'POST', body : {"message": "ahojkyyyy"}, headers: {'Content-Type': 'application/json'}})
    //postman
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"message": chatInput.value});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("/messages", requestOptions)
    //end of postman
    if (chatInput.value === '**děsivé**') {
        canBeJumpscared = false
        setTimeout(() => {
            canBeJumpscared = true
        }, 10000)
        console.log(`jumpscare sent!`)
    }
    chatInput.value = ''
})

