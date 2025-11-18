// Comprehensive error handling utilities for Monument Construction

// Error types for better categorization
export const ERROR_TYPES = {
  NETWORK: 'network_error',
  VALIDATION: 'validation_error',
  PERMISSION: 'permission_error',
  NOT_FOUND: 'not_found_error',
  SERVER: 'server_error',
  CLIENT: 'client_error',
  UNKNOWN: 'unknown_error'
};

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Custom error class for application errors
export class AppError extends Error {
  constructor(message, type = ERROR_TYPES.UNKNOWN, severity = ERROR_SEVERITY.MEDIUM, details = {}) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.severity = severity;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

// Error logger that can be extended with monitoring services
export class ErrorLogger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000; // Keep last 1000 errors
  }

  // Log error with context
  log(error, context = {}) {
    const logEntry = {
      error: error.message || error,
      type: error.type || ERROR_TYPES.UNKNOWN,
      severity: error.severity || ERROR_SEVERITY.MEDIUM,
      context,
      timestamp: new Date().toISOString(),
      stack: error.stack || 'No stack trace available',
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    this.logs.push(logEntry);
    
    // Keep only the last maxLogs errors
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Application Error:', logEntry);
    }

    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(logEntry);
    }

    return logEntry;
  }

  // Send error to monitoring service (can be extended with Sentry, LogRocket, etc.)
  async sendToMonitoringService(logEntry) {
    try {
      // Example: Send to custom analytics endpoint
      await fetch('/api/analytics/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logEntry)
      });
    } catch (e) {
      // Fail silently if monitoring service is unavailable
      console.warn('Failed to send error to monitoring service:', e);
    }
  }

  // Get recent errors for debugging
  getRecentErrors(count = 10) {
    return this.logs.slice(-count);
  }

  // Clear all logs
  clearLogs() {
    this.logs = [];
  }
}

// Create global error logger instance
export const errorLogger = new ErrorLogger();

// Async error wrapper for promise handling
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// React Error Boundary helper
export const createErrorInfo = (componentStack, errorBoundaryMessage) => {
  return {
    componentStack,
    errorBoundaryMessage,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  };
};

// API error handler
export const handleApiError = (error) => {
  let appError;

  if (error.name === 'AppError') {
    appError = error;
  } else if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || `Server error (${status})`;
    
    if (status === 404) {
      appError = new AppError('Resource not found', ERROR_TYPES.NOT_FOUND, ERROR_SEVERITY.LOW);
    } else if (status === 403) {
      appError = new AppError('Access denied', ERROR_TYPES.PERMISSION, ERROR_SEVERITY.HIGH);
    } else if (status >= 500) {
      appError = new AppError('Server error occurred', ERROR_TYPES.SERVER, ERROR_SEVERITY.HIGH);
    } else {
      appError = new AppError(message, ERROR_TYPES.CLIENT, ERROR_SEVERITY.MEDIUM);
    }
  } else if (error.request) {
    // Network error
    appError = new AppError('Network connection failed', ERROR_TYPES.NETWORK, ERROR_SEVERITY.HIGH);
  } else {
    // Something else happened
    appError = new AppError(error.message || 'Unknown error occurred', ERROR_TYPES.UNKNOWN, ERROR_SEVERITY.MEDIUM);
  }

  // Log the error
  errorLogger.log(appError, { originalError: error });
  
  return appError;
};

// Validation error handler
export const handleValidationError = (errors) => {
  const message = Object.values(errors).join(', ') || 'Validation failed';
  return new AppError(message, ERROR_TYPES.VALIDATION, ERROR_SEVERITY.MEDIUM, { errors });
};

// Retry mechanism for failed requests
export const retryRequest = async (requestFn, maxAttempts = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
};

// User-friendly error messages
export const getUserFriendlyMessage = (error) => {
  switch (error.type) {
    case ERROR_TYPES.NETWORK:
      return 'Please check your internet connection and try again.';
    case ERROR_TYPES.VALIDATION:
      return 'Please check your input and try again.';
    case ERROR_TYPES.PERMISSION:
      return 'You do not have permission to perform this action.';
    case ERROR_TYPES.NOT_FOUND:
      return 'The requested resource was not found.';
    case ERROR_TYPES.SERVER:
      return 'Our servers are experiencing issues. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

// Error boundary error handler
export const handleErrorBoundaryError = (error, errorInfo) => {
  const appError = new AppError(
    'React error boundary caught an error',
    ERROR_TYPES.CLIENT,
    ERROR_SEVERITY.HIGH,
    {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    }
  );

  errorLogger.log(appError, { errorBoundary: true });
  
  return appError;
};

// Simple error handler for components
export const handleError = (error, type = 'UNKNOWN', severity = 'MEDIUM', context = {}) => {
  const appError = new AppError(
    error.message || error,
    ERROR_TYPES[type] || ERROR_TYPES.UNKNOWN,
    ERROR_SEVERITY[severity] || ERROR_SEVERITY.MEDIUM,
    context
  );
  
  errorLogger.log(appError, context);
  
  return appError;
};

export default errorLogger;