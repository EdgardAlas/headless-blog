# Folder structure

- public: contains the static files
- src: contains the source code
  - components
    - auto-form: contains the auto form component for the form simple form generation
    - crud: contains the crud component for the crud simple form generation
    - form: contains the form components to build any form
    - ui: contains the ui components from shadcn or own components
  - constants: contains the constants for the app
  - context: contains the context for the app
  - hooks: contains the hooks for the app
  - helpers: contains own helpers for the app
  - lib: contains own implementations for third party libraries
  - models: contains the models for the app (mongoose)
  - types: contains general global types
  - validations: contains general validations with zod
  - crud: contains every generated crud from the cli
    - [crud-name]: contains the crud generated
      - \_containers: contains every JSX component for this specific crud
      - actions.ts: contains the server actions for this specific crud (create, read, update, delete)
      - [crud-name].d.ts: contains the types for this specific crud
      - dao.ts: contains the data access object for this specific crud
      - modal.ts: contains the modal information for create, update and delete (title, and what server action to call)
      - validations.ts: contains the validations for the specific crud
      - crud.ts/tsx: contains the information for the specific page (input configuration, roles, get all data, seo, etc)
    - index.ts: contains the export of every crud file
    - modals.ts: contains the export of every modal file for the crud
  - generate-crud.ts: contains the script to generate a new crud from the cli (npx tsx ./src/generate-crud.ts -m [model-name]), previously you need to create the model in the models folder manually, and the model should have the mongoose schema exported with the name 'Schema'
  - middleware.ts: contains the middleware for the app



ffff
