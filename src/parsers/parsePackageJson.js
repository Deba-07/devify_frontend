export function parsePackageJson(json) {
  const buildTree = (deps, type = 'prod') => {
    return Object.entries(deps || {}).map(([name, version]) => ({
      name,
      version,
      type,
      dependencies: [] // npm doesn't list nested deps here; you'd need to fetch them via registry for full depth
    }));
  };

  return {
    name: json.name || 'root',
    version: json.version || '',
    dependencies: [
      ...buildTree(json.dependencies, 'prod'),
      ...buildTree(json.devDependencies, 'dev'),
      ...buildTree(json.peerDependencies, 'peer')
    ]
  };
}
