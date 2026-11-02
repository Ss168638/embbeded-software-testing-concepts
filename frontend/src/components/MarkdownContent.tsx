import type { ReactNode } from 'react';

interface ListItem {
  text: string;
  children: ListBlock[];
}

interface ListBlock {
  type: 'list';
  ordered: boolean;
  items: ListItem[];
}

type MarkdownBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'code'; text: string }
  | ListBlock;

const listPattern = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;

function parseMarkdown(source: string): MarkdownBlock[] {
  const lines = source.replace(/\r/g, '').split('\n');
  let index = 0;
  let skippedDocumentTitle = false;

  const parseList = (indent: number, ordered: boolean): ListBlock => {
    const items: ListItem[] = [];

    while (index < lines.length) {
      const match = listPattern.exec(lines[index]);
      if (!match) {
        if (lines[index].trim() === '' && listPattern.test(lines[index + 1] ?? '')) {
          index += 1;
          continue;
        }
        break;
      }

      const itemIndent = match[1].length;
      const itemOrdered = /^\d/.test(match[2]);
      if (itemIndent < indent || (itemIndent === indent && itemOrdered !== ordered)) break;
      if (itemIndent > indent) {
        const previousItem = items[items.length - 1];
        if (!previousItem) break;
        previousItem.children.push(parseList(itemIndent, itemOrdered));
        continue;
      }

      items.push({ text: match[3], children: [] });
      index += 1;
    }

    return { type: 'list', ordered, items };
  };

  const blocks: MarkdownBlock[] = [];
  while (index < lines.length) {
    const line = lines[index];
    if (line.trim() === '') {
      index += 1;
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      index += 1;
      if (heading[1].length === 1 && !skippedDocumentTitle) {
        skippedDocumentTitle = true;
        continue;
      }
      blocks.push({ type: 'heading', level: Math.max(2, heading[1].length), text: heading[2] });
      continue;
    }

    if (/^```/.test(line)) {
      index += 1;
      const codeLines: string[] = [];
      while (index < lines.length && !/^```/.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: 'code', text: codeLines.join('\n') });
      continue;
    }

    if (line.trim().toLowerCase() === 'plaintext') {
      index += 1;
      const diagramLines: string[] = [];
      while (index < lines.length && lines[index].trim() !== '') {
        diagramLines.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: 'code', text: diagramLines.join('\n') });
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^\s*>\s?/, ''));
        index += 1;
      }
      blocks.push({ type: 'quote', text: quoteLines.join(' ') });
      continue;
    }

    const listMatch = listPattern.exec(line);
    if (listMatch) {
      blocks.push(parseList(listMatch[1].length, /^\d/.test(listMatch[2])));
      continue;
    }

    const paragraphLines = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() !== '' &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !/^```/.test(lines[index]) &&
      !/^\s*>\s?/.test(lines[index]) &&
      !listPattern.test(lines[index])
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') });
  }

  return blocks;
}

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function renderList(list: ListBlock, key: string): ReactNode {
  const ListTag = list.ordered ? 'ol' : 'ul';
  return (
    <ListTag key={key}>
      {list.items.map((item, index) => (
        <li key={`${key}-${index}`}>
          {renderInline(item.text)}
          {item.children.map((child, childIndex) => renderList(child, `${key}-${index}-${childIndex}`))}
        </li>
      ))}
    </ListTag>
  );
}

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <>
      {parseMarkdown(content).map((block, index) => {
        const key = `block-${index}`;
        if (block.type === 'heading') {
          const HeadingTag = `h${Math.min(block.level, 6)}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
          return <HeadingTag key={key}>{renderInline(block.text)}</HeadingTag>;
        }
        if (block.type === 'paragraph') return <p key={key}>{renderInline(block.text)}</p>;
        if (block.type === 'quote') return <blockquote key={key}>{renderInline(block.text)}</blockquote>;
        if (block.type === 'code') return <pre key={key}><code>{block.text}</code></pre>;
        return renderList(block, key);
      })}
    </>
  );
}
