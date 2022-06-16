import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

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
            nodeResolve(),
            commonjs(),
            babel({ babelHelpers: 'bundled' })
        ]
    }
]