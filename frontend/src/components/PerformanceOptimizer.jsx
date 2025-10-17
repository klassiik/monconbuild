import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Image, 
  Zap, 
  FileText, 
  Globe, 
  Timer,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Download
} from 'lucide-react';

const PerformanceOptimizer = () => {
  const [optimizations, setOptimizations] = useState([
    {
      id: 'posthog-removal',
      title: 'PostHog Analytics Removed',
      description: 'Removed 31 KiB of legacy JavaScript causing render blocking',
      status: 'completed',
      impact: 'high',
      savings: '610ms render time + 31 KiB',
      category: 'javascript'
    },
    {
      id: 'image-lazy-loading',
      title: 'Image Lazy Loading',
      description: 'Added loading="lazy" to all images for better LCP',
      status: 'completed',
      impact: 'high',
      savings: 'Faster LCP, reduced initial payload',
      category: 'images'
    },
    {
      id: 'sitemap-robots',
      title: 'Sitemap & Robots.txt Fixed',
      description: 'Created proper sitemap.xml and valid robots.txt',
      status: 'completed',
      impact: 'medium',
      savings: 'SEO improvements, 35 errors fixed',
      category: 'seo'
    },
    {
      id: 'accessibility-buttons',
      title: 'Button Accessibility',
      description: 'Added aria-label attributes for screen readers',
      status: 'completed',
      impact: 'medium',
      savings: 'Better accessibility score',
      category: 'accessibility'
    },
    {
      id: 'dns-prefetch',
      title: 'DNS Prefetch Added',
      description: 'Preconnect to external domains for faster loading',
      status: 'completed',
      impact: 'medium',
      savings: 'Faster external resource loading',
      category: 'network'
    },
    {
      id: 'image-optimization',
      title: 'Image Optimization',
      description: 'Convert to WebP/AVIF, resize and compress images',
      status: 'pending',
      impact: 'high',
      savings: '4,475 KiB savings, 3-4s LCP improvement',
      category: 'images'
    },
    {
      id: 'unused-css',
      title: 'Remove Unused CSS',
      description: 'Enable PurgeCSS for Tailwind optimization',
      status: 'pending',
      impact: 'medium',
      savings: '~50% CSS bundle reduction',
      category: 'css'
    }
  ]);

  const [performanceScore, setPerformanceScore] = useState(75);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Timer className="w-4 h-4 text-yellow-600" />;
      case 'in-progress':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'images':
        return <Image className="w-4 h-4" />;
      case 'javascript':
        return <FileText className="w-4 h-4" />;
      case 'css':
        return <FileText className="w-4 h-4" />;
      case 'network':
        return <Globe className="w-4 h-4" />;
      case 'seo':
        return <TrendingUp className="w-4 h-4" />;
      case 'accessibility':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const startImageOptimization = () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    const updatedOptimizations = optimizations.map(opt => 
      opt.id === 'image-optimization' 
        ? { ...opt, status: 'in-progress' }
        : opt
    );
    setOptimizations(updatedOptimizations);

    // Simulate completion after 5 seconds
    setTimeout(() => {
      const completedOptimizations = optimizations.map(opt => 
        opt.id === 'image-optimization' 
          ? { ...opt, status: 'completed' }
          : opt
      );
      setOptimizations(completedOptimizations);
      setPerformanceScore(88);
      setIsOptimizing(false);
    }, 5000);
  };

  const completedOptimizations = optimizations.filter(opt => opt.status === 'completed').length;
  const totalOptimizations = optimizations.length;
  const completionPercentage = (completedOptimizations / totalOptimizations) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Optimizer</h2>
          <p className="text-gray-600">PageSpeed optimization progress and recommendations</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Current Score</div>
          <div className={`text-2xl font-bold ${performanceScore >= 90 ? 'text-green-600' : performanceScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
            {performanceScore}/100
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Optimization Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Completed Optimizations</span>
              <span className="font-semibold">{completedOptimizations}/{totalOptimizations}</span>
            </div>
            <Progress value={completionPercentage} className="w-full" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">{completedOptimizations}</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">
                  {optimizations.filter(opt => opt.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">
                  +{performanceScore >= 75 ? '15-20' : '25-30'}
                </div>
                <div className="text-sm text-gray-500">Score Improvement</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization List */}
      <div className="grid gap-4">
        {optimizations.map((optimization) => (
          <Card key={optimization.id} className="transition-all hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(optimization.status)}
                  {getCategoryIcon(optimization.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{optimization.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getImpactColor(optimization.impact)} size="sm">
                        {optimization.impact} impact
                      </Badge>
                      <Badge 
                        variant={optimization.status === 'completed' ? 'default' : 'outline'} 
                        size="sm"
                      >
                        {optimization.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{optimization.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">
                      💾 {optimization.savings}
                    </span>
                    {optimization.id === 'image-optimization' && optimization.status === 'pending' && (
                      <Button 
                        size="sm" 
                        onClick={startImageOptimization}
                        disabled={isOptimizing}
                      >
                        {isOptimizing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Optimizing...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Start Optimization
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expected Improvements */}
      <Card>
        <CardHeader>
          <CardTitle>Expected Performance Improvements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-sm text-gray-500 mb-1">LCP (Current)</div>
              <div className="text-lg font-bold text-red-600">7.0s</div>
              <div className="text-sm text-gray-500 mt-1">→</div>
              <div className="text-lg font-bold text-green-600">2.5s</div>
              <div className="text-sm text-gray-500">After optimization</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-sm text-gray-500 mb-1">TBT (Current)</div>
              <div className="text-lg font-bold text-red-600">200ms</div>
              <div className="text-sm text-gray-500 mt-1">→</div>
              <div className="text-lg font-bold text-green-600">50ms</div>
              <div className="text-sm text-gray-500">After optimization</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Speed Index</div>
              <div className="text-lg font-bold text-red-600">4.7s</div>
              <div className="text-sm text-gray-500 mt-1">→</div>
              <div className="text-lg font-bold text-green-600">2.5s</div>
              <div className="text-sm text-gray-500">After optimization</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Bundle Size</div>
              <div className="text-lg font-bold text-red-600">4.5MB</div>
              <div className="text-sm text-gray-500 mt-1">→</div>
              <div className="text-lg font-bold text-green-600">1.2MB</div>
              <div className="text-sm text-gray-500">After optimization</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Optimization Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Image className="w-4 h-4 mr-2" />
              Image Compression Tool
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="w-4 h-4 mr-2" />
              CSS Analyzer
            </Button>
            <Button variant="outline" className="justify-start">
              <Zap className="w-4 h-4 mr-2" />
              Run Lighthouse Audit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceOptimizer;