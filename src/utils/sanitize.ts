import DOMPurify from 'isomorphic-dompurify';

export function formatHTML(rawText: string) {
  const cleanHTML = DOMPurify.sanitize(rawText);
  return {
    dangerouslySetInnerHTML: { __html: cleanHTML },
  };
}
