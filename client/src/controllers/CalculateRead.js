const calculateRead = (description) => {
    const wordsPerMinute = 200; // Average case.
    let result;
    let textLength = description.split(" ").length; // Split by words
    if (textLength > 0) {
      let value = Math.ceil(textLength / wordsPerMinute);
      result = `${value} min`;
    }
    return result;
  };

module.exports = calculateRead