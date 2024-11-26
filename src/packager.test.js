import { expect, test, vi } from 'vitest';
import { packCode } from './packager.js';
import fs from 'fs';
import archiver from 'archiver';

vi.mock('fs');
vi.mock('archiver');

test('packCode creates archive with correct options', async () => {
  const mockArchiver = {
    pipe: vi.fn(),
    file: vi.fn(),
    finalize: vi.fn(),
    pointer: vi.fn().mockReturnValue(1000),
    on: vi.fn()
  };

  archiver.mockReturnValue(mockArchiver);
  
  const mockWriteStream = {
    on: vi.fn().mockImplementation((event, cb) => {
      if (event === 'close') setTimeout(cb, 0);
    })
  };

  fs.createWriteStream.mockReturnValue(mockWriteStream);

  const options = {
    source: '.',
    output: 'test.zip',
    ignore: ['node_modules/**'],
    format: 'zip'
  };

  await packCode(options);

  expect(archiver).toHaveBeenCalledWith('zip', { zlib: { level: 9 } });
  expect(fs.createWriteStream).toHaveBeenCalledWith('test.zip');
  expect(mockArchiver.pipe).toHaveBeenCalled();
});