// src/parsers/parseRequirementsTxt.js

export function parseRequirementsTxt(content) {
  const lines = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));

  const deps = lines.map(line => {
    const match = line.match(/^([^=<>!~]+)[=<>!~]*([^\s]*)/);
    return {
      name: match?.[1] || line,
      version: match?.[2] || 'latest',
      type: 'prod',
      dependencies: [] // pip doesn't define nested deps statically either
    };
  });

  return {
    name: 'requirements.txt',
    version: '',
    dependencies: deps
  };
}
