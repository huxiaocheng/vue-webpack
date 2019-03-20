import image from './test.gif';
import './index.css';

const img = new Image();
img.src = image;
img.classList.add('border');
document.body.appendChild(img);
