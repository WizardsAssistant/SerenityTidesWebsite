import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, Leaf, Target } from "lucide-react";
import Image from "next/image";
import { getTeamMembers, getAboutPageContent, type TeamMemberEntry } from "@/lib/contentful";

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();
  const aboutContent = await getAboutPageContent();

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          About Serenity Tides
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
          {aboutContent?.fields.About_Us_Text || "We believe in the transformative power of integrating mind, body, and nature. Our mission is to guide you towards a more peaceful and connected life."}
        </p>
        <p className="text-md text-muted-foreground max-w-2xl mx-auto">
          {aboutContent?.fields.About_Us_Secondary_Text || "Following the success of our 2024 event at Gilson Beach, we're excited to bring you our 2025 Summer Series in Chicago, continuing our journey of mindful community building."}
        </p>
      </section>

      <section className="mb-16">
        <Image 
          src={aboutContent?.fields.Hero_Image?.fields.file.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=500&fit=crop&crop=center"}
          alt={aboutContent?.fields.Hero_Image_Alt_Text || "Serene landscape"}
          width={1200}
          height={500}
          className="rounded-lg object-cover w-full shadow-lg"
        />
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16 text-center">
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/20 rounded-full mb-4">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-headline font-semibold mb-2">Our Mission</h3>
          <p className="text-muted-foreground">
            {aboutContent?.fields.Our_Mission_Text || "To provide accessible, high-quality mindfulness and movement experiences that foster inner peace and community connection."}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/20 rounded-full mb-4">
            <HandHeart className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-headline font-semibold mb-2">Our Values</h3>
          <p className="text-muted-foreground">
            {aboutContent?.fields.Our_Values_Text || "We value authenticity, compassion, inclusivity, and a deep respect for the natural world in all that we do."}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-primary/20 rounded-full mb-4">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-headline font-semibold mb-2">Our Approach</h3>
          <p className="text-muted-foreground">
            {aboutContent?.fields.Our_Approach_Text || "We blend ancient wisdom with modern science, creating unique events that are both grounding and uplifting."}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-8">
          Meet Our Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.fields.Name} className="text-center shadow-md">
              <CardHeader className="items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={member.fields.Avatar.fields.file.url} alt={member.fields.Name} />
                  <AvatarFallback>{member.fields.Name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline">{member.fields.Name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{member.fields.Role}</p>
                {member.fields.Bio && (
                  <p className="text-sm text-muted-foreground">{member.fields.Bio}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}