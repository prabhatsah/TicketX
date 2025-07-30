"use client";

import { useState } from "react";
import { useOrgUsers } from "@/hooks/use-org-users";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { UserPlus, Shield, Eye, Mail, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@shared/models/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateRole } from "@/lib/api/users/updateRole";
import { useLoading } from "@/context/LoadingContext";
import { removeUserFromOrg } from "@/lib/api/users/removeUserFromOrg";

export default function UserManagementPage() {
  const { users, loading, error, refresh } = useOrgUsers();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<User["role"]>("USER");
  const { setLoading } = useLoading();

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/invite`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
        }
      );
      if (!res.ok) throw new Error("Invite failed");
      toast.success("Invitation sent");
      setInviteEmail("");
      setInviteRole("USER");
      setDialogOpen(false);
    } catch (err: any) {
      toast.error("Invite failed", { description: err.message });
    }
  }

  async function handleRoleChange(userId: string, newRole: User["role"]) {
    try {
      setLoading(true);
      const res = await updateRole(userId, newRole);

      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      await refresh();

      toast.success(`${res.message}`, {
        description: `Changed to ${newRole}`,
      });
    } catch (err: any) {
      toast.error("Role update failed!", {
        description: ` ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveUser(userId: string) {
    setLoading(true);
    try {
      const res = await removeUserFromOrg(userId);
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      await refresh();
      toast.success("User removed", { description: res.message });
    } catch (err: any) {
      toast.error("User removal failed!", { description: err.message });
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="p-6">Loading users…</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 space-y-4">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">User &amp; Role Management</h1>
          <p className="text-muted-foreground">
            Manage all users in your organization
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Invite User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email</Label>
                <Input
                  id="invite-email"
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invite-role">Role</Label>
                <Select
                  onValueChange={(v) => setInviteRole(v as User["role"])}
                  defaultValue={inviteRole}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">
                      <Shield className="mr-2" /> Admin
                    </SelectItem>
                    <SelectItem value="AGENT">
                      <Shield className="mr-2" /> Agent
                    </SelectItem>
                    <SelectItem value="USER">
                      <Eye className="mr-2" /> Viewer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Mail className="mr-2" /> Send Invite
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {users.map((u) => (
            <TableRow className="" key={u.id}>
              <TableCell>{u.name ?? u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {(["ADMIN", "SUPPORT", "USER"] as User["role"][]).map(
                      (r) => (
                        <DropdownMenuItem
                          className={u.role === r ? "bg-primary" : ""}
                          key={r}
                          onClick={() => handleRoleChange(u.id, r)}
                        >
                          {r}
                        </DropdownMenuItem>
                      )
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleRemoveUser(u.id)}
                    >
                      Remove User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
