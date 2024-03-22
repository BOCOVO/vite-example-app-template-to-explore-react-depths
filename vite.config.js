import { esbuildFlowPlugin, flowPlugin } from '@bunchtogether/vite-plugin-flow';
import { defineConfig } from 'vite';

const flowPluginOptions = {
  include: /\.(flow|js?)$/,
  exclude: /node_modules/,
  flow: {
    // The `all` flag is set to `true` to force transpiling of all files.
    // The plugin expects files typed with flow to include the `@flow` annotation.
    /// But not all react modules include this annotation, even if they are
    // flow-typed.
    all: true,
    pretty: false,
    ignoreUninitializedFields: false,
  },
};

const optimizeDeps = {
  esbuildOptions: {
    plugins: [
      esbuildFlowPlugin(
        flowPluginOptions.include,
        undefined,
        flowPluginOptions.flow,
      ),
    ],
  },
};

export default defineConfig({
  plugins: [
    flowPlugin(flowPluginOptions),
  ],
  optimizeDeps,
  define: {
    __DEV__: false,
    __EXPERIMENTAL__: true,
    __EXTENSION__: true,
    __PROFILE__: false,
    __TEST__: false,
  },
});
