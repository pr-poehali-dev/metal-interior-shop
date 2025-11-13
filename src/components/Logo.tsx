const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-12 h-12 border-2 border-foreground flex items-center justify-center">
        <div className="absolute left-1/4 text-lg font-serif font-bold text-foreground">M</div>
        <div className="absolute inset-y-2 left-1/2 w-[2px] bg-foreground -translate-x-1/2"></div>
        <div className="absolute right-1/4 text-lg font-serif font-bold text-foreground">S</div>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-medium tracking-wider text-muted-foreground">MHKS</span>
        <span className="text-sm font-light tracking-widest">Steel</span>
      </div>
    </div>
  );
};

export default Logo;