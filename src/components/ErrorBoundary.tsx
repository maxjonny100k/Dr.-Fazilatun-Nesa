import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'An unexpected error occurred.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Application error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#07182E] text-slate-100 p-6">
          <div className="max-w-md w-full rounded-2xl border border-sky-300/20 bg-[#0D2545] p-8 text-center shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2">
              সাময়িক কারিগরি ত্রুটি হয়েছে
            </h2>
            <p className="text-sm text-sky-100/80 mb-6">
              অনুগ্রহ করে পেজটি রিলোড করুন অথবা সরাসরি হেল্পলাইনে যোগাযোগ করুন: 01345-786806
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-colors cursor-pointer"
            >
              পেজ রিলোড করুন
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
