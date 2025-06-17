const MetadataPanel = ({ selectedNode }) => {
  if (!selectedNode) return null;

  const { name, version, license, latest, repo } = selectedNode;

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-900 text-violet-600">
      <h3 className="text-lg font-bold mb-2">Metadata</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Version:</strong> {version}</p>
      {latest && <p><strong>Latest:</strong> {latest}</p>}
      {license && <p><strong>License:</strong> {license}</p>}
      {repo && <p><strong>Repo:</strong> <a href={repo} target="_blank" rel="noreferrer">{repo}</a></p>}
    </div>
  );
};

export default MetadataPanel;
