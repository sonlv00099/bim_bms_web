# BIM Web Application

A modern Building Information Modeling (BIM) web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🏗️ **Project Management**: Create and manage BIM projects
- 👥 **Team Collaboration**: Work with team members on projects
- 📄 **Document Management**: Store and organize project documents
- ⚙️ **Settings & Configuration**: Customize application preferences
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🔒 **Security**: Built-in security headers and best practices
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Code Quality**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
apps/web/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Configuration

### Next.js Configuration

The application includes:
- App Router enabled
- API rewrites for backend communication
- Security headers
- Image optimization
- TypeScript and ESLint integration

### Tailwind CSS

Custom theme with:
- Primary color palette
- Dark mode support
- Custom font (Inter)
- Responsive design utilities

## Development

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Format code with Prettier
- Use Tailwind CSS for styling

### Component Guidelines

- Create reusable components in `components/`
- Use TypeScript interfaces for props
- Implement proper error handling
- Add loading states where appropriate

## Deployment

The application can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any platform supporting Next.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
