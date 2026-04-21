// Delay URL cleanup so the browser/webview can start the download reliably.
const REVOKE_DELAY_MS = 1000;

/**
 * Downloads CSV content as a UTF-8 file with BOM for spreadsheet compatibility.
 * @param content CSV text content
 * @param filename output filename for the downloaded file
 */
export function downloadCSV(content: string, filename: string) {
  const csvWithBom = `\ufeff${content}`;
  const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  setTimeout(() => {
    try {
      URL.revokeObjectURL(url);
    } catch (error) {
      console.warn('Failed to revoke CSV download URL:', error);
    }
  }, REVOKE_DELAY_MS);
}
