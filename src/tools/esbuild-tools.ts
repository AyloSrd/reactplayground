import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

interface VFS {
    [key: string]: string
}

const ENTRY_POINT_JSX = 'App.jsx'

const AppdefaultContent = `
import React, { useState } from 'react'
import { test } from './Counter.jsx'
console.log(test);
`.trim()

const vfs: VFS = {
    [ENTRY_POINT_JSX]: AppdefaultContent,
    'Counter.jsx': 'export const test = "yo"'
}

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === ENTRY_POINT_JSX) {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.startsWith('./') && vfs[args.path.substring(2)]) {
            return {
                namespace: 'a',
                path: args.path.substring(2)
            }
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === ENTRY_POINT_JSX) {
          return {
            loader: 'jsx',
            contents: vfs[ENTRY_POINT_JSX],
          };
        }

        if (vfs[args.path]) {
            return {
              loader: 'jsx',
              contents: vfs[args.path],
            };
          }

        const { data, request } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
      });
    },
  };
};
