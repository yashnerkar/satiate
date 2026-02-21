import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const categoryColors = {
  education: 'secondary',
  healthcare: 'accent',
  hunger: 'warning',
  environment: 'success',
  animals: 'default',
  disaster: 'destructive',
  other: 'outline',
};

const OrgCard = ({ org, index = 0 }) => {
  const percentage = org.targetAmount > 0 ? (org.raisedAmount / org.targetAmount) * 100 : 0;

  return (
    <Card
      className="glass-card group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-foreground truncate group-hover:text-primary transition-colors">
                {org.name}
              </h3>
              {org.aadhaarVerified && (
                <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={categoryColors[org.category] || 'outline'}>
                {org.category}
              </Badge>
              {org.state && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {org.state}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {org.description || 'Supporting communities and making a difference.'}
        </p>

        {/* Progress */}
        {org.targetAmount > 0 && (
          <div className="mb-4 space-y-2">
            <Progress value={org.raisedAmount} max={org.targetAmount} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹{(org.raisedAmount || 0).toLocaleString('en-IN')} raised</span>
              <span>₹{org.targetAmount.toLocaleString('en-IN')} goal</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>Verified NGO</span>
          </div>
          <Link to={`/organizations/${org._id}`}>
            <Button size="sm" variant="default" className="group/btn">
              Donate
              <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrgCard;
