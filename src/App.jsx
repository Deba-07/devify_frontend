import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import DependencyTree from "./components/DependencyTree";
import MetadataPanel from "./components/MetadataPanel";
import SearchFilter from "./components/SearchFilter";
import ExportOptions from "./components/ExportOptions";

import { parsePackageJson } from "./parsers/parsePackageJson";
import { parseRequirementsTxt } from "./parsers/parseRequirementsTxt";
import { parsePomXml } from "./parsers/parsePomXml";

import { searchDependencyTree } from "./utils/graphUtils";
import "./index.css";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [originalTree, setOriginalTree] = useState(null);
  const [filteredTree, setFilteredTree] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleFileParse = async (content, type) => {
    let parsed;

    try {
      if (type === "npm") {
        parsed = parsePackageJson(content);
      } else if (type === "pip") {
        parsed = parseRequirementsTxt(content);
      } else if (type === "maven") {
        parsed = await parsePomXml(content);
      }

      setOriginalTree(parsed);
      setFilteredTree(parsed);
      setSelectedNode(null);
    } catch (error) {
      console.error("Parsing error:", error);
      alert("Failed to parse file");
    }
  };

  const handleSearch = (query) => {
    if (!query) {
      setFilteredTree(originalTree);
    } else {
      const result = searchDependencyTree(originalTree, query);
      setFilteredTree(
        result || { name: "No results", version: "", dependencies: [] }
      );
    }
  };

  return (
    <div className="min-h-screen p-6 card">
      <h1 className="text-3xl font-bold mb-4">
        🧩 DevifyX: Dependency Visualizer
      </h1>
      <div className="absolute top-4 right-6 z-50">
        <ThemeToggle />
      </div>

      <FileUploader onFileParse={handleFileParse} />
      <SearchFilter onSearch={handleSearch} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="md:col-span-2">
          <DependencyTree data={filteredTree} onNodeClick={setSelectedNode} />
          <ExportOptions treeData={filteredTree} />
        </div>

        <div>
          <MetadataPanel selectedNode={selectedNode} />
        </div>
      </div>
    </div>
  );
}

export default App;
