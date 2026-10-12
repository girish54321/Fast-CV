const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');

async function generatePDF() {
	try {
		const pdf = await mdToPdf(
			{ path: 'README.md' },
			{
				launch_options: {
					headless: true,
					args: [
						'--no-sandbox',
						'--disable-setuid-sandbox',
						'--disable-dev-shm-usage'
					]
				}
			}
		);

		if (pdf) {
			fs.writeFileSync('output.pdf', pdf.content);
			console.log('PDF successfully generated!');
		}
	} catch (error) {
		console.error('Error generating PDF:', error);
		process.exit(1);
	}
}

generatePDF();
