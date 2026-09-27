// Timestamps are shown in the author's time zone so a late-evening post does
// not display as the following day.
const SITE_TIME_ZONE = 'America/New_York'

function mediumDate(timeZone: string): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone })
}

const dayFormatter = mediumDate('UTC')
const timestampFormatter = mediumDate(SITE_TIME_ZONE)

/** Formats a date-only string such as `2026-09-27`. */
export function formatDay(day: string): string {
  return dayFormatter.format(new Date(`${day}T00:00:00Z`))
}

/** Formats a full ISO timestamp such as `2026-09-27T01:30:00Z`. */
export function formatTimestamp(iso: string): string {
  return timestampFormatter.format(new Date(iso))
}
