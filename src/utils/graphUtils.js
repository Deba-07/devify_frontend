// src/utils/graphUtils.js

// Recursively search nodes by name
export function searchDependencyTree(node, query) {
  if (!node || !query) return null;

  const matches = (node.name || '').toLowerCase().includes(query.toLowerCase());

  const filteredChildren = (node.dependencies || [])
    .map(child => searchDependencyTree(child, query))
    .filter(Boolean);

  if (matches || filteredChildren.length > 0) {
    return {
      ...node,
      dependencies: filteredChildren
    };
  }

  return null;
}

// Flatten tree into a list
export function flattenTree(node) {
  const list = [];

  const traverse = (n) => {
    list.push(n);
    (n.dependencies || []).forEach(traverse);
  };

  traverse(node);
  return list;
}
