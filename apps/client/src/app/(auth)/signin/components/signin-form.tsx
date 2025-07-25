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
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import OrgSelectorModal from "@/components/OrgSelectorModal";
import { useSession } from "@/hooks/use-session";
import { LoginResult } from "@shared/api/auth";
import { Organization } from "@shared/models/org";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setSession } = useSession(); // custom hook
  const [orgOptions, setOrgOptions] = useState([]);
  const [pendingUser, setPendingUser] = useState(null);
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
      console.log("response - ", res);

      if (res.requiresOrgSelection) {
        // Multiple orgs — open modal
        setPendingUser(res.user);
        setOrgOptions(res.organizations);
        setModalOpen(true);
      } else {
        // Single org — proceed
        setSession({
          user: res.user,
          org: res.organization,
        });
        console.log("session set with data", res);

        router.push("/");
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

  const handleOrgSelect = async (org: Organization) => {
    //debugger;
    if (pendingUser) {
      await setSession({ user: pendingUser, org });
      setModalOpen(false);
      router.push("/");
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
