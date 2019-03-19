import add from './test';
import image from './test.gif';

const img = new Image();
img.src = image;
document.body.appendChild(img);

add(3, 5);