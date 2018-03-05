const words = ['Hello', 'world'];
const styleTypes = ['scss', 'less'];
const h1 = document.createElement('h1');
h1.innerHTML = styleTypes
    .map((type, index) => `<span class="${type}">${words[index]}</span>`)
    .join(' ');
document.body.appendChild(h1);
console.log(h1);
