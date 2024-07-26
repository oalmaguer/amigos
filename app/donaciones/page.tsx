import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import Image from "next/image";

export default function Donaciones() {
  return (
    <main>
      <section className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Donate to Paw Haven</h1>
            <p className="text-muted-foreground mb-8">
              Your donation helps us provide food, shelter, and medical care for
              the animals in our care. Every contribution makes a difference.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Donation Amount</Label>
                <div className="flex items-center gap-2">
                  <Input id="amount" type="number" placeholder="Enter amount" />
                  <span className="text-muted-foreground">USD</span>
                </div>
              </div>
              <div>
                <Label htmlFor="frequency">Donation Frequency</Label>
                <Select name="frequency">
                  <option value="one-time">One-time</option>
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <Button type="submit" className="w-full">
                Donate Now
              </Button>
            </div>
          </div>
          <div>
            <Image
              src="/pexels2.jpg"
              width={400}
              height={350}
              alt="Picture of the author"
              className="ml-auto  rounded-lg object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
