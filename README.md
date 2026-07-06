# SHAMANGARO

Premium Moroccan outdoor lifestyle e-commerce platform.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS 4, Shadcn UI, Framer Motion |
| Backend | FastAPI, SQLAlchemy 2, Alembic, Pydantic v2 |
| Database | PostgreSQL 16 |
| Infrastructure | Docker, Nginx, JWT Auth |
| Deployment | Hostinger VPS |

## Project Structure

```
shamangaro/
├── frontend/          → Next.js application
├── backend/           → FastAPI application
├── docker/            → Docker configs (Nginx, PostgreSQL, Frontend)
├── docker-compose.yml → Production orchestration
└── docker-compose.dev.yml → Development (DB only)
```

## Getting Started

### Prerequisites

- Node.js 22+
- Python 3.12+
- Docker & Docker Compose
- Git

### Development Setup

1. Clone the repository:
```bash
git clone <repo-url> shamangaro
cd shamangaro
```

2. Start the database:
```bash
docker compose -f docker-compose.dev.yml up -d
```

3. Backend setup:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

4. Frontend setup:
```bash
cd frontend
npm install
npm run dev
```

### Production Deployment

```bash
cp .env.example .env
# Edit .env with production values
docker compose up -d --build
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `POSTGRES_USER` | Database username |
| `POSTGRES_PASSWORD` | Database password |
| `POSTGRES_DB` | Database name |
| `SECRET_KEY` | JWT signing key (64+ chars) |
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `NEXT_PUBLIC_SITE_URL` | Frontend public URL |

## Languages

- Default: Moroccan Darija (ar)
- Secondary: French (fr)

## License

Proprietary - SHAMANGARO. All rights reserved.
