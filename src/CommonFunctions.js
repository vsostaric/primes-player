var isPrime = function(number) {

	var isPrime = true;
	if(number <= 7) {
		if(number != 3 && number != 5 && number != 7) {
			isPrime = false;
		} 
	} else {
		if(
		number % 2 === 0 ||
		number % 3 === 0 ||
		number % 5 === 0 ||
		number % 7 === 0
		) {
			isPrime = false;
		}
	}

	 
	return isPrime;
}

export default isPrime;