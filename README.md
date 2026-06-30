src/
│
├── app/
│   ├── core/                     # Singleton services, guards, interceptors
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── services/
│   │   ├── models/
│   │   └── core.config.ts
│   │
│   ├── shared/                   # Reusable components, pipes, directives
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   ├── interfaces/
│   │   ├── constants/
│   │   └── utils/
│   │
│   ├── features/                 # Feature-wise modules/components
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── products/
│   │   └── interview/
│   │
│   ├── layout/                   # Header, Sidebar, Footer
│   │   ├── header/
│   │   ├── sidebar/
│   │   └── footer/
│   │
│   ├── pages/                    # Standalone pages
│   │   ├── home/
│   │   ├── about/
│   │   └── contact/
│   │
│   ├── app.routes.ts
│   ├── app.config.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.css
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── json/
│
├── environments/
│   ├── environment.ts
│   └── environment.development.ts
│
├── styles/
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _theme.scss
│   └── main.scss
│
├── main.ts
├── styles.scss
└── index.html