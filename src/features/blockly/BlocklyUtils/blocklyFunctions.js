export function prepareBlockXml(xmlString, wrapper = false) {
	let xml = xmlString;

	xml = xml
		.replace('<xml xmlns="https://developers.google.com/blockly/xml">', '')
		.replace('<xml xmlns="http://www.w3.org/1999/xhtml">', '')
		.replace('</xml>', '');

	if (wrapper) {
		xml = `<xml xmlns="https://developers.google.com/blockly/xml">${xml}</xml>`;
	}

	return xml;
}

export const getBlockType = (xmlData) => {
	//const dataArray = xmlData.match(/((\w{4,12}-?)){5}/);
	const dataArray = xmlData.match(/type="(.*?)"/g);

	if (dataArray && dataArray.length > 0) {
		let result = dataArray[0];
		result = result.toString().replace('type="', '').replace('"', '');
		return result;
	}

	return false;
};
