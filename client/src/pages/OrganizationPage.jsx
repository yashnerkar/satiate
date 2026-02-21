import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Phone, MapPin, Users, Heart, CheckCircle2, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const OrganizationPage = () => {
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    amountDonated: '',
  });

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const res = await fetch(`/api/organizations/${id}`);
        const data = await res.json();
        setOrg(data.organization);
        setDonors(data.donors || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrg();
  }, [id, alert]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const displayRazorpay = async (e) => {
    e.preventDefault();
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      window.alert('Razorpay SDK failed to load.');
      return;
    }

    try {
      const sendData = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          organizationId: id,
        }),
      });
      const razorpayData = await sendData.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        currency: razorpayData.currency,
        amount: razorpayData.amount?.toString(),
        order_id: razorpayData.id,
        name: org?.name || 'Satiate',
        description: 'Thank you for your Donation!',
        handler: function () {
          setAlert(razorpayData.status);
          setForm({ name: '', email: '', amountDonated: '' });
          setTimeout(() => setAlert(''), 4000);
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!org) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Organization not found.</p>
        <Link to="/"><Button variant="outline">Go Home</Button></Link>
      </div>
    );
  }

  const percentage = org.targetAmount > 0 ? (org.raisedAmount / org.targetAmount) * 100 : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to all organizations
        </Link>

        {/* Alert */}
        {alert && (
          <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-medium flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="h-4 w-4" />
            {alert}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left - Org Details */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl font-bold">{org.name}</h1>
                {org.aadhaarVerified && (
                  <Badge variant="success" className="gap-1">
                    <ShieldCheck className="h-3 w-3" /> Aadhaar Verified
                  </Badge>
                )}
                {org.phoneVerified && (
                  <Badge variant="success" className="gap-1">
                    <Phone className="h-3 w-3" /> Phone Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge variant={org.category === 'hunger' ? 'warning' : 'default'}>{org.category}</Badge>
                {org.state && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {org.state}
                  </span>
                )}
              </div>
            </div>

            {/* Description Card */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">About this Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {org.description || 'This organization is working to make a positive impact in communities. Every donation counts towards creating meaningful change.'}
                </p>
              </CardContent>
            </Card>

            {/* Why Donate */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Why Your Donation Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To make the world a better place for everyone, we all need to play our part. While we like to believe we can make a difference on our own, sometimes we can do more together. The way charities are structured lets them use money raised to directly help people who need it on a larger scale than we can as individuals.
                </p>
              </CardContent>
            </Card>

            {/* Fundraising Progress */}
            {org.targetAmount > 0 && (
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Fundraising Progress</span>
                    <span className="text-sm text-primary font-semibold">{Math.round(percentage)}%</span>
                  </div>
                  <Progress value={org.raisedAmount} max={org.targetAmount} className="h-4 mb-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />{(org.raisedAmount || 0).toLocaleString('en-IN')} raised</span>
                    <span>Goal: ₹{org.targetAmount.toLocaleString('en-IN')}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Donors */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Recent Donors ({donors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {donors.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Be the first to donate!</p>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {donors.map((donor, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-semibold">
                            {donor.name?.[0]?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{donor.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {donor.donatedAt ? new Date(donor.donatedAt).toLocaleDateString() : 'Recently'}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-primary">₹{donor.amountDonated?.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right - Donation Form */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <Card className="glass-card animate-pulse-glow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Make a Donation</CardTitle>
                  <p className="text-sm text-muted-foreground">Every rupee makes a difference</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={displayRazorpay} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="donor-name">Your Name</Label>
                      <Input
                        id="donor-name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="donor-email">Email Address</Label>
                      <Input
                        id="donor-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="donor-amount">Donation Amount (₹)</Label>
                      <Input
                        id="donor-amount"
                        name="amountDonated"
                        type="number"
                        min="1"
                        placeholder="Enter amount"
                        value={form.amountDonated}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Quick amounts */}
                    <div className="flex gap-2 flex-wrap">
                      {[100, 500, 1000, 5000].map(amt => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setForm({ ...form, amountDonated: amt.toString() })}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                            form.amountDonated === amt.toString()
                              ? 'bg-primary/20 border-primary text-primary'
                              : 'border-border text-muted-foreground hover:border-primary/50'
                          }`}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>

                    <Button type="submit" className="w-full h-12 text-base font-semibold mt-2">
                      <Heart className="mr-2 h-4 w-4" />
                      Donate Now
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;
