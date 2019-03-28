var newLink = document.createElement('a');

newLink.id = 'sdz_link';
newLink.href = 'http://www.siteduzero.com';
newLink.title = 'Découvrez le Site du Zéro !';
newLink.setAttribute('tabindex', '10');

document.getElementById('myP').appendChild(newLink);

var newLinkText = document.createTextNode("Le Site du Zéro");

newLink.appendChild(newLinkText);