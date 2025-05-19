
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this is a Stripe return by examining the referrer
    const isFromStripe = document.referrer && document.referrer.includes("stripe.com");
    
    // Log the 404 attempt for debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
      { referrer: document.referrer, isFromStripe }
    );

    // Auto-redirect to pricing page if coming from Stripe
    if (isFromStripe) {
      toast.info("Redirecting you back to our pricing page...");
      setTimeout(() => {
        navigate("/pricing?canceled=true");
      }, 1500);
    }
  }, [location.pathname, navigate]);

  // Check if this is a Stripe return
  const isFromStripe = document.referrer && document.referrer.includes("stripe.com");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <div className="mb-6">
          <LinkIcon className="h-12 w-12 text-brand-blue mx-auto" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        
        {isFromStripe ? (
          <div className="mb-8">
            <p className="text-lg text-gray-600 mb-6">
              It looks like you were returning from Stripe. You can continue to our pricing page or dashboard.
              {isFromStripe && <span className="block mt-2 text-sm text-blue-500">Redirecting you automatically...</span>}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/pricing">Return to Pricing</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <p className="text-lg text-gray-600 mb-6">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        )}
        
        <p className="text-sm text-gray-500 mt-8">
          If you believe this is an error, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
