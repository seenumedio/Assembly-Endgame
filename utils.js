import {words} from './words'

export function getWord(flames){
    const idx = Math.floor(Math.random()*words[flames].length);
    return words[flames][idx];
}
