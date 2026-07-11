from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "SHAMANGARO API"
    VERSION: str = "0.1.0"
    DEBUG: bool = False

    DATABASE_URL: str = "postgresql+asyncpg://shamangaro:shamangaro_secret@localhost:5432/shamangaro"

    SECRET_KEY: str = "change-this-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    ALGORITHM: str = "HS256"

    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://localhost:8080",
        "https://shamangaro.com",
        "http://shamangaro.com",
    ]

    COOKIE_SECURE: bool = True

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
