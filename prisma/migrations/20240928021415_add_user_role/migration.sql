-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'BOX_OWNER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
