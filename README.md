# JSDoc-TypeScript + Node Starter

> A simple, but non-trivial example of getting the most from JSDoc + tsserver (Type Linting without TypeScript)

If you'd like to get the benefits of Type Linting without drinking the TypeScript Kool-Aid, you're in the right place.

<!--
This project has purposefully half-baked - so that you can see the type linting in action!
-->

This project contains some configuration and example type files.

## Key Components

```txt
.
├── tsconfig.json (JSON5)
├── @types
│  └── express
│     └── index.d.ts (TypeScript definitions)
└── types.js (global JSDOC)
```

```bash
npm install -g typescript
npm install --save-dev @types/node
npm install --save-dev @types/express
```

# Vim Users

Assuming that you're using [`vim-ale`](https://webinstall.dev/vim-ale),
the main option you need to modify is the list of linters.

For example, you must have `tsserver`, and you may also want `jshint`:

```vim
let g:ale_linters = {
\  'javascript': ['tsserver', 'jshint']
\}
```

For other options see [.vimrc](/.vimrc)
