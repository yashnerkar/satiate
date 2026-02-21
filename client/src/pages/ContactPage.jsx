import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ContactPage = () => {
  const [form, setForm] = useState({ email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', form);
    setSubmitted(true);
    setForm({ email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative hero-gradient py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 animate-slide-up">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Info */}
            <Card className="glass-card">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-bold">Who We Are</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We are a group of students from the Department of Computer Science and Engineering, working on a project to make a platform for people to make their generous donations towards satiating the needs of the underserved.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <span>contact@satiate.org</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <span>We typically respond within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl">Send Feedback</CardTitle>
                <CardDescription>Share your thoughts and help us improve</CardDescription>
              </CardHeader>
              <CardContent>
                {submitted && (
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="h-4 w-4" /> Message sent! Thank you for your feedback.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email Address</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Your Message</Label>
                    <textarea
                      id="contact-message"
                      placeholder="Share your feedback, suggestions, or questions..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
