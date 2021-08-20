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

Pay close attention to your `tsconfig.json`.

```js
{
  "compilerOptions": {
    "target": "ESNEXT",
    "module": "commonjs",
    // "lib": [],        // Leave this empty. All libs in 'target' will be loaded.
    "allowJs": true ,
    "checkJs": true ,
    "noEmit": true,
    "strict": true,
    "noImplicitAny": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    // "baseUrl": "./",
    // "paths": {},
    // "rootDirs": [],
    "typeRoots": [ "@types", "./node_modules/@types" ],
    "esModuleInterop": true, // allow node-style require
    "preserveSymlinks": false, // will work with basetag
    "maxNodeModuleJsDepth": 20, // will resolve dependencies of dependencies
  },
  "include": ["./types.js", "server.js", "lib/**/*.js"],
  "exclude": ["node_modules"]
}
```

Especially:

- `lib` should be commented out. Don't use this.
- `compilerOptions.typeRoots: [ "@types", "./node_modules/@types" ]`, should include both local and external type definitions
- `include: ["**/*.js"]` should include ALL of your JavaScript files

You may want to start with `"noImplicitAny": false` and change it to to `"noImplicitAny": true` once you've solved for all of the most basic errors.

## See ALL Warnings & Errors

Run `tsc` from the directory where `tsconfig.json` exists.

```bash
tsc
```

Make user that `include` is set properly to include all your code and JSDoc typse, and that `typeRoots` is set to include your type overrides.

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
