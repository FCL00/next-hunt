import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type JobDescriptionProps = {
  content: string;
};

export function JobDescription({ content }: JobDescriptionProps) {
  if (!content?.trim()) {
    return <p className="text-sm text-ink-muted">No job description available.</p>;
  }

  const markdown = normalizeJobDescription(content);

  return (
    <div className="job-description md-metadata-styling">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 className="mt-8 mb-4 text-lg font-semibold font-mono">{children}</h2>,

          h3: ({ children }) => <h3 className="mt-6 mb-3 text-base font-semibold font-mono">{children}</h3>,

          p: ({ children }) => <p className="mb-5 text-sm leading-7 text-ink-muted">{children}</p>,

          ul: ({ children }) => <ul className="mb-6 ml-5 list-disc space-y-2 text-ink-muted">{children}</ul>,

          li: ({ children }) => <li className="pl-1 text-sm leading-6 text-ink-muted">{children}</li>,

          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-signal">
              {children}
            </a>
          ),

          strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

/**
 * Converts the inconsistent plain-text job descriptions
 * returned by the API into reasonably structured Markdown.
 */
function normalizeJobDescription(content: string): string {
  let text = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

  // --------------------------------------------------
  // 1. Normalize bullet characters
  // --------------------------------------------------

  text = text.replace(/^\s*•\s?/gm, '- ');

  // --------------------------------------------------
  // 2. Convert common section headings
  // --------------------------------------------------

  const sectionHeadings = [
    'About the Role',
    'Responsibilities',
    'Requirements',
    'Qualifications',
    'Preferred',
    'Benefits',
    'Application Requirements',
    'Application Question(s)',
    'Application Questions',
    'Tech Stack Requirements',
    'Key Responsibilities',
    'Required Experience',
    'Experience & Skills Required',
    'Nice to Have (Plus Skills)',
    'Work Setup',
    'Work Schedule',
    'Locations',
    'Job Description',
    'What the Role Involves',
    'Advantages of contracting with us',
  ];

  for (const heading of sectionHeadings) {
    const escaped = escapeRegExp(heading);
    text = text.replace(new RegExp(`^${escaped}:?$`, 'gmi'), `## ${heading}`);
  }

  // --------------------------------------------------
  // 3. Handle ALL CAPS headings
  //
  // Example:
  // KEY RESPONSIBILITIES
  // QUALIFICATIONS & REQUIREMENTS:
  // --------------------------------------------------

  text = text.replace(/^([A-Z][A-Z\s&()]+):?$/gm, (_, heading: string) => {
    const cleanHeading = heading.trim();

    // Avoid turning very short text into headings
    if (cleanHeading.length < 4) {
      return heading;
    }

    return `## ${toTitleCase(cleanHeading)}`;
  });

  // --------------------------------------------------
  // 4. Format common job metadata
  //
  // Job Type: Full-time
  // Pay: Php50,000...
  // Work Location: Remote
  // Work Setup: Hybrid
  // Work Schedule: Mid-shift
  // --------------------------------------------------

  const metadataFields = [
    'Job Type',
    'Job Types',
    'Pay',
    'Expected hours',
    'Work Location',
    'Work Setup',
    'Work Schedule',
    'Locations',
    'Location',
    'Type',
  ];

  for (const field of metadataFields) {
    const escaped = escapeRegExp(field);

    text = text.replace(new RegExp(`^${escaped}:\\s*(.+)$`, 'gmi'), `**${field}:** $1`);
  }

  // --------------------------------------------------
  // 5. Convert bare URLs into Markdown links
  //
  // Example: https://example.com
  // --------------------------------------------------

  text = text.replace(/(?<!\]\()(?<!["'=])(https?:\/\/[^\s<>)]+)/g, (url: string) => {
    const cleanUrl = url.replace(/[.,!?;:]+$/, '');
    return `[${cleanUrl}](${cleanUrl})${url.slice(cleanUrl.length)}`;
  });

  // --------------------------------------------------
  // 6. Clean excessive blank lines
  // --------------------------------------------------

  text = text.replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toTitleCase(value: string): string {
  return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
