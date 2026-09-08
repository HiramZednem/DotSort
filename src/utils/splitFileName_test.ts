import assert from 'node:assert/strict';
import { splitFileName } from './splitFileName';

const result = splitFileName('2026-09-07-my_note.md', 'yyyy-mm-dd');

assert.deepStrictEqual(result, {
	date: '2026-09-07',
	restOfName: '-my_note.md'
});
