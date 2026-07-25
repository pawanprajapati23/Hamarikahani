import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4">
      <h2 className="font-playfair text-4xl font-bold mb-4">Story Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Oops, we couldn't find this page. It might have been deleted, or it hasn't been written yet.
      </p>
      <Link 
        href="/" 
        className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}
