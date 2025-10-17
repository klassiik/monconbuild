import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Eye, 
  Search, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  RefreshCw 
} from 'lucide-react';

const PerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    // Load initial performance data
    loadPerformanceData();
    
    // Set up periodic updates (every 5 minutes in production)
    const interval = setInterval(() => {
      if (process.env.NODE_ENV === 'production') {
        loadPerformanceData();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const loadPerformanceData = async () => {
    try {
      // In a real implementation, this would fetch from your analytics endpoint
      // For demo purposes, we'll simulate data
      const mockData = {
        scores: {
          performance: 92,
          accessibility: 96,
          bestPractices: 88,
          seo: 94
        },
        metrics: {
          lcp: 1850, // Largest Contentful Paint
          fid: 85,   // First Input Delay
          cls: 0.08, // Cumulative Layout Shift
          fcp: 1200, // First Contentful Paint
          ttfb: 180  // Time to First Byte
        },
        trends: {
          performance: '+3%',
          accessibility: '+1%',
          bestPractices: '-2%',
          seo: '+5%'
        },
        recommendations: [
          {
            title: 'Optimize Images',
            description: 'Convert images to WebP format for better compression',
            impact: 'high',
            type: 'performance'
          },
          {
            title: 'Enable Text Compression',
            description: 'Enable gzip/brotli compression for text resources',
            impact: 'medium',
            type: 'performance'
          },
          {
            title: 'Improve Color Contrast',
            description: 'Some text elements have insufficient color contrast',
            impact: 'medium',
            type: 'accessibility'
          }
        ]
      };

      setPerformanceData(mockData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to load performance data:', error);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    await loadPerformanceData();
    setIsLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score) => {
    if (score >= 90) return 'default';
    if (score >= 70) return 'secondary';
    return 'destructive';
  };

  const getMetricStatus = (metric, value) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 600, poor: 1000 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'needs-improvement':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'poor':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatMetricValue = (metric, value) => {
    switch (metric) {
      case 'cls':
        return value.toFixed(3);
      case 'lcp':
      case 'fid':
      case 'fcp':
      case 'ttfb':
        return `${value}ms`;
      default:
        return value;
    }
  };

  if (!performanceData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading performance data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Monitor</h2>
          <p className="text-gray-600">Real-time web performance insights powered by Lighthouse MCP</p>
        </div>
        <Button 
          onClick={refreshData} 
          disabled={isLoading}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Performance Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`text-2xl font-bold ${getScoreColor(performanceData.scores.performance)}`}>
                {performanceData.scores.performance}
              </div>
              <Badge variant={getScoreBadgeVariant(performanceData.scores.performance)}>
                {performanceData.trends.performance}
              </Badge>
            </div>
            <Progress 
              value={performanceData.scores.performance} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accessibility</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`text-2xl font-bold ${getScoreColor(performanceData.scores.accessibility)}`}>
                {performanceData.scores.accessibility}
              </div>
              <Badge variant={getScoreBadgeVariant(performanceData.scores.accessibility)}>
                {performanceData.trends.accessibility}
              </Badge>
            </div>
            <Progress 
              value={performanceData.scores.accessibility} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Practices</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`text-2xl font-bold ${getScoreColor(performanceData.scores.bestPractices)}`}>
                {performanceData.scores.bestPractices}
              </div>
              <Badge variant={getScoreBadgeVariant(performanceData.scores.bestPractices)}>
                {performanceData.trends.bestPractices}
              </Badge>
            </div>
            <Progress 
              value={performanceData.scores.bestPractices} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SEO</CardTitle>
            <Search className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`text-2xl font-bold ${getScoreColor(performanceData.scores.seo)}`}>
                {performanceData.scores.seo}
              </div>
              <Badge variant={getScoreBadgeVariant(performanceData.scores.seo)}>
                {performanceData.trends.seo}
              </Badge>
            </div>
            <Progress 
              value={performanceData.scores.seo} 
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Core Web Vitals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Core Web Vitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(performanceData.metrics).map(([metric, value]) => {
              const status = getMetricStatus(metric, value);
              return (
                <div key={metric} className="text-center p-4 border rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    {getStatusIcon(status)}
                    <span className="ml-2 text-sm font-medium uppercase">{metric}</span>
                  </div>
                  <div className="text-lg font-bold">
                    {formatMetricValue(metric, value)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  rec.impact === 'high' ? 'bg-red-500' : 
                  rec.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <h4 className="font-medium">{rec.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Badge variant="outline" size="sm">
                      {rec.type}
                    </Badge>
                    <Badge 
                      variant={rec.impact === 'high' ? 'destructive' : rec.impact === 'medium' ? 'secondary' : 'default'}
                      size="sm"
                    >
                      {rec.impact} impact
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      {lastUpdate && (
        <div className="text-center text-sm text-gray-500">
          Last updated: {lastUpdate.toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;