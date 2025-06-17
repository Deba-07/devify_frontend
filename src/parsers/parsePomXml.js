// src/parsers/parsePomXml.js

import { parseStringPromise } from 'xml2js';

export async function parsePomXml(xml) {
  const result = await parseStringPromise(xml);
  const project = result.project || {};
  const dependencies = project.dependencies?.[0]?.dependency || [];

  const deps = dependencies.map(dep => ({
    name: dep.artifactId?.[0] || '',
    version: dep.version?.[0] || '',
    type: dep.scope?.[0] || 'compile',
    group: dep.groupId?.[0] || '',
    dependencies: []
  }));

  return {
    name: project.artifactId?.[0] || 'pom.xml',
    version: project.version?.[0] || '',
    dependencies: deps
  };
}
