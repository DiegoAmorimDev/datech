const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/20 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <a href="#hero" className="font-display text-xl font-bold tracking-tight text-primary">
              DA<span className="text-foreground">TECH</span>
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              Desenvolvimento Web & Sistemas
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DATECH. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
