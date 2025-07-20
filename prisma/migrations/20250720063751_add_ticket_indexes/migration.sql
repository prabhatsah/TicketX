-- CreateIndex
CREATE INDEX "ticket_status_idx" ON "ticket"("status");

-- CreateIndex
CREATE INDEX "ticket_priority_idx" ON "ticket"("priority");

-- CreateIndex
CREATE INDEX "ticket_type_idx" ON "ticket"("type");

-- CreateIndex
CREATE INDEX "ticket_status_priority_idx" ON "ticket"("status", "priority");
