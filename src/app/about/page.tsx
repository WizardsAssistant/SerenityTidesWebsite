import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHand, Leaf, Target } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & Lead Instructor",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman smiling",
  },
  {
    name: "Maria Garcia",
    role: "Yoga & Movement Specialist",
    avatar: "https://placehold.co/100x100.png",
    hint: "person yoga",
  },
  {
    name: "Sam Chen",
    role: "Community Manager",
    avatar: "https://placehold.co/100x100.png",
    hint: "man outdoors",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          About Serenity Tides
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We believe in the transformative power of integrating mind, body, and nature. Our mission is to guide you towards a more peaceful and connected life.
        </p>
      </section>

      <section className="mb-16">
        <Image 
          src="https://placehold.co/1200x500.png"
          alt="Serene landscape"
          data-ai-hint="serene landscape"
          width={1200}
          height={500}
          className="rounded-lg object-cover w-full shadow-lg"
        />
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16 text-center">
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/20 rounded-full mb-4">
            <Target className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-headline font-semibold mb-2">Our Mission</h3>
          <p className="text-muted-foreground">
            To provide accessible, high-quality mindfulness and movement experiences that foster inner peace and community connection.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/20 rounded-full mb-4">
            <HeartHand className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-headline font-semibold mb-2">Our Values</h3>
          <p className="text-muted-foreground">
            We value authenticity, compassion, inclusivity, and a deep respect for the natural world in all that we do.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/20 rounded-full mb-4">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-headline font-semibold mb-2">Our Approach</h3>
          <p className="text-muted-foreground">
            We blend ancient wisdom with modern science, creating unique events that are both grounding and uplifting.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-8">
          Meet Our Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center shadow-md">
              <CardHeader className="items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint}/>
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
