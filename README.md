# Document Processing Web App

A TypeScript monorepo-based web application for uploading documents (PDF, Word) and generating AI-powered summaries using ChatGPT.

## Architecture

- **Frontend**: React on Next.js with Tailwind CSS
- **Backend**: NestJS API with document parsing
- **Monorepo**: Turborepo for build orchestration
- **AI Integration**: OpenAI ChatGPT for summarization

## Features

- 📄 Document upload (PDF, DOC, DOCX)
- 🤖 AI-powered content extraction and summarization
- 📱 Responsive design with drag-and-drop interface
- ⚡ Real-time upload progress
- 📋 Copy-to-clipboard functionality
- 🔒 File validation and error handling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+
- OpenAI API key

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Development:**
   ```bash
   # Start both frontend and backend in development mode
   npm run dev
   ```
   
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api

### Production Build

```bash
# Build all applications
npm run build

# Start production servers
cd apps/backend && npm run start:prod &
cd apps/frontend && npm start
```

## Project Structure

```
├── apps/
│   ├── backend/          # NestJS API server
│   │   ├── src/
│   │   │   ├── documents/    # Document processing module
│   │   │   └── main.ts       # Application entry point
│   │   └── package.json
│   └── frontend/         # Next.js React application
│       ├── src/
│       │   ├── app/          # Next.js 13+ app directory
│       │   ├── components/   # React components
│       │   ├── lib/          # Utilities and API client
│       │   └── types/        # TypeScript definitions
│       └── package.json
├── packages/             # Shared packages (future use)
├── turbo.json           # Turborepo configuration
└── package.json         # Root workspace configuration
```

## API Endpoints

### POST /documents/upload
Upload and process a document.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (PDF or Word document, max 10MB)

**Response:**
```json
{
  "filename": "document.pdf",
  "content": "Extracted text content...",
  "summary": "AI-generated summary...",
  "processedAt": "2025-08-26T10:40:00Z",
  "size": 1024,
  "mimeType": "application/pdf"
}
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Build all applications
npm run build

# Run linting
npm run lint

# Run type checking
npm run type-check

# Clean build artifacts
npm run clean
```

## Configuration

### Environment Variables

**Backend (.env.local):**
- `OPENAI_API_KEY` - OpenAI API key for ChatGPT integration
- `PORT` - Backend server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)

**Frontend:**
- `NEXT_PUBLIC_BACKEND_URL` - Backend API URL (default: http://localhost:3001)

### File Upload Limits

- Maximum file size: 10MB
- Supported formats: PDF (.pdf), Word (.doc, .docx)
- Upload timeout: 2 minutes

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally with `npm run dev`
4. Build to verify with `npm run build`
5. Submit a pull request

## License

This project is private and proprietary.