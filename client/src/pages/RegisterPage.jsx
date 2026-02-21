import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Phone, MapPin, CreditCard, FileText, Target, ShieldCheck, CheckCircle2, Loader2, Tag, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { INDIAN_STATES, CATEGORIES, validateEmail, validatePhone, validateUPI, validatePassword, validateAadhaar } from '@/lib/constants';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});
  const [orgId, setOrgId] = useState('');
  const [otp, setOtp] = useState('');
  const [verifications, setVerifications] = useState({
    aadhaar: false,
    phone: false,
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    state: '',
    upiID: '',
    description: '',
    category: 'other',
    aadhaarNumber: '',
    targetAmount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 4000);
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.name || form.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    if (!form.email || !validateEmail(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    const pwdErr = validatePassword(form.password);
    if (pwdErr) {
      newErrors.password = pwdErr;
    }
    if (!form.phoneNumber || !validatePhone(form.phoneNumber)) {
      newErrors.phoneNumber = 'Phone must be exactly 10 digits';
    }
    if (!form.state) {
      newErrors.state = 'Please select a state';
    }
    if (form.upiID && !validateUPI(form.upiID)) {
      newErrors.upiID = 'UPI must be in format user@bankhandle (e.g. ngo@paytm)';
    }
    if (form.aadhaarNumber && !validateAadhaar(form.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Aadhaar must be exactly 12 digits';
    }
    if (form.targetAmount && Number(form.targetAmount) < 0) {
      newErrors.targetAmount = 'Target amount cannot be negative';
    }
    if (form.description && form.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 1: Register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/organizations/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setOrgId(data.organization._id);
        showAlert('success', data.status);
        setStep(2);
      } else {
        showAlert('error', data.status);
      }
    } catch (err) {
      showAlert('error', 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Aadhaar
  const verifyAadhaar = async () => {
    if (!validateAadhaar(form.aadhaarNumber)) {
      showAlert('error', 'Aadhaar must be exactly 12 digits');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/organizations/verify-aadhaar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: orgId, aadhaarNumber: form.aadhaarNumber }),
      });
      const data = await res.json();
      if (res.ok) {
        setVerifications({ ...verifications, aadhaar: true });
        showAlert('success', 'Aadhaar verified!');
      } else {
        showAlert('error', data.status);
      }
    } catch (err) {
      showAlert('error', 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Send OTP
  const sendOtp = async () => {
    if (!validatePhone(form.phoneNumber)) {
      showAlert('error', 'Phone must be exactly 10 digits');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/organizations/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: form.phoneNumber }),
      });
      const data = await res.json();
      showAlert(res.ok ? 'success' : 'error', data.status || data.message);
    } catch (err) {
      showAlert('error', 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      showAlert('error', 'OTP must be exactly 6 digits');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/organizations/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: orgId, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setVerifications({ ...verifications, phone: true });
        showAlert('success', 'Phone verified!');
      } else {
        showAlert('error', data.status);
      }
    } catch (err) {
      showAlert('error', 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ field }) => {
    if (!errors[field]) return null;
    return (
      <p className="text-xs text-destructive flex items-center gap-1 mt-1">
        <AlertCircle className="h-3 w-3" /> {errors[field]}
      </p>
    );
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-2xl px-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[
            { num: 1, label: 'Details' },
            { num: 2, label: 'Verify' },
            { num: 3, label: 'Done' },
          ].map(({ num, label }) => (
            <div key={num} className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                step >= num
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step > num ? <CheckCircle2 className="h-4 w-4" /> : num}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${step >= num ? 'text-foreground' : 'text-muted-foreground'}`}>
                {label}
              </span>
              {num < 3 && <div className={`w-12 h-0.5 ${step > num ? 'bg-primary' : 'bg-muted'}`} />}
            </div>
          ))}
        </div>

        {/* Alert */}
        {alert.message && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium flex items-center gap-2 animate-fade-in ${
            alert.type === 'success'
              ? 'bg-primary/10 border border-primary/20 text-primary'
              : 'bg-destructive/10 border border-destructive/20 text-destructive'
          }`}>
            {alert.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {alert.message}
          </div>
        )}

        {/* Step 1: Organization Details */}
        {step === 1 && (
          <Card className="glass-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Register Your NGO</CardTitle>
              <CardDescription>Fill in your organization details to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-1.5"><Building2 className="h-3 w-3" /> Organization Name *</Label>
                    <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Akshaya Patra" className={errors.name ? 'border-destructive' : ''} />
                    <FieldError field="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> Email *</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="ngo@example.com" className={errors.email ? 'border-destructive' : ''} />
                    <FieldError field="email" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Password *</Label>
                    <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 6 chars, 1 uppercase, 1 number" className={errors.password ? 'border-destructive' : ''} />
                    <FieldError field="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> Phone (10 digits) *</Label>
                    <Input id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="9876543210" maxLength={10} className={errors.phoneNumber ? 'border-destructive' : ''} />
                    <FieldError field="phoneNumber" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state" className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> State *</Label>
                    <select
                      id="state"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className={`flex h-10 w-full rounded-md border bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 cursor-pointer ${errors.state ? 'border-destructive' : 'border-input'}`}
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <FieldError field="state" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="upiID" className="flex items-center gap-1.5"><CreditCard className="h-3 w-3" /> UPI ID</Label>
                    <Input id="upiID" name="upiID" value={form.upiID} onChange={handleChange} placeholder="ngo@paytm" className={errors.upiID ? 'border-destructive' : ''} />
                    <FieldError field="upiID" />
                    {!errors.upiID && <p className="text-xs text-muted-foreground">Format: username@bankhandle</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-1.5"><Tag className="h-3 w-3" /> Category</Label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        type="button"
                        key={cat.value}
                        onClick={() => setForm({ ...form, category: cat.value })}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                          form.category === cat.value
                            ? 'bg-primary/20 border-primary text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-1.5">
                    <FileText className="h-3 w-3" /> Description
                    <span className="text-xs text-muted-foreground ml-auto">{form.description.length}/1000</span>
                  </Label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Tell donors about your mission..."
                    rows={3}
                    maxLength={1000}
                    className={`flex w-full rounded-md border bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 ${errors.description ? 'border-destructive' : 'border-input'}`}
                  />
                  <FieldError field="description" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaarNumber" className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3" /> Aadhaar Number (12 digits)</Label>
                    <Input id="aadhaarNumber" name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange} placeholder="123456789012" maxLength={12} className={errors.aadhaarNumber ? 'border-destructive' : ''} />
                    <FieldError field="aadhaarNumber" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetAmount" className="flex items-center gap-1.5"><Target className="h-3 w-3" /> Fundraising Goal (₹)</Label>
                    <Input id="targetAmount" name="targetAmount" type="number" min="0" value={form.targetAmount} onChange={handleChange} placeholder="100000" className={errors.targetAmount ? 'border-destructive' : ''} />
                    <FieldError field="targetAmount" />
                  </div>
                </div>

                <Button type="submit" className="w-full h-11 mt-2" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Register Organization
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Verification */}
        {step === 2 && (
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Aadhaar Verification
                  {verifications.aadhaar && <Badge variant="success">Verified</Badge>}
                </CardTitle>
                <CardDescription>Verify your Aadhaar card number (12-digit format validation)</CardDescription>
              </CardHeader>
              <CardContent>
                {!verifications.aadhaar ? (
                  <div className="flex gap-3">
                    <Input
                      name="aadhaarNumber"
                      value={form.aadhaarNumber}
                      onChange={handleChange}
                      placeholder="Enter 12-digit Aadhaar number"
                      maxLength={12}
                      className="flex-1"
                    />
                    <Button onClick={verifyAadhaar} disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-primary flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Aadhaar verified successfully
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Phone Verification
                  {verifications.phone && <Badge variant="success">Verified</Badge>}
                </CardTitle>
                <CardDescription>Verify your phone number via OTP (demo code: 123456)</CardDescription>
              </CardHeader>
              <CardContent>
                {!verifications.phone ? (
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Input value={form.phoneNumber} readOnly className="flex-1 opacity-70" />
                      <Button variant="outline" onClick={sendOtp} disabled={loading}>
                        Send OTP
                      </Button>
                    </div>
                    <div className="flex gap-3">
                      <Input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className="flex-1"
                      />
                      <Button onClick={verifyOtp} disabled={loading}>
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-primary flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Phone verified successfully
                  </p>
                )}
              </CardContent>
            </Card>

            <Button className="w-full h-11" onClick={() => setStep(3)}>
              {verifications.aadhaar && verifications.phone ? 'Complete Registration' : 'Skip & Continue'}
            </Button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <Card className="glass-card text-center">
            <CardContent className="py-16 space-y-6">
              <div className="mx-auto h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
                <p className="text-muted-foreground">
                  Your organization <strong className="text-foreground">{form.name}</strong> is now registered on Satiate.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {verifications.aadhaar && <Badge variant="success" className="gap-1"><ShieldCheck className="h-3 w-3" /> Aadhaar Verified</Badge>}
                {verifications.phone && <Badge variant="success" className="gap-1"><Phone className="h-3 w-3" /> Phone Verified</Badge>}
              </div>
              <Button onClick={() => navigate('/')} size="lg">
                Explore Organizations
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
