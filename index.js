const { writeFileSync } = require('fs');
const { mdToPdf } = require('md-to-pdf');

const createPdf = async () => {
	const pdf = await mdToPdf(
		{
			path: 'README.md',
		}).catch(console.error);

	if (pdf) {
		const outputFilename = 'resume.pdf';
		writeFileSync(outputFilename, pdf.content);
		console.log("PDF successfully created!");
	}
}

createPdf();
