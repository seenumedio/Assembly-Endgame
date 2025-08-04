import {words} from './words'

export function getWord(flames){
    const idx = Math.floor(Math.random()*words[flames].length);
    return words[flames][idx];
}

export function getFarewellText(language) {
    const options = [
        `Oh NO!! Your bond will remain a mystery!`,
        `Farewell, "${language}"`,
        `"${language}": I’m gone now`,
        `GoodBye, "${language}"`,
        `You'll miss, "${language}"`,
        `Oh no, someone you adore becomes a memory, "${language}"!`,
        `Endure a lifetime of missing "${language}"`,
        `Gone but not forgotten, "${language}"`,
        `The end of "${language}" as we know it`,
        `Off into the sunset, "${language}"`,
        `"${language}", it's been real`,
        `"${language}", your watch has ended`,
        `"${language}" has left this world`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}