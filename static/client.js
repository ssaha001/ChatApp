const form=document.getElementById('sendContainer');
const msgInp=document.getElementById('msgInp');
const messageContainer=document.querySelector('.msgContainer');
const notification=new Audio('static/notification_sound.mp3');
var socket = io();
const name=prompt('Enter your name');
function append(message,position){
  notification.play();
  console.log("Entered append.");
  const msgElem=document.createElement('div');
  msgElem.classList.add('message');
  msgElem.innerText=message;
  msgElem.classList.add(position);
  messageContainer.append(msgElem);
  messageContainer.scrollBy(0,100);
}
socket.emit('New-User-Joined',name);
socket.on('user-joined',data=>{
  console.log("User Joined Triggered");
  append(`${data} joined the chat`,'centreMsg');
  notification.play();
})
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  let msg=msgInp.value;
  append(`You: ${msg}`,'senderMsg');
  socket.emit('send',msg);
  msgInp.value='';
})
socket.on('receive',data=>{
  console.log(data);
  append(`${data.n}: ${data.message}`,'replyMsg');
  notification.play();
})
socket.on('left',data=>{
  append(`${data} left the chat`,'centreMsg');
  notification.play();
})