try {
  const earlyTheme = localStorage.getItem("theme");
  if (earlyTheme === "light" || earlyTheme === "dark") {
    document.documentElement.setAttribute("data-theme", earlyTheme);
  }
} catch (error) {
  //storage unavailable: keep the default theme
  //this prevents an empty logo first time loading
}
