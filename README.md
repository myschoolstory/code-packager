# Code Packager CLI

A command-line tool for packaging code into compressed archives.

## Installation

```bash
npm install
npm link
```

## Usage

```bash
code-packager [options]

Options:
  -V, --version              output the version number
  -s, --source <path>        Source directory to package (default: ".")
  -o, --output <path>        Output file path (default: "output.zip")
  -i, --ignore <patterns...> Patterns to ignore (default: ["node_modules/**", ".git/**"])
  -f, --format <type>        Archive format (zip or tar) (default: "zip")
  -h, --help                 display help for command
```

## Examples

Package current directory:
```bash
code-packager
```

Package specific directory:
```bash
code-packager -s ./my-project -o my-project.zip
```

Ignore additional patterns:
```bash
code-packager -i "*.log" "dist/**" "coverage/**"
```

Create tar archive:
```bash
code-packager -f tar -o output.tar
```