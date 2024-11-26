#!/usr/bin/env node
import { program } from 'commander';
import { packCode } from './packager.js';
import chalk from 'chalk';

program
  .name('pack-code')
  .description('CLI tool for packaging code')
  .version('1.0.0')
  .option('-s, --source <path>', 'Source directory to package', '.')
  .option('-o, --output <path>', 'Output file path', 'output.zip')
  .option('-i, --ignore <patterns...>', 'Patterns to ignore', ['node_modules/**', '.git/**'])
  .option('-f, --format <type>', 'Archive format (zip or tar)', 'zip')
  .parse(process.argv);

const options = program.opts();

try {
  await packCode(options);
  console.log(chalk.green('✨ Code packaged successfully!'));
} catch (error) {
  console.error(chalk.red('Error:'), error.message);
  process.exit(1);
}