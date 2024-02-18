function reduceBlogsContentToTwoSentence(blogs) {
    // Helper function to trim content to two sentences
    function trimToTwoSentences(text) {
        const sentenceRegex = /[^.]*\./g;
        const sentences = text.match(sentenceRegex);
        if (sentences && sentences.length >= 2) {
            text = sentences.slice(0, 2).join(' ');
        }
        return text;
    }
    // Map over the array of blogs and trim each blog's content to two sentences
    return blogs.map(blog => {
        const trimmedContent = trimToTwoSentences(blog.content);
        // Return a new object with the trimmed content
        return { ...blog, content: trimmedContent };
    });
}


module.exports = {
    reduceBlogsContentToTwoSentence
};