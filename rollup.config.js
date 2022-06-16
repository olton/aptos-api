import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: 'dist/aptos.js',
                format: 'esm',
            }
        ],
        plugins: [
            builtins(),
            nodeResolve(),
            commonjs(),
            babel({ babelHelpers: 'bundled' })
        ]
    }
]