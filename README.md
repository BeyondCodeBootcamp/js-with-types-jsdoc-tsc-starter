# JSDoc-TypeScript + Node Starter

> A simple, but non-trivial example of getting the most from JSDoc + tsserver
> (Type Linting without TypeScript)

If you'd like to get the benefits of Type Linting without drinking the
TypeScript Kool-Aid, you're in the right place.

This project has purposefully half-baked - meaning that errors exist on purpose
(with explanatory comments) - so that you can see the type linting in action!

## Table of Contents

<!-- TODO Key Benefits, VS Code -->

- Key Benefits
- Prerequisites
- Starter / Demo
- Key Components
- Key Configuration
- Manual "From Scratch"
- Vim Configuration

## Prerequisites

- `git`
- `node`
- `typescript` (and `jshint`)
- `vim-ale` (or VS Code)

You'll need `node`, `typescript` (`tsserver`), and `jshint`:

```bash
curl https://webinstall.dev/node@16 | bash
export PATH="${HOME}/.local/opt/node/bin:${PATH}"

npm install -g typescript
npm install -g jshint
```

If you're using `vim` you'll also want
[`vim-ale`](https://webinstall.dev/vim-ale) (and probably the full set of
[`vim-essentials`](https://webinstall.dev/vim-essentials)), and update
`~/.vimrc` to use `typescript` (and `jshint`, if desired) as the linter.

```bash
curl https://webinstall.dev/vim-ale | bash
```

```vim
" also use tserver for linting JavaScript
let g:ale_linters = {
\  'javascript': ['tsserver', 'jshint']
\}

" enable linting when opening a file
let g:ale_lint_on_enter = 1
```

Alternatively, you can let `vim` load per-project config `.vimrc`:

```vim
set exrc
set secure
```

## Starter / Demo

Clone the repo:

```bash
git clone https://github.com/BeyondCodeBootcamp/jsdoc-typescript-starter
```

Enter and install the dependencies (mostly type definitions):

```bash
pushd ./jsdoc-typescript-starter/

npm ci
```

Now open `server.js`, save (to kick off the linter), and be amazed!

```bash
vim server.js
```

Note: `tsserver` can take 10 - 30 seconds to boot on a VPS, and may not start
until after your first save (`:w`) in `vim`.

## Key Components

A typical project will look something like this:

```txt
.
├── server.js
├── lib/
│  ├── **/*.js
│  └── **/*.d.ts
├── node_modules/@types/ ("Definitely Typed" typings)
├── tsconfig.json (JSON5)
├── typings/
│  └── express/
│     └── index.d.ts (TypeScript definitions)
└── types.js (global JSDOC)
```

We could break this down into 4 key components, which must be referenced in your
`tsconfig.json`:

1. Source code (JavaScript + JSDoc)
   ```txt
   .
   ├── server.js
   └── lib/
      ├── **/*.js
      └── **/*.d.ts
   ```
2. Local typings (JSDoc)
   ```txt
   .
   └── types.js
   ```
3. "Definitely Typed" definitions: \
   (community-sourced _typings_ for popular packages)
   ```bash
   npm install --save-dev @types/express
   ```
   ```txt
   .
   └── node_modules/
       └── @types/
           └── express/
               └── index.d.ts (community-sourced type definitions)
   ```
4. Type overrides (Type Definitions)
   ```txt
   .
   └── typings/
      └── express/
         └── index.d.ts (TypeScript definitions)
   ```
   _Note: the `./typings` folder has three widely accepted naming conventions:
   named `./@types`, `./types`._

These **must be properly enumerated** in `tsconfig.json`:

## Key Configuration

1. `include` - this section must enumerate your _local types_ and _source code_:
   ```js
   {
       "...": "",
       "include": ["./types.js", "server.js", "lib/**/*.js"]
   }
   ```
2. `compilerOptions.typeRoots` should specify your _local overrides_ and
   _community type definitions_.
   ```js
   {
       "compilerOptions": {
           "typeRoots": ["./typings", "./node_modules/@types"]
       },
       "...": ""
   }
   ```
3. `compilerOptions` must be changed from the default setting in order to make
   `tsserver` behaver as a _linter for node_ rather than as a compiler for the
   browser TypeScript:
   ```js
   {
       "compilerOptions": {
           "target": "ESNEXT",
           "module": "commonjs",
           // "lib": [],        // Leave this empty. All libs in 'target' will be loaded.
           "allowJs": true, // read js files
           "checkJs": true, // lint js files
           "noEmit": true,  // don't transpile
           "alwaysStrict": true, // assume "use strict"; whether or not its present
           "esModuleInterop": true, // allow node-style require
           "preserveSymlinks": false, // will work with basetag
           // I don't understand these well enough to tell you how to use them,
           // so I recommend that you don't (they may effect includes, excludes,
           // and typeRoots in expected/unintended ways).
           // "baseUrl": "./",
           // "paths": {},
           // "rootDirs": [],
           "...": ""
       },
       "...": ""
   }
   ```
   - Leave `compilerOptions.lib` commented out or empty. \
     (otherwise it will override `target`)
4. `compilerOptions.noImplicitAny` - this will strictly warn about all (untyped)
   JavaScript. You probably won't this off at first on existing projects - so
   that you only lint types that you've added and care about - and then turn it
   on after you've got the low hanging fruit.

   ```js
   {
       "compilerOptions": {

           "noImplicitAny": true,
           "...": ""
       },
       "...": ""
   }
   ```

   If this is a _new_ project, it's fine to turn on right away.

<!-- TODO
           figure out if this is important:
           "maxNodeModuleJsDepth": 3, // will resolve dependencies of dependencies
-->

## From Scratch

If you wanted to start a brand-new project from scratch, these are the steps you
would take:

```bash
npm install -g typescript
tsc --init

npm install --save-dev @types/node
npm install --save-dev @types/express
```

Here's the difference between the default `tsconfig.json` and the settings that
work for this project:

```diff
diff --git a/tsconfig.json b/tsconfig.json
index 35fc786..979a70d 100644
--- a/tsconfig.json
+++ b/tsconfig.json
@@ -2,11 +2,11 @@
   "compilerOptions": {

     // "incremental": true,
-    "target": "es5",
+    "target": "ESNEXT",
     "module": "commonjs",
     // "lib": [],
-    // "allowJs": true,
-    // "checkJs": true,
+    "allowJs": true,
+    "checkJs": true,
     // "jsx": "preserve",
     // "declaration": true,
     // "declarationMap": true,
@@ -17,13 +17,13 @@
     // "composite": true,
     // "tsBuildInfoFile": "./",
     // "removeComments": true,
-    // "noEmit": true,
+    "noEmit": true,
     // "importHelpers": true,
     // "downlevelIteration": true,
     // "isolatedModules": true,

     "strict": true,
-    // "noImplicitAny": true,
+    "noImplicitAny": false,
     // "strictNullChecks": true,
     // "strictFunctionTypes": true,
     // "strictBindCallApply": true,
@@ -43,11 +43,11 @@
     // "baseUrl": "./",
     // "paths": {},
     // "rootDirs": [],
-    // "typeRoots": [],
+    "typeRoots": ["./typings", "node_modules/@types"],
     // "types": [],
     // "allowSyntheticDefaultImports": true,
     "esModuleInterop": true,
-    // "preserveSymlinks": true,
+    "preserveSymlinks": false,
     // "allowUmdGlobalAccess": true,

     // "sourceRoot": "",
@@ -60,5 +60,7 @@

     "skipLibCheck": true,
     "forceConsistentCasingInFileNames": true
-  }
+  },
+  "include": ["types.js", "server.js", "lib/**/*.js"],
+  "exclude": ["node_modules"]
 }
```

Again, **the #1 thing** is to make sure that `include` and `typeRoots` matches
how your project is set up. For this project it looks like this:

```js
{
    "compilerOptions": {
        // ...
       "typeRoots": ["./typings", "node_modules/@types"],
    },
    "include": ["types.js", "server.js", "lib/**/*.js"],
    // ...
}
```

If you decide to follow a different convention, name your things accordingly.
This is also valid, if it matches your project:

```js
{
    "compilerOptions": {
        // ...
       "typeRoots": ["./@types", "node_modules/@types"],
    },
    "include": ["**/*.js"],
    // ...
}
```

## TypeScript Checker CLI

`tsc` can show you the same errors that you'll see in VS Code or vim, but in all
files across your project at once.

To check that out, run `tsc` from the directory where `tsconfig.json` exists.

```bash
tsc
```

If you don't get error output, then ake user that `include` is set properly to
include all your code and JSDoc types, and that `typeRoots` is set to include
your type overrides.

## Vim Configuration

Assuming that you're using [`vim-ale`](https://webinstall.dev/vim-ale), the main
option you need to modify is the list of linters.

For example, you must have `tsserver`, and you may also want `jshint`:

```vim
let g:ale_linters = {
\  'javascript': ['tsserver', 'jshint']
\}
```

For other options see [.vimrc](/.vimrc)
