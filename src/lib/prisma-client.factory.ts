import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/**
 * Creates a PostgreSQL pool and adapter for Prisma
 */
export function createPrismaAdapter() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  return new PrismaPg(pool);
}

/**
 * Creates a PrismaClient instance with PostgreSQL adapter
 */
export function createPrismaClient(): PrismaClient {
  const adapter = createPrismaAdapter();
  return new PrismaClient({
    adapter,
  });
}

