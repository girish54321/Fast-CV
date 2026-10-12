const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
	try {
		const pdf = await mdToPdf(
			{ path: 'README.md' },
			{
				launch_options: {
					headless: true,
					args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
				}
			}
		);

		if (pdf) {
			const outputPath = path.join(process.cwd(), 'resume.pdf');
			fs.writeFileSync(outputPath, pdf.content);

			console.log(`PDF successfully generated at: ${outputPath}`);
		}
	} catch (error) {
		console.error('Error generating PDF:', error);
		process.exit(1);
	}
}

generatePDF();
