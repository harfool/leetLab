# LeetLab - A LeetCode-Inspired Coding Platform

LeetLab is a full-stack web application inspired by LeetCode, designed to help users practice coding problems, track their progress, and prepare for technical interviews. The platform features a modern React frontend with a Node.js/Express backend, PostgreSQL database, and Judge0 API integration for code execution.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization**: Secure user registration, login, and role-based access control (Admin/User)
- **Problem Management**: Create, view, and solve coding problems with multiple difficulty levels
- **Code Execution**: Real-time code execution and testing using Judge0 API
- **Submission Tracking**: Complete submission history with detailed test case results
- **Problem Playlists**: Organize problems into custom playlists for structured learning
- **Multi-language Support**: JavaScript, Python, and Java programming languages

### Advanced Features
- **Interactive Code Editor**: Monaco Editor integration for enhanced coding experience
- **Test Case Validation**: Automated test case execution with detailed feedback
- **Progress Tracking**: Mark problems as solved and track completion status
- **Search & Filtering**: Advanced filtering by difficulty, tags, and search terms
- **Responsive Design**: Modern UI built with Tailwind CSS and DaisyUI

## 🏗️ Architecture

### Technology Stack

#### Frontend
- **Framework**: React 19.1.0 with Vite
- **Styling**: Tailwind CSS 4.1.7 + DaisyUI 5.0.38
- **State Management**: Zustand 5.0.5
- **Code Editor**: Monaco Editor (VS Code editor in browser)
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Routing**: React Router DOM 7.6.1
- **UI Components**: Lucide React icons, React Hot Toast

#### Backend
- **Runtime**: Node.js with Express 5.1.0
- **Database**: PostgreSQL with Prisma ORM 6.8.2
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Code Execution**: Judge0 API integration
- **CORS**: Configured for cross-origin requests
- **Environment**: dotenv for configuration

#### Database Schema
- **User Management**: User roles, authentication, profile data
- **Problem System**: Problems with test cases, examples, constraints
- **Submission Tracking**: Code submissions with execution results
- **Test Case Results**: Detailed test case execution data
- **Playlist Management**: Custom problem collections
- **Progress Tracking**: Problem completion status

## 📁 Project Structure

```
leetLab/
├── backend/
│   ├── src/
│   │   ├── controllers/         # Route handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── executeCode.controller.js
│   │   │   ├── problem.controller.js
│   │   │   ├── submission.controller.js
│   │   │   └── playlist.controller.js
│   │   ├── middlewares/         # Auth middleware
│   │   ├── routes/              # API routes
│   │   ├── generated/           # Prisma client
│   │   └── index.js             # Entry point
│   ├── libs/
│   │   ├── db.js                # Database connection
│   │   └── judge0.libs.js       # Judge0 API utilities
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── migrations/          # Database migrations
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   ├── store/               # Zustand state stores
│   │   ├── lib/                 # Utilities and configs
│   │   ├── schema/              # Validation schemas
│   │   └── layout/              # Layout components
│   └── package.json
└── README.md
```

## 🗄️ Database Schema

### Core Models

#### User
- **Fields**: id, name, email, password, role (ADMIN/USER), image
- **Relationships**: Problems created, Submissions, Solved problems, Playlists

#### Problem
- **Fields**: title, description, difficulty (EASY/MEDIUM/HARD), tags, examples, constraints, hints, editorial
- **Test Data**: testcases (input/output), codeSnippets, referenceSolutions
- **Relationships**: Created by User, Submissions, ProblemSolved, ProblemInPlaylist

#### Submission
- **Fields**: sourceCode, language, stdin, stdout, stderr, compileOutput, status, memory, time
- **Relationships**: Belongs to User and Problem, Has TestCaseResults

#### TestCaseResult
- **Fields**: testCase number, passed status, stdout, expected, stderr, compileOutput, status, memory, time
- **Relationships**: Belongs to Submission

#### Playlist & ProblemInPlaylist
- **Purpose**: Organize problems into custom collections
- **Features**: User-specific playlists with many-to-many problem relationships

## 🔌 API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /check` - Verify authentication status

### Problems (`/api/v1/problems`)
- `GET /` - Get all problems (with filtering)
- `GET /:id` - Get problem by ID
- `POST /` - Create new problem (Admin only)
- `PUT /:id` - Update problem (Admin only)
- `DELETE /:id` - Delete problem (Admin only)

### Code Execution (`/api/v1/execute-code`)
- `POST /` - Execute code with test cases

### Submissions (`/api/v1/submission`)
- `GET /get-all-submission` - Get user's submissions
- `GET /get-submission/:problemId` - Get submissions for specific problem
- `GET /get-submission-count/:problemId` - Get submission count

### Playlists (`/api/v1/playlist`)
- `POST /` - Create playlist
- `GET /` - Get user playlists
- `POST /add-problem` - Add problem to playlist
- `DELETE /remove-problem` - Remove problem from playlist

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Judge0 API access (for code execution)

### Environment Variables

Create `.env` files in both backend and frontend directories:

#### Backend `.env`
```env
DATABASE_URL="postgresql://username:password@localhost:5432/leetlab"
JWT_SECRET="your-jwt-secret"
JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
JUDGE0_API_KEY="your-judge0-api-key"
PORT=3000
```

#### Frontend `.env`
```env
VITE_API_URL="http://localhost:3000/api/v1"
```

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/harfool/leetLab.git
cd leetLab
```

2. **Backend Setup**
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run server
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🔧 Configuration

### Judge0 Integration
The platform uses Judge0 API for code execution. Supported languages:
- **JavaScript** (Node.js) - Language ID: 63
- **Python** - Language ID: 71
- **Java** - Language ID: 62

### Database Configuration
Uses Prisma ORM with PostgreSQL. Key features:
- Automatic migrations
- Type-safe database queries
- Generated client with TypeScript support

## 🎯 Key Features Deep Dive

### Code Execution System
1. **Submission Flow**: User submits code → Batch submission to Judge0 → Poll for results → Store in database
2. **Test Case Validation**: Each test case is executed independently with detailed results
3. **Result Analysis**: Automatic pass/fail determination, performance metrics tracking
4. **Error Handling**: Compile errors, runtime errors, and timeout handling

### User Experience
1. **Monaco Editor**: Full-featured code editor with syntax highlighting
2. **Real-time Feedback**: Instant submission results with detailed test case breakdown
3. **Progress Tracking**: Visual indicators for solved problems
4. **Responsive Design**: Optimized for desktop and mobile devices

### Admin Features
1. **Problem Creation**: Rich problem creation interface with test case validation
2. **Reference Solutions**: Multi-language reference solutions with automatic testing
3. **Content Management**: Full CRUD operations for problems and user management

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Role-based Access**: Admin/User role separation
- **Input Validation**: Zod schema validation on frontend and backend
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🚀 Deployment Considerations

### Backend Deployment
- Environment variables configuration
- Database migration execution
- Judge0 API key setup
- CORS origin configuration for production domain

### Frontend Deployment
- Build optimization with Vite
- API URL configuration for production
- Static asset hosting
- Route handling for SPA

## 📈 Future Enhancements

### Planned Features
- **Discussion Forums**: Community discussions for problems
- **Editorial System**: Detailed solution explanations
- **Contest Mode**: Timed coding contests
- **Analytics Dashboard**: Performance analytics and insights
- **Social Features**: Following users, sharing solutions
- **Advanced Filtering**: More sophisticated search and filtering options

### Technical Improvements
- **Caching**: Redis integration for improved performance
- **Microservices**: Service separation for better scalability
- **Real-time Features**: WebSocket integration for live updates
- **Mobile App**: React Native mobile application
- **AI Integration**: AI-powered hints and solution suggestions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json files for details.

## 👨‍💻 Author

**Harfool** - [GitHub Profile](https://github.com/harfool)

## 🙏 Acknowledgments

- Inspired by LeetCode platform
- Judge0 API for code execution
- Open source community for excellent libraries and tools
- React and Node.js communities for comprehensive documentation

---

**Note**: This is an educational project inspired by LeetCode. It demonstrates full-stack development skills and modern web technologies for learning purposes.
