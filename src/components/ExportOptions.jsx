const ExportOptions = ({ treeData }) => {
  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(treeData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dependency-tree.json';
    a.click();
  };

  return (
    <div className="my-4">
      <button onClick={handleExportJSON} className="px-4 py-2 bg-blue-500 text-white rounded">
        Export as JSON
      </button>
    </div>
  );
};

export default ExportOptions;
