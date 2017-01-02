var isPrime = function(number) {
	if(number <= 7) {
		if(number == 1 || number == 3 || number == 5 || number == 7) {
			return true;
		} else {
			return false;
		}
	}

	if(
		number % 2 === 0 ||
		number % 3 === 0 ||
		number % 5 === 0 ||
		number % 7 === 0
		) {
		return false
	} 
	return true;
}

export default isPrime;