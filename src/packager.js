import archiver from 'archiver';
import { createWriteStream } from 'fs';
import { glob } from 'glob';
import ora from 'ora';
import path from 'path';

export async function packCode({ source, output, ignore, format }) {
  const spinner = ora('Packaging code...').start();
  
  try {
    const archive = archiver(format, { zlib: { level: 9 } });
    const output_stream = createWriteStream(output);

    archive.pipe(output_stream);

    // Get all files excluding ignored patterns
    const files = await glob('**/*', {
      cwd: source,
      ignore,
      dot: true,
      nodir: true
    });

    // Add files to archive
    for (const file of files) {
      const filePath = path.join(source, file);
      archive.file(filePath, { name: file });
    }

    await archive.finalize();

    return new Promise((resolve, reject) => {
      output_stream.on('close', () => {
        spinner.succeed(`Package created: ${output} (${archive.pointer()} bytes)`);
        resolve();
      });

      archive.on('error', (err) => {
        spinner.fail('Packaging failed');
        reject(err);
      });
    });
  } catch (error) {
    spinner.fail('Packaging failed');
    throw error;
  }
}