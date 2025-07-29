"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import OrgSelectorModal from "@/components/OrgSelectorModal";

import { LoginResult, SessionUser } from "@shared/api/auth";
import { OrgSummary } from "@shared/models/org";
import { useSession } from "@/context/session-context";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { refreshSession, setSelectedOrg } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [orgOptions, setOrgOptions] = useState<OrgSummary[]>([]);
  const [pendingUser, setPendingUser] = useState<SessionUser | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Missing fields", {
        description: "Please enter both email and password.",
      });
      return;
    }

    try {
      const res: LoginResult = await login(email, password);

      if (res.requiresOrgSelection) {
        setPendingUser(res.user);
        setOrgOptions(res.organizations);
        setModalOpen(true);
      } else {
        await refreshSession(); //  fetch /me and set global session

        router.push("/home");
      }

      toast.success("Login successful", {
        description: "Redirecting to your dashboard...",
      });

      //router.push("/");
    } catch (err: any) {
      toast.error("Login failed", {
        description: err.message || "Invalid credentials",
      });
      setError(err.message);
    }
  };

  const handleOrgSelect = async (org: OrgSummary) => {
    if (pendingUser) {
      await setSelectedOrg(org.id); //properly persist org switch on server and update session
      setModalOpen(false);
      router.push("/home");
    }
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className=" ">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Login with your Google account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <OrgSelectorModal
        isOpen={modalOpen}
        organizations={orgOptions}
        onSelect={handleOrgSelect}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
