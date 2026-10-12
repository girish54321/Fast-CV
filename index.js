const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
	try {
		const pdf = await mdToPdf(
			{ path: 'README.md' },
			{
				stylesheet: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css',
				body_class: 'markdown-body',
				css: `
					.page-break { page-break-after: always; }
					
					.markdown-body { 
						font-size: 13px; /* Slightly larger, readable font */
						line-height: 1.6;
						padding: 0px !important; 
						background: transparent;
					}
					
					.markdown-body a { word-break: break-word; }
				`,

				pdf_options: {
					format: 'A4',
					margin: {
						top: '15mm',
						bottom: '15mm',
						left: '15mm',
						right: '15mm'
					}
				},

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
