import acceptanceTesting from '../../../sw-testing/acceptance-testing.md?raw';
import blackBoxTesting from '../../../sw-testing/black-box-testing.md?raw';
import integrationTesting from '../../../sw-testing/integration-testing.md?raw';
import robustnessTesting from '../../../sw-testing/robustness-testing.md?raw';
import softwareQuality from '../../../sw-testing/sw-quality.md?raw';
import systemTesting from '../../../sw-testing/system-testing.md?raw';
import softwareTesting from '../../../sw-testing/testing.md?raw';
import softwareMetrics from '../../../sw-testing/types-of-sw-metrics.md?raw';
import verificationValidation from '../../../sw-testing/verification-and-validation.md?raw';
import visualization from '../../../sw-testing/Visualization.md?raw';
import whiteBoxTesting from '../../../sw-testing/white-box-testing.md?raw';

export interface Chapter {
  id: string;
  title: string;
  category: string;
  content: string;
  readingTime: number;
}

const chapterSources = [
  { id: 'testing', title: 'Software testing', category: 'Foundations', content: softwareTesting },
  { id: 'verification-and-validation', title: 'Verification and validation', category: 'Foundations', content: verificationValidation },
  { id: 'sw-quality', title: 'Software quality', category: 'Quality and measurement', content: softwareQuality },
  { id: 'types-of-sw-metrics', title: 'Types of software metrics', category: 'Quality and measurement', content: softwareMetrics },
  { id: 'visualization', title: 'Testing pipeline', category: 'Foundations', content: visualization },
  { id: 'white-box-testing', title: 'White-box testing', category: 'Testing approaches', content: whiteBoxTesting },
  { id: 'black-box-testing', title: 'Black-box testing', category: 'Testing approaches', content: blackBoxTesting },
  { id: 'integration-testing', title: 'Integration testing', category: 'Test levels', content: integrationTesting },
  { id: 'system-testing', title: 'System testing', category: 'Test levels', content: systemTesting },
  { id: 'acceptance-testing', title: 'Acceptance testing', category: 'Test levels', content: acceptanceTesting },
  { id: 'robustness-testing', title: 'Robustness testing', category: 'Testing approaches', content: robustnessTesting },
] satisfies Omit<Chapter, 'readingTime'>[];

export const chapters: Chapter[] = chapterSources.map((chapter) => ({
  ...chapter,
  readingTime: Math.max(1, Math.ceil(chapter.content.trim().split(/\s+/).length / 220)),
}));
