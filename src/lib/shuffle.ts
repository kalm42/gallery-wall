const shuffle = <T>(deck: T[]): T[] => {
    const shuffledDeck = [...deck];
    for (let index = 0; index < 10000; index++) {
        // Pick two random cards
        const a = Math.floor(Math.random() * deck.length - 1);
        const b = Math.floor(Math.random() * deck.length - 1);
        // Swap them
        [shuffledDeck[b], shuffledDeck[a]] = [shuffledDeck[a], shuffledDeck[b]];
    }

    return shuffledDeck;
};

export default shuffle;