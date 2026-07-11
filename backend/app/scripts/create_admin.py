"""Create the first admin user from the terminal.

Usage:
    python -m app.scripts.create_admin --username admin --password 'YourSecurePassword'
"""

import argparse
import asyncio
import sys

from sqlalchemy import select

from app.auth.password import hash_password
from app.database import AsyncSessionLocal
from app.models import AdminUser


async def create_admin(username: str, password: str) -> None:
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(AdminUser).where(AdminUser.username == username)
        )
        existing = result.scalar_one_or_none()
        if existing:
            print(f"Admin user '{username}' already exists.")
            return

        admin = AdminUser(
            username=username,
            password_hash=hash_password(password),
            is_active=True,
        )
        session.add(admin)
        await session.commit()
        print(f"Admin user '{username}' created successfully.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Create SHAMANGARO admin user")
    parser.add_argument("--username", required=True, help="Admin username")
    parser.add_argument("--password", required=True, help="Admin password (min 8 chars)")
    args = parser.parse_args()

    if len(args.password) < 8:
        print("Error: password must be at least 8 characters.")
        sys.exit(1)

    asyncio.run(create_admin(args.username, args.password))


if __name__ == "__main__":
    main()
