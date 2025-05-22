# MediConnect

A healthcare communication platform connecting patients with providers through secure messaging.

## Tech Stack

### Frontend
- React + TypeScript
- Vite
- TailwindCSS
- shadcn/ui components

### Backend
- Node.js + Express
- MongoDB (primary database)
- Redis (caching & session management) 
- WebSocket (real-time chat)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB 6+
- Redis 7+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mediconnect
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start development servers:
```bash
# Terminal 1: Start MongoDB
mongod --dbpath /var/lib/mongodb

# Terminal 2: Start Redis 
redis-server

# Terminal 3: Start backend server
npm run server

# Terminal 4: Start frontend dev server
npm run dev
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React context providers
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Route components
│   │   └── utils/        # Helper functions
│   
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── services/        # Business logic
```

## Backend Architecture

### Database Schema

```typescript
// Users
interface User {
  id: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
  profile: {
    name: string;
    specialization?: string;
    licenseNumber?: string;
  };
}

// Messages
interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  readStatus: boolean;
}
```

### API Endpoints

```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User authentication
GET    /api/users            # List available doctors
POST   /api/chats           # Create new chat
GET    /api/chats/:id       # Get chat history
POST   /api/messages        # Send new message
```

### WebSocket Events

```
chat:join     # Join chat room
chat:message  # New message
chat:typing   # User typing indicator
chat:read     # Message read receipt
```

## Deployment

### Production Requirements

1. Server Infrastructure:
   - Application server (Node.js)
   - MongoDB database
   - Redis instance
   - Reverse proxy (Nginx)
   - SSL/TLS certificates

2. Security Measures:
   - Input validation
   - Request rate limiting
   - JWT authentication
   - Data encryption
   - CORS configuration
   - XSS/CSRF protection

### Deployment Steps

1. Build frontend:
```bash
npm run build
```

2. Set up production server:
```bash
# Install dependencies
sudo apt update
sudo apt install nginx mongodb redis-server

# Configure Nginx reverse proxy
sudo nano /etc/nginx/sites-available/mediconnect

# Enable SSL with Certbot
sudo certbot --nginx
```

3. Start services:
```bash
pm2 start server/index.js --name mediconnect
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details
