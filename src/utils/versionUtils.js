// src/utils/versionUtils.js

// Very basic semver compare (doesn't handle prereleases etc.)
export function isOutdated(current, latest) {
  if (!current || !latest) return false;

  const parse = (v) => v.replace(/[^0-9.]/g, '').split('.').map(Number);
  const c = parse(current);
  const l = parse(latest);

  for (let i = 0; i < Math.max(c.length, l.length); i++) {
    const a = c[i] || 0;
    const b = l[i] || 0;
    if (a < b) return true;
    if (a > b) return false;
  }
  return false;
}

// [Optional] Fetch latest version from npm
export async function fetchLatestVersionNpm(pkgName) {
  try {
    const res = await fetch(`https://registry.npmjs.org/${pkgName}/latest`);
    const data = await res.json();
    return data.version || null;
  } catch (err) {
    console.error('Failed to fetch latest version:', err);
    return null;
  }
}
