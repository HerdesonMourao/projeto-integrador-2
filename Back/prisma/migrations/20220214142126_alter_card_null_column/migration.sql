-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "limit" DROP NOT NULL,
ALTER COLUMN "current_value" DROP NOT NULL,
ALTER COLUMN "closing_day" DROP NOT NULL;
