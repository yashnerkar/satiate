import React from 'react';
import { Heart, Users, Target, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    desc: 'We believe in the power of empathy and generosity to transform lives.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Building bridges between donors and NGOs for maximum collective impact.',
  },
  {
    icon: Target,
    title: 'Transparency',
    desc: 'Every organization is verified, and every donation is tracked end-to-end.',
  },
  {
    icon: Globe,
    title: 'Impact',
    desc: 'Making a real difference across India — one donation at a time.',
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative hero-gradient py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 animate-slide-up">
            About <span className="gradient-text">Satiate</span>
          </h1>
          <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
            We are a group of students from the Department of Computer Science and Engineering, building a platform for people to make their generous donations towards satiating the needs of the underserved.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="glass-card">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Satiate connects compassionate donors with verified NGOs making real impact across India. We believe that technology can bridge the gap between those who want to help and those who need it most. Our platform ensures that every rupee donated reaches verified organizations committed to creating positive change.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Card key={title} className="glass-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: `${i * 100}ms` }}>
                <CardContent className="p-6 flex gap-4 items-start">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Built by CSI-CATT DMCE</h2>
          <p className="text-muted-foreground">
            A student-led initiative from Datta Meghe College of Engineering, powered by the Computer Society of India (CSI) student chapter.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
