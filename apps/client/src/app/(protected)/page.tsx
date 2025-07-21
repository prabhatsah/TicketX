"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChartNoAxesGantt, ShieldCheck, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleClick = (endpoint: string) => {
    router.push(endpoint);
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-20">
        <p className="text-4xl font-extrabold text-white/80">
          Welcome to <span className="text-primary text-5xl">CollabX!</span>
        </p>
        <p className="text-white/70">
          One platform. Multiple tools. Endless collaboration.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 mt-28 mx-28 max-h-[23vh]">
            <Card
              className="flex flex-col gap-3 items-center flex-1 cursor-pointer"
              onClick={() => handleClick("/customer-support/dashboard")}
            >
              <CardHeader>
                <Ticket className="rotate-45 text-primary size-7" />
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-white/80">
                  Customer Support
                </p>
              </CardContent>
              <CardFooter className="">
                <p className="text-sm text-white/80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, dolor. Ratione iure saepe dicta quae, minima enim,
                  quidem tenetur est nam. dolor. Ratione iure saepe dicta quae,
                  minima enim, quidem tenetur est nam.
                </p>
              </CardFooter>
            </Card>
            <Card className="flex flex-col gap-3 items-center flex-1 cursor-pointer">
              <CardHeader>
                <ChartNoAxesGantt className=" text-primary size-7" />
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-white/80">
                  Project Management
                </p>
              </CardContent>
              <CardFooter className="">
                <p className="text-sm text-white/80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, dolor. Ratione iure saepe dicta quae, minima enim,
                  quidem tenetur est nam. dolor. Ratione iure saepe dicta quae,
                  minima enim, quidem tenetur est nam.
                </p>
              </CardFooter>
            </Card>
            <Card className="flex flex-col gap-3 items-center flex-1 cursor-pointer">
              <CardHeader>
                <ShieldCheck className="text-primary size-7" />
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-white/80">
                  Cyber Security
                </p>
              </CardContent>
              <CardFooter className="">
                <p className="text-sm text-white/80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, dolor. Ratione iure saepe dicta quae, minima enim,
                  quidem tenetur est nam. dolor. Ratione iure saepe dicta quae,
                  minima enim, quidem tenetur est nam.
                </p>
              </CardFooter>
            </Card>
          </div>
          <div className="flex gap-4 mx-28 max-h-[23vh]">
            <Card className="flex flex-col gap-3 items-center flex-1 cursor-pointer">
              <CardHeader>
                <Ticket className="rotate-45 text-primary size-7" />
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-white/80">
                  Customer Support
                </p>
              </CardContent>
              <CardFooter className="">
                <p className="text-sm text-white/80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, dolor. Ratione iure saepe dicta quae, minima enim,
                  quidem tenetur est nam. dolor. Ratione iure saepe dicta quae,
                  minima enim, quidem tenetur est nam.
                </p>
              </CardFooter>
            </Card>
            <Card className="flex flex-col gap-3 items-center flex-1 cursor-pointer">
              <CardHeader>
                <ChartNoAxesGantt className=" text-primary size-7" />
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-white/80">
                  Project Management
                </p>
              </CardContent>
              <CardFooter className="">
                <p className="text-sm text-white/80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, dolor. Ratione iure saepe dicta quae, minima enim,
                  quidem tenetur est nam. dolor. Ratione iure saepe dicta quae,
                  minima enim, quidem tenetur est nam.
                </p>
              </CardFooter>
            </Card>
            <Card className="flex flex-col gap-3 items-center flex-1 cursor-pointer">
              <CardHeader>
                <ShieldCheck className="text-primary size-7" />
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-white/80">
                  Cyber Security
                </p>
              </CardContent>
              <CardFooter className="">
                <p className="text-sm text-white/80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, dolor. Ratione iure saepe dicta quae, minima enim,
                  quidem tenetur est nam. dolor. Ratione iure saepe dicta quae,
                  minima enim, quidem tenetur est nam.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
