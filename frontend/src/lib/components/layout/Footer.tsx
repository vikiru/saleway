export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-end gap-4 md:h-24 md:flex-row">
        <p className="text-sm text-center text-muted-foreground md:text-right md:mr-2 dark:text-white">
          &copy; {new Date().getFullYear()} Ecommerce App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
