import {MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT} from "./config/index";

export const makeFacebookPhotoURL = (id, accessToken) => `https://graph.facebook.com/${id}/picture?access_token=${accessToken}`;
export const getRandomIntInRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;
export const randomPhotoCount = () => getRandomIntInRange(MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT);
export const shuffleArray = (array) => {
    let counter = array.length, temp, index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
};