const formatPhoneNumber = (phoneNumberString) => {
	var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3];
	}
	return null;
};

const formatAsCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0
});

function getImage(imagePath) {
	return fetch(imagePath).then((res) => {
		if (res.ok === true) {
			return imagePath;
		} else {
			return 'https://res.cloudinary.com/higherintel/image/upload/v1617423523/bda_logo_red_be2456192e.png';
		}
	});
}

export const helpers = {
	formatPhoneNumber,
	formatAsCurrency: formatAsCurrency.format
};
