import './index.css';
import { add } from './math';

const btn = document.createElement('button');
btn.innerHTML = 'btn';
btn.classList.add('border');
document.body.appendChild(btn);

add(1,3);
