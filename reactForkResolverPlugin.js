import { join as nodePathJoin } from 'node:path';

const reactForksResolutions = {
  'shared/ReactSharedInternals': nodePathJoin(
    __dirname,
    '../react/src/ReactSharedInternals.js',
  ),
};

const getRelativePathFromPackagesFolder = path => {
  return path.split('packages/')[1];
};

const resolveModulePathFromId = (id, importer) => {
  const isRelative = id.startsWith('.');
  if (!isRelative) {
    return id;
  }

  const importerFolder = importer.replace(/(\/[^\/]+\.js)$/, ''); // remove the file name to obtain it's parent folder path
  const absolutePath = nodePathJoin(importerFolder, id);

  return getRelativePathFromPackagesFolder(absolutePath);
};

const resolveReactForkPlugin = {
  name: 'forks-resolver',
  enforce: 'pre',
  resolveId(id, importer) {
    const currentModulePath = resolveModulePathFromId(id, importer);

    if (reactForksResolutions[currentModulePath]) {
      return reactForksResolutions[currentModulePath];
    }
  },
};

export default resolveReactForkPlugin;
