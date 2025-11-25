/**
 * Formats a date range for display.
 * - If both dates are in the same month: "1-10 maggio"
 * - If dates are in different months: "1 maggio - 10 giugno"
 *
 * @param startDate - The start date of the range
 * @param endDate - The end date of the range
 * @param locale - The locale to use for formatting ('en-US' or 'it-IT')
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: Date, endDate: Date, locale: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    // Same month: "1-10 maggio" or "1-10 May"
    const day1 = start.getDate();
    const day2 = end.getDate();

    // If same day, just show single date
    if (day1 === day2) {
      return start.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }

    const month = start.toLocaleDateString(locale, { month: 'long' });
    const year = start.getFullYear();

    return `${day1}-${day2} ${month} ${year}`;
  } else {
    // Different months: "1 maggio - 10 giugno" or "1 May - 10 June"
    const startStr = start.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long'
    });
    const endStr = end.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long'
    });

    const year = end.getFullYear();

    // Check if same year
    if (start.getFullYear() === end.getFullYear()) {
      return `${startStr} - ${endStr} ${year}`;
    } else {
      // Different years: include year for start date too
      const startWithYear = start.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      const endWithYear = end.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      return `${startWithYear} - ${endWithYear}`;
    }
  }
}

/**
 * Formats a date range for display in compact form (used in post cards).
 * - If both dates are in the same month: "1-10 May"
 * - If dates are in different months: "1 May - 10 Jun"
 *
 * @param startDate - The start date of the range
 * @param endDate - The end date of the range
 * @param locale - The locale to use for formatting ('en-US' or 'it-IT')
 * @returns Formatted date range string in compact form
 */
export function formatDateRangeCompact(startDate: Date, endDate: Date, locale: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    // Same month: "1-10 May" or "1-10 mag"
    const day1 = start.getDate();
    const day2 = end.getDate();

    // If same day, just show single date
    if (day1 === day2) {
      return start.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }

    const month = start.toLocaleDateString(locale, { month: 'short' });
    const year = start.getFullYear();

    return `${day1}-${day2} ${month} ${year}`;
  } else {
    // Different months: "1 May - 10 Jun" or "1 mag - 10 giu"
    const startStr = start.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short'
    });
    const endStr = end.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short'
    });

    const year = end.getFullYear();

    // Check if same year
    if (start.getFullYear() === end.getFullYear()) {
      return `${startStr} - ${endStr} ${year}`;
    } else {
      // Different years: include year for start date too
      const startWithYear = start.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const endWithYear = end.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      return `${startWithYear} - ${endWithYear}`;
    }
  }
}
