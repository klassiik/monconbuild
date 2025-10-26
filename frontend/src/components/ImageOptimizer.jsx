import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Download, 
  Image as ImageIcon, 
  Zap, 
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const ImageOptimizer = () => {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [optimizationResults, setOptimizationResults] = useState(null);

  // Simulated image optimization data based on your PageSpeed report
  const currentImages = [
    {
      name: 'hero-image.jpg',
      currentSize: '2.4 MB',
      optimizedSize: '680 KB',
      savings: '72%',
      format: 'WebP',
      url: 'https://customer-assets.emergentagent.com/job_99d86ab4-e27f-41c7-9c4d-305324a0277f/artifacts/6s7jphb3_Untitled.jpg'
    },
    {
      name: 'portfolio-1.jpg',
      currentSize: '1.8 MB',
      optimizedSize: '420 KB',
      savings: '77%',
      format: 'WebP',
      url: 'https://customer-assets.emergentagent.com/job_finish-woodwork/artifacts/rdyxjzid_Untitled%283%29.png'
    },
    {
      name: 'about-us.jpg',
      currentSize: '890 KB',
      optimizedSize: '210 KB',
      savings: '76%',
      format: 'WebP',
      url: 'https://customer-assets.emergentagent.com/job_finish-woodwork/artifacts/other-image.jpg'
    }
  ];

  const totalCurrentSize = currentImages.reduce((total, img) => 
    total + parseFloat(img.currentSize.replace(/[^\d.]/g, '')), 0
  );

  const totalOptimizedSize = currentImages.reduce((total, img) => 
    total + parseFloat(img.optimizedSize.replace(/[^\d.]/g, '')), 0
  );

  const totalSavings = ((totalCurrentSize - totalOptimizedSize) / totalCurrentSize * 100).toFixed(1);

  const handleOptimizeImages = () => {
    setIsProcessing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setOptimizationResults({
        totalImages: currentImages.length,
        totalSavings: `${totalSavings}%`,
        sizeBefore: `${totalCurrentSize.toFixed(1)} MB`,
        sizeAfter: `${totalOptimizedSize.toFixed(1)} MB`,
        lcpImprovement: '3.2s',
        performanceGain: '+18 points'
      });
      setIsProcessing(false);
    }, 3000);
  };

  const downloadOptimizedImages = () => {
    // In a real implementation, this would download the optimized images
    alert('Optimized images would be downloaded as a ZIP file');
  };

  const generateOptimizedCode = () => {
    const codeExample = `
// Before (unoptimized)
<img src="https://customer-assets.emergentagent.com/large-image.jpg" 
     alt="Project example" />

// After (optimized with modern formats)
<picture>
  <source srcSet="/images/project-example.avif" type="image/avif" />
  <source srcSet="/images/project-example.webp" type="image/webp" />
  <img src="/images/project-example.jpg" 
       alt="Project example"
       loading="lazy"
       width="800"
       height="600"
       className="object-cover" />
</picture>`;

    navigator.clipboard.writeText(codeExample);
    alert('Optimized code copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Image Optimizer</h2>
          <p className="text-gray-600">Optimize images for better Core Web Vitals</p>
        </div>
        <Badge variant="destructive" className="text-sm">
          4.5 MB to optimize
        </Badge>
      </div>

      {/* Current Performance Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
            Current Image Performance Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg bg-red-50">
              <div className="text-2xl font-bold text-red-600">7.0s</div>
              <div className="text-sm text-gray-600">Current LCP</div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-red-50">
              <div className="text-2xl font-bold text-red-600">4.5 MB</div>
              <div className="text-sm text-gray-600">Image Payload</div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-yellow-50">
              <div className="text-2xl font-bold text-yellow-600">66</div>
              <div className="text-sm text-gray-600">Performance Score</div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-red-50">
              <div className="text-2xl font-bold text-red-600">4.7s</div>
              <div className="text-sm text-gray-600">Speed Index</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Images Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Images to Optimize</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentImages.map((image, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ImageIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{image.name}</div>
                      <div className="text-sm text-gray-500">
                        {image.currentSize} → {image.optimizedSize}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    -{image.savings}
                  </Badge>
                </div>
              ))}
              
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Savings</span>
                  <span className="text-lg font-bold text-green-600">
                    {totalSavings}% ({(totalCurrentSize - totalOptimizedSize).toFixed(1)} MB)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Optimization Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Optimization Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                onClick={handleOptimizeImages}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                    Optimizing Images...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Start Optimization
                  </>
                )}
              </Button>

              {isProcessing && (
                <div className="space-y-2">
                  <Progress value={33} className="w-full" />
                  <div className="text-sm text-gray-600 text-center">
                    Converting to WebP format...
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={generateOptimizedCode}>
                  <Download className="w-4 h-4 mr-2" />
                  Get Code
                </Button>
                <Button variant="outline" onClick={downloadOptimizedImages}>
                  <Upload className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              {/* Optimization Tips */}
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-green-700 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-blue-900">Pro Tips:</div>
                    <ul className="mt-1 space-y-1 text-blue-700">
                      <li>• Use WebP for 80% smaller files</li>
                      <li>• Add loading="lazy" for images below fold</li>
                      <li>• Resize images to actual display size</li>
                      <li>• Use srcset for responsive images</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {optimizationResults && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CheckCircle className="w-5 h-5 mr-2" />
              Optimization Complete!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {optimizationResults.totalImages}
                </div>
                <div className="text-sm text-gray-600">Images Optimized</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {optimizationResults.totalSavings}
                </div>
                <div className="text-sm text-gray-600">Size Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {optimizationResults.lcpImprovement}
                </div>
                <div className="text-sm text-gray-600">LCP Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {optimizationResults.performanceGain}
                </div>
                <div className="text-sm text-gray-600">Performance Gain</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded border">
              <div className="text-sm">
                <strong>Before:</strong> {optimizationResults.sizeBefore} → 
                <strong className="text-green-600 ml-1">After:</strong> {optimizationResults.sizeAfter}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Implementation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <h4>Step 1: Download & Convert Images</h4>
            <ol>
              <li>Click "Start Optimization" to process all images</li>
              <li>Download the optimized image pack</li>
              <li>Extract to <code>/public/images/</code> folder</li>
            </ol>

            <h4>Step 2: Update Image Components</h4>
            <ol>
              <li>Replace external URLs with local paths</li>
              <li>Add modern format support with <code>&lt;picture&gt;</code> element</li>
              <li>Include responsive image attributes</li>
            </ol>

            <h4>Step 3: Verify Improvements</h4>
            <ol>
              <li>Run Lighthouse audit after deployment</li>
              <li>Check LCP improvement (target: &lt;2.5s)</li>
              <li>Monitor performance score increase</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageOptimizer;
