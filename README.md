# Cinema Complex

A white label cinema booking and administration platform built with Next.js and PayloadCMS.

## ✨ Features

### White Label Capabilities
- Full brand customization (complex name, description, logotype, favicon, and logo)
- Customizable navigation menu
- Flexible page management system
- SEO optimization for all pages

### Content Management
- User-friendly admin interface
- Media library for managing images and assets
- Dynamic page creation and editing
- Theater management system

### Homepage Customization
- Configurable hero section with custom text and imagery
- SEO metadata management
- Dynamic content blocks

## 🛠️ Technologies

- Next.js 14 application
- PayloadCMS admin interface
- PostgreSQL database
- GraphQL API
- TypeScript support
- Tailwind CSS styling
- ESLint and Prettier configuration
- VSCode debugging support

## 🛠️ Prerequisites

- Node.js (^18.20.2 || >=20.9.0)
- PostgreSQL database
- bun

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/leanhanc/cinema-complex.git
cd cinema-complex
```

2. Install dependencies:

```bash
bun install
```

3. Set up the database:

```bash
psql -v db_password="'your-password'" -f scripts/init.sql
```

4. Generate required PayloadCMS files:

```bash
bun generate:types
bun generate:importmap
```

## 🚀 Development

Start the development server:

```bash
bun dev
```

## 🏗️ Build

Build the application:

```bash
bun build
```

## 🧪 Production

Start the production server:

```bash
bun start
```

## 🧹 Code Quality

Format code:

```bash
bun format
```

Lint code:

```bash
bun lint
```

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [PayloadCMS](https://payloadcms.com/) - Headless CMS
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
