import React, { ErrorInfo, ReactNode } from 'react';
import PrimaryButton from './buttons/primary-button/PrimaryButton';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, info.componentStack);
  }

  refreshPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col justify-center items-center bg-white">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg text-center">
            <h1 className="text-2xl font-bold text-black-900">
              Oops! Something went wrong.
            </h1>
            <p className="mt-4 text-gray-600 text-xs">
              We apologize for the inconvenience. Please try refreshing the page
              or return later.
            </p>
            <p className="mt-2 text-gray-500 text-xs">
              {this.state.error?.message}
            </p>

            <PrimaryButton
              className="mt-6 text-xs font-bold bg-orange-600 text-white px-2 py-3 rounded-sm hover:bg-orange-500 transition duration-300"
              type="button"
              label="Refresh Page"
              onClickHandler={() => this.refreshPage()}
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
