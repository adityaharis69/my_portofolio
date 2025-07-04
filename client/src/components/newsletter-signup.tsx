import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletter } from "@/hooks/use-newsletter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { subscribeToNewsletter, isPending } = useNewsletter();

  const { data: stats } = useQuery({
    queryKey: ["/api/newsletter/count"],
    select: (data: { count: number }) => data.count
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await subscribeToNewsletter({ email });
      toast({
        title: "Success!",
        description: "You've successfully subscribed to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay in the Visual Loop</h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Get weekly updates on trending products, new visual search features, and exclusive member discounts.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white text-gray-900 border-0 focus-visible:ring-secondary"
            />
            <Button
              type="submit"
              disabled={isPending}
              className="bg-secondary hover:bg-secondary/90 text-white"
            >
              {isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/60 mt-4">
            Join {stats ? `${stats.toLocaleString()}+` : "25,000+"} visual searchers. Unsubscribe anytime.
          </p>
        </form>

        <div className="flex justify-center items-center space-x-8 text-center">
          <div>
            <div className="text-2xl font-bold">{stats ? `${stats.toLocaleString()}+` : "25K+"}</div>
            <div className="text-sm text-primary-foreground/60">Subscribers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm text-primary-foreground/60">Match Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold">1M+</div>
            <div className="text-sm text-primary-foreground/60">Products Found</div>
          </div>
        </div>
      </div>
    </section>
  );
}
