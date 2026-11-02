import { useMemo, useState } from 'react';
import './App.css';
import MarkdownContent from './components/MarkdownContent';
import { chapters, type Chapter } from './data/chapters';

const chapterGroups = [
  {
    title: 'Foundations',
    ids: ['testing', 'verification-and-validation', 'sw-quality', 'types-of-sw-metrics', 'visualization'],
  },
  {
    title: 'Testing approaches',
    ids: ['white-box-testing', 'black-box-testing', 'integration-testing', 'system-testing', 'acceptance-testing', 'robustness-testing'],
  },
];

function ChapterLink({
  chapter,
  active,
  onSelect,
}: {
  chapter: Chapter;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`chapter-link${active ? ' is-active' : ''}`}
      type="button"
      onClick={onSelect}
      aria-current={active ? 'page' : undefined}
    >
      <span className="chapter-link-marker" aria-hidden="true" />
      <span>{chapter.title}</span>
    </button>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState('testing');
  const [search, setSearch] = useState('');
  const activeChapter = chapters.find((chapter) => chapter.id === activeId) ?? chapters[0];
  const filteredChapters = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return chapters;
    return chapters.filter((chapter) =>
      `${chapter.title} ${chapter.content}`.toLowerCase().includes(query),
    );
  }, [search]);
  const filteredIds = new Set(filteredChapters.map((chapter) => chapter.id));
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeId);

  const selectChapter = (chapter: Chapter) => {
    setActiveId(chapter.id);
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#main-content"
          onClick={() => setActiveId('testing')}
          aria-label="Software testing notes home"
        >
          <span className="brand-mark" aria-hidden="true">ST</span>
          <span className="brand-copy">
            <strong>Software testing</strong>
            <span>Study notes</span>
          </span>
        </a>
        <label className="search-box">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search chapters and notes"
            aria-label="Search chapters and notes"
          />
          <kbd>/</kbd>
        </label>
        <label className="mobile-chapter-select">
          <span className="sr-only">Select chapter</span>
          <select
            value={activeId}
            onChange={(event) => {
              const chapter = chapters.find((item) => item.id === event.target.value);
              if (chapter) selectChapter(chapter);
            }}
          >
            {filteredChapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
            ))}
          </select>
        </label>
      </header>

      <nav className="tablet-chapter-nav" aria-label="Chapter navigation">
        {chapterGroups.map((group) => {
          const groupChapters = chapters.filter(
            (chapter) => group.ids.includes(chapter.id) && filteredIds.has(chapter.id),
          );
          const activeGroupChapter = groupChapters.find((chapter) => chapter.id === activeId);

          return (
            <label className="tablet-chapter-select" key={group.title}>
              <span>{group.title}</span>
              <select
                aria-label={`${group.title} chapters`}
                value={activeGroupChapter?.id ?? ''}
                disabled={groupChapters.length === 0}
                onChange={(event) => {
                  const chapter = groupChapters.find((item) => item.id === event.target.value);
                  if (chapter) selectChapter(chapter);
                }}
              >
                <option value="" disabled>
                  {groupChapters.length === 0 ? 'No matching chapters' : 'Choose a chapter'}
                </option>
                {groupChapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
                ))}
              </select>
            </label>
          );
        })}
      </nav>

      <div className="page-layout">
        <aside className="sidebar" aria-label="Chapter navigation">
          <div className="sidebar-heading">
            <span className="eyebrow">Course guide</span>
            <span className="chapter-count">{filteredChapters.length} chapters</span>
          </div>
          {chapterGroups.map((group) => {
            const groupChapters = chapters.filter(
              (chapter) => group.ids.includes(chapter.id) && filteredIds.has(chapter.id),
            );
            if (groupChapters.length === 0) return null;
            return (
              <section className="nav-group" key={group.title}>
                <h2>{group.title}</h2>
                <nav>
                  {groupChapters.map((chapter) => (
                    <ChapterLink
                      key={chapter.id}
                      chapter={chapter}
                      active={activeId === chapter.id}
                      onSelect={() => selectChapter(chapter)}
                    />
                  ))}
                </nav>
              </section>
            );
          })}
          {filteredChapters.length === 0 && (
            <p className="empty-search">No chapters match “{search}”. Try another term.</p>
          )}
          <div className="sidebar-footer">
            <span className="status-dot" aria-hidden="true" />
            <span>11 topics in this study guide</span>
          </div>
        </aside>

        <main className="main-content" id="main-content">
          <div className="article-wrap">
            <div className="breadcrumb">
              <span>Study guide</span>
              <span aria-hidden="true">/</span>
              <span>{activeChapter.category}</span>
            </div>
            <article>
              <header className="article-header">
                <div className="article-category">{activeChapter.category}</div>
                <h1>{activeChapter.title}</h1>
                <div className="article-meta">
                  <span className="meta-icon" aria-hidden="true">◷</span>
                  <span>{activeChapter.readingTime} min read</span>
                  <span className="meta-divider" aria-hidden="true" />
                  <span>Study notes</span>
                </div>
              </header>

              <div className="article-body">
                <MarkdownContent content={activeChapter.content} />
              </div>
            </article>

            <nav className="chapter-pagination" aria-label="Chapter pagination">
              <button
                type="button"
                className="pagination-card previous"
                onClick={() => selectChapter(chapters[(activeIndex - 1 + chapters.length) % chapters.length])}
              >
                <span className="pagination-label">← Previous chapter</span>
                <strong>{chapters[(activeIndex - 1 + chapters.length) % chapters.length].title}</strong>
              </button>
              <button
                type="button"
                className="pagination-card next"
                onClick={() => selectChapter(chapters[(activeIndex + 1) % chapters.length])}
              >
                <span className="pagination-label">Next chapter →</span>
                <strong>{chapters[(activeIndex + 1) % chapters.length].title}</strong>
              </button>
            </nav>
            <footer className="article-footer">
              <span>Software testing study guide</span>
              <span>Content sourced from <code>sw-testing/</code></span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
