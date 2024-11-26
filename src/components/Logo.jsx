function Logo() {
  return (
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img
        src="src/assets/gatherings-logo.png"
        className="h-8"
        alt="Gatherings Logo"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Gatherings
      </span>
    </a>
  );
}

export default Logo;
