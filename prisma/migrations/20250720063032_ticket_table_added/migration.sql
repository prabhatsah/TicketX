-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('New', 'Assigned', 'In_progress', 'On_hold', 'Resolved', 'Closed');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('Feature', 'Bug', 'Incident');

-- CreateTable
CREATE TABLE "ticket" (
    "id" BIGSERIAL NOT NULL,
    "ticket_no" BIGINT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL,
    "priority" "TicketPriority" NOT NULL,
    "type" "TicketType" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issue_date" TIMESTAMPTZ(6) NOT NULL,
    "closed_at" TIMESTAMPTZ(6),
    "creator_id" UUID NOT NULL,
    "current_assignee_id" UUID,
    "group_id" UUID[],
    "account_id" UUID NOT NULL,
    "application_id" UUID NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_ticket_no_key" ON "ticket"("ticket_no");
