/**
 * Format date string or Date object to DD-MM-YYYY
 * e.g. "2026-11-23" -> "23-11-2026"
 */
export const formatDateDDMMYYYY = (dateVal) => {
  if (!dateVal) return 'Recent';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return String(dateVal);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

export default formatDateDDMMYYYY;
