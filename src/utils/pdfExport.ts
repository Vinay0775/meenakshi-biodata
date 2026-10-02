import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportBiodataToPdf(
  elementId: string = 'printable-biodata',
  fileName: string = 'Meenakshi_Kumawat_Marriage_Biodata.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return true;
  }

  try {
    // Render the element to canvas at 2x resolution for crisp high-density text & photos
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    if (imgHeight <= pdfHeight) {
      // Single A4 page centered
      const yOffset = (pdfHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'JPEG', 0, Math.max(0, yOffset), imgWidth, imgHeight);
    } else {
      // Multi-page handling
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
    }

    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Error generating PDF with html2canvas:', err);
    // Graceful fallback to browser print dialog
    window.print();
    return false;
  }
}
