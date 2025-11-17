export default function () {
  return (
    <div className="space-y-8">
      <h2 className="font-semibold text-foreground text-xl">Profile details</h2>
      <div className="space-y-6 font-medium">
        <div className="flex items-center justify-between border-border border-b py-4">
          <div className="min-w-[140px] text-muted-foreground text-sm">
            Name
          </div>
          <div className="flex-1">
            <span className="text-foreground text-sm">John Doe</span>
          </div>
        </div>
        <div className="flex items-center justify-between border-border border-b py-4">
          <div className="min-w-[140px] text-muted-foreground text-sm">
            Email
          </div>
          <div className="flex-1">
            <span className="text-foreground text-sm">johndoe@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
