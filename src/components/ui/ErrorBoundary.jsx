import { Component } from 'react';

/**
 * Catches unhandled JavaScript errors in child component trees,
 * logs them, and displays a clean fallback recovery interface.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', {
      timestamp: new Date().toISOString(),
      error: error.message,
      componentStack: errorInfo.componentStack,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-6 text-center">
          <div className="max-w-md p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-black/10">
            <h2 className="text-2xl font-black text-black mb-3">Something went wrong</h2>
            <p className="text-black/70 font-bold text-sm mb-6">
              An unexpected error occurred while loading this page.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="bg-[#0071e3] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#0077ed] transition-colors shadow-md"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
