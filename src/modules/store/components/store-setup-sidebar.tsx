export function StoreSetupSidebar() {
  return (
    <div className="hidden w-full flex-col justify-between border-r p-12 pl-0 md:flex md:w-2/5 lg:w-1/3">
      <div className="space-y-6">
        <div>
          <h1 className="mb-4 font-bold text-3xl leading-tight">
            Become a seller and grow your business
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Join thousands of merchants selling on our platform with secure
            payment processing and instant payouts.
          </p>
        </div>
        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-xs">
              ✓
            </div>
            <span className="font-medium text-muted-foreground text-sm">
              Secure payment processing
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-xs">
              ✓
            </div>
            <span className="font-medium text-muted-foreground text-sm">
              Fast payouts to your account
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-xs">
              ✓
            </div>
            <span className="font-medium text-muted-foreground text-sm">
              24/7 seller support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
