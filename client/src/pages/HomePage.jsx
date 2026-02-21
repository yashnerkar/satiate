import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Heart, Shield, TrendingUp, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrgCard from '@/components/OrgCard';
import { INDIAN_STATES } from '@/lib/constants';

const categories = [
  { value: '', label: 'All' },
  { value: 'hunger', label: '🍽️ Hunger' },
  { value: 'education', label: '📚 Education' },
  { value: 'healthcare', label: '🏥 Healthcare' },
  { value: 'environment', label: '🌿 Environment' },
  { value: 'animals', label: '🐾 Animals' },
  { value: 'disaster', label: '🆘 Disaster' },
];

const stats = [
  { icon: Heart, value: '6+', label: 'Verified NGOs' },
  { icon: Shield, value: '100%', label: 'Secure Payments' },
  { icon: TrendingUp, value: '₹10L+', label: 'Raised So Far' },
];

const HomePage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchOrgs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedState) params.set('state', selectedState);
      if (activeCategory) params.set('category', activeCategory);

      const res = await fetch(`/api/organizations?${params.toString()}`);
      const data = await res.json();
      setOrganizations(data.organizations || []);
    } catch (err) {
      console.error('Error fetching organizations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, [activeCategory, selectedState]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient py-20 sm:py-28 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>Empowering Change Through Generosity</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up">
            Fund the Future,{' '}
            <span className="gradient-text">One NGO at a Time</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Discover verified organizations making real impact. Your donation, however small, helps satiate the needs of communities across India.
          </p>

          {/* State Filter */}
          <div className="flex gap-2 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="flex h-12 w-full rounded-md border border-input bg-card/60 pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 cursor-pointer appearance-none"
              >
                <option value="">All States</option>
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="h-12 px-6"
              onClick={() => setSelectedState('')}
              disabled={!selectedState}
            >
              Clear
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-14 animate-slide-up" style={{ animationDelay: '300ms' }}>
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizations Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Explore <span className="gradient-text">Organizations</span>
            </h2>
            <p className="text-muted-foreground">
              Browse verified NGOs by category and find causes you care about
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card p-5 space-y-4 animate-pulse">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded-full w-full" />
                </div>
              ))}
            </div>
          ) : organizations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No organizations found.</p>
              <p className="text-muted-foreground text-sm mt-1">Try a different state or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizations.map((org, index) => (
                <OrgCard key={org._id} org={org} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
