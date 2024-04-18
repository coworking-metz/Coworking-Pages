function getRandomElements(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}
function truncateToFirstSentence(str) {
    const match = str.match(/[^.!?]*[.!?]/);
    return match ? match[0] : str;
}

