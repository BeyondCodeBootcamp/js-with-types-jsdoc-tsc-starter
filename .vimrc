" Hello!
"
" These are options that you will need and/or want to use in order to
" use tsserver (the TypeScript linter) with JSDoc in your project.
" You can copy the options you like into you `~/.vimrc`,
"
" Or, if you'd like to leave this here as a project-specific setting,
" put these two lines at the bottom of your ~/.vimrc:
"
" Allow loading per-project .vimrc files
"set exrc
" Disable running autocmd commands
"set secure

""""""""""""""""""""
" For Type Linting "
""""""""""""""""""""

let g:ale_linters = {
\  'javascript': ['tsserver', 'jshint']
\}
let g:ale_lint_on_enter = 1

""""""""""""""""""""
" For IntelliSense "
""""""""""""""""""""

set omnifunc=ale#completion#OmniFunc
let g:ale_completion_enabled = 1
let g:ale_completion_autoimport = 1

""""""""""""""""""""""
" FOR LARGE PROJECTS "
""""""""""""""""""""""

" If you're in a project with hundreds of files, tsserver may make
" vim freeze for dozens of seconds at a time, perhaps frequently.
" To lessen this, you can elect to have it only lint when you save

" Don't fire up the tsserver linter until you save
"let g:ale_lint_on_save = 1

" Don't fire up tsserver linting until you've saved once
"let g:ale_lint_on_enter = 0
