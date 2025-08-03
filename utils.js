import {words} from './words'

export function getWord(flames){
    const idx = Math.floor(Math.random()*words[flames].length);
    return words[flames][idx];
}

export function getFarewellText(language) {
    const options = [
        `Oh NO!! Your bond will remain a mystery!`,
        `Farewell, ${language}`,
        `Adios, ${language}`,
        `GoodBye, ${language}`,
        `You'll miss, ${language}`,
        `Oh no, not ${language}!`,
        `${language} bites the dust`,
        `Gone but not forgotten, ${language}`,
        `The end of ${language} as we know it`,
        `Off into the sunset, ${language}`,
        `${language}, it's been real`,
        `${language}, your watch has ended`,
        `${language} has left the building`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}