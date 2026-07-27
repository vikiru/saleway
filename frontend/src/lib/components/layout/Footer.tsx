export function Footer() {
  return (
    <footer className="border-t py-4">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
        <p className="text-sm text-center text-muted-foreground md:text-right dark:text-white">
          &copy; {new Date().getFullYear()} Saleway. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
